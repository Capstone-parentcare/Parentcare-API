const { Answers }    = require('../models');
async function articleGet(req, res){
    const getAnswers = await Answers.findAll().then(function (result) {
            return result
    });
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getAnswers}));
}

module.exports = articleGet