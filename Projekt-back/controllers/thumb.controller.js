const Thumb = require("../models/ThumbModel.js");
const User = require("../models/UserModel.js");

const handleError = (res) => {
    return res.status(400).send("Something went wrong!")
}

module.exports = {
    getUserThumb: async (req, res) => {
        try {
            var post_id = req.params.post_id || null
            console.log("GET User Thumb")

            var user_id = null
            var username = req.params.username || null
            if (username) {
                await User.getUser(username).then(res => {
                    user_id = res ? res.user_id : -1
                })
            }

            await Thumb.getUserThumb(post_id, user_id).then(result => {
                return res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    getThumbForPost: async (req, res) => {
        try {
            var post_id = req.params.post_id || null
            console.log("GET Post Thumbs")

            await Thumb.getThumbForPost(post_id).then(result => {
                return res.status(200).send(result)
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    addThumb: async (req, res) => {
        try {
            console.log("ADD Thumb")
            var post_id = req.body.post_id
            var thumb = req.body.thumb
            var user_id = null
            var username = req.body.username
            if (username) {
                await User.getUser(username).then(res => {
                    user_id = res ? res.user_id : -1
                })
                if(user_id != -1) {
                    var oldThumb = null
                    await Thumb.getUserThumb(post_id, user_id).then(async res => {
                        oldThumb = res
                    })
                    if(oldThumb) {
                        await Thumb.deleteThumb(post_id, user_id)
                        if(oldThumb.thumb != thumb) {
                            await Thumb.addThumb(post_id, user_id, thumb)
                        }
                    } else {
                        await Thumb.addThumb(post_id, user_id, thumb)
                    }
                    res.status(200).send("Thumb added")
                } else {
                    handleError(res)
                }
            }
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },

}