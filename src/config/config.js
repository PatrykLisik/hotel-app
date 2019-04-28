module.exports = {
  port: process.env.PORT || 5000,
  db: {
    host: process.env.DB_NAME || 'localhost',
    port: process.env.PORT || '3306',
    database: process.env.DATABASE || 'hotel_app',
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASS || 'admin',
    dialect: 'mysql'
  }

}
