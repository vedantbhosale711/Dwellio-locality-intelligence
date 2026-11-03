const { env } = require("./config/env");
const { createApp } = require("./app");

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`Dwellio backend listening on port ${env.PORT}`);
});

server.on("error", (error) => {
  console.error(`Unable to start Dwellio backend: ${error.message}`);
  process.exitCode = 1;
});

function shutdown(signal) {
  console.log(`Received ${signal}; closing Dwellio backend.`);
  server.close((error) => {
    if (error) {
      console.error("Failed to close Dwellio backend cleanly:", error.message);
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
