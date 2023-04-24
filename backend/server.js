const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();// Bodyparser middleware
mongoose.set('strictQuery', true)
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());// DB Config
app.use(cors());

const db = require("./config/keys").mongoURI;// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

const users = require("./routes/api/users");
app.use("/api/users", users);

const profiles = require("./routes/api/profiles");
app.use("/api/profiles", profiles);

const followers = require("./routes/api/followers");
app.use("/api/followers", followers);

const subs = require("./routes/api/subs");
app.use("/api/subs", subs);