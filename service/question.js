const { Questions }    = require('../models');
const questionService = {
    post: async function (req, res){
        const { title, writer, content } = req.body;
        const createQuestion = await Questions.create({title, writer, content}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Create Success",'', createQuestion);
    },

    get: async function (req, res){
        const getQuestion = await Questions.findAll().then(function (result) {
                return result
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getQuestion}));
    },

    detail: async function (req, res){
        const getQuestion = await Questions.findOne({where: {id: parseInt(req.params.id)}}).then(function (result) {
                return result
        });
        library.response(res, "Success", "Detail Success",'', getQuestion);
    },

    delete: async function (req, res){
        const deleteQuestion = await Questions.destroy({where: {id: parseInt(req.params.id)}}).then(function (result) {
            return result
        });
        library.response(res, "Success", "Delete Success",'', deleteQuestion);
    }
}


module.exports = questionService;