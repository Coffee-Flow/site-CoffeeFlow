var lavouraModel = require("../models/lavouraModel");


function cadastrar(req, res){
    
    var empresa = req.body.empresaServer
    var endereco = req.body.enderecoServer
    var nomeLavoura = req.body.nomeServer
    var areaha = req.body.areaServer
    var tipoCafe = req.body.cafeServer

    if (empresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (nomeLavoura == undefined) {
        res.status(400).send("Seu nome da lavoura está undefined!");
    } else if (areaha == undefined) {
        res.status(400).send("A área está undefined!");
    } else if (tipoCafe == undefined) {
        res.status(400).send("Seu café está undefined!");
    } else {
    // enderecoModel.buscarPorId()
    lavouraModel.cadastrar(nomeLavoura,tipoCafe,areaha,endereco,empresa)
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