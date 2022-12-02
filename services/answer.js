const { Answers, Questions, Doctors } = require('../models');

const answerService = {
    post: async function (req, res){
        const { question_id, doctor_id, content } = req.body;
        const createAnswer = await Answers.create({question_id, doctor_id, content}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Create Success",'', createAnswer);
    },

    get: async function (req, res){
        const getAnswer = await Answers.findAll().then(function (result) {
            return result
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getAnswer}));
    },

    detail: async function (req, res){
        const { id } = req.params;
        const getAnswer = await Answers.findOne({where: {id: id}}).then(function (result) {
            return result
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"Detail Success ", data: getAnswer}));
    },

    getByQuestionId: async function (req, res){
        const { question_id } = req.params;
        // get answer using question_id then find doctor and question using doctor_id and question_id
        const getAnswer = await Answers.findAll(
            {where: {question_id: question_id},
            include: [
                {model: Doctors, as: 'doctor'},
                {model: Questions, as: 'question'}
            ]
        }).then(function (result) {
            return result
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getAnswer}));
    },
    
    edit: async function (req, res){
        const { question_id, doctor_id, content } = req.body;
        const editAnswer = await Answers.update({question_id, doctor_id, content}, {where: {id: parseInt(req.params.id)}}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Edit Success",'', editAnswer);
    },

    delete: async function (req, res){
        const deleteAnswer = await Answers.destroy({where: {id: parseInt(req.params.id)}}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Delete Success",'', deleteAnswer);
    }
}

module.exports = answerService;