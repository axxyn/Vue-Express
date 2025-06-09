const mysql = require('../database.js');

const Comment = {}

Comment.getComments = (post_id) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT comments.*, users.username FROM comments INNER JOIN users ON users.user_id = comments.user_id WHERE post_id = ${post_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

Comment.getComment = (comment_id) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT comments.*, users.username FROM comments INNER JOIN users ON users.user_id = comments.user_id WHERE comment_id = ${comment_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res[0])
        })
    })
}

Comment.addComment = (user_id, post_id, content) => {
    return new Promise((resolve, reject) => {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var sql = `INSERT INTO comments(user_id, post_id, content, date) VALUES(${user_id}, ${post_id}, "${content}", "${date}")`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(''+res)
        })
    })
}

Comment.deleteComment = (comment_id) => {
    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM comments WHERE comment_id = ${comment_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(''+res)
        })
    })
}

module.exports = Comment