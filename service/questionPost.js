const { Questions }    = require("../models");


async function doctorPost(req, res){
    console.log("req body", req.body)
    var questionCreate = await Questions.create({
        writer: req.body.writer,
        title: req.body.title,
        content: req.body.content,
        
    }).then(Questions => {
        return Questions;
    })
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({message: "Success", display_message:"Create Success ", data: questionCreate}));
}

module.exports = doctorPost