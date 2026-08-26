import { createRequire } from 'node:module';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = join(root, 'src/lib');
const distRoot = join(root, 'dist');

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

await rm(distRoot, { recursive: true, force: true });
await mkdir(distRoot, { recursive: true });

for (const file of await walk(sourceRoot)) {
  const rel = relative(sourceRoot, file);
  const extension = extname(file);
  if (extension === '.ts') {
    const source = await readFile(file, 'utf8');
    const output = ts.transpileModule(source, {
      fileName: file,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        verbatimModuleSyntax: true,
        sourceMap: false
      }
    }).outputText;
    const destination = join(distRoot, rel.replace(/\.ts$/, '.js'));
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, output, 'utf8');
  } else {
    const destination = join(distRoot, rel);
    await mkdir(dirname(destination), { recursive: true });
    await cp(file, destination);
  }
}

const indexSource = await readFile(join(sourceRoot, 'index.ts'), 'utf8');
await writeFile(join(distRoot, 'index.d.ts'), indexSource, 'utf8');
await writeFile(join(distRoot, 'types.d.ts'), await readFile(join(sourceRoot, 'types.ts'), 'utf8'), 'utf8');
await mkdir(join(distRoot, 'internal'), { recursive: true });
await writeFile(
  join(distRoot, 'internal/cn.d.ts'),
  "export type ClassValue = string | false | null | undefined;\nexport declare function cn(...values: ClassValue[]): string;\n",
  'utf8'
);
await writeFile(
  join(distRoot, 'toast.d.ts'),
  `import type { Readable } from 'svelte/store';\nimport type { Tone } from './types.js';\nexport type ToastAction = { label: string; callback: () => void };\nexport type ToastInput = { title: string; description?: string; tone?: Tone; duration?: number; action?: ToastAction };\nexport type ToastItem = ToastInput & { id: string; tone: Tone };\nexport type Toaster = Readable<ToastItem[]> & { push: (input: ToastInput) => string; dismiss: (id: string) => void; clear: () => void };\nexport declare function createToaster(): Toaster;\nexport declare const toast: Toaster;\n`,
  'utf8'
);

console.log(`Source-distribution package created in ${relative(root, distRoot)}.`);
