const express = require('express');
const app = express();
const cors = require('cors');
const { connection } = require('./db/connection');
const { recordController } = require('./controllers/recordController');

const port = process.env.PORT || 8080;
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome my server');
});

app.use('/api/record', recordController);

app.listen(port, async () => {
  try {
    await connection;
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
    console.log('Not connected');
  }
  console.log(`Listning at PORT ${port}`);
});
