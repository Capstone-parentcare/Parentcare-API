var multiparty = require('multiparty');
const randomstring	= require("randomstring");
const path 			= require('path');
const fs 			= require('fs');
const { Articles }    = require('../models');

async function articlesPost(req, res){
    console.log("req body", req.body)
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var ext             = path.extname(files.image[0].originalFilename);
        var objExt          = ext.split(".")
        var filename        = randomstring.generate(6);
        var readerStream    = fs.createReadStream(files.image[0].path);
        var dest_file       = path.join(process.env.IMAGES_DIRECTORY, filename + "." + objExt[objExt.length - 1]);
        var writerStream    = fs.createWriteStream(dest_file);
        readerStream.pipe(writerStream);
        var articlesCreate = await Articles.create({
            doctor_id: fields.doctor_id[0],
            title: fields.title[0],
            content: fields.content[0],
            image: filename + "." + objExt[objExt.length - 1]
        }).then(Articles => {
            return Articles;
        })
        library.response(res, "Success", "Create Success",'', articlesCreate);
    });
}
module.exports = articlesPost