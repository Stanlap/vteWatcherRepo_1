$(document).ready(function () {
    let oPat = JSON.parse(localStorage.getItem('Patient'));

    localStorage.removeItem('Patient');
    console.log(oPat);


    oPat.pkIsOrNoSurg ? (
        relDayOfManipul = 1 + Math.round(diffDates(new Date(oPat.pkDateOfOper), new Date(oPat.pkStartDateOfVTEProphyl))),
        oPat.aOrdersContainer.push(['Компрессионный трикотаж на ноги', [relDayOfManipul, 1 + relDayOfManipul, 2 + relDayOfManipul]]),
        oPat.aOrdersContainer.push(['Активизация пациента', [1 + relDayOfManipul, 2 + relDayOfManipul, 3 + relDayOfManipul]])
        ) : '';    
        console.log(oPat.aOrdersContainer);

});



