/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/app.js',
      watch: false,
      instances: 0,
      exec_mode: 'cluster',
      listen_timeout: 8000,
      env: {
        'NODE_ENV': 'development',
      },
      env_production: {
        'NODE_ENV': 'production',
      },
    }],
}