$(document).ready(()=>{

    let isFetch = false;
    const localhost = 'https://localhost:8000/';
    let myChart = null;

    // --------------------FONCTIONS------------------------------//

    // fonction d'initialisation du graphique avec Chart.js
    function initChart(labels, speeds, temperatures) {

        // rafraîchissement du graphique ou initialisation si nécessaire
        if (myChart) {
            // mise à jour des données du graphique existant
            myChart.data.labels = labels;
            myChart.data.datasets[0].data = speeds;
            myChart.data.datasets[1].data = temperatures;
            myChart.update();
        } else {
            const ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar', // utiliser 'bar', 'line', etc. selon besoins
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Vitesse',
                        data: speeds,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Température (°C)',
                        data: temperatures,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    // fonction d'initialisation de modules récupérés en bdd
    function initModulesTable(modules){
        $('#modules-table tbody').empty();
        console.log('modules from db:',modules);

        let labels = [];
        let speeds = [];
        let temperatures = [];

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

            // ajout des données pour le graphique
            labels.push(module.name);
            speeds.push(module.speed);
            temperatures.push(module.temperature);
        });

        // initialisation du graphique
        initChart(labels, speeds, temperatures);
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