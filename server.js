const express = require('express');
const app = express();
require('dotenv').config({path:'./config/.env'});
require('./config/db');

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
})

 