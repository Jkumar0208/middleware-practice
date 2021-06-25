const express = require("express");
const app = express();
const upload = require("./utils/uploadLogic");


const port = process.env.PORT || 3000;

app.use(express.static('public'))




app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html");
})

app.post("/upload-profile-pic", upload.single('profile_pic'), (req, res) => {
    try {
        console.log({ file: req.file });
        if (!req.file) {
            res.status(400).send("Please upload an image with either of these formats: jpeg/jpg/png/gif");
        } else {
            res.send(`<p>The profile pic you just uploaded:</p><img src="/uploads/${req.file.filename}" />`)
        }
    } catch (error) {
        console.error({ e: error })
    }
})

app.post("/upload-cat-pics", upload.array('cat_pics'), (req, res) => {
    try {
        console.log({ files: req.files});
        let htmlResult = ``;
        let idx = 1;
        for (const cat_pic in req.files) {
            console.log(req.files[cat_pic])
            htmlResult +=`<p>#${idx} of your cat picture uploads:</p><img src="/uploads/${req.files[cat_pic].filename}" />`;
            idx++;
        }
        res.send(htmlResult)
    } catch (error){
        console.error({ e: error })
    }

})

app.listen(port, () => {
    console.log(`🌈 Server listening on port ${port} 🦄`);
});

