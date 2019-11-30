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
      cwd: './',
      // 启动进程数
      instances: 4,
      // 执行模式，
      exec_mode: 'cluster',
      max_memory_restart: '300M',
      env_production: {
        NODE_ENV: 'production'
      },
      error_file: './logs/err.log', // 错误日志路径
      out_file: './logs/out.log'
    }
  ]
};
