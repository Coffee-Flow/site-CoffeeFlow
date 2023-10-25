// Animação SideNav

function openNav() {
    document.getElementById("mySidenav").style.width = "270px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Botões Section 3 

var container1 = document.getElementById('container1');
var container2 = document.getElementById('container2');
var container3 = document.getElementById('container3');


function exibirCon1() {
    if (container1.style.display == "none" || container2.style.display == "flex" || container3.style.display == "flex") {
        container1.style.display = "flex";
        container2.style.display = "none";
        container3.style.display = "none";
    }
}

function exibirCon2() {
    if (container2.style.display == "none" || container1.style.display == "flex" || container3.style.display == "flex") {
        container2.style.display = "flex";
        container1.style.display = "none";
        container3.style.display = "none";
    }
}
function exibirCon3() {
    if (container3.style.display == "none" || container1.style.display == "flex" || container2.style.display == "flex") {
        container3.style.display = "flex";
        container1.style.display = "none";
        container2.style.display = "none";
    }
}

// Redirecionamento via botões

function href(place) {
    window.location.href = "../" + place + ".html";
}

//  Limpar Labels - Login/Cadastro

function limpar(input, label) {
    if (input.value !== "") {
        label.classList.add("subir-label");
    } else {
        label.classList.remove("subir-label");

    }
}

// Validação da tela de cadastro

var form = document.getElementById('form');
var campos = document.querySelectorAll('.required');
var spans = document.querySelectorAll('.span-required');
var inputs = document.querySelectorAll('.input-form');
var labels = document.querySelectorAll('.label')
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]+)?$/;
var senhaRegex = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{12,}$/;
var cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    nameValidate();
    emailValidate();
    cpfValidate();
    mainPasswordValidate();
    comparePassword();
    if (impedirEnvioCadastro() == false) {
        alert('Corrija os erros antes de enviar o formulário.');
    } else {
        form.submit(); // Envie o formulário se a validação for bem-sucedida, ou seja, retornar true
    };


});

function setError(index) {
    campos[index].style.borderBottom = '1px solid #e63636';
    spans[index].style.display = 'block';
}

function removeError(index) {
    campos[index].style.borderBottom = '';
    spans[index].style.display = 'none';
}

function nameValidate() {
    if (campos[0].value.length < 5) {
        setError(0);

    } else {
        removeError(0);
    }
}

function emailValidate() {
    if (!emailRegex.test(campos[1].value)) {
        setError(1);
    } else {
        removeError(1);
    }
}

function cpfValidate() {
    if (!cpfRegex.test(campos[2].value)) {
        setError(2);
    } else {
        removeError(2);
    }
}

function mainPasswordValidate() {
    if (!senhaRegex.test(campos[3].value)) {
        setError(3);
        senha_requisitos.style.display = 'block';
    } else {
        removeError(3);
        senha_requisitos.style.display = '';
        comparePassword();
    }
}

function comparePassword() {
    if (campos[4].value == campos[3].value && senhaRegex.test(campos[4].value)) {
        removeError(4);
    } else {
        setError(4);
    }
}

function impedirEnvioCadastro() {
    if (emailRegex.test(campos[1].value) && cpfRegex.test(campos[2].value) && senhaRegex.test(campos[3].value) && campos[4].value == campos[3].value) {
        return true; // Se todas estas condições estiverem certas, o return true permite enivar o form
    } else {
        return false; // Impede o envio do formulário
    }
}

// Validações Tela de Cadastro Empresa

function nameValidateEmp() {
    if (campos[0].value.length < 5) {
        setError(0);

    } else {
        removeError(0);
    }
}

function razaoValidate() {
    if (campos[1].value.length < 5) {
        setError(1);

    } else {
        removeError(1);
    }
}

function cnpjValidate() {
    if (!/^\d{2}(\.?\d{3}){2}\/?\d{4}-?\d{2}$/.test(campos[2].value)) {
        setError(2);
    } else {
        removeError(2);
    }
}

function emailCorpValidate() {
    if (!emailRegex.test(campos[3].value)) {
        setError(3);
    } else {
        removeError(3);
    }
}

