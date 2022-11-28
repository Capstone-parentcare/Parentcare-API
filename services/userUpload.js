var multiparty = require('multiparty');
const randomstring	= require("randomstring");
const path 			= require('path');
const fs 			= require('fs');
async function userUpload(req, res){
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var ext             = path.extname(files.file[0].originalFilename);
        var objExt          = ext.split(".")
        console.log("ext", objExt[objExt.length - 1]);
        var filename        = randomstring.generate(6);
        var readerStream    = fs.createReadStream(files.file[0].path);
        var dest_file       = path.join(process.env.IMAGES_DIRECTORY, filename + "." + objExt[objExt.length - 1]);
        console.log("dest_file", dest_file);
        var writerStream    = fs.createWriteStream(dest_file);
        readerStream.pipe(writerStream);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"Upload Success ", data: files}));
    });
    
}

module.exports = userUpload