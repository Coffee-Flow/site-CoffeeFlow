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

// 

function href(place){
    window.location.href=place+".html";
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
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var senhaRegex = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{12,}$/;
var cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    nameValidate();
    emailValidate();
    cpfValidate();
    mainPasswordValidate();
    comparePassword();
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
    if (campos[0].value.length < 3) {
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

// Mostrar senha

function mudarTipo(input) {
    if (input.type === 'password') {
        input.type = 'text';
    } else {
       input.type = 'password';
    }
}

// Validação inputs Tela de Login

function emailValidateLogin() {
    if (!emailRegex.test(email.value)) {
        email.style.borderBottom = '1px solid #e63636';
        span_validate[0].style.display = 'block';
    } else {
        email.style.borderBottom = '';
        span_validate[0].style.display = 'none';
    }
}

function PasswordValidateLogin() {
    if (!senhaRegex.test(senha.value)) {
        senha.style.borderBottom = '1px solid #e63636';
        span_validate[1].style.display = 'block';
    } else {
        senha.style.borderBottom = '';
        span_validate[1].style.display = 'none';
        
    }
}

// Simulador Financeiro

var nome = "";
var largura = 0;
var comprimento = 0;
var espaplan = 0;
var espalinha = 0;
var rad1 = 0;
var irriga = "aspersão";
var rad2 = 0;
var sensores = 0;
var cafeeiros = 0;
var cafe = 0;
var sacas = 0;
var preco = 779.9;
var dinheiro = 0;
var vendaa = 0;
var hectar = 10000;
var safra = 0;

function proximo1() {
    nome = input_nome.value;
    div_a.innerHTML = `<input id="input_largura" type="number" class="input-form required" onfocus="limpar(this, larguraL)" onblur="limpar(this, larguraL)" minlength="1" required style="width:40%;"/>
    <label class="label" id="larguraL" for="largura">Qual a largura do seu plantio? (em metros)?</label>
    <button id="btn_proximo" onclick="proximo2()">Proximo</button>`;
}

function proximo2() {
    largura = Number(input_largura.value);
    div_a.innerHTML = `<input id="input_comprimento" type="number" class="input-form required" onfocus="limpar(this, comprimentoL)" onblur="limpar(this, comprimentoL)" minlength="1" required style="width:40%;"/>
    <label class="label" id="comprimentoL" for="comprimento">Qual o comprimento do seu plantio? (em metros)?</label>
    <button id="btn_proximo" onclick="proximo3()">Proximo</button>`;
  }

  function proximo3() {
    comprimento = Number(input_comprimento.value);
    div_a.innerHTML = `<input id="input_espalinha" type="number" class="input-form required" onfocus="limpar(this, espalinhaL)" onblur="limpar(this, espalinhaL)" minlength="1" required style="width:40%;"/>
    <label class="label" id="espalinhaL" for="espalinha">Qual o espaçamento entre linhas? (em metros)</label>
    <button id="btn_proximo" onclick="proximo4()">Proximo</button>`;
  }

  function proximo4() {
    espalinha = Number(input_espalinha.value);
    div_a.innerHTML = `<input id="input_espaplan" type="number" class="input-form required" onfocus="limpar(this, espaplanL)" onblur="limpar(this, espaplanL)" minlength="1" required style="width:40%;"/>
    <label class="label" id="espaplanL" for="espaplan">Qual o espaçamento das plantas? (em metros)</label>
    <button id="btn_proximo" onclick="proximo5()">Proximo</button>`;
  }

  function proximo5() {
    espaplan = Number(input_espaplan.value);
    div_a.innerHTML = `<span class="span-form"> Você já possui um sistema de irrigação? </span>
    <div style="display: flex; gap: 12px;">
        Sim: <input type="radio" name="rad1" onclick="rad1s()">
        Não <input type="radio" name="rad1"> 
    </div>
    <button id="btn_proximo" onclick="proximo6()">Proximo</button>`;
  }

  function rad1s() {
    rad1 = 1;
  }
  function proximo6() {
    if (rad1 == 1) {
      div_a.innerHTML = `<span class="span-form"> Qual é esse sistema?</span> 
      <div style="display: flex; gap: 12px;">
            Aspersão: <input type="radio" name="sis" onclick="asper()">
            Superfície: <input type="radio" name="sis" onclick="super()">
            Localizada: <input type="radio" name="sis" onclick="local()">
            Subirrigação: <input type="radio" name="sis" onclick="subi()">
        </div>
      <button id="btn_proximo" onclick="proximo9()">Proximo</button>`;
    } else {
      div_a.innerHTML = `<span class="span-form">Você deseja fazer um sistema de irrigação com a nossa empresa?</span> 
        <div style="display: flex; gap: 12px;">
        Sim: <input type="radio" name="rad2" onclick="fazersim()">
        Não: <input type="radio" name="rad2">
        </div>
      <button id="btn_proximo" onclick="proximo8()">Proximo</button>`;
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
  function fazersim() {
    rad2 = 1;
  }
  function proximo8() {
    cafeeiros = ((comprimento / espaplan) * largura) / espalinha;
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

    div_a.innerHTML = `Olá ${nome}, o seu plantio de café é de ${largura * comprimento} metros quadrados e tem ${cafeeiros} cafeeiros.`;
        
    if (rad2 == 1) {
        div_b.innerHTML = `O seu plantio não possui um sistema de irrigação mas você quer fazer com a nossa empresa.`;
    } else 
        div_b.innerHTML = `O seu plantio não possui um sistema de irrigação e você não quer fazer com a nossa empresa.`;
        div_d.innerHTML = `A produção do seu plantio em média é de ${safra.toFixed(0)} sacas de café.`;
        div_e.innerHTML = `Que equivalem á ${moeda}`;
        
    if (rad2 == 0) {
        div_f.innerHTML = `Caso queira ver como seria se sua plantação fosse irrigada com aspersão com a nossa empresa<br>
        <button id="btn_proximo" onclick="proximo9()">Plantação Irrigada</button>`;
    } else {
        div_f.innerHTML = `Caso queira ver como será sua plantação quando tiver o nosso sistema de aspersão da nossa empresa<br>
        <button id="btn_proximo" style="width: 300px;" onclick="proximo9()">Plantação Irrigada</button>`;}

    div_f.innerHTML += `Quanto custaria para investir no nosso projeto<button onclick="investimentoS()">Investir</button>`;
  }
  function proximo9() {
    cafeeiros = ((comprimento / espaplan) * largura) / espalinha;
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

    div_a.innerHTML = `Olá ${nome}, o seu plantio de café é de ${
      largura * comprimento
    } metros quadrados e tem ${cafeeiros} cafeeiros.`;
    div_b.innerHTML = `O seu plantio já utiliza de um sistema de irrigação e o tipo de irrigação é por ${irriga}.`;
    div_d.innerHTML = `A produção do seu plantio em média é de ${safra.toFixed(0)} sacas de café.`;
    div_e.innerHTML = `Que equivalem á ${moeda}`;
    div_f.innerHTML = `Se fosse sem irrigação<br>
    <button id="btn_proximo" onclick="proximo8()">Plantação Sequeira</button>`;
    div_f.innerHTML += `Quanto custaria para investir no nosso projeto:
    <button id="btn_proximo" onclick="investimentoC()">Investir</button>`;
  }
