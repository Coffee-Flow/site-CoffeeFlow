var express = require("express");
var router = express.Router();

var lavouraController = require("../controllers/lavouraController");

router.post("/cadastrar", function (req, res) {
    lavouraController.cadastrar(req, res);
})

module.exports = router;