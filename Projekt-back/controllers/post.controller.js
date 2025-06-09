const Post = require("../models/PostModel.js");
const User = require("../models/UserModel.js");

const path = require('path')
const fs = require('fs');

const handleError = (res) => {
    return res.status(400).send("Something went wrong!")
}

module.exports = {
    getPosts: async (req, res) => {
        try {
            var page = req.params.page || 1
            if (page < 1) page = 1
            var pageLimit = req.params.pageLimit || 5
            var user_id = null
            var username = req.params.username || null
            if (username) {
                await User.getUser(username).then(res => {
                    user_id = res ? res.user_id : -1
                })
            }
            var order = req.params.order || 'DESC'
            console.log("GET Posts")

            await Post.getPosts(page, pageLimit, user_id, order).then(result => {
                return res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    getPost: async (req, res) => {
        try {
            var post_id = req.params.post_id || -1
            console.log("GET Post")

            await Post.getPost(post_id).then(result => {
                res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    countPosts: async (req, res) => {
        try {
            var user_id = null
            var username = req.params.username || null
            if (username) {
                await User.getUser(username).then(res => {
                    user_id = res ? res.user_id : -1
                })
            }
            console.log("COUNT Posts")
            await Post.countPosts(user_id).then(result => {
                res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    getTopTotalPost: async (req, res) => {
        try {
            console.log("GET TopTotal")
            await Post.getTopTotalPost().then(result => {
                res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    getNewestPost: async (req, res) => {
        try {
            console.log("GET Newest")
            await Post.getNewestPost().then(result => {
                res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    addPost: async (req, res) => {
        try {
            console.log("ADD Post")
            var image = req.body.image || null
            var title = req.body.title || null
            var content = req.body.content || null

            var user_id = null
            var username = req.body.username || null
            if (username != null && title != null && content != null) {
                await User.getUser(username).then(res => {
                    user_id = res ? res.user_id : -1
                })
                if (user_id != -1) {
                    await Post.addPost(user_id, image, title, content).then(result => {
                        res.status(200).send("Post was added.")
                    })
                }
            } else {
                response.status(400).send("No data given.")
            }
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    deletePost: async (req, res) => {
        try {
            console.log("DELETE Post")
            var post_id = req.params.post_id || null
            await Post.getPost(post_id).then(async result => {
                var post = result
                if(post && post.post_id) {
                    if (post.image != null) {
                        const imagePath = path.join(__dirname, "..", "public", post.image)
                        fs.unlink(imagePath, err => { if (err) console.log(err) })
                    }
                    await Post.deletePost(post_id).then(result => {
                        res.status(200).send("Post was deleted.")
                    })
                } else {
                    handleError(res)
                }
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    editPost: async (req, res) => {
        try {
            console.log("UPDATE Post")
            var post_id = req.params.post_id
            var image = req.body.image || null
            var title = req.body.title
            var content = req.body.content

            await Post.getPost(post_id).then(async result => {
                var post = result
                if (image != null) {
                    if (post.image != null) {
                        const imagePath = path.join(__dirname, "..", "public", post.image)
                        fs.unlink(imagePath, err => { if (err) console.log(err) })
                    }
                }
                await Post.editPost(post_id, image, title, content).then(result => {
                    res.status(200).send("Change was saved.")
                })
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
}