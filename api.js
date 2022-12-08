require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const md5 = require("md5");
global.md5 = require("md5");
const axios         = require('axios');
global.library = require('./library/library');
global.libraryAdmin = require('./library/libraryAdmin');

const checkUser = require('./middleware/checkUser');
const routes = require('./routes');

const app = express();

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/public', express.static('public'));
app.use('/api', routes);

app.listen(process.env.PORT_API, () => {
  console.log(`ParentCare API listening on port ${process.env.PORT_API}`);
});