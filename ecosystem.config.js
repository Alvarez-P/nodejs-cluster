const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  apps : [{
    script: __dirname + '/dist/app.js',
    watch: '.',
    instances: 'MAX',
    autorestart: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      SERVER_PORT: 3300
    },
    env_production: {
      NODE_ENV: 'production',
      SERVER_PORT: 3500
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
