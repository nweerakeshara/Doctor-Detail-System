const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const keyConfig = require("./config/key");
const cors = require("cors");

mongoose
  .connect(keyConfig.mongoDBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/api/emp", require("./routes/emp"));
app.use("/api/doc", require("./routes/doc"));





app.get("/", (req, res) => {
  res.send("Running ");
  //default to check
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on Port - ${port}`);
  //server running on port 5000, if it is already in use different port will be selected
});
