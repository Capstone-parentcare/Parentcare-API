const { Doctors }    = require('../models');
async function loginDoctor(req, res){
    console.log("req.params", req.query);
    const admin    = await Doctors.findAll({where: {email:req.query.email, password:md5(req.query.password)}}).then(function (result) {
        return result;
    });
    if(admin != ''){
        library.response(res, "Success", "Login Success",'', library.generateJWT(req.query.username, req.query.password));
    }else{
        library.response(res, "Failed", "Login Failed", []);
    }
}

module.exports = loginDoctor