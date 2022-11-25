const { Doctors }    = require('../models');
async function doctorsGet(req, res){
    const getDoctors = await Doctors.findAll().then(function (result) {
            return result
    });
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({message: "Success", display_message:"List Success ", data: getDoctors}));
}

module.exports = doctorsGet