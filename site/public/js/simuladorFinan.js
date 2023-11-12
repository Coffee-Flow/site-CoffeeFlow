// Simulador Financeiro
var nome = "";
var largura = 0;
var comprimento = 0;
var sensores = 0;
var hectar = 10000;
// Simulador Investimento
var CSensor = Number(85.4);
var CAsper = Number(23.07);
var CBateria = Number(11.25);
var CCarregador = Number(46.9);
var CMangueira = Number(526.96);
var CBomba = Number(549.9);
var tamaHectar = 0;
var tamanho = 0;
var custoAsper =
  25 * (CSensor + CAsper + CBateria) + CCarregador + CMangueira;
var custoSensor = 25 * (CSensor + CBateria) + CCarregador;
var custoo = 0;
var cust = 0;
const custo = 0;

function proximo1() {
  nome = input_nome.value;
  div_a.innerHTML = `<input id="input_largura" class="input-form" onfocus="limpar(this, larguraL)" onblur="limpar(this, larguraL)">
 <label class="label" id="larguraL" for="largura">Qual a largura do seu plantio (em metros)?</label>
 <button onclick="proximo2()" class="btn-form margin-btn">Próximo</button>`;

  // div_a.innerHTML = `<input id="input_largura" class="input-form" onfocus="limpar(this, larguraL)" onblur="limpar(this, larguraL)">
  // <label class="label" id="larguraL" for="largura">Qual a largura do seu plantio (em metros)?</label>
  // <button onclick="proximo2()" class="btn-form">Próximo</button>`;
}
function proximo2() {
  largura = Number(input_largura.value);
  div_a.innerHTML = `<input id="input_comprimento" class="input-form" onfocus="limpar(this, comprimentoL)" onblur="limpar(this, comprimentoL)">
   <label class="label" id="comprimentoL" for="comprimento">Qual o comprimento do seu plantio (em metros)?</label>
   <button onclick="proximo3()" class="btn-form margin-btn">Próximo</button>`;
}
function proximo3() {
  comprimento = Number(input_comprimento.value);
  div_a.innerHTML = `<span class="label" style="    margin-bottom: 80px;">Você já possui um sistema de irrigação?</span>  
   <div> Sim: <input type="radio" name="rad1" onclick="rad1s()"> Não: <input type="radio" name="rad1" onclick="rad1n()"> </div>   
   <button onclick="proximo4()" class="btn-form margin-btn">Próximo</button>`;
}
function rad1s() {
  tsistema = 1;
  ssistema = 0;
}
function rad1n() {
  ssistema = 1;
  tsistema = 0;
}
function proximo4() {
  if (tsistema == 1) {
    investimentoC()
  } else {
    investimentoS()
  }
}
// div_d.innerHTML = `A produção do seu plantio em média é de ${safra.toFixed(0)} sacas de café.`;
// div_e.innerHTML = `Que equivalem á ${moeda}`;
// div_f.innerHTML = `Se fosse com o sistema de aspersão da nossa empresa<br> <button onclick="proximo6()">Plantação Irrigada</button>`;
// div_f.innerHTML += `Quanto custaria para investir no nosso projeto<button onclick="investimentoS()">Investir</button>`;
//  div_a.style.height = 'none';
// div_b.innerHTML = `O seu plantio já utiliza de um sistema de irrigação e o tipo de irrigação é por ${irriga}.`;
// div_d.innerHTML = `A produção do seu plantio em média é de ${safra.toFixed(
//   0
// )} sacas de café.`;
// div_e.innerHTML = `Que equivalem á ${moeda}`;
// div_f.innerHTML = `Se fosse sem irrigação<br> <button onclick="proximo5()">Plantação Sequeira</button>`;
// div_f.innerHTML += `Quanto custaria para investir no nosso projeto<button onclick="investimentoC()">Investir</button>`;
function investimentoS() {
  tamaHectar = comprimento * largura;
  tamanho = tamaHectar / hectar;
  custoo = custoAsper * tamanho.toFixed(2) + CBomba;
  cust = custoo;
  const custo = custoo;
  const custov = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(custo);

  // div_b.innerHTML = "";
  // div_c.innerHTML = "";
  // div_d.innerHTML = "";
  // div_e.innerHTML = "";
  // div_f.innerHTML = `<button onclick="proximo5()">Plantação Sequeira</button><br><button onclick="proximo6()">Plantação Irrigada</button><br><button onclick="grafico()">Mostrar em Grafico</button>`;
  // section.style.margin = '100px 0';
  //  div_a.style.height = 'none';

  div_a.innerHTML =

    `<p style="font:600 17px 'Poppins'">Para levar sua plantação a novos patamares de produtividade, você precisará investir em nosso sistema inteligente de monitoramento, incluindo sensores de temperatura e umidade, e um novo sistema de irrigação por aspersão.</p><br>

   <p style="font:600 17px 'Poppins'">O tamanho do seu plantio é de ${tamanho} hectares e o valor de investimento necessário é <b>de apenas ${custov}</b>.</p><br>

   <p style="font:600 17px 'Poppins'">Imagine colher os frutos de um plantio mais saudável e produtivo, proporcionando um café de alta qualidade. Essa é a oportunidade de alcançar resultados incríveis!</p><br>

   <div style="gap:12px;">
   <button onclick="grafico()" class="btn-form" width="300px">Visualizar em Gráfico</button>
   </div>`

  // O tamanho do seu plantio é de ${tamanho} hectares <br> e o valor de investimento vai ser de ${custov}.
  // <button onclick="proximo5()" class="btn-form">Plantação Sequeira</button><br><button onclick="proximo6()" class="btn-form">Plantação Irrigada</button><br><button onclick="grafico()" class="btn-form">Mostrar em Grafico</button>`;
}
function investimentoC() {
  tamaHectar = comprimento * largura;
  tamanho = tamaHectar / hectar;
  custoo = custoSensor * tamanho.toFixed(2);
  cust = custoo;
  const custo = custoo;
  const custov = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(custo);

  // div_b.innerHTML = "";
  // div_c.innerHTML = "";
  // div_d.innerHTML = "";
  // div_e.innerHTML = "";
  // div_f.innerHTML = `<button onclick="proximo5()">Plantação Sequeira</button><br><button onclick="proximo6()">Plantação Irrigada</button><br><button onclick="grafico()">Mostrar em Grafico</button>`;
  //  div_a.style.height = 'none';

  div_a.innerHTML =
    `Com um investimento em nossos sistemas inteligente de monitoramento, você terá total controle sobre as condições da sua plantação.<br><br>
   O tamanho do seu plantio é de ${tamanho} hectares, e o investimento necessário é de apenas ${custov}.
   Imagine a precisão e eficiência que essa tecnologia trará à sua plantação. É a chave para maximizar a qualidade do seu café e sua produtividade!<br><br>

   <div style="gap:12px;">
   <button onclick="grafico()" class="btn-form" width="300px">Visualizar em Gráfico</button>
   </div>`;
}
function grafico() {
  cust = custoo;

  // div_b.innerHTML = "";
  // div_c.innerHTML = "";
  // div_d.innerHTML = "";
  // div_e.innerHTML = "";
  // div_f.innerHTML = `<button onclick="proximo5()">Plantação Sequeira</button><br><button onclick="proximo6()">Plantação Irrigada</button>`;
  document.body.style.backgroundColor = '#EAE8DB';  // Define a cor de fundo como vermelho
  //  document.body.style.backgroundImage = 'none';   Remove a imagem de fundo
  //  div_a.style.height = 'none';
  //  div_a.style.justifyContent = 'unset';


  div_a.innerHTML = `<div><canvas id="myChart" style="width: 500px; height: 300px; margin-top: 40px"></canvas></div>
   <div style="gap:12px;">`;

  const ctx = document.getElementById("myChart");

  Chart.defaults.font.family = "'Poppins'";
  Chart.defaults.color = '#000';

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["1 ano", "2 ano", "3 ano", "4 ano", "5 ano", "6 ano"],
      datasets: [
        {
          label: "Investimento",
          data: [(cust + 4000), 4000, 4000, 4000, 4000, 4000],
          borderWidth: 1,
          backgroundColor: "#D9A30B",
          borderColor: "#D9A30B"
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}