import { stores } from "../../stores.js"
import { CountryChart } from './CountryChart.js'
import { NumberFormat } from '../../mixins/NumberFormat.js'
// import { CovidChart } from "../../library/CovidChart.js"

export const CountryCard = {
    mixins: [
        NumberFormat
    ],
    template: `
        <div class="card mb-3">
            <div class="card-header text-center">
                {{country}}
            </div>
            <div class="card-body">
                <div class="row" v-if="covid.length != 0 ">
                    <div class="col-lg-12">
                        <country-chart :country="country" :data="covid" ></country-chart>
                    </div>
                    <div class="col-lg-12">
                        <h6 class='text-center mt-2 font-weight-bold'> {{covid.day}} </h6>
                        <p>Kasus bertambah : {{covid.cases.new}} </p>
                        <p>Meninggal bertambah: {{covid.deaths.new}} </p>
                        <hr>
                        <p class="font-weight-bold" style='color: rgba(8,65,119,1)'>Sembuh : {{covid.cases.recovered | number_format}} </p>
                        <p class="font-weight-bold" style='color: rgba(205,141,123,1)'>Meninggal : {{covid.deaths.total | number_format}} </p>
                        <p class="font-weight-bold" style='color: rgba(231,196,100,1)'>Dalam Penangganan : {{covid.cases.active | number_format}} </p>
                        <h5 class='text-center'>TOTAL : {{covid.cases.total | number_format}} </h5>
                    </div>
                </div>
                <div class="text-center" v-else >
                    <img width="30%" src="https://media1.tenor.com/images/57b62c1192938f43f61a45817166c4e2/tenor.gif?itemid=15460501" >
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            covid: []
        }
    },
    props: ['country'],
    components: {
        'country-chart': CountryChart
    },
    computed: {
        detail_covid() {
            return stores.getters.detail_covid
        },
    },
    created() {
        // stores.dispatch('detail_covid', this.country)
    },
    mounted() {
        this.getCovid()
    },
    methods: {
        getCovid: function () {
            fetch_data(
                "https://covid-193.p.rapidapi.com/history?country=" + this.country,
                'GET',
                {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "c9f4f03765mshb79206c16038420p1b11a2jsn8422b07036b8"
                }).then((datas) => {
                    // commit('setDetailCovid', datas.response[0])
                    this.covid = datas.response[0]
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
}
