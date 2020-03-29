function init() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC74i_lY940mIMmIab_MVbMdj1Ug0a9zMY",
        authDomain: "covid-19-48572.firebaseapp.com",
        databaseURL: "https://covid-19-48572.firebaseio.com",
        projectId: "covid-19-48572",
        storageBucket: "covid-19-48572.appspot.com",
        messagingSenderId: "651539122008",
        appId: "1:651539122008:web:6f01f5dcceb5fa8604872d",
        measurementId: "G-HSPZDB496H"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


}

function data_maluku() {
    init();
    var query = firebase.firestore()
        .collection('provinsi')
        .doc('maluku');

    // Start listening to the query.
    query.onSnapshot(function (doc) {
        if (doc.exists) {

            let data = {
                cases: {
                    active: doc.data().positif,
                    recovered: doc.data().sembuh
                },
                deaths: {
                    total: doc.data().meninggal
                }
            }

            pie_chart(data, 'chart-maluku');

            $('#info-maluku').html(`
            <h6 class='text-center mt-2 font-weight-bold'>`+ doc.data().update + `</h6>
            <p>Orang dalam Pemantauan (ODP) : `+ doc.data().odp + `</p>
            <p>Pasien dalam Pengawasan (PDP) : `+ doc.data().pdp + `</p>
            <p class="font-weight-bold" style='color: rgba(8,65,119,1)'>Sembuh : ` + doc.data().sembuh + `</p>
            <p class="font-weight-bold" style='color: rgba(205,141,123,1)'>Meninggal : ` + doc.data().meninggal + `</p>
            <p class="font-weight-bold" style='color: rgba(231,196,100,1)'>Dalam Penangganan : ` + doc.data().positif + `</p>
            <h5 class='text-center'>TOTAL : `+ doc.data().total + `</h5>
            `);
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });
}