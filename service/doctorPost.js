const { Doctors }    = require("../models");


async function doctorPost(req, res){
    console.log("req body", req.body)
    var userCreate = await Doctors.create({
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password),
        
    }).then(Doctors => {
        return Doctors;
    })
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({message: "Success", display_message:"Create Success ", data: userCreate}));
}

module.exports = doctorPost