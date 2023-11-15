var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res){
    var cep = req.body.cepServer;
    var logr = req.body.logrServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var uf = req.body.ufServer;
    var empresaId = req.body.empresaServer;

    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (logr == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (uf == undefined) {
        res.status(400).send("Seu uf está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {
    // enderecoModel.buscarPorId()
    enderecoModel.cadastrar(cep, logr, numero, complemento, bairro, cidade, uf, empresaId)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}


module.exports = {
    cadastrar
}