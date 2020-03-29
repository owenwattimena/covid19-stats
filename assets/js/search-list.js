function search(negara) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-193.p.rapidapi.com/countries?search=" + negara,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "c9f4f03765mshb79206c16038420p1b11a2jsn8422b07036b8"
        }
    }

    $.ajax(settings).done(function (response) {
        list(response);
    });
}

function list(responses) {
    console.log(BASE_URL);
    let list_elm = $('#search-list');
    if (responses.response.length == 0) {
        list_elm.html(`<div class="alert alert-danger" role="alert">
        Data tidak di temukan!
      </div>`);
        return;
    }
    let list = '<div class="list-group">';
    responses.response.forEach(negara => {
        list += `
        <a href="`+ BASE_URL + `negara.html?detail=` + negara + `" class="list-group-item list-group-item-action">
        `+ negara + `
      </a>`;
    });
    list += '</div>'

    list_elm.html(list);
}