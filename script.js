// Animation SideNav

function openNav() {
    document.getElementById("mySidenav").style.width = "270px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Buttons Section 3 

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

function href(place){
    window.location.href=place+".html";
}

function limpar(element, elementLabel){

    var legenda = elementLabel.innerHTML;
    var texto = element.value;

    if(legenda == ""){
        var setLegenda = element.placeholder;
        console.log(setLegenda)
        element.removeAttribute("placeholder");
        elementLabel.innerHTML = setLegenda;
    }else if(texto == ""){
        elementLabel.innerHTML = "";
        element.placeholder = legenda;
    }
}