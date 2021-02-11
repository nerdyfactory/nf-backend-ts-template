module.exports = {
  apps: [
    {
      name: "Api",
      script: "dist/Api.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
  deploy: {
    development: {
      key: "~/.ssh/id_rsa",
      user: "sshadmin",
      host: "118.67.128.137",
      ref: "origin/master",
      ssh_options: "ForwardAgent=yes",
      repo: "git@github.com:d2x-addup/back-end.git",
      path: "/var/www/back-end",
      env: {
        NODE_ENV: "development",
      },
      "post-deploy":
        "yarn install && yarn typeorm migration:run && yarn build && yarn serve",
    },
  },
};
