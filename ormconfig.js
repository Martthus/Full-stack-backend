require("dotenv/config");

const postgre = {
  name: process.env.DB_NAME,
  type: "postgres",
  host: process.env.MIGRATION ? "0.0.0.0" : process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  "entities": [
    "./src/modules/**/infra/typeorm/models/*{.ts,.js}",
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*{.ts,.js}",
  ],
  "cli": {
    "migrationsDir":
      "./src/shared/infra/typeorm/migrations",
  },
};

module.exports = [
  postgre
];
