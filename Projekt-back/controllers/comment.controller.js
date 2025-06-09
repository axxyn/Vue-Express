const Comment = require("../models/CommentModel.js");
const User = require("../models/UserModel.js");

const handleError = (res) => {
    return res.status(400).send("Something went wrong!")
}

module.exports = {
    getComments: async (req, res) => {
        try {
            var post_id = req.params.post_id || null
            console.log("GET Comments")

            await Comment.getComments(post_id).then(result => {
                return res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    getComment: async (req, res) => {
        try {
            var comment_id = req.params.comment_id || null
            console.log("GET Comment")

            await Comment.getComment(comment_id).then(result => {
                return res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    addComment: async (req, res) => {
        try {
            var post_id = req.body.post_id || null
            var comment = req.body.comment || null
            var username = req.body.username || null
            var user_id = null
            console.log("ADD Comment")
            await User.getUser(username).then(res => {
                user_id = res ? res.user_id : -1
            })
            if (user_id != -1) {
                await Comment.addComment(user_id, post_id, comment).then(result => {
                    return res.status(200).send("Comment was added")
                })
            }
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    deleteComment: async (req, res) => {
        try {
            var comment_id = req.params.comment_id || null
            console.log("DELETE Comment")

            await Comment.deleteComment(comment_id).then(result => {
                return res.status(200).send("Comment was deleted.")
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
}