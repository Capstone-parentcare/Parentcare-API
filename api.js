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
var index         = require('./service/index');
var checkUser    = require('./middleware/chekUser');
var loginDoctor    = require('./service/loginDoctor');
var doctorPost      = require('./service/doctorPost');
var getDoctor       =  require('./service/doctorGet');
var questionPost   = require('./service/questionPost');
var questionGet  = require('./service/questionGet');
var questionGetById  = require('./service/questionGetById');
var questionDelete   = require('./service/questionDelete');
var articlesPost   = require('./service/articlePost');
var articleGet   = require('./service/articleGet');
var articleGetDetail   = require('./service/articleDetail');
var articleDelete   = require('./service/articleDelete');
var answerPost  =  require('./service/answerPost');
var answersGet  =  require('./service/answerGet');
var upload       = require('./service/userUpload');
var getImage     = require('./service/getImage');
app.use(express.json());
app.use(cors());
app.get('/', index)
app.get('/loginAdmin', loginDoctor)
app.post('/doctor',doctorPost)
app.post('/doctorPost',doctorPost)
app.get('/doctor',getDoctor)
app.post('/addQuestion', questionPost)
app.get('/question', questionGet)
app.get('/question/:id', questionGetById)
app.delete('/question/:id', questionDelete)
app.post('/addArticle',articlesPost)
app.get('/articles',articleGet)
app.get('/articles/:id',articleGetDetail)
app.delete('/articles/:id',articleDelete)
app.get('/answer',answersGet)
app.post('/addAnswer', answerPost)
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
  console.log(`Example app listening on port ${process.env.PORT_API}`)
})