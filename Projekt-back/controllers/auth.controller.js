const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require("../models/UserModel");

module.exports = {
    register: async (req, response) => {
        try {
            console.log("REGISTER")
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;


            if (!(username && password)) {
                return response.status(400).send({
                    error: "Data not formatted properly"
                })
            }

            var regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!regExp.test(email)) {
                return response.status(400).send({
                    error: "You have entered an invalid email address!"
                })
            }

            const salt = await bcrypt.genSalt(10)
            const password_hash = await bcrypt.hash(password, salt)

            await User.getUser(username).then(async res => {
                if (res) {
                    return response.status(400).send("Username is taken.")
                } else {
                    await User.register(username, email, password_hash).then(res => {
                        return response.status(201).send("Account was created.")
                    })
                }
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
    verifyAccessToken: async (req, res) => {
        console.log("VERIFY Token")
        // Verified by middleware
        // Provided end-point to check user credentials when needed
        return res.status(200).send("Token verified")
    },
    login: async (req, response) => {
        try {
            console.log("LOGIN")
            const username = req.body.username
            const password = req.body.password


            if (!(username && password)) {
                return response.status(400).send({
                    error: "Data not formatted properly"
                })
            }

            await User.getUser(username).then(async user => {
                if (user) {
                    var passwordIsValid = bcrypt.compareSync(
                        password,
                        user.password
                    )
                    if (!passwordIsValid) {
                        return response.status(401).send("Invalid Password!")
                    }
                    var token = jwt.sign({
                        id: user.user_id
                    }, "SECRET_TOKEN", {
                        expiresIn: 86400 // 24 hours
                    })

                    return response.status(201).send({
                        accessToken: token,
                    })
                } else {
                    return response.status(404).send("User Not found.")
                }
            })
        } catch (err) {
            console.log(err)
            handleError(res)
        }
    },
}