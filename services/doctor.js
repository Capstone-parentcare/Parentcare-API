const { Doctors } = require('../models');

const bcrypt = require('bcrypt');
const md5 = require('md5');
const saltRounds = 10;

const doctorService = {
    post: async function (req, res){
        const { username, email, password } = req.body;
        const convertPassword = md5(password);
        const createDoctor = await Doctors.create({username, email, password:convertPassword}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Create Success",'', createDoctor);
    },
    login: async function (req,res){
        console.log("req.params", req.body);
        const doctor    = await Doctors.findAll({where: {email:req.body.email, password:md5(req.body.password)}}).then(function (result) {
            return result;
        });
        if(doctor != ''){
            library.response(res, "Success", "Login Success",'', library.generateJWT(req.body.email, req.body.password));
        }else{
            library.response(res, "Failed", "Login Failed", []);
        }
    },
    get: async function (req, res){
        const getDoctor = await Doctors.findAll().then(function (result) {
            return result
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getDoctor}));
    },

    detail: async function (req, res){
        const getDoctor = await Doctors.findOne({where: {id: parseInt(req.params.id)}}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Detail Success",'', getDoctor);
    },

    delete: async function (req, res){
        const deleteDoctor = await Doctors.destroy({where: {id: parseInt(req.params.id)}}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Delete Success",'', deleteDoctor);
    }
}

module.exports = doctorService;