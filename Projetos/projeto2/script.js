const apilinkIBGE = "https://servicodados.ibge.gov.br/api/v1/localidades/"
const uf = document.getElementById("uf")
const cidade = document.getElementById("cidade")
const paises = document.getElementById("pais")


window.onload = function(){

    fetch(apilinkIBGE+"/paises?orderBy=nome")
    .then(resp => resp.json())
    .then(json => {
        json.forEach(function(pais) {
            paises.innerHTML += `<option value="${pais.id.M49}">${pais.nome} (${pais.id["ISO-ALPHA-3"]}) </option>`;

        });
    })
}


paises.addEventListener("change", function(){
    if(paises.value =="76"){
        fetch(`${apilinkIBGE}/estados?orderBy=nome`)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(function(estado) {
                uf.innerHTML += `<option value="${estado.id}">${estado.sigla} - ${estado.nome}</option>`;
            });
        })
    } else{
            uf.innerHTML = '<option value=""></options>';
            cidade.innerHTML = '<option value=""></options>';

    }
})




uf.addEventListener("change", function(){
    cidade.innerHTML = '<option value=""></options>'
    fetch(`${apilinkIBGE}/estados/${uf.value}/municipios?orderBy=nome`)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(function(municipio) {
            cidade.innerHTML += `<option value="${municipio.id}">${municipio.nome}</option>`;
        });
    })
})


