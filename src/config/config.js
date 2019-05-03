module.exports = {
  port: process.env.PORT || 5000,
  development: {
    username: 'admin',
    password: 'admin',
    database: 'hotel_app',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql'
  },
  authentication: {
    secret: process.env.JWT_SECRET || 'secret string',
    // one day if not defined
    expire_time: process.env.JWT_EXPIRE_TIME || 60 * 60 * 24,
    salt_factor: process.env.PASS_HASH_SALT || 8
  }

}
