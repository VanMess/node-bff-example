module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'node-bff-example',
      script: 'dist/bin/www.js',
      watch: false,
      instances: 4,
      exec_mode: 'cluster',
      max_memory_restart: '300M',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
