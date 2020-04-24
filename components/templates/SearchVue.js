
export const SearchVue = {
    template: `
        <form class="mb-3" action="search.html" method="get">
            <div id='container'>

                <div class='cell'><input type='search' v-model="search" placeholder='Cari Negara'></div>
                <div class='cell'><button class='button' @click.prevent="letSearch">CARI</button></div>
            </div>
        </form>
    `,
    data() {
        return {
            search: ''
        }
    },
    methods: {
        letSearch: function () {
            if (this.search.length == 0) {
                alert('Mohon masukan Nama Negara')
            }
            else if (this.search.length < 3) {
                alert('Mohon masukan lebih dari 3 huruf')
            } else {

                this.$router.push({ name: 'search', params: { country: this.search } })
            }

        }
    }
}