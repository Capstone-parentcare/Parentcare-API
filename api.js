const express       = require('express');
const path          = require("path");
const fs            = require("fs");
const md5           = require("md5");
global.md5          =require("md5");
const cors        = require('cors');
require('dotenv').config();
var fileType        = require('./library/fileType');
var images          = path.join(__dirname, 'images');
var bodyParser    = require('body-parser')
const app         = express();
global.library = require('./library/library');
global.libraryAdmin = require('./library/libraryAdmin');
// parse application/json
app.use(bodyParser.json())
var checkUser    = require('./middleware/checkUser');

var upload       = require('./services/userUpload');
var getImage     = require('./services/getImage');
app.use(express.json());
app.use(cors());

const routes = require('./routes');

app.use('/api', routes)

app.post('/upload',upload)
app.get('/getImage',getImage)
app.get('/images/:file', (req, res) => {
  var file        = req.params.file;
  var extname     = path.extname(file);
  var targetfile = path.join(images, file);
  fs.readFile(targetfile, function(error, content) {
      res.writeHead(200, { 'Content-Type': fileType(extname.replace(".", "")) });
      res.end(content, 'utf-8');
  });
})

app.listen(process.env.PORT_API, () => {
  console.log(`ParentCare API listening on port ${process.env.PORT_API}`);
});