$(document).ready(() => {
    // Gestionnaire d'événement pour soumettre le formulaire
    $('#add-module-form').submit((event) => {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        // Récupérer les données du formulaire
        let formData = {
            name: $('input[name="name"]').val(),
            description: $('input[name="description"]').val()
        };

        // Envoyer les données via AJAX
        $.ajax({
            url: 'https://localhost:8000/module/save', 
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: (response) => {
                console.log('Module ajouté avec succès:', response);
                window.location.assign('index.html')
            },
            error: (error) => {
                // Gérer les erreurs en cas d'échec de la requête AJAX
                console.error('Erreur lors de l\'ajout du module:', error);
            }
        });
    });
});
