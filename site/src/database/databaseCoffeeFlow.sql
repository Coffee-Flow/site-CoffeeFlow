create database coffeeflow;

use coffeeflow;

create table unidadeFederativa(
	idUF int primary key,
    sigla char(2),
    nome varchar(45)
);

create table empresa(
	idEmpresa int primary key auto_increment,
    cnpj char(18),
    nomeEmpresa varchar(45),
    razaoSocial varchar(70),
    emailEmpresa varchar(45),
    telefoneEmpresa varchar(14)
) auto_increment = 1000;

create table endereco(
	idEndereco int auto_increment,
    logradouro varchar(45),
    numero int,
    complemento varchar(45),
    bairro varchar(45),
    cidade varchar(45),
    cep char(9),
    idEmpresa int,
    idUF int,
    primary key(idEndereco, idEmpresa),
	foreign key (idUF) references unidadeFederativa(idUF),
    foreign key (idEmpresa) references empresa(idEmpresa)
);

create table usuario(
	idUsuario int auto_increment,
    emailUsuario varchar(45),
    nomeUsuario varchar(45),
    cpf char(14),
    senha varchar(45),
    nivel tinyint,
    idEmpresa int,
    idEndereco int,
    foreign key (idEmpresa) references empresa(idEmpresa),
    foreign key (idEndereco) references endereco(idEndereco),
    primary key (idUsuario, idEmpresa, idEndereco)
);

create table lavoura(
	idLavoura int primary key auto_increment,
    nome varchar(45),
    idCafe int,
    areaha float,
    idEndereco int,
    idEmpresa int,
    foreign key (idEndereco) references endereco(idEndereco),
    foreign key (idEmpresa) references endereco(idEmpresa)
);

create table tipoCafe(
	idCafe int primary key auto_increment,
    nome varchar(45),
    tempExtBaixa DECIMAL(4,2),
	tempAlertBaixa DECIMAL(4,2),
    tempAlertAlta DECIMAL(4,2),
    tempExtAlta DECIMAL(4,2),
    umidExtBaixa DECIMAL(4,2),
    umidAlertBaixa DECIMAL(4,2),
    umidAlertAlta DECIMAL(4,2),
    umidExtAlta DECIMAL(4,2)
);

create table tipo(
	idTipo int primary key auto_increment,
    descTipo varchar(45),
    unidadeMedida varchar(2)
);

create table quadrante(
	idQuadrante int primary key auto_increment,
    x int,
    y int
);

create table sensor(
	idLavoura int,
    idQuadrante int,
    idTipo int,
    situacao varchar(10),
    primary key(idLavoura, idQuadrante, idTipo),
    foreign key (idLavoura) references lavoura(idLavoura),
    foreign key (idQuadrante) references quadrante(idQuadrante),
    foreign key (idTipo) references tipo(idTipo),
    check (situacao = 'ativo' or situacao = 'inativo')
);

create table registro(
	idRegistro int auto_increment,
    idLavoura int,
    idQuadrante int,
    idTipo int,
    valor decimal(5,2),
    dataHora datetime,
    primary key(idRegistro, idLavoura, idQuadrante, idTipo),
	foreign key (idLavoura) references sensor(idLavoura),
    foreign key (idQuadrante) references sensor(idQuadrante),
    foreign key (idTipo) references sensor(idTipo)
);