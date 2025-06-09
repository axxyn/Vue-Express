const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.PORT
})

connection.connect(error => {
  if (error) {
    console.log(error)
  } else {
    console.log("Successfully connected to the database.")
  }
})

module.exports = connection

