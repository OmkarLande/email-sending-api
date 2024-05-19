const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/upload/:listId', upload.single('csvFile'), usersController.uploadUsers);
router.get('/:listId', usersController.getUsersByListId);

module.exports = router;
