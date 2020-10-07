const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  dotenv = require('dotenv').config();

const users = require('./routes/api/users');

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = process.env.DATABASEURL;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connect to DB').catch((err) => console.log(err)));

//pasport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//Routes
app.use('/', users);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server up on http://localhost:${port}`));
