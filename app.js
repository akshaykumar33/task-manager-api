// app.js
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const errorHandler = require('./middlewares/error.middleware');

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req,res)=>{
  res.send('Health Checkup API Connected');
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);


app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found'
    }
  });
});

module.exports = app;

