const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { client } = require("./config/client");
const { createBucket } = require("./config/createBucket");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
//services
const { pushImage, createUser, getUser,getAllUser } = require("./services/userServices");

async function checkBucket() {
  try {
    if (!process.env.BUCKET_NAME) {
      await createBucket(client);
    }
  } catch (error) {
    console.log(error);
  }
}

checkBucket();

app.post("/img", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const response = await pushImage(file, client);
  res.json(response);
});

app.post("/user", async (req, res) => {
  const body = req.body;
  const response = await createUser(body, client);
  console.log(response);
  res.status(response.status).json(response);
});

app.get("/user", async (req, res) => {
  const response = await getAllUser(client);
  res.status(response.status).json(response);
});


app.get("/user/:name", async (req, res) => {
  const name = req.params.name;
  const response = await getUser(name, client);
  res.status(response.status).json(response);
});


const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
