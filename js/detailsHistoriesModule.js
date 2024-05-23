$(document).ready(()=>{

    const localhost = 'https://localhost:8000/';

    
    // fonction pour obtenir les paramètres de l'URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // fonction pour convertir et formater la date
    function formatDate(dateString) {
        let date = new Date(dateString);
        let formattedDate = date.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return formattedDate;
    };

    // fonction d'initialisation d'historiques de module récupérés en bdd
    function initHistoriesModuleTable(historiesModule) {
        let title = $("<h2>").attr('class', 'title-module');
        let displayCount = $("<h3>").attr('class', 'display-count');
        let count = 0;
        
        if (historiesModule.length == 0) {
            title.text('Ce module ne contient aucune panne actuellement');
            $('body').prepend(title);
        }

        $('#histories-module-table tbody').empty();
        historiesModule.forEach(history => {
            count += 1;
            let row = $("<tr>");
            title.text("Historique du module : " + history.module.name);
            row.append($('<td>').text(formatDate(history.date)));
            row.append($('<td>').text(history.speedModule));
            row.append($('<td>').text(history.temperatureModule + ' °C'));
            $('#histories-module-table tbody').append(row);
        });    

        displayCount.text("nombre de panne : " + count);     
        $('body').prepend(displayCount)
                 .prepend(title);       
    }


    // requêtes ajax bdd
    function fetchData() {
        const moduleId = getUrlParameter('moduleId');
        $.ajax({
            url: localhost + 'history/get_histories_by_id_module',
            method: 'GET',
            data: {moduleId: moduleId}, //récuperation de l'id dans le parametre moduleId de l'url
            success: (response) => {
                initHistoriesModuleTable(response);
            },
            error: (error) => {
                console.error('Erreur de la récuperation des données', error);
            }
        })
    }

    fetchData();
})
