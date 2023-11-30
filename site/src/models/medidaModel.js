var database = require("../database/config");

function buscarUltimasMedidas(idLavoura, idQuadrante, limite_linhas) {

    instrucaoSql = `
    select registroTempExt.valor as tempExt, registroUmi.valor as umidade, registroTempInt.valor as tempInt, DATE_FORMAT(registroUmi.dataHora,'%H:%i:%s') as momento from lavoura 
    left join registro as registroTempExt on registroTempExt.idLavoura = lavoura.idLavoura and registroTempExt.idTipo = 3
    left join registro as registroUmi on registroUmi.idLavoura = lavoura.idLavoura and registroUmi.idTipo = 2
    left join registro as registroTempInt on registroTempInt.idLavoura = lavoura.idLavoura and registroTempInt.idTipo = 1
    left join sensor on sensor.idLavoura = lavoura.idLavoura
    where lavoura.idLavoura = ${idLavoura} and sensor.idQuadrante = ${idQuadrante} order by momento limit ${limite_linhas}
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasTeto(idLavoura, idQuadrante) {

    instrucaoSql = `
    select max(registroTempExt.valor) as maxTempExt, min(registroTempExt.valor) as minTempExt,
    max(registroUmi.valor) as maxUmidade, min(registroTempInt.valor) as minUmidade from lavoura 
    left join registro as registroTempExt on registroTempExt.idLavoura = lavoura.idLavoura and registroTempExt.idTipo = 3
    left join registro as registroUmi on registroUmi.idLavoura = lavoura.idLavoura and registroUmi.idTipo = 2
    left join registro as registroTempInt on registroTempInt.idLavoura = lavoura.idLavoura and registroTempInt.idTipo = 1
    left join sensor on sensor.idLavoura = lavoura.idLavoura
    where lavoura.idLavoura = ${idLavoura} and sensor.idQuadrante = ${idQuadrante};
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
        instrucaoSql = `select r.valor, r.idTipo, DATE_FORMAT(r.dataHora,'%H:%i:%s') as momento, r.idLavoura, r.idQuadrante from sensor s
        join registro r on s.idQuadrante = r.idQuadrante and s.idTipo = r.idTipo
        where s.idLavoura = ${idLavoura} and r.idQuadrante = ${idQuadrante} order by idRegistro desc limit 3;`;
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
    buscarMedidasTeto
}
