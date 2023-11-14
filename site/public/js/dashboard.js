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


