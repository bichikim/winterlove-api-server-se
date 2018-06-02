/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/app.js',
      watch: false,
      instances: 0,
      exec_mode: 'cluster',
      env: {
        'NODE_ENV': 'development',
      },
      env_production: {
        'NODE_ENV': 'production',
      },
    }],
}