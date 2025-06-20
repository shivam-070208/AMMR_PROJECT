const multer = require('multer');


const storage = multer.memoryStorage();

// File filter to allow only image uploads
const fileHandler = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};


const uploader = multer({ storage: storage, fileFilter: fileHandler });

module.exports = uploader;