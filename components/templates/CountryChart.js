

export const CountryChart = {

    props: ['country', 'data'],
    template: `
        <div class="text-center">
            <canvas class="myChart"></canvas>
        </div>
    `,
    methods: {
        setChart: function () {
            let data_covid = this.data
            let sembuh_warna = 'rgba(8,65,119,1)';
            let mati_warna = 'rgba(205,141,123,1)';
            let proses_warna = 'rgba(251,196,144,1)';
            // let proses = data_covid.confirmed - (data_covid.deaths + data_covid.recovered);

            var ctx = this.$el.querySelector('.myChart').getContext('2d');

            let active = data_covid.cases.active;
            let deaths = data_covid.deaths.total;
            let recovered = data_covid.cases.recovered;

            let data = {
                datasets: [{
                    data: [active, deaths, recovered],
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
            new Chart(ctx, {
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
    },
    mounted() {
        this.setChart()
    }

}