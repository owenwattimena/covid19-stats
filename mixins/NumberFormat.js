
export let NumberFormat = {
    filters: {
        number_format(number) {
            var number_string = number.toString(),
                sisa = number_string.length % 3,
                newNumber = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                let separator = sisa ? '.' : '';
                newNumber += separator + ribuan.join('.');
            }
            return newNumber;
        }
    },
}
