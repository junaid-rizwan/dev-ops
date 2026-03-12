require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoute = require('./routes/taskRoute');
const { default: mongoose } = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('mongo connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use('/tasks', taskRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
