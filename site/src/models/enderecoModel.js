var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(cep, logr, numero, complemento, bairro, cidade, uf, empresaId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cep, logr, numero, complemento, bairro, cidade, uf, empresaId);

    var consultaIdUf = `SELECT idUF FROM unidadeFederativa WHERE sigla = '${uf}';`;

    console.log("Executando a instrução SQL para buscar id da Unidade Federativa: \n" + consultaIdUf);
    return database.executar(consultaIdUf).then(resultado => {

        var idUf = resultado[0].idUF;

        var instrucao = `
        INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, cep, idEmpresa, idUF) VALUES ('${logr}', '${numero}', '${complemento}', '${bairro}', '${cidade}','${cep}', '${empresaId}', '${idUf}');`;
        
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao); 
    });
}

module.exports = {
    cadastrar
};