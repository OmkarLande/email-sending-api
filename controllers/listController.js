const List = require('../models/list');
const User = require('../models/user');
const { sendEmail } = require('../services/emailService');

exports.createList = async (req, res) => {
  try {
    const { title, customProperties } = req.body;
    if (!title) {
      return res.status(402).json({ message: 'Title is required' });
    }

    if (!customProperties || !Array.isArray(customProperties)) {
      return res.status(402).json({ message: 'Custom properties must be provided as an array' });
    }

    const newList = new List({title, customProperties});

    await newList.save();
    res.status(201).json(newList);

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    } else {
      return res.status(500).json({ message: 'Internal Server Error ' + error.message });
    }
  }
};


exports.sendEmailToList = async (req, res) => {
  try {
    const listId = req.params.listId;

    const list = await List.findById(listId).populate('users');
    if (!list) {
      return res.status(402).json({ message: 'List not found' });
    }

    const users = [];
    for (const userId of list.users) {
      const user = await User.findById(userId);
      if (user) {
        users.push(user);
      }
    }

    for (const user of users) {
      await sendEmail(user);
    }

    const emailsSent = users.map(user => user.email);


    res.status(200).json({ message: 'Emails sent successfully', emailsSent });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
