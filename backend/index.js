const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { client } = require("./config/client");
const { getCheckSums } = require("@bnb-chain/greenfiled-file-handle");

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
const {
  pushImage,
  createUser,
  getUser,
  getAllUser,
  updateUser,
} = require("./services/userServices");

async function checkBucket() {
  try {
    if (!process.env.BUCKET_NAME) {
      await createBucket(client);
    }
  } catch (error) {
    console.log(error);
  }
}

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

app.put("/user", async (req, res) => {
  const user = req.body;
  const response = await updateUser(user, client);
  res.status(response.status).json(response);
});

app.get("/checksum", async (req, res) => {
  const data = req.body;
  const { expectCheckSums, contentLength } = await getCheckSums(filedata);
  return {
    expectCheckSums : expectCheckSums,
    contentLength : contentLength,
  };
});

const port = process.env.PORT || API_PORT;

checkBucket();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
