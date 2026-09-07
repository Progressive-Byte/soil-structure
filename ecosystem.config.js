const NODE_BIN = "/home/soilstructurebd/.nvm/versions/node/v24.20.0/bin/node";

module.exports = {
  apps: [
    {
      name: "soilstructurebd-web",
      cwd: "/home/soilstructurebd/htdocs/soilstructurebd.com",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 2000",
      interpreter: NODE_BIN,
      env: { NODE_ENV: "production" },
    },
    {
      name: "soilstructurebd-api",
      cwd: "/home/soilstructurebd/htdocs/soilstructurebd.com",
      script: "server/index.js",
      interpreter: NODE_BIN,
      env: { NODE_ENV: "production", PORT: "4000" },
    },
  ],
};
