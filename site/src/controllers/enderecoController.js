var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res){
    var cep = req.body.cepServer;
    var logr = req.body.logrServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var uf = req.body.ufServer;

    // enderecoModel.buscarPorId()
}