 // Simulador Financeiro
 var nome = "";
 var largura = 0;
 var comprimento = 0;
 var rad1 = 0;
 var irriga = "aspersão";
 var rad2 = 0;
 var sensores = 0;
 var sacas = 0;
 var preco = 779.9;
 var dinheiro = 0;
 var vendaa = 0;
 var hectar = 10000;
 var safra = 0;
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
 const venda = 0;

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
   <div> Sim: <input type="radio" name="rad1" onclick="rad1s()"> Não: <input type="radio" name="rad1"> </div>   
   <button onclick="proximo4()" class="btn-form margin-btn">Próximo</button>`;
 }
 function rad1s() {
   rad1 = 1;
 }
 function proximo4() {
   if (rad1 == 1) {
     div_a.innerHTML = `<span> Qual é esse sistema? </span> 
     <div>
     Aspersão: <input type="radio" name="sis" onclick="asper()"> 
     
     Superfície: <input type="radio" name="sis" onclick="super()"> 
     
     Localizada: <input type="radio" name="sis" onclick="local()"> 
     
     Subirrigação: <input type="radio" name="sis" onclick="subi()">  
     </div>
     <button onclick="proximo6()" class="btn-form margin-btn">Próximo</button>`;


   } else {
     proximo5()
   }
 }
 function asper() {
   irriga = "aspersão";
 }
 function superf() {
   irriga = "superfície";
 }
 function local() {
   irriga = "localizada";
 }
 function subi() {
   irriga = "subirrigação";
 }
 function proximo5() {
   sacas = 30;
   tamaHectar = comprimento * largura;
   tamanho = tamaHectar / hectar;
   safra = sacas * tamanho;
   vendaa = safra * preco;

   const venda = vendaa;
   const moeda = new Intl.NumberFormat("pt-BR", {
     style: "currency",
     currency: "BRL",
   }).format(venda);

  //  div_a.style.height = 'none';

   div_a.innerHTML = `<p style="font:700 23px 'Poppins'">Ótimo, ${nome}! Com ${largura * comprimento} metros quadrados de plantio, você pode produzir aproximadamente ${safra.toFixed(0)} sacas de café, o equivalente à ${moeda}.</p> <br>

   Agora você pode escolher:<br>
   <div class="div-escolher">
     <div>
       <p class="p-escolha">Se você adotar o sistema de aspersão da nossa empresa:</p>
       <button onclick="proximo6()" class="btn-form">Plantação Irrigada</button>
     </div>
     OU
     <div>
       <p class="p-escolha">Ver quanto custaria para investir em nosso projeto:</p>
       <button onclick="investimentoS()" class="btn-form">Cotação</button>
     </div>
   </div>`
   // div_d.innerHTML = `A produção do seu plantio em média é de ${safra.toFixed(0)} sacas de café.`;
   // div_e.innerHTML = `Que equivalem á ${moeda}`;
   // div_f.innerHTML = `Se fosse com o sistema de aspersão da nossa empresa<br> <button onclick="proximo6()">Plantação Irrigada</button>`;
   // div_f.innerHTML += `Quanto custaria para investir no nosso projeto<button onclick="investimentoS()">Investir</button>`;
 }
 function proximo6() {
   sacas = 55;
   tamaHectar = comprimento * largura;
   tamanho = tamaHectar / hectar;
   safra = sacas * tamanho;
   vendaa = safra * preco;

   const venda = vendaa;
   const moeda = new Intl.NumberFormat("pt-BR", {
     style: "currency",
     currency: "BRL",
   }).format(venda);

  //  div_a.style.height = 'none';

   div_a.innerHTML = `<p style="font:700 23px 'Poppins'">Ótimo, ${nome}! Com ${largura * comprimento} metros quadrados de plantio, você está usando o sistema de irrigação por ${irriga}. A sua produção é de aproximadamente ${safra.toFixed(0)} sacas de café, o equivalente à ${moeda}.</p> <br>

   Agora você pode escolher:<br>
   <div class="div-escolher">
     <div>
       <p class="p-escolha">Se você adotar o sistema de aspersão da nossa empresa:</p>
       <button onclick="proximo6()" class="btn-form">Plantação Irrigada</button>
     </div>
     OU
     <div>
       <p class="p-escolha">Ver quanto custaria para investir em nosso projeto:</p>
       <button onclick="investimentoS()" class="btn-form">Cotação</button>
     </div>
   </div>`

   // div_b.innerHTML = `O seu plantio já utiliza de um sistema de irrigação e o tipo de irrigação é por ${irriga}.`;
   // div_d.innerHTML = `A produção do seu plantio em média é de ${safra.toFixed(
   //   0
   // )} sacas de café.`;
   // div_e.innerHTML = `Que equivalem á ${moeda}`;
   // div_f.innerHTML = `Se fosse sem irrigação<br> <button onclick="proximo5()">Plantação Sequeira</button>`;
   // div_f.innerHTML += `Quanto custaria para investir no nosso projeto<button onclick="investimentoC()">Investir</button>`;
 }
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

   Agora, você tem três opções:
   <div style="gap:12px;">
   <button onclick="proximo5()" class="btn-form" width="300px">Manter o Plantio Sem Irrigação</button>
   <button onclick="proximo6()" class="btn-form" width="300px">Investir e Manter o Plantio Irrigado</button>
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
   Agora, você tem três opções:

   <div style="gap:12px;">
   <button onclick="proximo5()" class="btn-form" width="300px">Manter o Plantio Sem Irrigação</button>
   <button onclick="proximo6()" class="btn-form" width="300px">Investir e Manter o Plantio Irrigado</button>
   <button onclick="grafico()" class="btn-form" width="300px">Visualizar em Gráfico</button>
   </div>`;
 }
 function grafico() {
   sacas = 55;
   safra = sacas * tamanho;
   vendaa = safra * preco;
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
   <div style="gap:12px;">
     <button onclick="proximo5()" style="margin:50px 0;" class="btn-form">Plantação Sem Irrigação</button>
     <button onclick="proximo6()" style="margin:50px 0;" class="btn-form">Plantação Irrigada</button>
   </div>`;

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
         {
           label: "Produção",
           data: [vendaa, vendaa, vendaa, vendaa, vendaa, vendaa],
           borderWidth: 1,
           backgroundColor: "#925035",
           borderColor: "#925035"
         },
         {
           label: "Rendimento",
           data: [
             vendaa - (cust + 4000),
             vendaa - 4000,
             vendaa - 4000,
             vendaa - 4000,
             vendaa - 4000,
             vendaa - 4000,
           ],
           borderWidth: 1,
           backgroundColor: "#053C11",
           borderColor: "#053C11"
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