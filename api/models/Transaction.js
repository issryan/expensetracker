const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: String,
  datetime: Date,
  description: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);
