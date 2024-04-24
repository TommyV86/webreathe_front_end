$(document).ready(()=>{

    let isFetch = false;

    // --------------------FONCTIONS------------------------------//

    // fonction d'initialisation de modules récupérés en bdd
    function initModulesTable(modules){
        $('#modules-table tbody').empty();
        console.log('modules from db:',modules);
        modules.forEach(module => {
            let row = $("<tr>");
            row.append($('<td>').text(module.id));
            row.append($('<td>').text(formatDate(module.date)));
            row.append($('<td>').text(module.name));
            row.append($('<td>').text(module.description));
            row.append($('<td>').text(module.speed));
            row.append($('<td>').text(module.temperature + ' C°'));
            row.append($('<td>').text(module.state));
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
            url: 'https://localhost:8000/module/get_all',
            method: 'GET',
            success: (resp)=>{
                initModulesTable(resp);
            }
        });

        $.ajax({
            url: 'https://localhost:8000/history/get_all',
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