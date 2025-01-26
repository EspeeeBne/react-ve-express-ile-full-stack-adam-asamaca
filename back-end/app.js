require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/games');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const allowedOrigins = ['http://localhost:3000'];
  app.use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        const msg = 'Bu CORS politikası tarafından izin verilmeyen bir origin: ' + origin;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
  }));
} else {
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
