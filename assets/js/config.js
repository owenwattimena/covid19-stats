function getCountryCode(countryList, country) {
    let code;

    for (let i = 0; i < countryList.length; i++) {

        if (country == countryList[i].name) {
            code = countryList[i].code;
            break;
        }
    }

    return code;
}