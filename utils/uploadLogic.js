const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },


});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // check mimetype property
        // if (req.file.mimetype !== 'image/jpeg') {
        //     cb(null, false)
        // }

        const regex = /\.(jpg | jpeg | png | gif)$/igm
        try {

            if (file.originalname.match(regex)) {
                console.log("validfile")
                cb(null, true)
            } else {
                console.log("notvalidfile")
                cb(null, false)
            }
        }
        catch (e) { cb(new Error('I don\'t have a clue!')) }

        // To accept the file pass `true`, like so:

        // You can always pass an error if something goes wrong:

    }
})



module.exports = upload;
