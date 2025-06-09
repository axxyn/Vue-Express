const mysql = require('../database.js');

const User = {}

User.getUsers = () => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM users`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

User.getUser = (username) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM users WHERE username = "${username}"`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res[0])
        })
    })
}

User.findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM users WHERE email = "${email}"`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res[0])
        })
    })
}


User.register = (username, email, password) => {
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO users(username, email, password) VALUES("${username}", "${email}", "${password}")`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

module.exports = User