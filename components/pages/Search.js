
export const Search = {
    template: `
        <div class="container pt-3">
            <div v-if="covid != 'null'">
                <div v-if="covid == 0" class="alert alert-danger" role="alert">
                    Data tidak di temukan!
                </div>
                <div v-if="covid != 0" class="list-group mb-2" v-for="data in covid">
                    <router-link :to="{ name : 'detail', params :{country : data.country} }" class="list-group-item list-group-item-action">
                    <img v-bind:src="'https://www.countryflags.io/' + data.code + '/flat/24.png'">  {{data.country}} 
                    </router-link>
                </div>
            </div>
        </div>
    `,
    props: ['country'],
    data() {
        return {
            covid: 'null'
        }
    },
    methods: {
        getSearch: function () {
            fetch_data(
                "https://covid-193.p.rapidapi.com/countries?search=" + this.country,
                "GET",
                {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "c9f4f03765mshb79206c16038420p1b11a2jsn8422b07036b8"
                }
            ).then((datas) => {
                if (datas.length == 0) {
                    this.covid = 0
                    return
                }

                fetch_data(
                    'https://owenwattimena.github.io/covid19-stats/assets/json/countries.json',
                    'GET'
                ).then((countries) => {
                    let search_result = []

                    for (let index = 0; index < datas.response.length; index++) {
                        let data = {
                            'code': getCountryCode(countries, datas.response[index]),
                            'country': datas.response[index]
                        }

                        search_result.push(data)
                    }

                    this.covid = search_result
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.getSearch()
    }
}