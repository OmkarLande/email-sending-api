const User = require('../models/user');
const List = require('../models/list');
const csvParser = require('csv-parser');
const fs = require('fs');
const { sendEmail } = require('../services/emailService');

exports.uploadUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(402).json({ message: 'CSV file is required' });
    }
    const list = await List.findById(req.params.listId);
    if (!list) {
      return res.status(402).json({ message: 'List not found' });
    }
    const users = [];

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', async (row) => {
        try {
          const email = row.email.trim().toLowerCase(); 

          if (!email) {
            console.log('Skipping row with empty email field');
            return;
          }

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            console.log(`User with email ${email} already exists, skipping...`);
            console.log('User:', existingUser);
            return;
          }

          const newUser = new User({
            name: row.name,
            email,
            customProperties: row.customProperties ? JSON.parse(row.customProperties) : [],
            list: req.params.listId
          });

          const validationError = newUser.validateSync();
          if (validationError) {
            console.error('Validation error:', validationError.message);
            return;
          }

          await newUser.save();
          users.push(newUser);
          list.users.push(newUser._id);
          await list.save();
          await sendEmail(newUser);

        } catch (error) {
          console.error('Error creating user:', error.message);
        }
      })
      .on('end', () => {
        res.status(200).json({ message: 'Users uploaded successfully'});
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getUsersByListId = async (req, res) => {
  try {
    const listId = req.params.listId;

    const list = await List.findById(listId);
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

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


