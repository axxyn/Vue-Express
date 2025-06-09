const mysql = require('../database.js');

const Thumb = {}

Thumb.getUserThumb = (post_id, user_id) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM thumbs WHERE post_id = ${post_id} and user_id = ${user_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res[0])
        })
    })
}

Thumb.getThumbForPost = (post_id) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT count(*) as total, sum(thumb = true) as likes, sum(thumb = false) as dislikes FROM thumbs WHERE post_id = ${post_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res[0])
        })
    })
}

Thumb.addThumb = (post_id, user_id, thumb) => {
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO thumbs(post_id, user_id, thumb) VALUES(${post_id}, ${user_id}, ${thumb})`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

Thumb.deleteThumb = (post_id, user_id) => {
    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM thumbs WHERE post_id = ${post_id} and user_id = ${user_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

module.exports = Thumb