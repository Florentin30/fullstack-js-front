// Fichir JS côté Front End

console.log("Mon premier Script js affiché côté Front"); // Log Navigateur, quasi inutile


// Création et gestion de l'API :  Utilisation de Fetch, module natif dans les navigateurs, pour relancer des requetes HTTP vers les serveurs
// Autre module utile : la Geolocalisation navigateur, le Local storage, etc

fetch("http://localhost:4000/bonjour")
    .then( res => res.text())
    .then( message => {
        console.log(message) ;
})

const elemClients = document.querySelector("#listeClients");
elemClients.innerHTML = ""



fetch("http://localhost:4000/clients")
    .then( res => res.json())
    .then( clients => {
        // Pour chaque client, rajouter un élément Li
        clients.forEach(client => {
            elemClients.innerHTML += 
            `<li>${client.prenom} ${client.nom}</li>`
        }) ;
})


// Créer un nouveau client

const formClient = document.querySelector("#formClient");
formClient.addEventListener("submit", event => {
    event.preventDefault(); // Annuler l'envoi par défaut au serveur

    const client = { // Pour collecter les données
        nom: formClient.nom.value,
        prenom: formClient.prenom.value
    };
    fetch("http://localhost:4000/clients",{
        method: "POST",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json"
        }
    }).then( () => {

        const elemClients = document.querySelector("#listeClients");
        elemClients.innerHTML = ""
        
        fetch("http://localhost:4000/clients")
            .then( res => res.json())
            .then( clients => {
                // Pour chaque client, rajouter un élément Li
                clients.forEach(client => {
                    elemClients.innerHTML += 
                    `<li>${client.prenom} ${client.nom}</li>`
                });
            })
        ;
    });

});
