const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".png" &&
            ext !== ".pdf"
        ) {
            return cb(new Error("Apenas imagens (JPG, JPEG, PNG) ou PDF são permitidos"));
        }
        cb(null, true);
    }
});

module.exports = upload.fields([
    { name: 'profile_photo', maxCount: 1 },
    { name: 'baptismal_certificate', maxCount: 1 },
    { name: 'certificate_first_communion', maxCount: 1 },
    { name: 'rg', maxCount: 1 }
]);
