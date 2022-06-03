const app = require("./app");
const db = require("./models");
const port = parseInt(process.env.PORT || "3000");

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

db.sequelize.sync().then(function () {
  server.on("error", onError);
  server.on("listening", onListening);
});

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error("Port " + port + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Port " + port + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  console.info("Listening on port " + port);
};
