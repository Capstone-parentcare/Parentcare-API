function index(req, res){
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({tes: "HALLOO"}));
}

module.exports = index