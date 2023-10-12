// Recuperação de Senha - Validação Input CPF/CNPJ

function cpfCnpjValidate() {
    if (!cpfRegex.test(CNPJ.value)) {
        CNPJ.style.borderBottom = '1px solid #e63636';
        span_validate.style.display = 'block';
    } else {
        CNPJ.style.borderBottom = '';
        span_validate.style.display = 'none';
    }
}

// Recuperação de Senha - Alert 

function recuperar() {
    if (!cpfRegex.test(CNPJ.value)) {
        return false; // Impede o envio do formulário. Pois, como coloquei o onsubmit="return recuperar()", se a função retornar false, o form não será enviado, caso contrario (return true), o form será enviado.
    } else {
        alert(`Link de recuperação enviado ao email associado a este CNPJ, você já pode fechar esta janela.`);
        form.submit();
        return true;
    }
}