$(document).ready(()=>{

    let isFetch = false;
    const localhost = 'https://localhost:8000/';

    // --------------------FONCTIONS------------------------------//

    // fonction d'initialisation de modules récupérés en bdd
    function initModulesTable(modules){
        $('#modules-table tbody').empty();
        console.log('modules from db:',modules);
        modules.forEach(module => {
            let row = $("<tr>");
            let stateCell = $("<td>").text(module.state);
            // lien de redirection avec l'ID du module
            let link = $('<a>').attr('href', '../view/histories-module.html?moduleId=' + module.id).text('voir tout l\'historique');

            row.append($('<td>').text(module.id));
            row.append($('<td>').text(formatDate(module.date)));
            row.append($('<td>').text(module.name));
            row.append($('<td>').text(module.description));
            row.append($('<td>').text(module.speed));
            row.append($('<td>').text(module.temperature + ' °C'));
            row.append($('<td>').append(link));


            // ajout d'une classe CSS en fonction de la valeur de l'etat
            if (module.state === 'En marche') {
                stateCell.addClass('on');
            } else if (module.state === 'En panne') {
                stateCell.addClass('off');
            }
            row.append(stateCell);

            $('#modules-table tbody').append(row);
        });
    }

    // fonction d'initialisation de d'historiques récupérés en bdd
    function initHistoryTable(histories){
        // Vide la table avant d'ajouter les données mises à jour
        $('#histories-table tbody').empty(); 
        console.log('histories from db:',histories);
        histories.forEach(history => {
            let row = $('<tr>');
            row.append($('<td>').text(history.id));
            row.append($('<td>').text(formatDate(history.date)));
            row.append($('<td>').text(history.module.name));
            row.append($('<td>').text(history.speedModule));
            row.append($('<td>').text(history.temperatureModule + ' °C'));
            $('#histories-table tbody').append(row);
        });
    };

    // fonction pour convertir et formater la date
    function formatDate(dateString) {
        let date = new Date(dateString);
        let formattedDate = date.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return formattedDate;
    };

    // requêtes ajax en bdd
    function fetchData() {
        $.ajax({
            url: localhost + 'module/get_all',
            method: 'GET',
            success: (resp)=>{
                initModulesTable(resp);
            }
        });

        $.ajax({
            url: localhost + 'history/get_all',
            method: 'GET',
            success: (resp)=>{
                initHistoryTable(resp);
            }
        }); 
        isFetch = true;
    };
    // --------------------FONCTIONS (fin)------------------------------//


    // premier appel de fonction fetch data 
    if(isFetch == false) fetchData();
    
    // rafraichissement des données toutes les 10 sec
    setInterval(fetchData, 10000); 
});