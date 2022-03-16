
function utente(){
    this.nome;
    this.cognome;
    this.tipologia;
    this.partitaIva;
    this.codiceFiscale;
    this.nazione;
    this.via;
    this.cap;
    this.comune;
    this.provincia;
    this.telefonoFisso;
    this.cellulare;
    this.email;
    this.username;
    this.password;
}

var url = "http://localhost:3000";

function inserimento(){

let ut = new utente();
ut.nome     = document.getElementById('nome').value;
ut.cognome     = document.getElementById('cognome').value;
ut.tipologia     = document.getElementById('tipologia').value;
ut.partitaIva     = document.getElementById('partitaIva').value;
ut.codiceFiscale     = document.getElementById('codiceFiscale').value;
ut.nazione     = document.getElementById('nazione').value;
ut.via     = document.getElementById('via').value;
ut.cap     = document.getElementById('cap').value;
ut.comune     = document.getElementById('comune').value;
ut.provincia     = document.getElementById('provincia').value;
ut.telefonoFisso     = document.getElementById('telefonoFisso').value;
ut.cellulare     = document.getElementById('cellulare').value;
ut.email     = document.getElementById('email').value;
ut.username     = document.getElementById('username').value;
ut.password     = document.getElementById('password').value;

fetch(url + '/inserimento',{
    method : 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(ut)
})
}