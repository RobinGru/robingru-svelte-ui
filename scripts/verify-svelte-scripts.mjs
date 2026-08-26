import { createRequire } from 'node:module';
import { readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcRoot = join(root, 'src');

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

function collectImports(source, file, external) {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const node of sf.statements) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) continue;
    const moduleName = node.moduleSpecifier.text;
    if (!['@lucide/svelte', 'bits-ui', 'svelte/elements'].includes(moduleName)) continue;
    const set = external.get(moduleName) ?? new Set();
    const bindings = node.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const item of bindings.elements) set.add(item.propertyName?.text ?? item.name.text);
    }
    external.set(moduleName, set);
  }
}

function valueExports(names) {
  return [...(names ?? [])].sort().map((name) => `  export const ${name}: any;`).join('\n');
}
function typeExports(names) {
  return [...(names ?? [])].sort().map((name) => `  export type ${name}<T = any> = Record<string, any>;`).join('\n');
}

const allFiles = await walk(srcRoot);
const svelteFiles = allFiles.filter((file) => file.endsWith('.svelte'));
const generated = [];
const external = new Map();
const stubPath = join(srcRoot, '__script-verification-stubs.d.ts');
const configPath = join(root, 'tsconfig.script-verification.json');
let errors = [];

try {
  for (const file of svelteFiles) {
    const source = await readFile(file, 'utf8');
    const script = source.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i)?.[1];
    if (!script) continue;
    collectImports(script, file, external);
    const generatedPath = file.replace(/\.svelte$/, '.svelte-script.ts');
    await writeFile(generatedPath, script, 'utf8');
    generated.push(generatedPath);
  }

  await writeFile(stubPath, `declare function $state<T>(value:T):T;
declare namespace $state { function snapshot<T>(value:T):T; }
declare function $derived<T>(value:T):T;
declare namespace $derived { function by<T>(factory:()=>T):T; }
declare function $props<T>():T;
declare function $bindable<T>(value?:T):T;
declare function $effect(callback:()=>void|(()=>void)):void;

declare module '*.svelte' { const component:any; export default component; }
declare module 'svelte' {
  export type Snippet<Parameters extends unknown[] = []> = (...args:Parameters)=>unknown;
  export type Component<Props extends Record<string, unknown> = Record<string, unknown>> = any;
  export function createRawSnippet<Parameters extends unknown[]>(factory:(...args:Parameters)=>{render:()=>string}):Snippet<Parameters>;
  export function onMount(callback:()=>void|(()=>void)):void;
}
declare module 'svelte/elements' {
${typeExports(external.get('svelte/elements'))}
}
declare module 'svelte/store' {
  export type Readable<T> = { subscribe:(run:(value:T)=>void)=>()=>void };
  export function writable<T>(value:T):Readable<T>&{set(value:T):void;update(fn:(value:T)=>T):void};
}
declare module '$app/state' { export const page:any; }
declare module '@sveltejs/kit' { export function error(status:number,message?:string):never; }
declare module '@lucide/svelte' {
${valueExports(external.get('@lucide/svelte'))}
}
declare module 'bits-ui' {
${valueExports(external.get('bits-ui'))}
}
`, 'utf8');

  const config = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'Bundler',
      strict: true,
      skipLibCheck: true,
      noEmit: true,
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      baseUrl: '.',
      paths: {
        '$lib': ['src/lib/index.ts'],
        '$docs/*': ['src/docs/*']
      }
    },
    include: ['src/**/*.svelte-script.ts', 'src/**/*.ts', 'src/**/*.d.ts']
  };
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  const parsed = ts.getParsedCommandLineOfConfigFile(configPath, {}, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => errors.push(diagnostic)
  });
  if (!parsed) throw new Error('Could not parse temporary script verification config.');
  const program = ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options });
  errors.push(...ts.getPreEmitDiagnostics(program));

  const formatted = errors.map((diagnostic) => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    if (!diagnostic.file || diagnostic.start === undefined) return message;
    const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    return `${relative(root, diagnostic.file.fileName)}:${position.line + 1}:${position.character + 1} ${message}`;
  });
  const report = {
    generatedAt: new Date().toISOString(),
    svelteScriptsChecked: generated.length,
    externalIconExportsStubbed: external.get('@lucide/svelte')?.size ?? 0,
    bitsNamespacesStubbed: external.get('bits-ui')?.size ?? 0,
    errors: formatted
  };
  await writeFile(join(root, 'docs/script-verification.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  if (formatted.length) {
    console.error(formatted.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Strict script verification passed: ${generated.length} Svelte script blocks.`);
  }
} finally {
  await Promise.all(generated.map((file) => rm(file, { force: true })));
  await rm(stubPath, { force: true });
  await rm(configPath, { force: true });
}
