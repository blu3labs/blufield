const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { client } = require("./config/client");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
