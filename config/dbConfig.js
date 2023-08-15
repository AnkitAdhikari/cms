module.exports = {
  HOST: "containers-us-west-63.railway.app",
  USER: "root",
  PASSWORD: "Yc97x0QicSDN8lTZd57Z",
  PORT: 6196,
  DB: "railway",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
