var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idLavoura/:idQuadrante", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/medidasTeto/:idLavoura/:idQuadrante", function (req, res) {
    medidaController.buscarMedidasTeto(req, res);
});

router.get("/tempo-real/:idLavoura", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;