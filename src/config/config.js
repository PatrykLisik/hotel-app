module.exports = {
  port: process.env.PORT || 5000,
  db: {
    host: process.env.DB_NAME || 'localhost',
    db_port: process.env.DB_PORT || '3306',
    database: process.env.DATABASE || 'hotel_app',
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASS || 'admin',
    dialect: 'mysql'
  },
  authentication: {
    secret: process.env.JWT_SECRET || 'secret string',
    // one day if not defined
    expire_time: process.env.JWT_EXPIRE_TIME || 60 * 60 * 24,
    salt_factor: process.env.PASS_HASH_SALT || 8
  }

}
