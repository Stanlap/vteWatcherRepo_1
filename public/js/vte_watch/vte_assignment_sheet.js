$(document).ready(function () {

    let oPat = JSON.parse(localStorage.getItem('Patient')),
        aChMeds = JSON.parse(localStorage.getItem('ChoosedMedicines'));
    localStorage.removeItem('Patient');
    localStorage.removeItem('ChoosedMedicines');
    console.log(oPat, aChMeds);

    const definePltTestPlan = el => {
        let aTCpl = el.titleGroupCyr !== 'Гепарин натрия' ? [2 + el.aLine[0], 3] : [el.aLine[0], 3];
        return buildLine(aTCpl, el.minTreatPeriod);
    }
    const defineRenalTestPlanOrGenUrineTest = el => {
        let aTCpl = el.titleGroupCyr === 'Надропарин кальция' ? [el.aLine[0] + 1, 10] : [el.aLine[0], 5];
        return buildLine(aTCpl, el.minTreatPeriod);
    }
    const defineElectrolytesTestPlan = el => buildLine([el.aLine[0], 10], el.minTreatPeriod);
    const defineINRPlan = el => buildLine([2 + el.aLine[0], 5], el.minTreatPeriod);
    const defineCoagulogramPlan = el => buildLine([el.aLine[0], 10], el.minTreatPeriod);

    function buildLine(aT2, tP) {
        let vLine = [],
            vV = aT2[0] + 1;
        vLine.push(aT2[0] + 1);
        while (vV + aT2[1] <= tP) {
            vV = vV + aT2[1];
            vLine.push(vV);
        }
        return vLine;
    }

    let aTLine = [
        ['исследование тромбоцитов в крови', []],
        ['исследование уровня мочевины и креатинина в крови', []],
        ['электролиты крови', []],
        ['коагулограмма (ПТИ, МНО, фибриноген, АТ3, АЧТ)', []],
        ['коагулограмма (МНО)', []],
        ['ОАМ', []]
    ];

    console.log(defineAllTestsPlan(aChMeds));

    function defineAllTestsPlan(choosDrug) {
        $(choosDrug).each(function (ind, el) {
            el.titleGroupCyr === 'Эноксапарин натрия' || el.titleGroupCyr === 'Надропарин кальция' || el.titleGroupCyr === 'Гепарин натрия' ? aTLine[0][1] = aTLine[0][1].concat(definePltTestPlan(el)) : '';
            el.titleGroupCyr === 'Надропарин кальция' ? aTLine[2][1] = aTLine[2][1].concat(defineElectrolytesTestPlan(el)) : '';
            el.titleGroupCyr === 'Гепарин натрия' ? aTLine[3][1] = aTLine[3][1].concat(defineCoagulogramPlan(el)) : '';
            el.titleGroupCyr === 'Варфарин' ? aTLine[4][1] = aTLine[4][1].concat(defineINRPlan(el)) : '';
            el.titleGroupCyr === 'Надропарин кальция' || el.titleGroupCyr === 'Дабигатрана этексилат' ?
                (aTLine[5][1] = aTLine[5][1].concat(defineRenalTestPlanOrGenUrineTest(el)), aTLine[1][1] = aTLine[1][1].concat(defineRenalTestPlanOrGenUrineTest(el))) : '';
        });
        oPat.pkINRDates.length > 0 ? aTLine[4][1] = aTLine[4][1].concat( oPat.pkINRDates) : '';
               
        return aTLine.filter(item => item[1].length > 0);
    }

    let vDS = 7 - (new Date()).getDay(),
        vSats = [vDS, vDS + 7],
        vSuns = [vDS + 1, vDS + 8];
    console.log(vSats, vSuns);


});




















































// function askOfPrevLabExams() {
//     // defineAllTestsPlan(aChMeds);
//     $('#dialog_1, #btnOne, #br_1, #inpDate').show();
//     $('#inpDate').val(formatDate());
//     $('#dialog_2').hide();
//     $('#inviteToAct').html('До начала профилактивки ВТЭО необходимо наличие перечисленных ниже исследований. Если обследование неполное, отметьте какие исследования требуется выполнить и установите дату:');
//     $('<br>').appendTo('#dialog_1');
//     $('<br>').appendTo('#list_1');
//     $(aTLine).each(function (ind, el) {
//         $('<label/>').attr({
//             for: `chkTest_${ind}`
//         }).html(`<input type = 'checkbox' id = 'chkTest_${ind}' value = '${el[0]}'></input> ${el[0]}`).appendTo('#list_1');
//         $('<br>').appendTo('#list_1');
//     });
//     $('<br>').appendTo('#list_1');
//     $('<label/>').attr({
//         for: 'chkWeekend'
//     }).html('<input type = "checkbox" id = "chkWeekend" checked></input> Не назначать лабораторные исследования в субботу и воскресенье').appendTo('#list_1');
//     $('<br>').appendTo('#list_1');
//     $('#btnOne').on('click', definePrevLabExams);
// }

// function definePrevLabExams() {
//     // Функция учитывает выходные дни.
//     if ($('#chkWeekend').is(':checked')) {
//         $(vSats).each((ind, el) => {
//             $(aTLine).each((ind, item) => {
//                 item[1].indexOf(el) !== -1 ? item[1][item[1].indexOf(el)]-- : '';
//             })
//         });
//         $(vSuns).each((ind, el) => {
//             $(aTLine).each((ind, item) => {
//                 item[1].indexOf(el) !== -1 ? item[1][item[1].indexOf(el)]++ : '';
//             })
//         });
//         // alert('Анализы в выходные назначаться не будут.');
//     }
//     // Функция создает tL_2 - массив исследований, которые надо выполнить до начала проф. ВТЭО.
//     let tL_1 = [],
//         tL_2 = [],
//         tL_3 = [];
//     $('#list_1 input:checked').each((ind, el) => tL_1.push(el.value));
//     $(tL_1).each((ind, el) => {
//         $(aTLine).each((ind, item) => item[0] === el ? (tL_2.push(item), tL_3.push(ind)) : '');
//     });
//     let vFstInv = 1 + Math.round(diffDates(new Date(correctDate(new Date($('#inpDate').val()))), new Date(correctDate(new Date()))));
//     console.log(vFstInv);
//     $(tL_3).each((ind, el) => delete aTLine[el]);
//     aTLine = aTLine.filter(item => item);
//     $(tL_2).each((ind, el) => el[1].unshift(vFstInv));
//     console.log(tL_2);

//     $.merge(aTLine, tL_2);
//     $(aTLine).each((ind, el) => {
//         el[1] = [...new Set(el[1])];
//     })
//     console.log(aTLine);

//     $('#list_1').hide();
//     clearValues();
//     executeParamsOfVTEProphyl();
// }