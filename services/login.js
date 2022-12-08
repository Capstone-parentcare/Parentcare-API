
const { Doctors } = require('../models');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const doctorService = {
    post: async function (req, res){
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        
        const createDoctor = await Doctors.create({username, email, password:hashedPassword}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Create Success",'', createDoctor);
    },
    login: async function (req,res){
        console.log("req.params", req.query);
        const doctor    = await Doctors.findAll({where: {email:req.query.email, password:bcrypt.hashSync(req.query.password)}}).then(function (result) {
            return result;
        });
        if(doctor != ''){
            library.response(res, "Success", "Login Success",'', library.generateJWT(req.query.email, req.query.password));
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