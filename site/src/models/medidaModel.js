var database = require("../database/config");

function buscarUltimasMedidas(idLavoura, idQuadrante, limite_linhas) {

    instrucaoSql = `
    (select dataHora,valor,idTipo from registro where idTipo = 3 and idLavoura = ${idLavoura} and idQuadrante = ${idQuadrante} order by idRegistro desc limit ${limite_linhas}) union
    (select dataHora,valor,idTipo from registro where idTipo = 2 and idLavoura = ${idLavoura} and idQuadrante = ${idQuadrante} order by idRegistro desc limit ${limite_linhas}) union
    (select dataHora,valor,idTipo from registro where idTipo = 1 and idLavoura = ${idLavoura} and idQuadrante = ${idQuadrante} order by idRegistro desc limit ${limite_linhas});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasTeto(idLavoura, idQuadrante) {

    instrucaoSql = `
    select max(valor) as valor from registro where idTipo = 2 and idLavoura = ${idLavoura} and idQuadrante = ${idQuadrante} union
    select min(valor) from registro where idTipo = 2 and idLavoura = ${idLavoura} and idQuadrante = ${idQuadrante} union
    select max(valor) from registro where idTipo = 3 and idLavoura = ${idLavoura} and idQuadrante = ${idQuadrante} union
    select min(valor) from registro where idTipo = 3 and idLavoura = ${idLavoura} and idQuadrante = ${idQuadrante};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}
function buscarMedidasMapa() {

    instrucaoSql = `
    select * from registro where idTipo = 1 and idRegistro = (select max(idRegistro) from registro) order by dataHora desc;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idLavoura, idQuadrante) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select valor, dataHora, idTipo from registro where idRegistro = (select max(idRegistro) from registro) and idQuadrante = ${idQuadrante} and idLavoura = ${idLavoura} order by idTipo limit 3;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasTeto,
    buscarMedidasMapa
}
