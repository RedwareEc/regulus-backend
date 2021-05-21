const { apps } = require('./api_regulus');
module.exports = {
  apps: [
    {
      id: 0,
      name: '@regulus/graphql',
      script: 'graphql/index.js',
      cwd: 'graphql'
    },
    {
      name: '@regulus/rest',
      script: './node_modules/.bin/esno',
      args: 'src/server.ts',
      watch: ['../../models/**/dist/**/*', 'src'],
      cwd: 'services/rest',
      env: {
        NODE_ENV: 'development'
      }
    }
  ]

  // deploy: {
  //   production: {
  //     user: 'ubuntu',
  //     host: '10.209.158.21',
  //     ref: 'origin/master',
  //     repo: 'https://gitlab.com/andresgnu-public/hapits.git',
  //     path: '/home/ubuntu/server',
  //     'post-deploy':
  //       'yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
  //   },
  // },
};
