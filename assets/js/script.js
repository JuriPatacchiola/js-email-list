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
});