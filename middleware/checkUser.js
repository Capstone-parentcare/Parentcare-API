const {Doctors}         = require('../models/doctors');
var authorization  = require('../library/library');
module.exports =async function checkUser(req, res, next) {
    let auth    = req.headers["authorization"];
    if(auth){
        try{
            let token   = auth.slice(7);
            var tokenVerif = authorization.verifyJWT(token);
            console.log("Gmail:", tokenVerif.username);
            console.log("Token Verif:", tokenVerif);
            const doctor    = await Doctors.findAll({where: {email:req.query.email, password:md5(req.query.password)}}).then(function (result) {
                return result;
            });
            if(doctor != null){
                next();
            }else{
                res.setHeader("Content-Type", "application/json");
                res.writeHead(404);
                res.end(JSON.stringify({status: "204", message: "Failed", display_message:"Gmail Not Found ", data: ""}));
            }
        }catch(err){
            res.setHeader("Content-Type", "application/json");
            res.writeHead(404);
            res.end(JSON.stringify({status: "204", message: "Failed", display_message:err, data: ""}));
        }

    }else{
        res.setHeader("Content-Type", "application/json");
        res.writeHead(404);
        res.end(JSON.stringify({status: "204", message: "Failed", display_message:"Token Required ", data: ""}));
    }
  };