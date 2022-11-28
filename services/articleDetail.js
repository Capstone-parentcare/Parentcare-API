const { Articles }    = require('../models');
async function articleGetDetail(req, res){
    const getArticles = await Articles.findAll({where: {id:parseInt(req.params.id)}} ).then(function (result) {
        return result
});
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getArticles}));
}

module.exports = articleGetDetail