import packageJson from '@/../package.json'

export function name() {
  return packageJson.name || 'server'
}

export function version() {
  return packageJson.version || '0.0.1'
}
