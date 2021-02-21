const mongoose = require("mongoose");

let mongoURL = process.env.MONGO_URL;
let dbName = process.env.MONGO_DATABASE;

mongoose.connect(`${mongoURL}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
