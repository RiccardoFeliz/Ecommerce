//npm è il repository(=archivio da cui recupera le librerie che gli servono) di node.js 
//npm init-y  crea un file package.json ovvimente da lanciare nella cartella backend  
const express = require('express');
const cors = require('cors');               // con il require dico di importare i moduli nello specifico questi 3
const bodyparser = require('body-parser');
const db = require('mysql2'); //import libreria mysql2
const res = require('express/lib/response');
const req = require('express/lib/request');
const { response } = require('express');



const app = express();      //creo l'istanza del mio server 

app.use(cors());            //imposto al server la libreria cors
app.use(bodyparser.json());//imposto al server la libreria bodyparser, nello specifico configuro json per modellare i dati nel body

const connessione = db.createConnection({
    host: 'localhost',
    user:'root',
    password:'3Ciccolato00!',
    database:'ecommerce',
    port:'3306'
});
//inserimento clienti
app.post('/inserimento', (request,result)=>{
    let nome = request.body.nome;
    let cognome = request.body.cognome;
    let tipologia = request.body.tipologia;
    let partitaIva = request.body.partitaIva;
    let codiceFiscale = request.body.codiceFiscale;
    let nazione = request.body.nazione;
    let via = request.body.via;
    let cap = request.body.cap;
    let comune = request.body.comune;
    let provincia = request.body.provincia;
    let telefonoFisso = request.body.telefonoFisso;
    let cellulare = request.body.cellulare;
    let email = request.body.email;
    let username = request.body.username;
    let password = request.body.password;
    
    
    let inserimento = `insert into clienti (nome, cognome, tipologia, partitaIva, codiceFiscale, nazione, via, cap, comune, provincia, telefonoFisso, cellulare, email, username, password) values('${nome}', '${cognome}', '${tipologia}', '${partitaIva}','${codiceFiscale}', '${nazione}', '${via}', '${cap}','${comune}', '${provincia}', '${telefonoFisso}', '${cellulare}','${email}', '${username}', '${password}')`;
    console.log(inserimento);
    connessione.query(inserimento, (errore, risultato)=>{
        result.send({
            messaggio : 'Dati inseriti correttamente'
            });
    })
});

app.get('/loginutente', (request,result)=>{

    console.log('Hanno effettuato una chiamata al login utente');

    let password = request.query.password;
    let email    = request.query.email;
    

    let istruzione = `select * from clienti where email = '${email}' and password = '${password}';`;
    console.log(istruzione);
    connessione.query(istruzione, (errore , risultato)=>{
        // risultato è un array
        
        if(risultato.length > 0){
            result.send({
                messaggio : 'tutto ok',
                data : risultato
            });
        }else{
            result.status(400);
            result.send({
                messaggio : 'non ho trovato nulla',
                result : null
            });
        }
    });
});

//inserimento nuova categoria 
app.post('/inserimentocategoria', (request,result)=>{
    let nomeMod = request.body.categoria;
    
    let inserimento = `insert into categoria (nomeMod) value ('${nomeMod}')`;
    console.log(inserimento);
    connessione.query(inserimento, (errore, risultato)=>{
        result.send({
            messaggio : 'La categoria è stata inserita correttamente'
            });
    })
});
//eliminazione categoria
app.delete('/eliminazionecategoria/:nomeCat', (request, result) => {
    console.log('tentativo');
    let nomeCat = request.params.nomeCat;
    
    let eliminazione = `DELETE FROM categoria WHERE nomeMod = '${nomeCat}'`;
    console.log(eliminazione);
    connessione.query(eliminazione, (errore, risultato)=>{
        result.send({
            messaggio : 'La categoria è stata eliminata correttamente'
            });
    })
});

//modifica nome categoria
app.put('/modificaNomeCategoria/:idCat', (request, result) => {

    let modCat = request.body.modCat;
    let idCat = request.params.idCat;
    
    let modifica = `UPDATE categoria SET nomeMod = ('${modCat}') WHERE idcategoria = ${idCat};`;

    connessione.query(modifica, (errore, risultato)=>{
        result.send({
            messaggio : 'La categoria è stata modificata correttamente'
            });
    })
});

//Stampa tutte le categorie

app.get('/stampaCat', (request,result)=>{

    let stampa = `select * from categoria;`;
    connessione.query(stampa,(errore,risultato)=>{
        if(risultato.length>0){
            result.send({
                message : 'ok',
                result : risultato
            })
        }
        else{
            console.log('è vuota');
        }
    })
    
});

//inserimento nuovo prodotto 

app.post('/inserimentoProdotto', (request,result)=>{
    let nomeprodotto = request.body.nomeprodotto;
    let catprodotto = request.body.catprodotto;
    let prezzo = request.body.prezzo;
    let descrizione = request.body.descrizione;
    let foto = request.body.foto;
    
    let inserisci = `insert into prodotti (nomeprodotto, catprodotto, prezzo, descrizione, foto) values('${nomeprodotto}', '${catprodotto}', '${prezzo}', '${descrizione}','${foto}')`;
    console.log(inserisci);
    connessione.query(inserisci, (errore, risultato)=>{
        result.send({
            messaggio : 'Prodotto inserito correttamente'
            });
    })
});

//eliminazione prodotto
app.delete('/eliminazioneprodotto/:nomeprodotto', (request, result) => {
    console.log('tentativo');
    let nomeprodotto = request.params.nomeprodotto;
    
    let eliminaProdotto = `DELETE FROM prodotti WHERE nomeprodotto = '${nomeprodotto}'`;
    console.log(eliminaProdotto);
    connessione.query(eliminaProdotto, (errore, risultato)=>{
        result.send({
            messaggio : 'Il prodotto è stato eliminato correttamente'
            });
    })
});

//eliminazione prodotti da id categoria
app.delete('/eliminazioneprodotti/:idcatprodotto', (request, result) => {
    let idcatprodotto = request.params.idcatprodotto;
    
    console.log(idcatprodotto);
    let elimina = `DELETE FROM prodotti WHERE catprodotto = ${idcatprodotto}`;
    console.log(elimina);
    connessione.query(elimina, (errore, risultato)=>{
        result.send({
            messaggio : 'I prodotti sono stati eliminati correttamente'
            });
    })
});

//modifica scheda prodotto

app.put('/msp/:idP', (request, result) => {

    let idP = request.body.idP;
    let nomeprodotto3 = request.body.nomeprodotto3;
    let catprodotto3 = request.body.catprodotto3;
    let prezzoPr = request.body.prezzoPr;
    let descrizionePr = request.body.descrizionePr;
    let fotoPr = request.body.fotoPr;
    
    let modificaProd = `UPDATE prodotti SET nomeprodotto = ('${nomeprodotto3}'), catprodotto = ${catprodotto3}, prezzo =('${prezzoPr}'), descrizione = ('${descrizionePr}'), foto = ('${fotoPr}') where idP = ${idP}`;
    console.log(modificaProd);
    connessione.query(modificaProd, (errore, risultato)=>{
        result.send({
            errore,
            messaggio : 'Il prodotto è stato modificato correttamente'
    
            });
    })
});




app.listen(3000, ()=>{
    console.log('Server avviato correttamente');
}); 
