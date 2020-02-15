$(document).ready(function () {

    let objPatient = JSON.parse(localStorage.getItem('Patient')),
        objChoosedMedicines = JSON.parse(localStorage.getItem('ChoosedMedicines'));

    localStorage.removeItem('Patient');
    localStorage.removeItem('ChoosedMedicines');

    console.log(objPatient, objChoosedMedicines);

    $('<div/>').attr({
            id: 'inviteToAct',
        })
        .html('Укажите дату начала профилактики ВТЭО:')
        .appendTo('#dialogMain');
    $('<br>').appendTo('#dialogMain');
    $('<input/>').attr({
            id: 'inpDate',
            type: 'date',
            value: formatDate()
        })
        .appendTo('#dialogMain');
    $('<div>').attr({
        id: 'dialog_2'
    }).appendTo('#dialogMain');
    $('<label/>').attr({
        for: 'chkR_1'
    }).html('Да').appendTo('#dialog_2');
    $('<input/>').attr({
        type: 'radio',
        id: 'chkR_1',
        name: 'chkRadio_1',
        value: 0
    }).appendTo('#dialog_2');
    $('<label/>').attr({
        for: 'chkR_2'
    }).html('Нет').appendTo('#dialog_2');
    $('<input/>').attr({
        type: 'radio',
        id: 'chkR_2',
        name: 'chkRadio_1',
        value: 1
    }).appendTo('#dialog_2');
    $('<br><br>').attr({
        id: 'br_1'
    }).appendTo('#dialogMain');
    $('<input/>').attr({
            id: 'btnOne',
            type: 'button',
            value: 'OK'
        })
        .appendTo('#dialogMain');

    $('#dialogMain').hide();

    let lineOfFuncs = [];

    if($(objChoosedMedicines).length > 1){
        lineOfFuncs.push(defineStartDateTakingOfSecMedicine);
        const askOfBridgeTher = secDrug => 'Гепарин натрия' || secDrug === 'Эноксапарин натрия' || secDrug === 'Надропарин кальция' || secDrug === 'Бемипарин натрия' ? true : false;
        askOfBridgeTher(objChoosedMedicines[1].titleGroupRu) ? lineOfFuncs.push(defineBridgeTherUsage) : '';    
    }; 
    function clearValues() {
        $('#dialogMain').hide();
        $('#inviteToAct').html('')
        $('#inpDate').val('');
        $('input[name = chkRadio_1]:checked').prop('checked', false);
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

    $(objChoosedMedicines).each(function (ind, el) {
        el.treatPeriod = defineMinTreatmentPeriod(objPatient.pkMedProfile, el.titleGroupRu, 10);
        console.log(el.treatPeriod);
    });

    function initDialog() {
        clearValues();
        $('#dialogMain').show();
        $('#dialog_2').hide();
        $('#inviteToAct').html('Укажите дату начала профилактики ВТЭО:');
        objPatient.pkIsOrNoSurg ? $('#inpDate').val(objPatient.pkDateOfOper) : $('#inpDate').val(formatDate());
        $('#btnOne').bind('click', defineStartDateOfVTEProphyl);
    }

    function defineStartDateOfVTEProphyl() {
        console.log(lineOfFuncs);
        objPatient.pkstartDateOfVTEProphyl = $('#inpDate').val();
        clearValues();
        lineOfFuncs.length > 0 ? (lineOfFuncs[0](), lineOfFuncs.shift())  : $('#btnOne').unbind('click', defineStartDateOfVTEProphyl);
        console.log(lineOfFuncs.length)
    }

    function defineStartDateTakingOfSecMedicine() {
        $('#dialogMain').show();
        $('#dialog_2').hide();
        $('#inviteToAct').html('Укажите дату окончания профилактики ВТЭО первым препаратом:')
        $('#inpDate').val(correctDate(addDays(new Date(), objChoosedMedicines[0].treatPeriod)));
        $('#btnOne').bind('click', addStartDateOfSecondMedicine);
    }

    function addStartDateOfSecondMedicine() {
        objChoosedMedicines[1].startDateOfVTEProphyl = $('#inpDate').val();
        clearValues();
        $('#btnOne').unbind('click', addStartDateOfSecondMedicine);
    }


    initDialog();


    // $('#btnOne').on('click', function () {
    //     objPatient.pkstartDateOfVTEProphyl = $('#inpDate').val();
    //     $(objChoosedMedicines).length === 0 ? ($('#inviteToAct').html('Данные сохранены.'), $('#inpDate').val('').hide()) : '';
    //     if ($(objChoosedMedicines).length === 1) {
    //         objChoosedMedicines[0].startDateOfVTEProphyl = $('#inpDate').val();
    //         $('#inviteToAct').html('Данные сохранены.');
    //         $('#inpDate').val('').hide();
    //     };
    //     if ($(objChoosedMedicines).length > 1) {
    //         $('#inviteToAct').html('Укажите дату окончания профилактики ВТЭО первым препаратом:')
    //         let nextDateAfterTomorrow = addDays(new Date(), objChoosedMedicines[0].treatPeriod);
    //         // console.log(nextDateAfterTomorrow);
    //         $('#inpDate').val(`${nextDateAfterTomorrow.getFullYear()}-${('0' + (nextDateAfterTomorrow.getMonth() + 1)).slice(-2)}-${('0' + nextDateAfterTomorrow.getDate()).slice(-2)}`);
    //         $('#btnOne').off();
    //         $('#btnOne').bind('click', addStartDateOfSecondMedicine);
    //     }
    //     // $('#inpDate').val('').hide();         
    // });





    function defineBridgeTherUsage() {
        $('#btnOne, #br_1').hide();
        $('#inviteToAct').html('Планируется периоперационная мост-терапия НМГ или НФГ?');
        $('<label/>').attr({
            for: 'chkR_1'
        }).html('Да').appendTo('p');
        $('<input/>').attr({
            type: 'radio',
            id: 'chkR_1',
            name: 'chkRadio_1',
            value: 0
        }).appendTo('p');
        $('<label/>').attr({
            for: 'chkR_2'
        }).html('Нет').appendTo('p');
        $('<input/>').attr({
            type: 'radio',
            id: 'chkR_2',
            name: 'chkRadio_1',
            value: 1
        }).appendTo('p');
        $('#btnOne').unbind('click', addStartDateOfSecondMedicine);
        objPatient.pkIsOrNoSurg ? $('input[name = chkRadio_1]').bind('click', defineSpinalAnestUsage) : '';;
    }

    function defineSpinalAnestUsage() {
        console.log($('input[name = chkRadio_1]:checked').val());
        $('input[name = chkRadio_1]:checked').val() === '0' ? objPatient.pkBridgeTher = true : objPatient.pkBridgeTher = false;
        console.log(objPatient.pkBridgeTher);
        $('input[name = chkRadio_1]:checked').prop('checked', false);
        $('#inviteToAct').html('Операция выполняется под спинномозговой анестезией?');
        $('input[name = chkRadio_1]').unbind('click', defineSpinalAnestUsage)
        // $('<label/>').attr({ for: 'chkR_1'}).html('Да').appendTo('p');    
        // $('<input/>').attr({ type: 'radio', id: 'chkR_1', name: 'chkRadio_1', value: 0}).appendTo('p');
        // $('<label/>').attr({ for: 'chkR_2'}).html('Нет').appendTo('p');
        // $('<input/>').attr({ type: 'radio', id: 'chkR_2', name: 'chkRadio_1', value: 1}).appendTo('p');
        // $('#btnOne').unbind('click', addStartDateOfSecondMedicine);

        // $('#btnOne, #br_1').show();
    }
    // objPatient.pkIsOrNoSurg ? defineSpinalAnestUsage() : '';

    // $('input[name = chkRadio_1]').bind('click', function(){
    //     $(this).val() === 0 ? objPatient.pkSpinalAnest = true: objPatient.pkSpinalAnest = false;
    //     console.log($(this).val());
    //     console.log(objPatient.pkSpinalAnest);
    // });

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

        let doIt = '',
            labSL = ['', 0, 0];
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



    function defineFactorXaInhibitorsPerioperativeTactics(chosDrug, operBleedingRisk, CC, surgDifficulty, startDrugTakingAfterOper = 24) {
        let stopDrugTakingBeforeOper = 0;

        if (operBleedingRisk === 1 || surgDifficulty === 1) {

            chosDrug === 'Апиксабан' || chosDrug === 'Ривароксабан' ? stopDrugTakingBeforeOper = 48 : '';
            if (chosDrug === 'Дабигатрана этексилат') {
                CC >= 80 ? stopDrugTakingBeforeOper = 48 : CC >= 50 && CC < 80 ? stopDrugTakingBeforeOper = 72 : CC >= 15 && CC < 50 ? stopDrugTakingBeforeOper = 96 : '';
            };
        } else {
            switch (chosDrug) {
                case 'Апиксабан':
                    CC >= 30 ? stopDrugTakingBeforeOper = 24 : CC < 30 ? stopDrugTakingBeforeOper = 36 : '';
                    break;
                case 'Ривароксабан':
                    CC >= 30 ? stopDrugTakingBeforeOper = 24 : CC < 30 ? stopDrugTakingBeforeOper = 36 : '';
                    break;

                case 'Дабигатрана этексилат':
                    CC >= 80 ? stopDrugTakingBeforeOper = 24 : CC >= 50 && CC < 80 ? stopDrugTakingBeforeOper = 36 : CC >= 15 && CC < 50 ? stopDrugTakingBeforeOper = 48 : '';
                    break;
            };
        }
        return [stopDrugTakingBeforeOper, startDrugTakingAfterOper];
    }

    function changeFactorXaInhibitorsToVitaminKAntagonists(chosDrug_1, chosDrug_2, timeAlg = []) {
        if ((chosDrug_1 === 'Апиксабан' || chosDrug_1 === 'Ривароксабан' || chosDrug_1 === 'Дабигатрана этексилат') && chosDrug_2 === 'Варфарин') {
            // время начала приема ингибиторов фактора Ха в качестве второго лекарственного средства после антагонистов витамина К:
            timeAlg[0] = 1;
            // алгоритм приема ингибиторов фактора Ха в качестве второго лекарственного средства после антагонистов витамина К:
            timeAlg[1] = 'НОАК могут быть назначены в этот же или на следующий день при значении МНО 2,0-2,5. Ривароксабан может быть назначен при МНО ≤3,0; эдоксабан – при МНО≤2,5; апиксабан и дабигатран – при МНО ≤2,0. Если значения превышают указанные, повторяют исследование МНО, при достижении указанных показателей назначают препарат.';
            // дата первого исследования МНО относительно начала приема ингибиторов фактора Ха в качестве второго лекарственного средства после антагонистов витамина К:
            timeAlg[2] = -1;
            // кратность исследования МНО относительно начала приема ингибиторов фактора Ха в качестве второго лекарственного средства после антагонистов витамина К:
            timeAlg[3] = 1;
            // продолжительность исследования МНО относительно начала приема ингибиторов фактора Ха в качестве второго лекарственного средства после антагонистов витамина К:
            timeAlg[4] = 3;
        };
        if (chosDrug_1 === 'Варфарин' && (chosDrug_1 === 'Апиксабан' || chosDrug_1 === 'Ривароксабан' || chosDrug_1 === 'Дабигатрана этексилат')) {
            // Значения timeAlg при приеме антагонистов витамина К  в качестве второго лекарственного средства после ингибиторов фактора Ха:
            timeAlg[0] = 0;
            timeAlg[1] = 'При переходе с НОАК на АВК стоит иметь в виду, что НОАК влияют на МНО. Для более адекватного определения степени антикоагуляции при одновременном приеме НОАК и АВК МНО необходимо определять непосредственно перед приемом очередной дозы НОАК и через 24 часа после приема последней дозы НОАК.';
            timeAlg[2] = -1;
            timeAlg[3] = 1;
            timeAlg[4] = 3;
        };
        return timeAlg;
    }

    function appointBridgeTherapy(chosDrug_1, chosDrug_2, bTHer, ) {
        //  алгоритм вписать в справку позднее;
        let med_1 = [],
            med_2 = [],
            vINR = [];
        if (objPatient.pkIsOrNoOper, chosDrug_1 === 'Варфарин' && bTher) {
            med_1[0] = -5;
            med_1[1] = 1;
            vINR[0] = -1;
            vINR[1] = 0;
            vINR[2] = 1;

            if (chosDrug_2 === 'Гепарин натрия') {
                med_2[0] = -2;
                med_2[1] = -6;
                med_2[3] = 3;
                objPatient.IsSmallOper ? med_2[2] = 12 : med_2[2] = 48;
            };
            if (chosDrug_2 === 'Эноксапарин натрия' || chosDrug_2 === 'Надропарин кальция') {
                med_2[0] = -2;
                med_2[1] = -24;
                med_2[3] = 3;
                objPatient.IsSmallOper ? med_2[2] = 24 : med_2[2] = 48;
            };

        }
    }

    function stopVitaminKAntagonistsTakingBeforeOper(chosDrug, vINR, riskBleed) {
        // Первое исследование МНО: vINRDate[0] даты до операции, vINRDate[1][0] -интервал, vINRDate[1][1] - длительность обследования в днях с данной частотой.
        let vINRDate = [
            [5, 1],
            [1, 3]
        ]
        vDayStartTaking = 24,
            vDayStopTaking = 2;

        if (chosDrug = 'Варфарин') {
            switch (vINR) {

                case vINR > 4:
                    vDayStopTaking = 5;
                    break;
                case vINR > 3 && vINR <= 4:
                    vDayStopTaking = 3;
                    break;
            }
        }

    }

    objPatient.pkOperBleedingRisk === 1 ? vDayStopTakingFactorXaInhibitors = 1 : vDayStopTakingFactorXaInhibitors = 2;

});