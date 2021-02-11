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
      /** Uncomment line below and add ip for your host */
      // host: "0.0.0.0",
      ref: "origin/master",
      ssh_options: "ForwardAgent=yes",
      /** Uncomment line below and add the link to your github repo */
      // repo: "git@github.com:organization/repo-name.git",
      path: "/var/www/back-end",
      env: {
        NODE_ENV: "development",
      },
      "post-deploy":
        "yarn install && yarn typeorm migration:run && yarn build && yarn serve",
    },
  },
};
