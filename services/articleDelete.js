const { Articles }    = require('../models');
async function questionDelete(req, res){
    const deleteQuestion = await Articles.destroy({where: {id: parseInt(req.params.id)}}).then(function (result) {
            return result
    });
    library.response(res, "Success", "Delete Success",'', deleteQuestion);
}

module.exports = questionDelete