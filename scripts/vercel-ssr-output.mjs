import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const distApp = join('dist', 'online-learning-platform')
const distBrowser = join(distApp, 'browser')
const distServer = join(distApp, 'server')
const outRoot = join('.vercel', 'output')
const funcDir = join(outRoot, 'functions', 'index.func')

await rm(outRoot, { recursive: true, force: true })
await mkdir(join(outRoot, 'static'), { recursive: true })
await mkdir(funcDir, { recursive: true })

// static: lo que sirve { handle: filesystem } (browser build + prerender)
await cp(distBrowser, join(outRoot, 'static'), { recursive: true })

// funcion SSR: server/ + browser/ (server.ts lee ../browser)
await cp(distServer, join(funcDir, 'server'), { recursive: true })
await cp(distBrowser, join(funcDir, 'browser'), { recursive: true })

// wrapper: default export = handler Node de Vercel
await writeFile(
  join(funcDir, 'index.mjs'),
  "export { reqHandler as default } from './server/server.mjs'\n",
)

await writeFile(
  join(funcDir, '.vc-config.json'),
  JSON.stringify(
    {
      runtime: 'nodejs22.x',
      handler: 'index.mjs',
      launcherType: 'Nodejs',
      supportsResponseStreaming: true,
    },
    null,
    2,
  ),
)

await writeFile(
  join(outRoot, 'config.json'),
  JSON.stringify(
    { version: 3, routes: [{ handle: 'filesystem' }, { src: '/.*', dest: '/index' }] },
    null,
    2,
  ),
)
