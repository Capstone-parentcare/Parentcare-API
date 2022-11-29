const { Articles } = require('../models');

var multiparty = require('multiparty');
const randomstring	= require("randomstring");
const path 			= require('path');
const fs 			= require('fs');

const ArticleService = {
    post: async (req, res) => {
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
    },

    get: async (req, res) => {
        const getArticles = await Articles.findAll().then(function (result) {
                return result
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getArticles}));
    },

    detail: async (req, res) => {
        const getArticles = await Articles.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            return result
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"Detail Success ", data: getArticles}));
    },

    put: async (req, res) => {
        var form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            var ext             = path.extname(files.image[0].originalFilename);
            var objExt          = ext.split(".")
            var filename        = randomstring.generate(6);
            var readerStream    = fs.createReadStream(files.image[0].path);
            var dest_file       = path.join(process.env.IMAGES_DIRECTORY, filename + "." + objExt[objExt.length - 1]);
            var writerStream    = fs.createWriteStream(dest_file);
            readerStream.pipe(writerStream);
            const updateArticles = await Articles.update({
                doctor_id: fields.doctor_id[0],
                title: fields.title[0],
                content: fields.content[0],
                image: filename + "." + objExt[objExt.length - 1]
            }, {
                where: {
                    id: req.params.id
                }
            }).then(function (result) {
                return result
            });
            library.response(res, "Success", "Update Success",'', updateArticles);
        });
    },

    delete: async (req, res) => {
        const getArticles = await Articles.destroy({ where: { id: req.params.id }}).then(function (result) {
            return result
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"Delete Success ", data: getArticles}));
    }    
}

module.exports = ArticleService;