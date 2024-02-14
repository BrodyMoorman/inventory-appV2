import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/public/fileuploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const uploads = multer({ storage: storage });
router.post('/', uploads.single('file'), (req, res) => {
    console.log(req.file);
    res.send({filename: req.file.filename});
});


export default router;