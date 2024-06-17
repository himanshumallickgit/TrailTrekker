// api/campgrounds.js
const mongoose = require('mongoose');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  const db = await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = db;
  return db;
};

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    const campgrounds = await Campground.find({});
    return res.status(200).json(campgrounds);
  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
