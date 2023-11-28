// função para o filtro
  function exibir(option) {
    if (option.value == "Personalizado") {
      document.getElementById("divs_dates").style.display = "flex";
    } else {
      document.getElementById("divs_dates").style.display = "none";
    }
  }

//ESC abrir menu
window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    console.log(key)
    if (key == 'ESCAPE') {
        showNav();
    }
}

function nomeSessao(){
  document.getElementById("nome").innerHTML = sessionStorage.NOME_USUARIO; 
}

//Função de abrir o menu
function showNav(){
  nav = document.getElementById("mySidenav");

  if(nav.style.width == "285px"){
    nav.style.width = "15px";
  }else{
    nav.style.width = "285px";
  }
}

function obterDadosGrafico(idLavoura, idQuadrante) {

  // alterarTitulo(idAquario)

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

function plotarGrafico(resposta, idAquario) {

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
  for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labelsTemp.push(registro.momento);
      labelsUmi.push(registro.momento)
      dadosTemp.datasets[0].data.push(registro.tempInt);
      dadosTemp.datasets[1].data.push(registro.tempExt);
      dadosUmidade.datasets[0].data.push(registro.umidade);
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

  // setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
}

function obterDadosTeto(idLavoura, idQuadrante) {
  fetch(`/medidas/medidasTeto/${idLavoura}/${idQuadrante}`, { cache: 'no-store' }).then(function (response) {
      if (response.status == 200) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              tempMax.innerHTML = parseInt(resposta[0].maxTempExt)+'°C';
              tempMin.innerHTML = parseInt(resposta[0].minTempExt)+'°C';
              chartUmidadeMax.data.datasets[0].data = [parseInt(resposta[0].maxUmidade), 100 - parseInt(resposta[0].maxUmidade)];
              chartUmidadeMin.data.datasets[0].data = [parseInt(resposta[0].minUmidade), 100 - parseInt(resposta[0].minUmidade)];
              maiorUmidade.innerHTML = parseInt(resposta[0].maxUmidade)+'%';
              menorUmidade.innerHTML = parseInt(resposta[0].minUmidade)+'%';
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