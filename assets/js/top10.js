function top10() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-193.p.rapidapi.com/statistics",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "c9f4f03765mshb79206c16038420p1b11a2jsn8422b07036b8"
        }
    }

    $.ajax(settings).done(function (response) {
        tabel(response.response);
    });
}

function tabel(response) {
    let tabel = `
    <div class="table-responsive">
    <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Negara</th>
        <th scope="col">Sembuh</th>
        <th scope="col">Meninggal</th>
        <th scope="col">Proses</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody>`;
    let no = 1;
    for (let index = 0; index < 10; index++) {
        tabel += `<tr>`;
        tabel += `<th scope="row">` + no++ + `</th>`;
        tabel += `<td><a href='` + BASE_URL + `negara.html?detail=` + response[index].country + `' >` + response[index].country + `</a></td>`;
        tabel += `<td>` + response[index].cases.recovered + `</td>`;
        tabel += `<td>` + response[index].deaths.total + `</td>`;
        tabel += `<td>` + response[index].cases.active + `</td>`;
        tabel += `<td>` + response[index].cases.total + `</td>`;
    }

    tabel += `
    </tbody>
    </table>
    </div>`;
    $('#top10').html(tabel);
}