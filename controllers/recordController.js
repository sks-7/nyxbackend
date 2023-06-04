const express = require('express');
const { RecordModel } = require('../models/record');
const recordController = express.Router();

recordController.get('/', async (req, res) => {
  try {
    const recordList = await RecordModel.find();
    return res.status(200).send(recordList);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

recordController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const singleRecord = await RecordModel.findOne({ _id: id });
  res.send(singleRecord);
});

recordController.post('/post', async (req, res) => {
  try {
    const newRecord = await RecordModel.create(req.body);
    return res
      .status(200)
      .send({ message: 'newRecord added successfully', newRecord });
  } catch (err) {
    return res.status(500).send('newRecord added failed');
  }
});

recordController.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateRecord = await RecordModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).send({ message: 'Reacord Updated', updateRecord });
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
});

recordController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await RecordModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: ' Record Deleted successfully' });
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
});

module.exports = { recordController };
