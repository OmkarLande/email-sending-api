const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listController');

router.post('/', listsController.createList)
router.post('/:listId/send-email', listsController.sendEmailToList);

module.exports = router;
