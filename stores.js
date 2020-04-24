export const stores = new Vuex.Store({
    state: {
        data_covid: [],
        detail_covid: [],
        tabel_loading: true,
        filter_info: ''
    },
    mutations: {
        setDataCovid(state, datas) {
            state.data_covid = datas
        },
        setDetailCovid(state, datas) {
            state.detail_covid = datas
        },
        setTabelLoading(state, bool) {
            state.tabel_loading = bool
        },
        setFilterInfo(state, info) {
            state.filter_info = info
        }
    },
    getters: {
        data_covid: state => state.data_covid,
        detail_covid: state => state.detail_covid,
        tabel_loading: state => state.tabel_loading,
        filter_info: state => state.filter_info
    },
    actions: {
        data_covid({ commit }, filter = 0) {

            // console.log(urut)    
            /**
             * Ambil semua data negara yang terdampak Covid-19
             */
            fetch_data(
                "https://covid-193.p.rapidapi.com/statistics",
                'GET',
                {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "c9f4f03765mshb79206c16038420p1b11a2jsn8422b07036b8"
                }).then((datas) => {
                    // commit('setDatalCovid', datas)

                    /**
                     * Ambil semua data Code Negara
                     */
                    fetch_data(
                        "./assets/json/countries.json",
                        "GET"
                    ).then((countries) => {

                        let denied_data = ['All', 'Europe', 'North-America', 'Asia', 'South-America', 'Africa']


                        let allData = [];
                        let isInserted;
                        for (let i = 0; i < datas.response.length; i++) {

                            if (denied_data.includes(datas.response[i].country)) {
                                continue
                            }

                            isInserted = false;
                            let data = {
                                'code': getCountryCode(countries, datas.response[i].country),
                                'country': datas.response[i].country,
                                'cases_new': datas.response[i].cases.new,
                                'deaths_new': datas.response[i].deaths.new,
                                'recovered': datas.response[i].cases.recovered,
                                'deaths': datas.response[i].deaths.total,
                                'active': datas.response[i].cases.active,
                                'total': datas.response[i].cases.total
                            };
                            let allData_length = allData.length;
                            for (let j = 0; j < allData_length; j++) {
                                if (filter == 0) {
                                    if (data.total > allData[j].total) {
                                        isInserted = true;
                                        allData.splice(j, 0, data);
                                        break;

                                    }
                                } else {
                                    if (filter.filter_menu == "Total") {
                                        if (filter.urut == 'Terkecil') {
                                            if (data.total < allData[j].total) {
                                                isInserted = true;
                                                allData.splice(j, 0, data);
                                                break;

                                            }
                                        } else {
                                            if (data.total > allData[j].total) {
                                                isInserted = true;
                                                allData.splice(j, 0, data);
                                                break;

                                            }
                                        }
                                    }
                                    else if (filter.filter_menu == "Sembuh") {
                                        if (filter.urut == 'Terkecil') {
                                            if (data.recovered < allData[j].recovered) {
                                                isInserted = true;
                                                allData.splice(j, 0, data);
                                                break;

                                            }
                                        } else {
                                            if (data.recovered > allData[j].recovered) {
                                                isInserted = true;
                                                allData.splice(j, 0, data);
                                                break;

                                            }
                                        }
                                    }
                                    else if (filter.filter_menu == "Meninggal") {
                                        if (filter.urut == 'Terkecil') {
                                            if (data.deaths < allData[j].deaths) {
                                                isInserted = true;
                                                allData.splice(j, 0, data);
                                                break;

                                            }
                                        } else {
                                            if (data.deaths > allData[j].deaths) {
                                                isInserted = true;
                                                allData.splice(j, 0, data);
                                                break;

                                            }
                                        }
                                    } else {
                                        if (filter.urut == 'Terkecil') {
                                            if (data.active < allData[j].active) {
                                                isInserted = true;
                                                allData.splice(j, 0, data);
                                                break;

                                            }
                                        } else {
                                            if (data.active > allData[j].active) {
                                                isInserted = true;
                                                allData.splice(j, 0, data);
                                                break;
                                            }
                                        }
                                    }
                                }

                            }
                            if (!isInserted) {
                                allData.push(data);
                            }

                        }
                        commit('setDataCovid', allData)
                        commit('setTabelLoading', false)


                    }).catch((error) => {
                        console.log(error)
                    })

                }).catch((error) => {
                    console.log(error)
                })
        },
        detail_covid({ commit }, country) {
            fetch_data(
                "https://covid-193.p.rapidapi.com/history?country=" + country,
                'GET',
                {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "c9f4f03765mshb79206c16038420p1b11a2jsn8422b07036b8"
                }).then((datas) => {
                    commit('setDetailCovid', datas.response[0])
                }).catch((error) => {
                    console.log(error)
                })
        },
    }
})