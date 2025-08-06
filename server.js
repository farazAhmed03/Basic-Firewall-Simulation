const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

dotenv.config();
require('./config/db');


app.use(morgan('dev'));
const corsOptions = {
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://basic-firewall-simulation-frontend.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/firewall', require('./routes/firewallRoutes'));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
