const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const logs = require('./api/logs');

require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

// eslint-disable-next-line quotes
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/travel-log`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.use('/api/logs', logs);

// Error Handling
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://localhost:${port}`);
});
