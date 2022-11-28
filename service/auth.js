const { Doctors }    = require('../models');
async function loginDoctor(req, res){
    const admin    = await Doctors.authenticate(req.body.email, req.body.password);
    if(admin != ''){
        library.response(res, "Success", "Login Success",'', library.generateJWT(req.body.username, req.body.password));
    }else{
        library.response(res, "Failed", "Login Failed", []);
    }
}

module.exports = {
    loginDoctor
};