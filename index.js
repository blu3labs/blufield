const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {client} = require("./config/client");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//services
const {pushImage, createUser} = require("./services/userServices");

app.post("/img", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const response = await pushImage(file,client);
  res.json(response);
});

const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
