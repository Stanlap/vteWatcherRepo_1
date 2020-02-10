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

    function definePlateletsResearchTime(chosDrug, pRT = []) {
        // pRT[0]- исследование до начала профилактики ВТЭО, pRT[1] - первое исследование после начала профилактики ВТЭО, pRT[2] - интервал между исследованиями (сутки).
        switch (chosDrug) {

            case 'Эноксапарин натрия' || 'Надропарин кальция':
                pRT = [-1, 0, 3];
                break;

            case 'Гепарин натрия':
                pRT = [-1, 1, 3];
                break;
        };
        return pRT;
    }

    function defineSpinalCatheterVTEProphylTactics(chosDrug, bASC = [10, 2]) {
        // bASC[0] - число часов перед установкой/удалением катетера,
        //  bASC[1] - число часов после установки/удаления катетера.

        switch (chosDrug) {
            case 'Апиксабан':
                bASC[1] = 5;
                break;
            default:
                bASC = [10, 2];
        };
        return bASC;
    }

    function defineLabTests(chosDrug, allSamples = []) {
        // labSL[0] - наименование назначенных исследований,
        // labSL[1] - день первого исследования с начала профилактики ВТЭО;
        // labSL[2] - кратность исследований (сут);

        let doIt = '', labSL = ['', 0, 0];
        switch (chosDrug) {
            case 'Надропарин кальция':
                doIt = confirm('При назначении Надтропарина кальция до начала профилактики ВТЭО пациенту должны быть выполнены: исследование уровня мочевины и креатиниа в крови, ОАМ, электролиты крови. Назначить анализы повторно?');
                doIt ? (labSL[0] = 'исследование уровня мочевины и креатиниа в крови, ОАМ, электролиты крови', labSL[1] = 1, allSamples.push(labSL)) : '';
                break;

            case 'Гепарин натрия':
                labSL[0] = 'контроль АД', labSL[1] = 1, labSL[2] = 1, allSamples.push(labSL);
                doIt = confirm('При назначении Гепарина натрия до начала профилактики ВТЭО пациенту должна быть выполнена коагулограмма. Назначить анализ повторно?');
                doIt ? (labSL[0] = 'коагулограмма', labSL[1] = 1, allSamples.push(labSL)) : '';
                break;

            case 'Дабигатрана этексилат':
                doIt = confirm('При назначении Надтропарина кальция до начала профилактики ВТЭО пациенту должны быть выполнены: исследование уровня мочевины и креатиниа в крови, ОАМ. Назначить анализы повторно?');
                doIt ? (labSL[0] = 'исследование уровня мочевины и креатиниа в крови, ОАМ', labSL[1] = 1) : '';
                objPatient.pkIsRenalInsuff ? labSL[2] = 5 : '';
                allSamples.push(labSL);
                break;

            case 'Варфарин':
                labSL[2] = 5;
                        doIt = confirm('При назначении Варфарина до начала профилактики ВТЭО пациенту должны быть выполнены: исследование МНО. Назначить анализы повторно?');
                        doIt ? (labSL[0] = 'МНО', labSL[1] = 1) : '';
                        allSamples.push(labSL);
                        break;
        };
        return allSamples;
    }

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