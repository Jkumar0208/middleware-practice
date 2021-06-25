const express = require("express");
const app = express();
const upload = require("./utils/uploadLogic");


const port = process.env.PORT || 3000;

app.use(express.static('public'))




app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html");
})

app.post("/upload-profile-pic", upload.single('profile_pic'), (req, res, next) => {
    try {
        console.log({ file: req.file });
        if (!req.file) {
            res.status(400).send("please upload the picture");
        } else {
            res.send(`<p>The profile pic you just uploaded:</p><img src="/uploads/${req.file.filename}" />`)
        }
    } catch (error) {
        console.log({ e: error })
    }
})

app.listen(port, () => {
    console.log(`🌈 Server listening on port ${port} 🦄`);
});

