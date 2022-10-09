const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" + process.env.DB_USER_PASS +"@cluster0.bc8cc7b.mongodb.net/social-project",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Failed to connect to MongoDb", err));
