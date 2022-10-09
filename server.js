const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path:'./config/.env'});
require('./config/db');

app.use('/api/user', userRoutes);


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
})

 