const { Questions }    = require('../models');
async function getQuestionById(req, res){
    const getQuestion = await Questions.findAll({where: {id:parseInt(req.params.id)}} ).then(function (result) {
            return result
    });
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getQuestion}));
}

module.exports = getQuestionById