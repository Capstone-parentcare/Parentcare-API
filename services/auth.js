const { Doctors }    = require('../models');
const md5 = require('md5');
const { response } = require('express');
const saltRounds = 10;


async function loginDoctor(req, res){
    console.log("req.params", req.query);
    const doctor    = await Doctors.findAll({where: {email:req.query.email, password:md5(req.query.password)}}).then(function (result) {
        return result;
    });
    if(doctor != ''){
        library.response(res, "Success", "Login Success", library.generateJWT(req.query.email, req.query.password), doctor);
    }else{
        library.response(res, "Failed", "Login Failed", []);
    }
    
}

module.exports = {
    loginDoctor
};