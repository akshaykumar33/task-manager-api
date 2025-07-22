// tests/teardown.js
const mongoose = require('mongoose');

module.exports = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
};
