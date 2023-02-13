const mongoose = require("mongoose");
require('dotenv').config()

const connectToDb = () => {
  mongoose
    .connect(
      process.env.PRIVATE_KEY,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("MongoDb conectado");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDb;
