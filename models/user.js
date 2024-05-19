const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  customProperties: [{
    title: String,
    value: String
  }],
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;