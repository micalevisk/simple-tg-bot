const path = require('path')

const env = process.env.NODE_ENV || 'production'

require('dotenv').config({
  path: path.join(__dirname, `.${env}.deploy.env`),
})

// https://pm2.keymetrics.io/docs/usage/application-declaration/#attributes-available
module.exports = {
  apps: [
    {
      // ================================ General
      name: 'telegram bot',
      cwd: __dirname,
      script: './src/index.js',

      // ====================== Advanced features
      instances: 1,
      exec_mode: 'cluster_mode',
      // watch: ['src', 'package-lock.json'],
      // ignore_watch: ['node_modules'],
      max_memory_restart: '150M', // (idk what value to use)
      instance_var: 'NODE_BOT_INSTANCE',
      env: {
        NODE_ENV: 'production',
        DEBUG: 'simple-tg-bot:info,simple-tg-bot:error',
      },

      // ============================== Log files
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logz/error.log',
      out_file: './logz/output.log',
      combine_logs: true,
      pid_file: './logz/.app-pm_id.pid',

      // =========================== Control flow
      listen_timeout: 5000, // app should listen before 5s
      kill_timeout: 2000, // 2s before sending a final SIGKILL
      max_restarts: 5,
      restart_delay: 0, // wait 0ms before restarting if the app crash
      autorestart: true, // restart if the app crash or ends peacefully
    },
  ],

  deploy: {
    // https://pm2.keymetrics.io/docs/usage/application-declaration/#deployment
    production: {
      key: process.SERVER_PEM_PATH,
      user: process.env.SERVER_USER,
      host: process.env.SERVER_HOST,
      ssh_options: 'StrictHostKeyChecking=no',

      ref: 'origin/master',
      repo: 'git@github.com:sistematico/simple-tg-bot.git',
      path: process.env.SERVER_REPO_PATH,
      'post-deploy': 'npm install --prod && npm run reload',
    },
  },
}
