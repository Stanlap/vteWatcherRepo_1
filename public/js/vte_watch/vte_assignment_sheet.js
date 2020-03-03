$(document).ready(function () {

    let objPatient = JSON.parse(localStorage.getItem('Patient')),
        objChoosedMedicines = JSON.parse(localStorage.getItem('ChoosedMedicines'));

    localStorage.removeItem('Patient');
    localStorage.removeItem('ChoosedMedicines');

    console.log(objPatient, objChoosedMedicines);

    $('<div/>').attr({
            id: 'inviteToAct',
        })
        .html('')
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
    $('<div>').attr({
        id: 'list_1'
    }).appendTo('#dialogMain');
    $('<br><br>').attr({
        id: 'br_1'
    }).appendTo('#dialogMain');
    $('<input/>').attr({
            id: 'btnOne',
            type: 'button',
            value: 'OK'
        })
        .appendTo('#dialogMain');


    let testLine = [
            ['исследование тромбоцитов в крови', [],
                []
            ],
            ['исследование уровня мочевины и креатинина в крови', [],
                []
            ],
            ['электролиты крови', [],
                []
            ],
            ['коагулограмма (ПТИ, МНО, фибриноген, АТ3, АЧТ)', [],
                []
            ],
            ['коагулограмма (МНО)', [],
                []
            ],
            ['ОАМ', [],
                []
            ]
        ],
        testBP = [],
        lineOfFuncs = [askOfStartDateVTEProphyl];


    if ($(objChoosedMedicines).length > 1) {
        lineOfFuncs.push(askOfStartDateTakingOfSecMedicine);
        const bridgeTher = secDrug => 'Гепарин натрия' || secDrug === 'Эноксапарин натрия' || secDrug === 'Надропарин кальция' || secDrug === 'Бемипарин натрия' ? true : false;
        bridgeTher(objChoosedMedicines[1].titleGroupRu) ? lineOfFuncs.push(askOfBridgeTherUsage) : '';
        testLine.length > 0 ? lineOfFuncs.push(askOfPrevLabExams) : '';
    };
    objPatient.pkIsOrNoSurg && $(objChoosedMedicines).length !== 0 ? lineOfFuncs.push(askOfSpinalAnestUsage) : '';

    clearValues();
    executeParamsOfVTEProphyl();


    function clearValues() {
        $('#inviteToAct').html('')
        $('#inpDate').val('');
        $('input[name = chkRadio_1]:checked').prop('checked', false);
        $('#dialogMain:visible').hide();
        $('input[name = chkRadio_1], #btnOne').off('click');
    }

    function defineMinTreatmentPeriod(mP, choosDrug, mTP) {
        switch (choosDrug) {
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

    function askOfStartDateVTEProphyl() {
        $('#dialogMain').show();
        $('#dialog_2').hide();
        $('#inviteToAct').html('Укажите дату начала профилактики ВТЭО:');
        objPatient.pkIsOrNoSurg ? $('#inpDate').val(objPatient.pkDateOfOper) : $('#inpDate').val(formatDate());
        $('#btnOne').on('click', defineStartDateVTEProphyl);
    }

    function defineStartDateVTEProphyl() {
        objPatient.pkstartDateOfVTEProphyl = $('#inpDate').val();
        console.log(objPatient.pkstartDateOfVTEProphyl);
        $(objChoosedMedicines).length > 0 ? (objChoosedMedicines[0].startDateOfVTEProphyl = $('#inpDate').val(), objPatient.pkDaysToStartVTEProph = Math.round(diffDates(new Date(correctDate(new Date(objChoosedMedicines[0].startDateOfVTEProphyl))), new Date(correctDate(new Date()))))) : '';
        objPatient.pkDaysToStartVTEProph < 0 ? objPatient.pkDaysToStartVTEProph = 0 : '';
        console.log(objPatient.pkDaysToStartVTEProph);


        clearValues();
        executeParamsOfVTEProphyl();
    }

    function executeParamsOfVTEProphyl() {
        lineOfFuncs.length > 0 ? (lineOfFuncs[0](), lineOfFuncs.shift()) : ($('input[name = chkRadio_1], #btnOne').off('click'));
    }

    function askOfStartDateTakingOfSecMedicine() {
        $('#dialogMain').show();
        $('#dialog_2').hide();
        $('#inviteToAct').html('Укажите дату окончания профилактики ВТЭО первым препаратом:');
        $('#inpDate').val(correctDate(addDays(new Date(), objChoosedMedicines[0].treatPeriod)));
        $('#btnOne').on('click', defineStartDateOfSecondMedicine);
    }

    function defineStartDateOfSecondMedicine() {
        objChoosedMedicines[1].startDateOfVTEProphyl = $('#inpDate').val();
        clearValues();
        executeParamsOfVTEProphyl();
    }

    function askOfBridgeTherUsage() {
        $('#dialogMain').show();
        $('#inpDate, #btnOne, #br_1').hide();
        $('#inviteToAct').html('Планируется периоперационная мост-терапия НМГ или НФГ?');
        $('#inpDate, #btnOne, #br_1').hide();
        $('#dialog_2').show();
        $('input[name = chkRadio_1]').on('click', defineBridgeTherUsage);
    }

    function defineBridgeTherUsage() {
        $('input[name = chkRadio_1]:checked').val() === 0 ? objPatient.pkBridgeTher = true : objPatient.pkBridgeTher = false;
        clearValues();
        executeParamsOfVTEProphyl();
    }

    function askOfSpinalAnestUsage() {
        $('#dialogMain').show();
        $('#inpDate, #btnOne, #br_1').hide();
        $('#inviteToAct').html('Операция выполняется под спинномозговой анестезией?');
        $('#inpDate, #btnOne, #br_1').hide();
        $('#dialog_2').show();
        $('input[name = chkRadio_1]').on('click', defineSpinalAnestUsage);
    };

    function defineSpinalAnestUsage() {
        $('input[name = chkRadio_1]:checked').val() === 0 ? objPatient.pkSpinalAnest = true : objPatient.pkSpinalAnest = false;
        clearValues();
        executeParamsOfVTEProphyl();
    }

    $(objChoosedMedicines).each(function (ind, el) {

        el.treatPeriod = defineMinTreatmentPeriod(objPatient.pkMedProfile, el.titleGroupRu, 10);
        el.titleGroupRu !== 'Апиксабан' ? el.spinalCatheterDrugTakingBeforeAndAfter = [10, 2] : el.spinalCatheterDrugTakingBeforeAndAfter = [10, 5];
        el.titleGroupRu === 'Гепарин натрия' ? testBP.push('контроль АД', [el.startDateOfVTEProphyl, (new Date(el.startDateOfVTEProphyl)).getDay(), el.treatPeriod], buildLine([1, 1], el.treatPeriod)) : '';
        // console.log(el.treatPeriod, el.spinalCatheterDrugTakingBeforeAndAfter, testBP);
    });

    let objAllLabTests = {
        pltTest: {
            titleCyr: 'исследование тромбоцитов в крови',
            plan: []
        },
        creatinUreaTest: {
            titleCyr: 'исследование уровня мочевины и креатинина в крови',
            plan: []
        },
        genBloodTest: {
            titleCyr: 'общеклинический анализ крови',
            plan: []
        },
        genUrineTest: {
            titleCyr: 'общеклинический анализ мочи',
            plan: []
        },
        electrolytesTest: {
            titleCyr: 'электролиты крови',
            plan: []
        },
        coagulogram: {
            titleCyr: 'коагулограмма (ПТИ, МНО, фибриноген, АТ3, АЧТВ)',
            plan: []
        },
        INR: {
            titleCyr: 'коагулограмма (МНО) ',
            plan: []
        }
    };

    function buildLine(vP_2, tP) {
        let vLine = [],
            vV = vP_2[0] + 1;
        vLine.push(vV);
        while (vV + vP_2[1] <= tP) {
            vV = vV + vP_2[1];
            vLine.push(vV);
        }
        console.log(vLine);
        return vLine;
    }

    function definePltTestPlan(el) {
        // [0,1] - [0] первое исследование после начала профилактики ВТЭО, [1] - интервал между исследованиями (сутки).
        let tL_1 = [],
            vP_1 = [el.startDateOfVTEProphyl, (new Date(el.startDateOfVTEProphyl)).getDay(), el.treatPeriod];
        tL_1.push('исследование тромбоцитов в крови', vP_1);
        el.titleGroupRu === 'Эноксапарин натрия' || el.titleGroupRu === 'Надропарин кальция' ? tL_1.push(buildLine([3, 3], el.treatPeriod)) : el.titleGroupRu === 'Гепарин натрия' ? tL_1.push(buildLine([1, 3], el.treatPeriod)) : '';
        return tL_1;
    }

    function defineRenalTestPlan(el) {
        // [0,1] - [0] первое исследование после начала профилактики ВТЭО, [1] - интервал между исследованиями (сутки).
        let tL_1 = [],
            vP_1 = [el.startDateOfVTEProphyl, (new Date(el.startDateOfVTEProphyl)).getDay(), el.treatPeriod];
        tL_1.push('исследование уровня мочевины и креатинина в крови', vP_1);
        el.titleGroupRu === 'Надропарин кальция' ? tL_1.push(buildLine([1, 10], el.treatPeriod)) : el.titleGroupRu === 'Дабигатрана этексилат' ? tL_1.push(buildLine([1, 5], el.treatPeriod)) : '';
        return tL_1;
    }

    function defineGenUrineTest(el) {
        // [0,1] - [0] первое исследование после начала профилактики ВТЭО, [1] - интервал между исследованиями (сутки).
        let tL_1 = [],
            vP_1 = [el.startDateOfVTEProphyl, (new Date(el.startDateOfVTEProphyl)).getDay(), el.treatPeriod];
        tL_1.push('ОАМ', vP_1);
        el.titleGroupRu === 'Надропарин кальция' ? tL_1.push(buildLine([1, 10], el.treatPeriod)) : el.titleGroupRu === 'Дабигатрана этексилат' ? tL_1.push(buildLine([1, 5], el.treatPeriod)) : '';
        return tL_1;
    }
    // Коагулограмма № 3 (ПТИ, МНО, фибриноген, АТ3, АЧТВ)
    function defineINRPlan(el) {
        // [0,1] - [0] первое исследование после начала профилактики ВТЭО, [1] - интервал между исследованиями (сутки).
        let tL_1 = [],
            vP_1 = [el.startDateOfVTEProphyl, (new Date(el.startDateOfVTEProphyl)).getDay(), el.treatPeriod];
        tL_1.push('коагулограмма (МНО)', vP_1, buildLine([3, 5], el.treatPeriod));
        return tL_1;
    };

    function defineCoagulogramPlan(el) {
        // [0,1] - [0] первое исследование после начала профилактики ВТЭО, [1] - интервал между исследованиями (сутки).
        let tL_1 = [],
            vP_1 = [el.startDateOfVTEProphyl, (new Date(el.startDateOfVTEProphyl)).getDay(), el.treatPeriod];
        tL_1.push('коагулограмма (ПТИ, МНО, фибриноген, АТ3, АЧТВ)', vP_1, buildLine([1, 10], el.treatPeriod));
        return tL_1;
    };

    function defineElectrolytesTestPlan(el) {
        // [0,1] - [0] первое исследование после начала профилактики ВТЭО, [1] - интервал между исследованиями (сутки).
        let tL_1 = [],
            vP_1 = [el.startDateOfVTEProphyl, (new Date(el.startDateOfVTEProphyl)).getDay(), el.treatPeriod];
        tL_1.push('электролиты крови', vP_1, buildLine([1, 10], el.treatPeriod));
        return tL_1;
    }

    function defineAllTestsPlan(choosDrug) {

        $(choosDrug).each(function (ind, el) {
            el.titleGroupRu === 'Эноксапарин натрия' || el.titleGroupRu === 'Надропарин кальция' || el.titleGroupRu === 'Гепарин натрия' ? testLine[0][2].push(definePltTestPlan(el)) : '';
            el.titleGroupRu === 'Надропарин кальция' ? testLine[2][2].push(defineElectrolytesTestPlan(el)) : '';
            el.titleGroupRu === 'Гепарин натрия' ? testLine[3][2].push(defineCoagulogramPlan(el)) : '';
            el.titleGroupRu === 'Варфарин' ? testLine[4][2].push(defineINRPlan(el)) : '';
            el.titleGroupRu === 'Надропарин кальция' || el.titleGroupRu === 'Дабигатрана этексилат' ? (testLine[5][2].push(defineGenUrineTest(el)), testLine[1][2].push(defineRenalTestPlan(el))) : '';
        });
        testLine = testLine.filter(el => el[2].length != 0);
        $(testLine).each(function (ind, el) {
            el[2].length === 1 ? el[1] = el[2][0][2].slice() : '';
            if (el[2].length === 2) {
                $.merge(el[1], el[2][0][2]);
                $(el[2][1][2]).each(function (ind, item) {
                    el[1].push(item + el[2][0][1][2]);
                });
            }
        });

        let elTemp = [];
        $(testLine).each(function (ind, el) {
            $(el[1]).each(function (ind, item) {
                item += objPatient.pkDaysToStartVTEProph;
                elTemp.push(item);
            });
            el[1] = elTemp;
            elTemp = [];
        });
        console.log(testLine);
    }

    function askOfPrevLabExams() {
        defineAllTestsPlan(objChoosedMedicines);
        $('#dialogMain, #btnOne, #br_1, #inpDate').show();
        $('#inpDate').val(formatDate());
        $('#dialog_2').hide();
        $('#inviteToAct').html('До начала профилактивки ВТЭО необходимо наличие перечисленных ниже исследований. Если обследование неполное, отметьте какие исследования требуется выполнить и установите дату:');
        $('<br>').appendTo('#dialogMain');
        $('<br>').appendTo('#list_1');
        $(testLine).each(function (ind, el) {
            $('<label/>').attr({
                for: `chkTest_${ind}`
            }).html(`<input type = 'checkbox' id = 'chkTest_${ind}' value = '${el[0]}'></input> ${el[0]}`).appendTo('#list_1');
            $('<br>').appendTo('#list_1');
        });
        $('<br>').appendTo('#list_1');
        $('<label/>').attr({
            for: 'chkWeekend'
        }).html('<input type = "checkbox" id = "chkWeekend" checked></input> Не назначать лабораторные исследования в субботу и воскресенье').appendTo('#list_1');
        $('<br>').appendTo('#list_1');
        $('#btnOne').on('click', definePrevLabExams);
    }


    let vDS = 7 - (new Date()).getDay(),
        vSats = [vDS, vDS + 7],
        vSuns = [vDS + 1, vDS + 8];
    console.log(vSats, vSuns);

    function definePrevLabExams() {
        // Функция учитывает выходные дни.
        if ($('#chkWeekend').is(':checked')) {
            $(vSats).each((ind, el) => {
                $(testLine).each((ind, item) => {
                    item[1].indexOf(el) !== -1 ? item[1][item[1].indexOf(el)]-- : '';
                })
            });
            $(vSuns).each((ind, el) => {
                $(testLine).each((ind, item) => {
                    item[1].indexOf(el) !== -1 ? item[1][item[1].indexOf(el)]++ : '';
                })
            });
            // alert('Анализы в выходные назначаться не будут.');
        }
// Функция создает tL_2 - массив исследований, которые надо выполнить до начала проф. ВТЭО.
        let tL_1 = [],
            tL_2 = [],
            tL_3 = [];
        $('#list_1 input:checked').each((ind, el) => tL_1.push(el.value));
        $(tL_1).each((ind, el) => {
            $(testLine).each((ind, item) => item[0] === el ? (tL_2.push(item), tL_3.push(ind)) : '');
        });
        let vFstInv = 1 + Math.round(diffDates(new Date(correctDate(new Date($('#inpDate').val()))), new Date(correctDate(new Date()))));
        console.log(vFstInv);
        $(tL_3).each((ind, el) => delete testLine[el]);
        testLine = testLine.filter(item => item);
        $(tL_2).each((ind, el)=> el[1].unshift(vFstInv));
        console.log(tL_2);

        $.merge(testLine, tL_2);
        $(testLine).each((ind, el) => {
            el[1] = [...new Set(el[1])];
        })
        console.log(testLine);

        $('#list_1').hide();
        clearValues();
        executeParamsOfVTEProphyl();
    }
    console.log(testLine);


    // let vArr = [2, 5, 6, 7, 12, 14, 15];




    // let ind = vArr.indexOf(6);
    // let ind_2 = vArr.indexOf(7);
    // vArr.indexOf(6) !== -1 ? vArr[ind]-- : '';
    // vArr.indexOf(7) !== -1 ? vArr[ind_2] = vArr[ind_2] + 1 : '';
    // let uniq = [...new Set(vArr)];

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    // Коагулограмма № 3 (ПТИ, МНО, фибриноген, АТ3, АЧТВ)
    // function defineLabTests(choosDrug, allSamples = []) {
    //     // labSL[0] - наименование назначенных исследований, labSL[1]- исследование до начала профилактики ВТЭО, labSL[2] - первое исследование, после начала профилактики ВТЭО, labSL[3] - интервал между исследованиями (сутки);

    //     let doIt = false,
    //         labSL = ['', 0, 0, 0];
    //     switch (choosDrug) {
    //         case 'Надропарин кальция':
    //             doIt = confirm('При назначении Надтропарина кальция до начала профилактики ВТЭО пациенту должны быть выполнены: исследование уровня мочевины и креатинина в крови, ОАМ, электролиты крови. Назначить анализы повторно?');
    //             doIt ? (labSL[0] = 'исследование уровня мочевины и креатинина в крови, ОАМ, электролиты крови', labSL[1] = 1, labSL[2] = 1,  doIt = false) : '';
    //             break;

    //         case 'Гепарин натрия':
    //             doIt = confirm('При назначении Гепарина натрия до начала профилактики ВТЭО пациенту должна быть выполнена коагулограмма. Назначить анализ повторно?');
    //             doIt ? (labSL[0] = 'коагулограмма', labSL[2] = 1, allSamples.push(labSL)) : '';
    //             break;

    //         case 'Дабигатрана этексилат':
    //             doIt = confirm('При назначении Надтропарина кальция до начала профилактики ВТЭО пациенту должны быть выполнены: исследование уровня мочевины и креатинина в крови, ОАМ. Назначить анализы повторно?');
    //             doIt ? (labSL[0] = 'исследование уровня мочевины и креатинина в крови, ОАМ', labSL[2] = 1) : '';
    //             objPatient.pkIsRenalInsuff ? labSL[3] = 5 : '';
    //             allSamples.push(labSL);
    //             break;

    //         case 'Варфарин':
    //             labSL[3] = 5;
    //             doIt = confirm('При назначении Варфарина до начала профилактики ВТЭО пациенту должны быть выполнены: исследование МНО. Назначить анализы повторно?');
    //             doIt ? (labSL[0] = 'МНО', labSL[2] = 1) : '';
    //             allSamples.push(labSL);
    //             break;
    //     };
    //     return allSamples;
    // }



    function defineFactorXaInhibitorsPerioperativeTactics(choosDrug, operBleedingRisk, CC, surgDifficulty, startDrugTakingAfterOper = 24) {
        let stopDrugTakingBeforeOper = 0;

        if (operBleedingRisk === 1 || surgDifficulty === 1) {

            choosDrug === 'Апиксабан' || choosDrug === 'Ривароксабан' ? stopDrugTakingBeforeOper = 48 : '';
            if (choosDrug === 'Дабигатрана этексилат') {
                CC >= 80 ? stopDrugTakingBeforeOper = 48 : CC >= 50 && CC < 80 ? stopDrugTakingBeforeOper = 72 : CC >= 15 && CC < 50 ? stopDrugTakingBeforeOper = 96 : '';
            };
        } else {
            switch (choosDrug) {
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

    function changeFactorXaInhibitorsToVitaminKAntagonists(choosDrug_1, choosDrug_2, timeAlg = []) {
        if ((choosDrug_1 === 'Апиксабан' || choosDrug_1 === 'Ривароксабан' || choosDrug_1 === 'Дабигатрана этексилат') && choosDrug_2 === 'Варфарин') {
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
        if (choosDrug_1 === 'Варфарин' && (choosDrug_1 === 'Апиксабан' || choosDrug_1 === 'Ривароксабан' || choosDrug_1 === 'Дабигатрана этексилат')) {
            // Значения timeAlg при приеме антагонистов витамина К  в качестве второго лекарственного средства после ингибиторов фактора Ха:
            timeAlg[0] = 0;
            timeAlg[1] = 'При переходе с НОАК на АВК стоит иметь в виду, что НОАК влияют на МНО. Для более адекватного определения степени антикоагуляции при одновременном приеме НОАК и АВК МНО необходимо определять непосредственно перед приемом очередной дозы НОАК и через 24 часа после приема последней дозы НОАК.';
            timeAlg[2] = -1;
            timeAlg[3] = 1;
            timeAlg[4] = 3;
        };
        return timeAlg;
    }

    function appointBridgeTherapy(choosDrug_1, choosDrug_2, bTHer, ) {
        //  алгоритм вписать в справку позднее;
        let med_1 = [],
            med_2 = [],
            vINR = [];
        if (objPatient.pkIsOrNoOper, choosDrug_1 === 'Варфарин' && bTher) {
            med_1[0] = -5;
            med_1[1] = 1;
            vINR[0] = -1;
            vINR[1] = 0;
            vINR[2] = 1;

            if (choosDrug_2 === 'Гепарин натрия') {
                med_2[0] = -2;
                med_2[1] = -6;
                med_2[3] = 3;
                objPatient.IsSmallOper ? med_2[2] = 12 : med_2[2] = 48;
            };
            if (choosDrug_2 === 'Эноксапарин натрия' || choosDrug_2 === 'Надропарин кальция') {
                med_2[0] = -2;
                med_2[1] = -24;
                med_2[3] = 3;
                objPatient.IsSmallOper ? med_2[2] = 24 : med_2[2] = 48;
            };

        }
    }

    function stopVitaminKAntagonistsTakingBeforeOper(choosDrug, vINR, riskBleed) {
        // Первое исследование МНО: vINRDate[0] даты до операции, vINRDate[1][0] -интервал, vINRDate[1][1] - длительность обследования в днях с данной частотой.
        let vINRDate = [
            [5, 1],
            [1, 3]
        ]
        vDayStartTaking = 24,
            vDayStopTaking = 2;

        if (choosDrug = 'Варфарин') {
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