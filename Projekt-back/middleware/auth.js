const jwt = require('jsonwebtoken')
const User = require("../models/UserModel.js");

const verifyAccessToken = async (req, res, next) => {
    let headerToken = req.headers["x-access-token"]
    let headerUsername = req.headers["x-username"]
    let userId

    if (headerToken == undefined || headerUsername == undefined) {
        return res.status(401).send({
            message: "Bad request - headers!"
        });
    }

    if (jwt.verify(headerToken, "SECRET_TOKEN", (err, decoded) => {
            if(err) {
                return "bad"
            }
            userId = decoded.id;
        }) == "bad") {
        return res.status(401).send({
            message: "Unauthorized - Bad token"
        });
    }

    var data = await User.getUser(headerUsername).then(res => {
        return res;
    }).catch(err => console.log(err))

    if(data && data.user_id == userId) {
        return next()
    }

    return res.status(401).send({
        message: "Unauthorized!"
    })
}

module.exports = verifyAccessToken