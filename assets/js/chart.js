
function pie_chart(data_covid, elm) {
    let sembuh_warna = 'rgba(8,65,119,1)';
    let mati_warna = 'rgba(205,141,123,1)';
    let proses_warna = 'rgba(251,196,144,1)';
    // let proses = data_covid.confirmed - (data_covid.deaths + data_covid.recovered);

    var ctx = document.getElementById(elm).getContext('2d');
    data = {
        datasets: [{
            data: [data_covid.cases.active, data_covid.deaths.total, data_covid.cases.recovered],
            backgroundColor: [
                proses_warna,
                mati_warna,
                sembuh_warna
            ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Proses',
            'Meninggal',
            'Sembuh'
        ]
    };
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: data,

        // Configuration options go here
        options: {
            legend: {
                display: false
            },
        }
    });
}

function chart(data_covid) {
    pie_chart(data_covid, 'myChart');
    let kasus_bertambah = data_covid.cases.new == null ? 0 : data_covid.cases.new;
    let kasus_meninggal = data_covid.deaths.new == null ? 0 : data_covid.deaths.new;

    let info = $('#info');
    info.html(`
    <h6 class='text-center mt-2 font-weight-bold'>`+ data_covid.day + `</h6>
    <p>Kasus bertambah : ` + kasus_bertambah + `</p>
    <p>Meninggal bertambah: ` + kasus_meninggal + `</p>

    <hr>
    <p class="font-weight-bold" style='color: rgba(8,65,119,1)'>Sembuh : ` + data_covid.cases.recovered + `</p>
    <p class="font-weight-bold" style='color: rgba(205,141,123,1)'>Meninggal : ` + data_covid.deaths.total + `</p>
    <p class="font-weight-bold" style='color: rgba(231,196,100,1)'>Dalam Penangganan : ` + data_covid.cases.active + `</p>
    <h5 class='text-center'>TOTAL : `+ data_covid.cases.total + `</h5>
    `);
}