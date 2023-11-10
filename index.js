import express from 'expresss';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || API_PORT;



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


