const { Doctors } = require('../models');

const md5 = require('md5');

const doctorService = {
    post: async function (req, res){
        const { username, email, password } = req.body;
        const convertPassword = md5(password);
        const createDoctor = await Doctors.create({username, email, password:convertPassword}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Create Success",'', createDoctor);
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