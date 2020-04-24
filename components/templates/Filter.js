import { stores } from '../../stores.js'

export const Filter = {
    template: `
        <div>
            <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal"> <i class="fa fa-filter"></i> </button>
            {{filter_info}}

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Filter Tabel </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="filter-menu">Urut berdasarkan</label>
                            <select class="custom-select" id="filter-menu" v-model="filter_menu">
                                <option disabeld value="0"> ---Pilih--- </option>
                                <option value="Total">Total</option>
                                <option value="Sembuh">Sembuh</option>
                                <option value="Meninggal">Meninggal</option>
                                <option value="Aktif">Aktif</option>
                            </select>
                            <small class="text-danger" v-show="filter_menu_status">Filter tidak boleh kosong.</small>
                        </div>

                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadioInline1" value="Terbesar" v-model="urut" class="custom-control-input">
                            <label class="custom-control-label" for="customRadioInline1">Terbesar</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadioInline2" value="Terkecil" v-model="urut" class="custom-control-input">
                            <label class="custom-control-label" for="customRadioInline2">Terkecil</label>
                        </div>
                        <div>
                            <small class="text-danger" v-show="urut_status">Harap pilih urutan.</small>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="filter">Filter</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            filter_menu: 0,
            filter_menu_status: false,
            urut: '',
            urut_status: false,
        }
    },
    methods: {
        filter: function () {
            if (this.filter_menu == 0) {
                this.filter_menu_status = true
                return
            } else {
                this.filter_menu_status = false
            }
            if (this.urut.length == 0) {
                this.urut_status = true
                return
            } else {
                this.urut_status = false
            }

            $('#exampleModal').modal('toggle')
            // console.log(this.filter_menu)
            // console.log(this.urut)
            stores.dispatch('data_covid', { filter_menu: this.filter_menu, urut: this.urut })
            stores.commit('setTabelLoading', true)

            stores.commit('setFilterInfo', "Filter tabel berdasarkan data " + this.filter_menu + " " + this.urut)

        }
    },
    computed: {
        filter_info() {
            return stores.getters.filter_info
        }
    }
}