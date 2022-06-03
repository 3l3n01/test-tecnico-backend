module.exports = {
  development: {
    database: "db",
    dialect: "postgres",
    host: "127.0.0.1",
    password: "password",
    username: "usuario",
    logging: false,
  },
  production: {
    database: process.env.DB_DATABASE || "db",
    dialect: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    password: process.env.DB_PASSWORD || "password",
    username: process.env.DB_USERNAME || "usuario",
    logging: false,
  },
  test: {
    database: "db",
    dialect: "postgres",
    host: "127.0.0.1",
    password: "password",
    username: "usuario",
    logging: false,
  },
};
