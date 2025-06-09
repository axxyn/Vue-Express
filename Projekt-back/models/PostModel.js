const mysql = require('../database.js');

const Post = {}

Post.getPosts = (page, pageLimit, user_id, order) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT posts.*, users.username FROM posts INNER JOIN users ON posts.user_id = users.user_id`
        if (page < 1) page = 1
        if (user_id != null) sql += ` WHERE posts.user_id = ${user_id}`
        sql += ` ORDER BY date_created ${order}`
        if(pageLimit != 0) sql += ` LIMIT ${pageLimit} OFFSET ${(page - 1) * pageLimit}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

Post.getTopTotalPost = () => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT posts.post_id, count(*) as total, sum(thumb = true) as likes, sum(thumb = false) as dislikes 
        FROM posts INNER JOIN thumbs ON thumbs.post_id = posts.post_id 
        GROUP BY posts.post_id ORDER BY total DESC`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(''+res[0].post_id)
        })
    })
}

Post.getNewestPost = () => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT posts.*, users.username FROM posts INNER JOIN users ON users.user_id = posts.user_id ORDER BY date_created DESC`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res[0])
        })
    })
}


Post.countPosts = (user_id) => {
    return new Promise((resolve, reject) => {
        var sql = ``
        if(user_id == null) sql = `SELECT count(*) as count FROM posts`
        else sql = `SELECT count(*) as count FROM posts WHERE user_id = ${user_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res[0])
        });
    })
}

Post.getPost = (post_id) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT posts.*, users.username FROM posts INNER JOIN users ON posts.user_id = users.user_id WHERE post_id = ${post_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(res[0])
        });
    })
}

Post.addPost = (user_id, image, title, content) => {
    return new Promise((resolve, reject) => {
        image = image ? `"${image}"` : null
        var sql = `INSERT INTO posts(user_id, image, title, content) VALUES(${user_id}, ${image}, "${title}", "${content}")`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(''+res)
        })
    })
}

Post.deletePost = (post_id) => {
    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM posts WHERE post_id = ${post_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(''+res)
        })
    })
}

Post.editPost = (post_id, image, title, comment) => {
    return new Promise((resolve, reject) => {
        image = image ? `image = "${image}",` : ''
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var sql = `UPDATE posts SET ${image} title = "${title}", content = "${comment}", date_updated = "${date}" WHERE post_id = ${post_id}`
        mysql.query(sql, (err, res) => {
            if(err) reject(err)
            else resolve(''+res)
        })
    })
}

module.exports = Post