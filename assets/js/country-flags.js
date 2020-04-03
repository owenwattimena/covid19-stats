
function getFlags() {
    fetch('../assets/json/countries.json').then((json) => {
        return json.json();
    }).then((data) => {
        countries = data;
    });
}


