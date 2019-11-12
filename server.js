const express = require("express");
const config = require("config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Init App
const server = express();

// DB Config
mongoose
  .connect(config.get("mongoURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
server.use("/api/start", require("./api/Start"));


// Config
server.listen(config.get("port"), () => console.log("server process runing", `${config.get("port")}`));

