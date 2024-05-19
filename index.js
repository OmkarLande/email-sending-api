const express = require('express');
const mongoose = require('mongoose');
const listsRouter = require('./routes/lists');
const usersRouter = require('./routes/users');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/lists', listsRouter);
app.use('/users', usersRouter); 
app.use('/', (req, res) => {
  res.send('Welcome to the User List Management API');
  res.send('Please use postman doucment to test the API', 'https://documenter.getpostman.com/view/26807468/2sA3QmCuEY');
});

mongoose.connect((process.env.DB_URL || 'mongodb://localhost:27017/user-list-management'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => console.error('Error connecting to MongoDB:', err.message));
