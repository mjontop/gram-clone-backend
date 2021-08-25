const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dbURl = require("./config/db");

//Routes Import
const authRoutes = require("./routes/authRoute");
const postRoutes = require("./routes/postRoute");
const connectionRoute = require("./routes/connectionRoute");

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
app.use(cors());
app.use("/api/user/", authRoutes);
app.use("/api/post/", postRoutes);
app.use("/api/connections/", connectionRoute);

//My Routes

//PORT
const port = process.env.PORT || 8001;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
