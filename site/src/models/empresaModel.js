var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(nomeEmpresa, razaoSocial, cnpj, email, tel) {
  var query = `insert into empresa (cnpj, nomeEmpresa, razaoSocial, emailEmpresa, telefoneEmpresa) values ('${cnpj}', '${nomeEmpresa}', '${razaoSocial}', '${email}', '${tel}')`;

  return database.executar(query);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
