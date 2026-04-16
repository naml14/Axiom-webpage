import { resolve } from 'node:path'

const result = await Bun.build({
  entrypoints: [resolve('src/main.ts')],
  outdir: resolve('public'),
  target: 'browser',
  format: 'esm',
  minify: true,
})

if (!result.success) {
  for (const message of result.logs) {
    console.error(message.message)
  }
  process.exit(1)
}

console.log('Bundled client to public/main.js')
