const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req,file,cb) => {
    const allowedTypes = ["image/jpg","image/jpeg","image/png"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("Invalid File type. only Jpeg, jpg, and png are allowed"),false)
    }

}
const upload = multer({
    storage:storage,
    limits: {fileSize: 5 * 1024 * 1024},//5mb max
    fileFilter:fileFilter
})

module.exports = upload;