function formatDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        vDateNow = '';
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    vDateNow = [year, month, day].join('-');
    return vDateNow;
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}



function correctDate(vD){
    return `${vD.getFullYear()}-${('0' + (vD.getMonth() + 1)).slice(-2)}-${('0' + vD.getDate()).slice(-2)}`;
}

// function plusOrMinusDays(startDate, vAddDays) {
//     let searchedDate = startDate;
//     searchedDate.setDate(searchedDate.getDate() + vAddDays);
//     return searchedDate;
// }

// let day_1 = new Date(2019, 08, 20),
//     day_2 = new Date(2019, 10, 07);

function diffDates(dateOne, dateTwo) {
    return (dateOne - dateTwo) / (60 * 60 * 24 * 1000);
};
// diffDates(day_2, day_1);

// let nextday = plusOrMinusDays(new Date("2020-02-19"), 7);
// console.log(nextday);
// let date1 = '02/19/2020';
// let date2 = nextday.toLocaleDateString("en-US");
// //   vplan_2 date1 = '01/12/2018';
// // vplan_2 date2 = '12/12/2018';
// date1 = new Date(date1);
// date2 = new Date(date2);
// date1 > date2; //false
// date1 < date2; //true
// date1 >= date2; //false
// date1 <= date2; //true
// console.log(date1 <= date2);


        // привести к формату даты браузера;
        // objPatient.pkstartDateOfVTEProphyl = $('#inpDate').val().replace(/(\d*)-(\d*)-(\d*)/, '$3-$2-$1') 
        // привести к фоормату даты 'en-us';
        // objPatient.pkstartDateOfVTEProphyl = $('#inpDate').val().replace(/(\d*)-(\d*)-(\d*)/, '$2/$3/$1');

        function dateToYMD(date) {
            var d = date.getDate();
            var m = date.getMonth() + 1; //Month from 0 to 11
            var y = date.getFullYear();
            return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        }
        
    
