$(document).ready(function () {

    let objPatient = JSON.parse(localStorage.getItem('Patient'));
    let objChoosedMedicines = JSON.parse(localStorage.getItem('ChoosedMedicines'));
    localStorage.removeItem('Patient');
    localStorage.removeItem('ChoosedMedicines');

    console.log(objPatient, objChoosedMedicines);
    console.log(objChoosedMedicines[1].startDateOfVTEProphyl);

    $('<br><br>').appendTo('p');
    $('<div/>').attr({
            id: 'invitToAct_1',
        })
        .html('Укажите дату начала профилактики ВТЭО:')
        .appendTo('p');
    $('<input/>').attr({
            id: 'inpDate_1',
            type: 'date',
            value: formatDate()
        })
        .appendTo('p');
    $('<br><br>').appendTo('p');
    $('<input/>').attr({
            id: 'btnOne',
            type: 'button',
            value: 'OK'
        })
        .appendTo('p');

    function defineMinTreatmentPeriod(mP, chosDrug, mTP) {
        switch (chosDrug) {

            case 'Эноксапарин натрия':
                (mP === 1 || mP === 2) ? mTP = 6: (mP === 3 || mP === 4) ? mTP = 7 : '';
                break;

            case 'Надропарин кальция':
                (mP < 4) ? mTP = 7: '';
                break;

            case 'Гепарин натрия':
                mTP = 7;
                break;

            case 'Фондапаринукс натрия':
                (mP === 1 || mP === 2) ? mTP = 6: (mP === 3) ? mTP = 5 : '';
                break;

            case 'Дабигатрана этексилат':
                (mP === 4 && objPatient.pkArtroplastyKneeJoint === true) ? mTP = 28: '';
                break;

            case 'Апиксабан':
                (mP === 4 && objPatient.pkArtroplastyKneeJoint === true) ? mTP = 32: '';
                break;

            case 'Варфарин':
                mTP = 4;
                break;

        };
        return mTP;
    }

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

    $('#btnOne').on('click', function () {
        objPatient.pkstartDateOfVTEProphyl = $('#inpDate_1').val();
        if ($(objChoosedMedicines).length > 0) {
            objChoosedMedicines[0].startDateOfVTEProphyl = $('#inpDate_1').val();
            console.log(objChoosedMedicines[0].startDateOfVTEProphyl);
            $('#inpDate_1').val('');
        };
        if ($(objChoosedMedicines).length > 1) {

            $('#invitToAct_1').html('Укажите дату начала профилактики ВТЭО вторым препаратом:')
            $('#btnOne').off();
            $('#btnOne').bind('click', addStartDateOfSecondMedicine);
            let nextDateAfterTomorrow = addDays(new Date(), objChoosedMedicines[0].treatPeriod);
            // console.log(nextDateAfterTomorrow);
            $('#inpDate_1').val(`${nextDateAfterTomorrow.getFullYear()}-${('0' + (nextDateAfterTomorrow.getMonth() + 1)).slice(-2)}-${('0' + nextDateAfterTomorrow.getDate()).slice(-2)}`);
        };
    });

    function addStartDateOfSecondMedicine() {
        objChoosedMedicines[1].startDateOfVTEProphyl = $('#inpDate_1').val();
        $('#btnOne').unbind('click', addStartDateOfSecondMedicine);
        $('#inpDate_1').val('');
        console.log(objChoosedMedicines[1].startDateOfVTEProphyl);
        console.log(objChoosedMedicines);
        console.log(objPatient.pkstartDateOfVTEProphyl);
        $('#invitToAct_1').html('Данные успешно сохранены.')
    }

    if ($(objChoosedMedicines).length > 0) {
        $(objChoosedMedicines).each(function (ind, el) {
            el.treatPeriod = defineMinTreatmentPeriod(objPatient.pkMedProfile, el.titleGroupRu, 10);
        });
    };
});