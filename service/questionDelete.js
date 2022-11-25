const { Questions }    = require('../models');
async function carGet(req, res){
    const deleteQuestion = await Questions.destroy({where: {id: parseInt(req.params.id)}}).then(function (result) {
        return result
    });
    library.response(res, "Success", "Delete Success",'', deleteQuestion);
}

module.exports = carGet