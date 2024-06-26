const pwd =document.getElementById("pwd")
const pwd2 =document.getElementById("pwd2")
const nasc =document.getElementById("nasc")
const idade =document.getElementById("idade")
const tel =document.getElementById("tel")
const cpf =document.getElementById("cpf")


function validate(item){
    item.setCustomValidity('');
    item.checkValidity();

    if(item == pwd2){
        if(item.value == pwd.value){
            item.setCustomValidity('');
        }else{
            item.setCustomValidity('As senhas não batem');
        }
    }
    if(item == nasc){
            let hoje = new Date(); //obtem data atual
            let dnasc = new Date(nasc.value); //obtem data do formulário

            let valorIdade = hoje.getFullYear() - dnasc.getFullYear();
            let dm = hoje.getMonth() - dnasc.getMonth();
            if(dm < 0 || (dm === 0 && hoje.getDate() < dnasc.getDate())){
                valorIdade--;//ainda não fez aniversário esse ano
            }
            idade.value = valorIdade + " Anos"
            if(valorIdade > 130 ){
                item.setCustomValidity('Você não pode mentir na idade tão descaradamente');

            } else if(valorIdade < 0 ){
                item.setCustomValidity('Há algo de errado com a sua idade');
                idade.value = "ainda não nascido"
            }else if(valorIdade < 0 ){
                item.setCustomValidity('Você precisa ter pelo menos 18 anos de idade');

            }else{
                item.setCustomValidity('');
            }
          }
          if(item == cpf){
          let numCPF = cpf.value.replace(/[^0-9]/g , "")
              console.log(numCPF)
              if (validateCPF(numCPF)){
                  item.setCustomValidity("");
              }else{
                item.setCustomValidity("CPF inválido");
          
              }
          }
}
function maskTell(){
    let strTel = tel.value;
    if (strTel.length == 2){
        tel.value = "(" + tel.value +") "
    }else if (strTel.length == 10){
        tel.value += "-" 
    }
}
function maskCPF(){
    let strCPF = cpf.value;
    if (strCPF.length == 3 || strCPF.length == 7){cpf.value += ".";}
    if (strCPF.length == 11 ){cpf.value += "-";}

    validate(cpf)
}

pwd.addEventListener("input",function(){ validate(pwd)} )
pwd2.addEventListener("input",function(){ validate(pwd2)} )
nasc.addEventListener("input",function(){ validate(nasc)} )
tel.addEventListener("input", maskTell )
cpf.addEventListener("input", maskCPF )


pwd.addEventListener("invalid",function(){ 
    if (pwd.value == ""){
        pwd.setCustomValidity('insira uma senha !');
    }else{
        pwd.setCustomValidity('insira pelo menos: um número,letra maiúscula e minúscula e 8 caracteres');

    }
} )

function validateCPF(cpf){
    //Para valida��o via Luhn: https://developers.ebanx.com/validation-rules-for-brazil/
    var number, digits, sum, i, result, equal_digits;
    equal_digits = 1;
    if (cpf.length < 11)
      return false;
    for (i = 0; i < cpf.length - 1; i++)
      if (cpf.charAt(i) != cpf.charAt(i + 1)) {
        equal_digits = 0;
        break;
      }
    if (!equal_digits) {
      number = cpf.substring(0, 9);
      digits = cpf.substring(9);
      sum = 0;
      for (i = 10; i > 1; i--)
        sum += number.charAt(10 - i) * i;
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result != digits.charAt(0))
        return false;
      number = cpf.substring(0, 10);
      sum = 0;
      for (i = 11; i > 1; i--)
        sum += number.charAt(11 - i) * i;
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result != digits.charAt(1))
        return false;
      return true;
    }
    else
      return false;   
  }


