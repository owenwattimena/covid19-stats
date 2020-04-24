import { stores } from '../../stores.js'
import { Filter } from './Filter.js'
import { NumberFormat } from '../../mixins/NumberFormat.js'


export const CountriesCard = {
    mixins: [
        NumberFormat
    ],
    template: `
        <div class="card mb-5">
            <div class="card-header text-center">
                TOP {{(page_number + 1) * size}}
            </div>
            <div class="card-body">
                <div v-if="!is_loading">

                    <filter-vue></filter-vue>

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
                            <tbody>
                                <tr v-for="data, index in pegination_data">
                                    <th scope="row">{{page_number * size + (++index)}}</th>
                                    <td><router-link :to="{name : 'detail', params : {country : data.country}}"><img v-bind:src="'https://www.countryflags.io/' + data.code + '/flat/24.png'"> {{data.country}} </router-link></td>
                                    <td> {{data.recovered | number_format}} </td>
                                    <td> {{data.deaths | number_format}} </td>
                                    <td> {{data.active | number_format}} </td>
                                    <td> {{data.total | number_format}}  </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="...">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{disabled : page_number == 0}">
                                <a class="page-link" href="#" @click.prevent="prevPage" tabindex="-1">Awal</a>
                            </li>
                            <li class="page-item" :class="{'d-none' : page_number <= 1 }"><a class="page-link" href="#" @click.prevent="page_number -= 2 "> {{page_number - 1}} </a></li>
                            <li class="page-item" :class="{'d-none' : page_number == 0}"><a class="page-link" href="#" @click.prevent="page_number -= 1 "> {{page_number}} </a></li>
                            <li class="page-item active">
                                <a class="page-link" href="#" @click.prevent=""> {{1 + page_number}} <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="page-item" :class="{'d-none' : page_number >= (page_count - 1)}"><a class="page-link" href="#" @click.prevent="page_number += 1 ">{{2+page_number}}</a></li>
                            <li class="page-item" :class="{'d-none' : page_number >= (page_count - 2)}"><a class="page-link" href="#" @click.prevent="page_number += 2 ">{{3+page_number}}</a></li>
                            <li class="page-item" :class="{disabled : page_number >=page_count - 1}">
                                <a class="page-link" href="#" @click.prevent="nextPage">Akhir</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="text-center" v-else >
                    <img width="30%" src="https://media1.tenor.com/images/57b62c1192938f43f61a45817166c4e2/tenor.gif?itemid=15460501" >
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            page_number: 0,
            size: 10
        }
    },
    components: {
        'filter-vue': Filter
    },
    created() {
        stores.dispatch('data_covid');
    },
    computed: {
        index_data() {
            return this.page_number
        },
        data_covid() {
            return stores.getters.data_covid.slice(0, 10)
        },
        page_count() {
            let l = stores.getters.data_covid.length
            return Math.ceil(l / this.size)
        },
        pegination_data() {
            const start = this.page_number * this.size,
                end = start + this.size

            return stores.getters.data_covid.slice(start, end)
        },
        is_loading() {
            return stores.getters.tabel_loading
        }
    },
    methods: {
        prevPage: function () {
            this.page_number = 0
        },
        nextPage: function () {
            this.page_number = this.page_count - 1
        }
    }
}