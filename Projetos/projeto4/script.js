let item = 0 ;// contador de imagens
const max = 14;//numero da última imagem

function proxImagem(img){
    fetch(`img/${img}.jpg`)
        .then(resp => resp.blob())//blob = qualquer coisa que não seja texto
        .then(blob => {
            const imaggeObjctURL = URL .createObjectURL(blob);
            console.log(imaggeObjctURL);

            const proxImg = document.createElement("img");
            proxImg.src = imaggeObjctURL;
            document.getElementById("placeholder").appendChild(proxImg);

                 // Atualiza o contador para a próxima imagem
                 item = (item + 1) % (max + 1);
        })
        // .catch(error => {
        //     console.error('Erro ao carregar a imagem:', error);
        // })
}



window.onload = function(){
    for (;item < 5 ; item++ ){
        proxImagem(item);
    }
   setInterval(function(){
        proxImagem(item++ % max)
        let scrollPoint = window.scroll + window.innerHeight;
        window.scrollTo({top: scrollPoint, behavior: 'smooth'})
    
    }, 2000);
}

window.onscroll = function(){
    let altura = document.body.scrollHeight;
    let scrollPoint = window.scrollY + window.innerHeight;
    if(scrollPoint >= altura){
        proxImagem(item++ %14);
        }
        
        }



