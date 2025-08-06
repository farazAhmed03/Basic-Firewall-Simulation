const mongoose = require('mongoose');


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);
const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB connected successfully');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = db;
