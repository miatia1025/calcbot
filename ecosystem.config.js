module.exports = {
  apps: [
    {
      name: "miatiabot",
      script: "index.js",
      watch: true,
      autorestart: true,
      max_restart: 10,
    },
    {
      name: "reload",
      script: "deploy-commands.js",
      autorestart: false,
      cron_restart: "0 * * * *",
    },
  ],
};
