const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbURl = require("./config/db");
//DB Connection
mongoose
  .connect(dbURl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((ex) => {
    console.log("Error in Connecting DB", ex);
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes

//PORT
const port = process.env.PORT || 8001;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
