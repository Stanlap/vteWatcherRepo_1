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



