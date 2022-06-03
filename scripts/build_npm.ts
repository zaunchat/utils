import { build, emptyDir } from 'https://deno.land/x/dnt@0.23.0/mod.ts';

if (!Deno.args[0]) {
  console.log('Missing version');
  Deno.exit();
}

await emptyDir('./npm');

await build({
  packageManager: 'pnpm',
  scriptModule: false,
  test: false,
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {},
  package: {
    name: '@itchatapp/utils',
    version: Deno.args[0].replace(/[A-Z]+/gi, ''),
    description: 'utils module for itchat',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git+https://github.com/itchatapp/utils.git',
    },
    bugs: {
      url: 'https://github.com/itchatapp/utils/issues',
    },
    engines: {
      node: '>=16.0.0',
    },
    files: [
      'esm/*',
      'types/*',
    ],
  },
});

Deno.copyFileSync('LICENSE', 'npm/LICENSE');
Deno.copyFileSync('README.md', 'npm/README.md');
