
function categoria(){
    this.categoria;
}

var url = "http://localhost:3000";

function inserimentocategoria(){

let cat = new categoria();
cat.categoria     = document.getElementById('nomeMod').value;

fetch(url + '/inserimentocategoria',{
    method : 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(cat)
})
}

//elimina categoria

function eliminazioneCategoria(){
    let nomeCat = document.getElementById('nomeCat').value;
    fetch(url + '/eliminazionecategoria/' + nomeCat, {
        method : 'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        },
    });
}

//modifica nome di una categoria

function modificaNomeCategoria(){
    let modCat = document.getElementById('modCat').value;
    let idCat = document.getElementById('idCat').value;
    fetch(url + '/modificaNomeCategoria/' + idCat, {
        method : 'PUT',
        body: JSON.stringify({modCat: modCat}),
        headers:{
            'Content-Type' : 'application/json'
        },
    }).then(() => window.location.reload());
}

//stampa categorie

function stampaCat(){
    fetch(url + '/stampaCat').then(
        result =>{
            result.json().then(data=>{
                console.log(data.result);
                
                data.result.forEach(element => {
                    document.getElementById("stampa").innerHTML +=`
                    <div>${element.nomeMod}</div>`
                });
            })
        }
    ); 
}


