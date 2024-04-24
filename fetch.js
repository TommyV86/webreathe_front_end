$(document).ready(()=>{
    $.ajax({
        url: 'https://localhost:8000/module/get_all',
        method: 'GET',
        success: (resp)=>{
            let modules = resp;
            // $("#modules-table").html(modules);
            console.log(modules);
        }
    })

    $.ajax({
        url: 'https://localhost:8000/history/get_all',
        method: 'GET',
        success: (resp)=>{
            let history = resp;
            console.log(history);
        }
    })

});