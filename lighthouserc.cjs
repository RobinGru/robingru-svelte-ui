module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      numberOfRuns: 1,
      // All public overview pages in Lighthouse's mobile profile. The catalog
      // renders every component once; its QA variants cover global dark/compact
      // token and semantic regressions without publishing a separate test page.
      url: [
        'http://localhost/',
        'http://localhost/accessibility',
        'http://localhost/blog',
        'http://localhost/components',
        'http://localhost/dashboard',
        'http://localhost/data',
        'http://localhost/installation',
        'http://localhost/patterns',
        'http://localhost/start',
        'http://localhost/tokens',
        'http://localhost/why-robingru',
        'http://localhost/workbench',
        'http://localhost/components?rg-audit-theme=dark',
        'http://localhost/components?rg-audit-density=compact',
        'http://localhost/components?rg-audit-theme=dark&rg-audit-density=compact'
      ]
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci'
    }
  }
};
