function ins(){
    this.nomeprodotto;
    this.catprodotto;
    this.prezzo;
    this.descrizione;
    this.foto;
}
//inserimentoProdotto
function inserimentoProdotto(){

    let ut = new ins();
    ut.nomeprodotto = document.getElementById('nomeprodotto').value;
    ut.catprodotto = document.getElementById('catprodotto').value;
    ut.prezzo = document.getElementById('prezzo').value;
    ut.descrizione = document.getElementById('descrizione').value;
    ut.foto = document.getElementById('foto').value;
    
    
    fetch(url + '/inserimentoProdotto',{
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(ut)
    })
    }

    //elimina singolo prdotto

function eliminazioneProdotto(){
    let nomeprodotto = document.getElementById('nomeprodotto2').value;
    console.log(nomeprodotto);
    fetch(url + '/eliminazioneprodotto/' + nomeprodotto, {
        method : 'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        },
    });
}
    //elimina i prdotti attraverso l'id della categoria

function eliminazioneProdottiID(){
    let idcatprodotto = document.getElementById('idcatprodotto').value;
    console.log(idcatprodotto);
    fetch(url + '/eliminazioneprodotti/' + idcatprodotto, {
        method : 'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        },
    });
}

//modifica scheda prodotto

function modificaSchedaProdotto(){
    let idP = document.getElementById('idP').value;
    let nomeprodotto3 = document.getElementById('nomeprodotto3').value;
    let catprodotto3 = document.getElementById('catprodotto3').value;
    let prezzoPr = document.getElementById('prezzoPr').value;
    let descrizionePr = document.getElementById('descrizionePr').value;
    let fotoPr = document.getElementById('fotoPr').value;

    fetch(url + '/msp/:'+ idP, {
        method : 'PUT',
        body: JSON.stringify({idP, nomeprodotto3, catprodotto3, prezzoPr, descrizionePr, fotoPr}),
        headers:{
            'Content-Type' : 'application/json'
        },
    }).then((res) => res.json()).then((ris) => console.log(ris));
}