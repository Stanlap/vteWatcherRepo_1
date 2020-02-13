$(document).ready(function () {

    let objPatient = JSON.parse(localStorage.getItem('Patient'));
    let objChoosedMedicines = JSON.parse(localStorage.getItem('ChoosedMedicines'));
    localStorage.removeItem('Patient');
    localStorage.removeItem('ChoosedMedicines');

    console.log(objPatient, objChoosedMedicines);
    // console.log(objChoosedMedicines[1].startDateOfVTEProphyl);

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

    function appointBridgeTherapy(chosDrug_1, chosDrug_2, bTHer,){
        //  алгоритм вписать в справку позднее;
        let med_1 = [], med_2 = [], vINR = [];
        if(objPatient.pkIsOrNoOper, chosDrug_1 === 'Варфарин' && bTher){
            med_1[0] = -5;
            med_1[1] = 1;  
            vINR[0] = -1;        
            vINR[1] = 0;        
            vINR[2] = 1;        

            if(chosDrug_2 === 'Гепарин натрия') {
                med_2[0] = -2;
                med_2[1] = -6;
                med_2[3] = 3;
objPatient.IsSmallOper ? med_2[2] = 12 : med_2[2] = 48;  
                };
            if(chosDrug_2 === 'Эноксапарин натрия' || chosDrug_2 === 'Надропарин кальция') {
                med_2[0] = -2;
                med_2[1] = -24;
                med_2[3] = 3;
objPatient.IsSmallOper ? med_2[2] = 24 : med_2[2] = 48;  
            };

        } 
    }

});