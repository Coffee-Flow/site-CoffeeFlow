// função para o filtro
function exibir(option) {
  if (option.value == "Personalizado") {
    document.getElementById("divs_dates").style.display = "flex";
  } else {
    document.getElementById("divs_dates").style.display = "none";
  }
}

//Funções para abrir e fechar o modal da helpdesk
function abrirHD(){
  helpdesk.showModal()
}
function fecharHD(){
  helpdesk.close()
}

//ESC abrir menu
window.onkeyup = function (event) {
  let key = event.key.toUpperCase();
  console.log(key)
  if (key == 'ESCAPE') {
    showNav();
  }
}

function nomeSessao() {
  document.getElementById("nome").innerHTML = sessionStorage.NOME_USUARIO;
}

//Função de abrir o menu
function showNav() {
  nav = document.getElementById("mySidenav");

  if (nav.style.width == "285px") {
    nav.style.width = "15px";
  } else {
    nav.style.width = "285px";
  }
}

function obterDadosGrafico(idLavoura, idQuadrante) {

  // alterarTitulo(idLavoura)

  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/ultimas/${idLavoura}/${idQuadrante}`, { cache: 'no-store' }).then(function (response) {
    if (response.status == 200) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        // resposta.reverse();
        plotarGrafico(resposta, idLavoura);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGrafico(resposta, idLavoura) {

  // console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labelsTemp = [];
  let labelsUmi = [];

  // Criando estrutura para plotar gráfico - dados
  let dadosTemp = {
    labels: labelsTemp,
    datasets: [{
      label: "Temperatura Interna",
      data: [],
      borderColor: "#24211a",
      backgroundColor: "#24211a",
    },
    {
      label: "Temperatura Externa",
      data: [],
      borderColor: "#547625",
      backgroundColor: "#547625",
    }]
  };

  let dadosUmidade = {
    labels: labelsUmi,
    datasets: [
      {
        label: "Umidade",
        data: [],
        borderColor: "rgb(54,162,235)",
        backgroundColor: "rgb(54,162,235)",
      },
    ],
  };

  // console.log('----------------------------------------------')
  // console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  // console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (var i = resposta.length-1; i >= 0; i--) {
    var registro = resposta[i];
    if(labelsTemp.length < 7){
      labelsTemp.push(new Date(registro.dataHora).toLocaleTimeString());
    }
    if(registro.idTipo == 3){
      dadosTemp.datasets[1].data.push(registro.valor);
    }else if(registro.idTipo == 2){
      atualUmidade.innerHTML = parseFloat(registro.valor).toFixed(0)+"%"
      labelsUmi.push(new Date(registro.dataHora).toLocaleTimeString())
      dadosUmidade.datasets[0].data.push(registro.valor);
    }else{
      tempAtual.innerHTML = parseFloat(registro.valor).toFixed(0)+"°C"
      dadosTemp.datasets[0].data.push(registro.valor);
    }
  }



  // console.log('----------------------------------------------')
  // console.log('O gráfico será plotado com os respectivos valores:')
  // console.log('Labels:')
  // console.log(labelsTemp)
  // console.log('Dados:')
  // console.log(dadosTemp.datasets)
  // console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  // const config = {
  //     type: 'line',
  //     data: dados,
  // };

  const configTemp = {
    type: "line",
    data: dadosTemp,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Temperatura (°C)",
          align: "start",
          font: {
            size: 20,
            family: "'Poppins'",
          },
        },
        legend: {
          labels: {
            font: {
              size: 12,
              family: "'Poppins'",
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    },
  };

  const configUmidade = {
    type: "line",
    data: dadosUmidade,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Umidade (%)",
          align: "start",
          font: {
            size: 20,
            family: "'Poppins'",
          },
        },
        legend: {
          labels: {
            font: {
              size: 14,
              family: "'Poppins'",
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    },
  };

  // Adicionando gráfico criado em div na tela
  let chartTemp = new Chart(
    document.getElementById(`temperatura`),
    configTemp
  );

  let chartUmi = new Chart(
    document.getElementById(`umidade`),
    configUmidade
  );

  setTimeout(() => atualizarGrafico(lavoura.value, quadrante.value, dadosTemp, dadosUmidade, chartTemp, chartUmi), 2000);
}

function obterDadosTeto(idLavoura, idQuadrante) {
  fetch(`/medidas/medidasTeto/${idLavoura}/${idQuadrante}`, { cache: 'no-store' }).then(function (response) {
    if (response.status == 200) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        tempMax.innerHTML = parseFloat(resposta[2].valor).toFixed(0) + '°C';
        tempMin.innerHTML = parseFloat(resposta[3].valor).toFixed(0) + '°C';
        chartUmidadeMax.data.datasets[0].data = [parseFloat(resposta[0].valor).toFixed(0), 100 - parseFloat(resposta[0].valor).toFixed(0)];
        chartUmidadeMin.data.datasets[0].data = [parseFloat(resposta[1].valor).toFixed(0), 100 - parseFloat(resposta[1].valor).toFixed(0)];
        maiorUmidade.innerHTML = parseFloat(resposta[0].valor).toFixed(0) + '%';
        menorUmidade.innerHTML = parseFloat(resposta[1].valor).toFixed(0) + '%';
        console.log(chartUmidadeMax.data.datasets[0].data)
        console.log(chartUmidadeMin.data.datasets[0].data)
        chartUmidadeMax.update();
        chartUmidadeMin.update();
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idLavoura, idQuadrante, dadosTemp, dadosUmidade, chartTemp, chartUmi) {

  fetch(`/medidas/tempo-real/${idLavoura}/${idQuadrante}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        // obterDadosTeto(idLavoura, idQuadrante);
        obterDados(idLavoura, idQuadrante);
        // alertar(novoRegistro, idLavoura);
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dadosTemp, dadosTemp, dadosUmidade);

        // let avisoCaptura = document.getElementById(`avisoCaptura${idLavoura}`)
        // avisoCaptura.innerHTML = ""

        // new Date(novoRegistro[0].dataHora).toLocaleTimeString()
        if (new Date(novoRegistro[0].dataHora).toLocaleTimeString() == dadosTemp.labels[dadosTemp.labels.length - 1] && new Date(novoRegistro[1].dataHora).toLocaleTimeString() == dadosUmidade.labels[dadosUmidade.labels.length - 1]) {
          console.log("---------------------------------------------------------------")
          console.log("Como não há dados novos para captura, o gráfico não atualizará.")
          // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].dataHora)
          console.log("Horário do último dado temp capturado:")
          console.log(dadosTemp.labels[dadosTemp.labels.length - 1])
          console.log("Horário do último dado umidade capturado:")
          console.log(dadosUmidade.labels[dadosUmidade.labels.length - 1])
          console.log("---------------------------------------------------------------")
        } else {
          novoRegistro.forEach(function (item) {
            if (item.idTipo === 1) {
              dadosTemp.datasets[0].data.shift();
              dadosTemp.datasets[0].data.push(novoRegistro[0].valor);

            } else if (item.idTipo === 3) {
              dadosTemp.datasets[1].data.shift();
              dadosTemp.datasets[1].data.push(novoRegistro[2].valor);

            } else if (item.idTipo === 2) {
              dadosUmidade.datasets[0].data.shift();
              dadosUmidade.datasets[0].data.push(novoRegistro[1].valor);
              
            }
          });
          // tirando e colocando valores no gráfico
          dadosTemp.labels.shift();
          dadosTemp.labels.push(new Date(novoRegistro[0].dataHora).toLocaleTimeString());
          // dadosTemp.datasets[1].label.shift();
          // dadosTemp.datasets[1].label.push(new Date(novoRegistro[2].dataHora).toLocaleTimeString());

          dadosUmidade.labels.shift();
          dadosUmidade.labels.push(new Date(novoRegistro[1].dataHora).toLocaleTimeString());

          chartTemp.update();
          chartUmi.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGrafico(idLavoura, idQuadrante, dadosTemp, dadosUmidade, chartTemp, chartUmi), 2000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGrafico(idLavoura, idQuadrante, dadosTemp, dadosUmidade, chartTemp, chartUmi), 2000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

// Alertas

var alertas = [];

function obterDados(idLavoura, idQuadrante) {
  fetch(`/medidas/tempo-real/${idLavoura}/${idQuadrante}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {

          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          alertar(resposta, idLavoura, idQuadrante);
        });
      } else {
        console.error(`Nenhum dado encontrado para a lavoura e o quadrante, com os respectivos id's: ${idLavoura}, ${idQuadrante} ou erro na API`);
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados da lavoura/quadrante p/ gráfico: ${error.message}`);
    });

}

function alertar(resposta, idLavoura, idQuadrante) {

  var temperaturaSolo, temperaturaExt, umidade;

  // Verifica o idTipo e atribui os valores correspondentes
  resposta.forEach(function (item) {
    if (item.idTipo === 1) {
      temperaturaSolo = item.valor;
    } else if (item.idTipo === 3) {
      temperaturaExt = item.valor;
    } else if (item.idTipo === 2) {
      umidade = item.valor;
    }
  });

  // Exemplo de saída
  console.log("Temperatura do Solo:", temperaturaSolo);
  console.log("Temperatura Externa:", temperaturaExt);
  console.log("Umidade:", umidade);


  var mensagemTempExt = "";
  var mensagemTempSolo = "";
  var mensagemUmi = "";

  if (temperaturaExt <= 10) {
    thumbsTempExt.style.display = 'flex';
    mensagemTempExt = `Crítico: Temperatura Externa muito baixa!<br>`;
    thumbsTempExt.src = "../assets/img/dashboard/iconCriticoTempExt.svg";
    thumbsTempExt.style.backgroundColor = "#7AFDFF";
    p_auxiliarTempExt.innerHTML = "Proteja as plantas do frio intenso. Ajuste os cuidados para evitar danos aos cafezais.<br>"
  } else if (temperaturaExt <= 15) {
    thumbsTempExt.style.display = 'flex';
    mensagemTempExt = `Alerta: Temperatura Externa baixa!<br>`;
    thumbsTempExt.src = "../assets/img/dashboard/iconAlertaTempExt.svg";
    thumbsTempExt.style.backgroundColor = "#9CDBC0";
    p_auxiliarTempExt.innerHTML = "Temperatura fresca lá fora. Ajuste os cuidados para manter o conforto das plantas de café.<br>"
  } else if (temperaturaExt >= 27 && temperaturaExt < 34) {
    thumbsTempExt.style.display = 'flex';
    mensagemTempExt = `Alerta: Temperatura Externa alta!<br>`;
    thumbsTempExt.src = "../assets/img/dashboard/iconAlertaTempExt.svg";
    thumbsTempExt.style.backgroundColor = "#C9B167";
    p_auxiliarTempExt.innerHTML = "Ajuste a irrigação para proteger os cafezais do calor excessivo.<br>"
  } else if (temperaturaExt >= 34) {
    thumbsTempExt.style.display = 'flex';
    mensagemTempExt = `Crítico: Temperatura Externa muito alta!<br>`;
    thumbsTempExt.src = "../assets/img/dashboard/iconCriticoTempExt.svg";
    thumbsTempExt.style.backgroundColor = "#FF7200";
    p_auxiliarTempExt.innerHTML = "Calor extremo lá fora. Adapte a irrigação para evitar danos às plantas.<br>"
  } else {
    thumbsTempExt.style.display = 'none';
  }


  if (temperaturaSolo <= 8) {
    thumbsTempSolo.style.display = 'flex';
    mensagemTempSolo = `Crítico: Temperatura do Solo muito baixa!<br>`;
    thumbsTempSolo.src = "../assets/img/dashboard/iconCriticoTempSolo.svg";
    thumbsTempSolo.style.backgroundColor = "#7AFDFF";
    p_auxiliarTempSolo.innerHTML = "Ajuste a irrigação para proteger as mudas de café do frio.<br>"
  } else if (temperaturaSolo <= 12) {
    thumbsTempSolo.style.display = 'flex';
    mensagemTempSolo = `Alerta: Temperatura do Solo baixa!<br>`;
    thumbsTempSolo.src = "../assets/img/dashboard/iconAlertaTempSolo.svg";
    thumbsTempSolo.style.backgroundColor = "#9CDBC0";
    p_auxiliarTempSolo.innerHTML = "Ajuste os aspersores para evitar perdas na lavoura.<br>"
  } else if (temperaturaSolo >= 25 && temperaturaSolo < 33) {
    thumbsTempSolo.style.display = 'flex';
    mensagemTempSolo = `Alerta: Temperatura do Solo alta!<br>`;
    thumbsTempSolo.src = "../assets/img/dashboard/iconAlertaTempSolo.svg";
    thumbsTempSolo.style.backgroundColor = "#C9B167";
    p_auxiliarTempSolo.innerHTML = "Ajuste a irrigação para evitar estresse nas raízes do café.<br>"
  } else if (temperaturaSolo >= 33) {
    thumbsTempSolo.style.display = 'flex';
    mensagemTempSolo = `Crítico: Temperatura do Solo muito alta!<br>`;
    thumbsTempSolo.src = "../assets/img/dashboard/iconCriticoTempSolo.svg";
    thumbsTempSolo.style.backgroundColor = "#FF7200";
    p_auxiliarTempSolo.innerHTML = "Aumente a frequência de irrigação para compensar o calor.<br>"
  } else {
    thumbsTempSolo.style.display = 'none';
  }

  document.getElementById('p_titulo_msg_temp_ext').innerHTML = mensagemTempExt;
  document.getElementById('p_titulo_msg_temp_solo').innerHTML = mensagemTempSolo;

  if (umidade <= 50) {
    thumbsUmi.style.display = 'flex';
    mensagemUmi = `Crítico: Umidade do Solo muito baixa!<br>`;
    thumbsUmi.src = "../assets/img/dashboard/iconCriticoHumi.svg";
    thumbsUmi.style.backgroundColor = "#FFFF60";
    p_auxiliarUmi.innerHTML = "Ajuste a irrigação para garantir a umidade necessária.<br>";
  } else if (umidade <= 60) {
    thumbsUmi.style.display = 'flex';
    mensagemUmi = `Alerta: Umidade do Solo baixa!<br>`;
    thumbsUmi.src = "../assets/img/dashboard/iconAlertaHumi.svg";
    thumbsUmi.style.backgroundColor = "#A0FF67";
    p_auxiliarUmi.innerHTML = "Ajuste a irrigação para manter o equilíbrio hídrico nas raízes do café.<br>"
  } else if (umidade >= 80 && umidade < 97) {
    thumbsUmi.style.display = 'flex';
    mensagemUmi = `Alerta: Umidade do Solo alta!<br>`;
    thumbsUmi.src = "../assets/img/dashboard/iconAlertaHumi.svg";
    thumbsUmi.style.backgroundColor = "#109C77";
    p_auxiliarUmi.innerHTML = "Reduza a irrigação para evitar excesso de umidade.<br>";
  } else if (umidade >= 97) {
    thumbsUmi.style.display = 'flex';
    mensagemUmi = `Crítico: Umidade do Solo muito alta!<br>`;
    thumbsUmi.src = "../assets/img/dashboard/iconCriticoHumi.svg";
    thumbsUmi.style.backgroundColor = "#007A7A";
    p_auxiliarUmi.innerHTML = "Ajuste a irrigação para proteger as raízes do café.<br>";
  } else {
    thumbsUmi.style.display = 'none';
  }
  document.getElementById('p_titulo_msg_umi').innerHTML = mensagemUmi;
}

function atualizacaoPeriodica() {
  JSON.parse(sessionStorage.AQUARIOS).forEach(item => {
    obterDados(item.id)
  });
  setTimeout(atualizacaoPeriodica, 5000);
}