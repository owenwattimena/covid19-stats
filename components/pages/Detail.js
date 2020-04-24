import { CountryCard } from '../templates/CountryCard.js'

export const Detail = {
    template: `
        <div>
            <div class="container pt-3">
                <div class="detail">
                    <country-card :country="country"></country-card>
                </div>
            </div>
        </div>
    `,
    props: ['country'],
    components: {
        'country-card': CountryCard
    }
}