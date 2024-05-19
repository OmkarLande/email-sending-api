const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  customProperties: [{
    title: String,
    defaultValue: String
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const List = mongoose.model('List', listSchema);
module.exports = List;