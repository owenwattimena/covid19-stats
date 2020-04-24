import { CarouselVue } from '../templates/CarouselVue.js'
import { SearchVue } from '../templates/SearchVue.js'
import { CountryCard } from '../templates/CountryCard.js'
import { CountriesCard } from '../templates/CountriesCard.js'
export const Home = {
    template: `
        <div>
            <carousel-vue></carousel-vue>

            <div class="container">

                <search-vue></search-vue>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="row">
                            <div class="col">
                                <country-card country="Indonesia"></country-card>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <countries-card></countries-card>
                    </div>
                </div>
            </div>
        </div>
    `,
    components: {
        'carousel-vue': CarouselVue,
        'search-vue': SearchVue,
        'country-card': CountryCard,
        'countries-card': CountriesCard,
    },
}