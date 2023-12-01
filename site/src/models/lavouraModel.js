var database = require("../database/config");

function cadastrar(nome,cafe,area,endereco,empresa) {

    var instrucao = `
    INSERT INTO lavoura (nome, idCafe, areaha, idEndereco, idEmpresa) VALUES ('${nome}', '${cafe}', '${area}', ${endereco}, ${empresa});`;
        
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao); 

}

module.exports = {
    cadastrar
};