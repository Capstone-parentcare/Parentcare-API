const fs = require('fs');
const path = require ('path');
const multiparty = require('multiparty');
const randomstring	= require("randomstring");
const images = path.join(__dirname, 'images');

const Media = require('../library/Media.js');
const fileType = require('../library/fileType');
global.library = require('../library/library');
global.libraryAdmin = require('../library/libraryAdmin');

const fileService = {
    getImage: async (req, res) => {
        const images = (typeof req.query.images != undefined && req.query.images != "")? req.query.images: "";
        const width = (typeof req.query.width != undefined && req.query.width != "")? req.query.width: 0;
        const height = (typeof req.query.height != undefined && req.query.height != "")? req.query.height: 0;
        const extImage = path.extname(process.env.IMAGES_DIRECTORY + images);
        const stream = await Media(process.env.IMAGES_DIRECTORY + images, extImage.replace(".",""), parseInt(width), parseInt(height));
        res.setHeader("Content-Type", 'image/'+ extImage.replace(".",""));    
        res.writeHead(200);
        stream.pipe(res);
    },

    getImageByParams: async (req, res) => {
        var file = req.params.file;
        var extname = path.extname(file);
        var targetfile = path.join(images, file);
        fs.readFile(targetfile, function(error, content) {
            res.writeHead(200, { 'Content-Type': fileType(extname.replace(".", "")) });
            res.end(content, 'utf-8');
        });
    },

    userUpload: async (req, res) => {
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var ext = path.extname(files.file[0].originalFilename);
            var objExt = ext.split(".")
            console.log("ext", objExt[objExt.length - 1]);
            var filename = randomstring.generate(6);
            var readerStream = fs.createReadStream(files.file[0].path);
            var dest_file = path.join(process.env.IMAGES_DIRECTORY, filename + "." + objExt[objExt.length - 1]);
            console.log("dest_file", dest_file);
            var writerStream = fs.createWriteStream(dest_file);
            readerStream.pipe(writerStream);
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify({message: "Success", display_message:"Upload Success ", data: files}));
        });
    }
}

module.exports = fileService;