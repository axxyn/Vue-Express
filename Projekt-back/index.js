const express = require('express')
const path = require('path')
const fs = require('fs');
const app = express()

const verifyAccessToken = require('./middleware/auth')

const multer = require("multer");
const upload = multer({
    dest: "./uploads/"
})

// ---- Cors
const cors = require("cors");
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json())

app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, x-username, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/', express.static(path.join(__dirname, 'public')))
// ---- Routes
const postRouter = require('./routes/post.router')
app.use('/post', postRouter)
const authRouter = require('./routes/auth.router')
app.use('/auth', authRouter)
const commentRouter = require('./routes/comment.router')
app.use('/comment', commentRouter)
const ThumbRouter = require('./routes/thumb.router')
app.use('/thumb', ThumbRouter)

app.post("/upload", verifyAccessToken, upload.single("postImage"), (req, res) => {
    console.log("File upload started")
    const tempPath = req.file.path
    const name = req.file.filename + ".png"
    const targetPath = path.join(__dirname, "public", name)
    console.log(req.file)

    if(path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
            if(err) {
                res.status(400).send(err)
            }
            res.status(200).send(name)
        })
    } else {
        fs.unlink(tempPath, err => {if(err) console.log(err)})
        res.status(400).send("Wrong file type, supported: .png, .jpg")
    }
})

// ---- Listen
app.listen(3000, () => {
    console.log("Serwer nasłuchuje na porcie 3000")
})