function telValidate() {
    var telefone = tel.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (telefone.length < 8 || telefone.length > 11) {
        setError(4);
    } else {
        removeError(4);
        telefone = telefone.replace(/^(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");  // Aplica a máscara [(XX) XXXXX-XX], considerando formatos com 10 ou 11 dígitos
    }

    tel.value = telefone; // Atribui a máscara no valor do input quando for digitado todos os 10/11 dígitos
}

// Função para encontrar endereço de acordo com o CEP informado

function consultarCEP(cep) {
    // Usando a API do ViaCEP para consultar o CEP
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url) // É uma função global que recebe uma URL como argumento. Ela retorna uma promessa (Promise) como resposta.
        // No caso, a função solicitou à URL buscar as informações do endereço associado ao CEP.

        .then(response => response.json())
        .then(data => {
            // Quando a solicitação é bem-sucedida, as informações vêm em formato JSON. 
            // O método .then() é utilizado para lidar com a resposta quando ela estiver pronta.
            if (data.erro) {
                console.log("CEP não encontrado"); // Caso as informações não forem encontradas
            } else {

                // Caso forem encontradas, a função atribui elas para os seus respectivos campos, de acordo com os seus id's.

                document.getElementById("logr").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("uf").value = data.uf;
                labels[6].classList.add("subir-label");
                labels[7].classList.add("subir-label");
                labels[8].classList.add("subir-label");
                labels[9].classList.add("subir-label");
            }
        })
        .catch(error => { // O método .catch() faz parte da API Fetch e é usado para lidar com erros que possam ocorrer durante uma solicitação de rede, como uma falha na conexão ou uma resposta inválida do servidor. 
            // Caso houver algum erro no processo de busca, a função retorna esta mensagem de erro.

            console.error("Erro na consulta: " + error);
        });
}

function cepValidate() {
    var cepValue = cep.value.replace(/[^\d]/g, ''); // Limpa caracteres não numéricos

    if (cepValue.length === 8 && /^[0-9]{8}$/.test(cepValue)) {
        // CEP válido
        consultarCEP(cepValue); // Chama a função de consulta acima
        removeError(5);
    } else {
        // CEP inválido
        setError(5);
    }
}

function impedirEnvioCadastroEmp() {
    // Verifique todas as validações
    var nameValidateValid = nameValidateEmp();
    var razaoSocialValid = razaoValidate();
    var cnpjValid = cnpjValidate();
    var emailCorpValid = emailCorpValidate();
    var telValid = telValidate();
    var cepValid = cepValidate();

    // Verifique se alguma validação falhou
    if (!nameValidateValid || !razaoSocialValid || !cnpjValid || !emailCorpValid || !telValid || !cepValid) {
        // Pelo menos uma validação falhou, portanto, o form não pode ser enviado
        return false;
    }

    // Todas as validações foram bem-sucedidas, o form será enviado
    return true;
}


// Mostrar senha

function mudarTipo(input, imgFechar, imgAbrir) {
    if (input.type === 'password') {
        input.type = 'text';
        imgFechar.style.display = 'none';
        imgAbrir.style.display = 'block';
    } else {
        input.type = 'password';
        imgFechar.style.display = 'block';
        imgAbrir.style.display = 'none';
    }
}

// // Validação inputs Tela de Login

function impedirEnvioLogin() {
    if (!emailRegex.test(email.value) || senha.value.length < 12) {
        alert('Corrija os erros antes de enviar o formulário.');
        return false; // Impede o envio do formulário
    } else {
        // return true;
        login(email.value == "coffeeflow@sptech.school", senha.value == "CoffeeFlow@10");
    }
}

// Login

function login(email, senha) {
    if (email && senha) {
        href("dashboard/dashboard");
    } else {
        href("cadastro/login");
    }
}

// Simulador de Perdas

function arabica() {
    div_limpar.style.display = 'none'
    div_aparecerArabico.style.display = 'block'
}
function formularioArabica() {
    var hectaresA = Number(input_hec.value)
    var faturamentoA = Number(input_fat.value)
    var estadoA = Number(select_estado.value)
    var perdaAP = Number(faturamentoA * 0.20)
    var perdaA = Number(faturamentoA * 0.30)
    var perdaAM = Number(faturamentoA * 0.40)
    const venda = Number(perdaA);
    const vendaP = Number(perdaAP);
    const vendaM = Number(perdaAM);

    const moedaM = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(vendaM);

    const moedaP = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(vendaP);

    const moeda = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(venda);

    div_arabicaRiscos.style.display = 'block';
    div_arabicaRiscos.style.height = 'auto';
    div_arabicaRiscos.style.textAlign = 'justify';

    if (estadoA == 8 || estadoA == 10 || estadoA == 11 || estadoA == 12 || estadoA == 23) {
        div_respostaArabica.innerHTML = `Olá, ${nome_riscos.value}! Agradecemos por escolher nossa calculadora. <br><br>
  
      Com base nas características de sua plantação, você pode estar <b>perdendo uma parte significativa de sua produção</b>, chegando a até 30%. Isso representa um <b>valor anual de ${moeda}!</b> <br><br>
      
      Essa perda é resultado das mudanças climáticas que afetam a produção em seu estado. No entanto, <b>trazemos boas notícias.</b> <button id="continuacao1" class="botao" onclick="continuacao1()" style="margin: 15px 20px 0 37px;">Quais notícias?</button>`;

        if (hectaresA >= 3) {
            div_respostaArabica.innerHTML = `Olá, ${nome_riscos.value}! Agradecemos por escolher nossa calculadora. <br><br>
  
      Com base nas características de sua plantação, você pode estar <b>perdendo uma parte significativa de sua produção</b>, chegando a até 40%. Isso representa um <b>valor anual de ${moedaM}!</b> <br><br>
      
      Os fatores que afetam essa perda são: o estado que você está localizado, o porte elevado de sua plantação, possivelmente as <b>mudanças climáticas</b> e a crise hídrica, por conta da possível bienalidade negativa. No entanto, <b>trazemos boas notícias.</b> <button id="continuacao1" class="botao" onclick="continuacao1()" style="margin: 15px 20px 0 37px;">Quais notícias?</button>`;
        }
    } else {
        div_respostaArabica.innerHTML = `Olá, ${nome_riscos.value}! Agradecemos por escolher nossa calculadora. <br><br>
  
      Com base nas características de sua plantação, você pode estar <b>perdendo uma parte significativa de sua produção</b>, chegando a até 20%. Isso representa um <b>valor anual de ${moedaP}!</b> <br><br>
      
      Essa perda é resultado das mudanças climáticas e da má utilização da água que pode afetar a produção em seu estado. No entanto, <b>trazemos boas notícias.</b> <button id="continuacao1" class="botao" onclick="continuacao1()" style="margin: 15px 20px 0 37px;">Quais notícias?</button>`;
    }

}

function robusta() {
    div_limpar.style.display = 'none'
    div_aparecerRobusta.style.display = 'block'
}

function formularioRobusta() {
    var hectaresR = Number(input_hec1.value)
    var faturamentoR = Number(input_fat1.value)
    var estadoR = Number(select_estado1.value)
    var perdaRP = Number(faturamentoR * 0.15)
    var perdaR = Number(faturamentoR * 0.15)
    var perdaRM = Number(faturamentoR * 0.20)
    const venda = Number(perdaR);
    const vendaP = Number(perdaRP);
    const vendaM = Number(perdaRM);

    const moedaRM = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(vendaM);

    const moedaRP = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(vendaP);

    const moedaR = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(venda);

    div_robustaRiscos.style.display = 'block';
    div_robustaRiscos.style.height = 'auto';
    div_robustaRiscos.style.textAlign = 'justify';
    if (estadoR == 5 || estadoR == 7) {
        div_robustaResposta.innerHTML = `Olá, ${nome_riscos.value}! Agradecemos por escolher nossa calculadora. <br><br>
  
      Com base nas características de sua plantação, você pode estar <b>perdendo uma parte significativa de sua produção</b>, chegando a até 15%. Isso representa um <b>valor anual de ${moedaR}!</b> <br><br>
      
      Essa perda é resultado da crise hídrica e das mudanças climáticas que afetam a produção em seu estado. No entanto, <b>trazemos boas notícias.</b> <button id="continuacao1" class="botao" onclick="continuacao1()" style="margin: 15px 20px 0 37px;">Quais notícias?</button>`;

        if (hectaresR >= 3) {
            div_robustaResposta.innerHTML = `Olá, ${nome_riscos.value}! Agradecemos por escolher nossa calculadora. <br><br>
  
        Com base nas características de sua plantação, você pode estar <b>perdendo uma parte significativa de sua produção</b>, chegando a até 20%. Isso representa um <b>valor anual de ${moedaRM}!</b> <br><br>
        
        Os fatores que afetam essa perda são: o estado que você está localizado, o porte elevado de sua plantação, possivelmente as <b>mudanças climáticas</b> e a crise hídrica, por conta da possível bienalidade negativa. No entanto, <b>trazemos boas notícias.</b> <button id="continuacao1" class="botao" onclick="continuacao1()" style="margin: 15px 20px 0 37px;">Quais notícias?</button>`;
        }
    } else {
        div_robustaResposta.innerHTML = `Olá, ${nome_riscos.value}! Agradecemos por escolher nossa calculadora. <br><br>
  
      Com base nas características de sua plantação, você pode estar <b>perdendo uma parte significativa de sua produção</b>, sendo entre 10 e 15%. Isso representa um <b>valor anual de ${moedaRP}!</b> <br><br>
      
      Essa perda é resultado das mudanças climáticas e da má utilização da água que pode afetar a produção em seu estado. No entanto, <b>trazemos boas notícias.</b> <button id="continuacao1" class="botao" onclick="continuacao1()" style="margin: 15px 20px 0 37px;">Quais notícias?</button>`;
    }
}

function continuacao1() {
    div_respostaArabica.innerHTML = `Considere a adoção de práticas de monitoramento inteligente para <b>mitigar os impactos climáticos e aumentar seus lucros</b>.<br><br>
  
    <h4 style="font: 700 15px 'Poppins'">Permita-nos compartilhar uma história de sucesso.</h4> <br>
     Uma lavoura, no Espírito Santo, implementou esse sistema, instalando sensores de temperatura e umidade, bem como um sistema de irrigação inteligente. <br><br>
  
    <button id="continuacao2" class="botao" onclick="continuacao2()" style="margin: 15px 20px 0 37px;">Qual foi o resultado?</button>`;

    div_robustaResposta.innerHTML = `Considere a adoção de práticas de monitoramento inteligente para <b>mitigar os impactos climáticos e aumentar seus lucros</b>.<br><br>
  
    <h4 style="font: 700 15px 'Poppins'">Permita-nos compartilhar uma história de sucesso.</h4> <br>
     Uma lavoura, no Espírito Santo, implementou esse sistema, instalando sensores de temperatura e umidade, bem como um sistema de irrigação inteligente. <br><br>
  
    <button id="continuacao2" class="botao" onclick="continuacao2()" style="margin: 15px 20px 0 37px;">Qual foi o resultado?</button>`;
}

function continuacao2() {
    div_respostaArabica.innerHTML = `<b>Os resultados foram notáveis!</b> Redução nas perdas de produção, aumento de até 20% na qualidade das colheitas e economia de 25% em recursos hídricos e adubo. <br><br>
  
    Agora, eles estão colhendo os frutos de uma lavoura mais sustentável e lucrativa. <b>Quer saber como alcançar resultados semelhantes?</b> <br><br>
  
    Basta se registrar em nosso site para obter informações detalhadas e acessar uma calculadora de cotação exclusiva. <br><br>
    <b>Obrigado por confiar em nós!</b>`

    div_robustaResposta.innerHTML = `<b>Os resultados foram notáveis!</b> Redução nas perdas de produção, aumento de até 20% na qualidade das colheitas e economia de 25% em recursos hídricos e adubo. <br><br>
  
    Agora, eles estão colhendo os frutos de uma lavoura mais sustentável e lucrativa. <b>Quer saber como alcançar resultados semelhantes?</b> <br><br>
  
    Basta se registrar em nosso site para obter informações detalhadas e acessar uma calculadora de cotação exclusiva. <br><br>
    <b>Obrigado por confiar em nós!</b>`
}

function limparPlace(input, placeholderText) {
    input.placeholder = '';
}

function voltarPlace(input, placeholderText) {
    if (input.value === '') {
        input.placeholder = placeholderText;
    }

}

var radioIrr = document.getElementById('radioIrr');


function div_nt() {
    div_n.innerHTML = "*Nossa equipe instalará um sistema de irrigação por aspersão."; 
    div_o.innerHTML = "";
    irrig.style.padding = '0 47px 0 51px';
}

function div_ntn() {
    div_n.innerHTML = "";
    div_o.innerHTML = "";
    irrig.style.padding = '0';
}

function div_non() {
    div_n.innerHTML = "";
    div_o.innerHTML = "*Nossa equipe irá retirar o seu sistema de irrigação e instalará um sistema de irrigação por aspersão.";
    irrig.style.padding = '0 47px 0 51px';

}