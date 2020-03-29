function detail_covid(negara) {

    var settings = {
        // "async": true,
        // "crossDomain": true,
        // "url": "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Indonesia",
        // "method": "GET",
        // "headers": {
        //     "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        //     "x-rapidapi-key": "c9f4f03765mshb79206c16038420p1b11a2jsn8422b07036b8"
        // }
        "async": true,
        "crossDomain": true,
        "url": "https://covid-193.p.rapidapi.com/history?country=" + negara,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "c9f4f03765mshb79206c16038420p1b11a2jsn8422b07036b8"
        }
    }

    $.ajax(settings).done(function (response) {
        if (response.results == 0) {
            $('.detail').html(`<div class="alert alert-danger" role="alert">
            Data tidak di temukan!
          </div>`);
            return;
        }
        chart(response.response[0]);
        // console.log(response);
    });
}