var Media = require('../library/Media.js');
var path = require ('path')
async function getImage(req, res){
    var images = (typeof req.query.images != undefined && req.query.images != "")? req.query.images: "";
    var width = (typeof req.query.width != undefined && req.query.width != "")? req.query.width: 0;
    var height = (typeof req.query.height != undefined && req.query.height != "")? req.query.height: 0;
    var extImage = path.extname(process.env.IMAGES_DIRECTORY + images);
    const stream = await Media(process.env.IMAGES_DIRECTORY + images, extImage.replace(".",""), parseInt(width), parseInt(height));
    res.setHeader("Content-Type", 'image/'+ extImage.replace(".",""));    
    res.writeHead(200);
    stream.pipe(res);
}

module.exports = getImage