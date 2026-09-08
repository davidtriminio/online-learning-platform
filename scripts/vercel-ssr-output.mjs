import { cp, mkdir, writeFile, rm, access } from 'node:fs/promises'
import { join } from 'node:path'

const distApp = join('dist', 'online-learning-platform')
const distBrowser = join(distApp, 'browser')
const distServer = join(distApp, 'server')
const outRoot = join('.vercel', 'output')
const funcDir = join(outRoot, 'functions', 'index.func')

// fail-fast
await access(join(distServer, 'server.mjs')).catch(() => {
  throw new Error('Falta dist/.../server/server.mjs — ¿corriste "pnpm run build" antes?')
})

await rm(outRoot, { recursive: true, force: true })
await mkdir(join(outRoot, 'static'), { recursive: true })
await mkdir(funcDir, { recursive: true })

// estáticos: los sirve { handle: filesystem }
await cp(distBrowser, join(outRoot, 'static'), { recursive: true })

// función SSR: TODO server/ PLANO en la raíz del func (sin subcarpeta 'server/')
await cp(distServer, funcDir, { recursive: true })

// wrapper: expone el reqHandler nombrado de Angular como default
await writeFile(
  join(funcDir, 'index.mjs'),
  "process.env.NG_ALLOWED_HOSTS = [process.env.NG_ALLOWED_HOSTS, 'learning-platform.davidtriminio.dev', '*.vercel.app'].filter(Boolean).join(',')\n" +
    "const { reqHandler } = await import('./server.mjs')\n" +
    'export default reqHandler\n',
)

await writeFile(
  join(funcDir, '.vc-config.json'),
  JSON.stringify({ runtime: 'nodejs22.x', handler: 'index.mjs', launcherType: 'Nodejs' }, null, 2),
)

await writeFile(
  join(outRoot, 'config.json'),
  JSON.stringify(
    { version: 3, routes: [{ handle: 'filesystem' }, { src: '/.*', dest: '/index' }] },
    null,
    2,
  ),
)

console.log('OK: .vercel/output listo (func plano, server.mjs en la raíz)')
