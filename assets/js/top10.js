function numberSeparator(number) {
    var number_string = number.toString(),
        sisa = number_string.length % 3,
        newNumber = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        separator = sisa ? '.' : '';
        newNumber += separator + ribuan.join('.');
    }
    return newNumber;
}


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

function getCountryCode(countryList, country) {
    let code;

    for (let i = 0; i < countryList.length; i++) {
        if (country == countryList[i].name) {
            code = countryList[i].code;
            break;
        }
    }

    return code;
}

function tabel(response) {
    $.getJSON("https://owenwattimena.github.io/covid19-stats/assets/json/countries.json",
        function (countryList, textStatus, jqXHR) {
            let allData = [];
            let isInserted;
            for (let i = 0; i < response.length; i++) {
                isInserted = false;
                let data = {
                    'code': getCountryCode(countryList, response[i].country),
                    'negara': response[i].country,
                    'sembuh': response[i].cases.recovered,
                    'meninggal': response[i].deaths.total,
                    'aktif': response[i].cases.active,
                    'total': response[i].cases.total
                };
                let allData_length = allData.length;
                for (let j = 0; j < allData_length; j++) {
                    if (data.total > allData[j].total) {
                        isInserted = true;
                        allData.splice(j, 0, data);
                        break;

                    }

                }
                if (!isInserted) {
                    allData.push(data);
                }

            }

            console.log(allData);


            let tabel = `
                <div class="table-responsive">
                <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Negara</th>
                    <th scope="col">Sembuh</th>
                    <th scope="col">Meninggal</th>
                    <th scope="col">Aktif</th>
                    <th scope="col">Total</th>
                </tr>
                </thead>
                <tbody>`;

            let no = 1;
            for (let index = 2; index <= 11; index++) {

                tabel += `<tr>`;
                tabel += `<th scope="row">` + no++ + `</th>`;
                tabel += `<td><a href='` + BASE_URL + `negara.html?detail=` + allData[index].negara + `' ><img src="https://www.countryflags.io/` + allData[index].code + `/flat/24.png"> ` + allData[index].negara + `</a></td>`;
                tabel += `<td>` + numberSeparator(allData[index].sembuh) + `</td>`;
                tabel += `<td>` + numberSeparator(allData[index].meninggal) + `</td>`;
                tabel += `<td>` + numberSeparator(allData[index].aktif) + `</td>`;
                tabel += `<td>` + numberSeparator(allData[index].total) + `</td>`;
            }

            tabel += `
            </tbody>
            </table>
            </div>`;
            $('#top10').html(tabel);
        }
    );
}