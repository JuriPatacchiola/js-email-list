const API_URL = 'https://flynn.boolean.careers/exercises/api/random/mail';
const btn = document.getElementById('generate');
const list = document.getElementById('emails');
const errorBox = document.getElementById('error');
const howMany = document.getElementById('howMany');
const status = document.getElementById('status');

// qui metto l'evento del click per il bottone
btn.addEventListener('click', function () {

  // qui mi metto a pulire la lista e azzero eventuali messaggi di errore o di stato
  list.innerHTML = '';
  errorBox.textContent = '';
  status.textContent = 'Caricamento...';

  // qui ho disabilitato il bottone quando sta lavorando per creare le email 
  btn.disabled = true; 

  // qui prendo il numero delle mail che devo generare che per default sono 10
  const n = Number(howMany.value) || 10;

  // qui Creo un array dove andrò a salvare le email
  const emails = [];

  // in questa parte mi sto creando un ciclo for per fare il numero di richieste che servono al server
  for (let i = 0; i < n; i++) {

    // Qui uso fetch() Con fetch invio la richiesta all'API e aspetto la risposta
    fetch(API_URL)

      // Converto la risposta in formato JSON che serve per convertire tutto in testo
      .then(response => response.json())

      .then(data => {
        // in questo caso ho preso solo la parte della @ e ci aggiungo un dominio fisso che nel caso mio è gmail.com
        const nome = data.response.split('@')[0];
        const emailGenerata = nome + '@gmaiil.com';

        // qui invece ho aggiungo la nuova email all'array che ho creato prima che era vuota
        emails.push(emailGenerata);

        // in questa parte ho creato un nuovo elemento <li> per mostrarla in pagina appena carica le email
        const li = document.createElement('li');
        li.textContent = emailGenerata;
        list.appendChild(li);

        // mentre qui Se ho finito di generare tutte le email, aggiorno lo stato
        if (emails.length === n) {
          status.textContent = `Completato — ${emails.length} email generate.`;

          // solo quando ho finito riattivo il bottone
          btn.disabled = false;
        }
      })

      .catch(() => {
        // Qui gestisco eventuali errori di rete se mai sono presenti
        errorBox.textContent = 'Errore durante il caricamento.';
        btn.disabled = false;
      });
  }
});
