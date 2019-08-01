const express = require("express");
const app = express();
const dbRoutes = require("./routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use("/db", dbRoutes);

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
