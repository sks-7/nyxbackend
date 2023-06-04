const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
});

const RecordModel = mongoose.model('RecordModel', recordSchema);

module.exports = { RecordModel };
