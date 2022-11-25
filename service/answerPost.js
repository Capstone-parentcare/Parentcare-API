const { Answers }    = require("../models");


async function answersPost(req, res){
    console.log("req body", req.body)
    var answersPost = await Answers.create({
        question_id: req.body.question_id,
        doctor_id: req.body.doctor_id,
        content: req.body.content,
        
    }).then(Answers => {
        return Answers;
    })
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({message: "Success", display_message:"Create Success ", data: answersPost}));
}

module.exports = answersPost