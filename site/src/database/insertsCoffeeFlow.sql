use coffeeflow;

insert into unidadeFederativa values
	(11,'RO','Rondônia'),
	(12,'AC','Acre'),
	(13,'AM','Amazonas'),
	(14,'RR','Roraima'),
	(15,'PA','Pará'),
	(16,'AP','Amapá'),
	(17,'TO','Tocantins'),
	(21,'MA','Maranhão'),
	(22,'PI','Piauí'),
	(23,'CE','Ceará'),
	(24,'RN','Rio Grande do Norte'),
	(25,'PB','Paraíba'),
	(26,'PE','Pernambuco'),
	(27,'AL','Alagoas'),
	(28,'SE','Sergipe	'),
	(29,'BA','Bahia'),
	(31,'MG','Minas Gerais'),
	(32,'ES','Espírito Santo'),
	(33,'RJ','Rio de Janeiro'),
	(35,'SP','São Paulo'),
	(41,'PR','Paraná'),
	(42,'SC','Santa Catarina'),
	(43,'RS','Rio Grande do Sul'),
	(50,'MS','Mato Grosso do Sul'),
	(51,'MT','Mato Grosso'),
	(52,'GO','Goiás'),
	(53,'DF','Distrito Federal');

insert into empresa values 
	(null, '12.345.678/0001-01', 'ABC Comércio Ltda', 'ABC Comércio Ltda', 'contato@abc.com', '(11) 1234-5678'),
    (null, '98.765.432/0001-02', 'XYZ Transportes S.A.', 'XYZ Transportes S.A.', 'contato@xyz.com', '(22) 9876-5432'),
    (null, '34.567.890/0001-03', 'InovaTech Soluções Ltda', 'InovaTech Soluções Ltda', 'contato@inovatech.com', '(33) 4567-8901'),
    (null, '67.890.123/0001-04', 'Global Alimentos S.A.', 'Global Alimentos S.A.', 'contato@globalfoods.com', '(44) 6789-0123');
    
insert into endereco values 
	(1, 'Rua Principal', 123, 'Sala 101', 'Centro', 'Belo Horizonte', '12345-678', 1000, 31),
    (1, 'Avenida da Paz', 456, NULL, 'Jardim Botânico', 'São Paulo', '54321-987', 1001, 35),
    (1, 'Rua da Inovação', 789, 'Andar 2', 'Distrito Industrial', 'Florianópolis', '67890-123', 1002, 42),
    (2, 'Avenida das Delícias', 1011, 'Bloco A', 'Bairro Nobre', 'Uberlândia', '89012-345', 1000, 31);
    
insert into usuario values
	(null, 'joaosilva@abc.com', 'João Silva', '123.456.789-01', 'AbCcomerc10*', 1, 1000, 1),
    (null, 'mariasouza@xyz.com', 'Maria Souza', '234.567.890-12', 'SAxyzSenha456$#', 2, 1001, 1),
    (null, 'josesantos@inovatech.com', 'João Santos', '345.678.901-23', 'newTECHcoffee!987', 2, 1002, 1),
    (null, 'fernandacaramico@globalfoods.com', 'Fernanda Caramico', '034.573.848-24', 'c0ffeeGlobal01!@', 2, 1003, 1);

insert into usuario values 
	(null, 'anajulia@abc.com', 'Ana Julia', '065.674.784.05', 'AbCcomerc11*', 2, 1000, 2),
    (null, 'soniaabraao@xyz.com', 'Sonia Abrãao', '487.936.483-54', 'SAxyzSenha654$#', 1, 1001, 1);
    
insert into tipoCafe (idCafe, nome) values
	(null, 'Arábica'),
    (null, 'Robusta');
    
insert into lavoura values
	(null, 'Café Dourado', 1, 320, 1, 1000),
    (null, 'Café Fortaleza', 1, 250, 1, 1001),
    (null, 'Café do Sul', 2, 400, 1, 1002),
    (null, 'Café do Sítio', 1, 280, 1, 1000);

-- Como o DHT11 captura 2 valores com unidades de medida diferentes, para especificar o tipo de dados que estamos registrando, dividi ele em dois tipos
insert into tipo values 
	(null, 'Temperatura - DHT11', '°C'),
	(null, 'Umidade - DHT11', '%'),
	(null, 'Temperatura - LM35', '°C');

insert into quadrante values
	(null, 1, 1),  
    (null, 1, 2), 
    (null, 2, 1),  
    (null, 2, 2),
    (null, 3, 2),
    (null, 3, 3),
    (null, 4, 4),
    (null, 4, 5),
    (null, 5, 2),
    (null, 5, 3);

insert into sensor values
	(1, 1, 1, 'ativo'),
    (1, 1, 2, 'ativo'),
    (1, 2, 3, 'ativo'),
    (2, 3, 1, 'ativo'),
    (2, 3, 2, 'ativo'),
    (2, 4, 3, 'inativo'),
    (3, 5, 1, 'ativo'),
    (3, 5, 2, 'ativo'),
    (4, 6, 1, 'ativo'),
    (4, 6, 2, 'ativo');

-- Sensor 1 DHT11 Temperatura, Coordenadas 1, Tipo 1
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (1, 1, 1, 25.5, '2023-10-28 08:00:00'),
    (1, 1, 1, 26.0, '2023-10-28 08:15:00');

-- Sensor 1 DHT11 Umidade, Coordenadas 1, Tipo 2
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (1, 1, 2, 60.0, '2023-10-28 08:00:00'),
    (1, 1, 2, 62.5, '2023-10-28 08:15:00');

-- Sensor 1 LM35 Temperatura, Coordenadas 2, Tipo 3
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (1, 2, 3, 27.8, '2023-10-28 08:00:00'),
    (1, 2, 3, 28.2, '2023-10-28 08:15:00');

-- Sensor 2 DHT11 Temperatura, Coordenadas 3, Tipo 1
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (2, 3, 1, 24.8, '2023-09-12 20:00:00'),
    (2, 3, 1, 25.2, '2023-09-12 20:15:00');

-- Sensor 2 DHT11 Umidade, Coordenadas 3, Tipo 2
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (2, 3, 2, 58.5, '2023-09-12 20:00:00'),
    (2, 3, 2, 59.2, '2023-09-12 20:15:00');
    
-- Sensor 3 DHT11 Temperatura, Coordenadas 5, Tipo 1
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (3, 5, 1, 30.2, '2023-04-15 05:00:00'),
    (3, 5, 1, 30, '2023-04-15 05:15:00');

-- Sensor 3 DHT11 Umidade, Coordenadas 5, Tipo 2
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (3, 5, 2, 30.5, '2023-04-15 05:00:00'),
    (3, 5, 2, 31, '2023-04-15 05:15:00');
    
-- Sensor 4 DHT11 Temperatura, Coordenadas 6, Tipo 1
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (4, 6, 1, 29.5, '2023-05-03 05:00:00'),
    (4, 6, 1, 28.4, '2023-05-03 05:15:00');

-- Sensor 4 DHT11 Umidade, Coordenadas 6, Tipo 2
INSERT INTO registro (idLavoura, idQuadrante, idTipo, valor, dataHora) VALUES
    (4, 6, 2, 40.6, '2023-05-03 05:00:00'),
    (4, 6, 2, 50.5, '2023-05-03 05:15:00');