function utente() {
    this.email;
    this.password;
}

function invia(){

    let url = 'http://localhost:3000/loginutente';

    //let url = 'http://localhost:3000/loginutente?email=info@email.it&password=1234';

    let messaggio = '';

    let ut = new utente();
    ut.email    = document.getElementById('email').value;
    ut.password = document.getElementById('password').value;

    console.log(ut);

    url += '?';

    for(let i in ut){
        url += i + '=' + ut[i] + '&';
    }

    url = url.slice(0,-1);

    fetch(url).then(result=>result.json()).then(data=>{
        let ut = data.data
        let utroll = ut[0].ruolo;

        if(utroll== 'admin'){
            alert('Autenticazione avvenuta con successo');
            document.location.href = "admin.html";

        }else{
            document.location.href = 'index.html';
            alert('Autenticazione avvenuta con successo');
        }

        
    })

    .catch(
        error => {
            console.log(error);
        }
    );
}