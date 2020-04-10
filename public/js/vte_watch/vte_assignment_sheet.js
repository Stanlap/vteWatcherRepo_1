$(document).ready(function () {

    let oPat = JSON.parse(localStorage.getItem('Patient')),
        aChMeds = JSON.parse(localStorage.getItem('ChoosedMedicines'));
    localStorage.removeItem('Patient');
    localStorage.removeItem('ChoosedMedicines');
    console.log(oPat, aChMeds);


    let aTLine = [];



    const definePltTestPlan = el => {
        let aTCpl = el.titleGroupCyr !== 'Гепарин натрия' ? [2 + el.aLine[0], 3]: [el.aLine[0], 3];
        return buildLine(aTCpl, el.minTreatPeriod);
    }
    const defineRenalTestPlanOrGenUrineTest = el => {
        let aTCpl = el.titleGroupCyr === 'Надропарин кальция' ? [el.aLine[0] + 1, 10]: [el.aLine[0], 5];
        return buildLine(aTCpl, el.minTreatPeriod);
    }
    const defineElectrolytesTestPlan = el => buildLine([el.aLine[0], 10], el.minTreatPeriod);
    const defineINRPlan = el => buildLine(2 + [el.aLine[0], 5], el.minTreatPeriod);
    const defineCoagulogramPlan = el => buildLine([el.aLine[0], 10], el.minTreatPeriod);


    function buildLine(aT2, tP) {
        let vLine = [],
            vV = aT2[0] + 1;
        vLine.push(aT2[0] + 1);
        while (vV + aT2[1] <= tP) {
            vV = vV + aT2[1];
            vLine.push(vV);
        }
        // console.log(vLine);
        return vLine;
    }

    defineAllTestsPlan(aChMeds);

    function defineAllTestsPlan(choosDrug) {

        $(choosDrug).each(function (ind, el) {
            el.titleGroupCyr === 'Эноксапарин натрия' || el.titleGroupCyr === 'Надропарин кальция' || el.titleGroupCyr === 'Гепарин натрия' ? aTLine.push(['исследование тромбоцитов в крови','', definePltTestPlan(el)]): '';
            el.titleGroupCyr === 'Надропарин кальция' ? aTLine.push(['электролиты крови','', defineElectrolytesTestPlan(el)]): '';
            el.titleGroupCyr === 'Гепарин натрия' ? aTLine.push(['коагулограмма (ПТИ, МНО, фибриноген, АТ3, АЧТ)','',defineCoagulogramPlan(el)]) : '';
            el.titleGroupCyr === 'Варфарин' ? aTLine.push(['коагулограмма (МНО)','', defineINRPlan(el)]) : '';
            el.titleGroupCyr === 'Надропарин кальция' || el.titleGroupCyr === 'Дабигатрана этексилат' ? 
            aTLine .push(['ОАМ','', defineRenalTestPlanOrGenUrineTest(el)], ['исследование уровня мочевины и креатинина в крови','', defineRenalTestPlanOrGenUrineTest(el)]) : '';
        });
        console.log(aTLine);
    }



    let aTAr2 = [];
    let aTAr3 = [];
        $(aTLine).each((ind,el) =>{
            aTAr2.push(el[0]);
        });


        $(aTAr2).each((ind,el) =>{
            console.log(el);
            console.log(find(el, aTAr2));
        });

    console.log(aTAr2);
    console.log(aTAr3);

    function find(needle, haystack) {
        var results = [];
        var idx = haystack.indexOf(needle);
        while (idx != -1) {
            results.push(idx);
            idx = haystack.indexOf(needle, idx + 1);
        }
        return results;
    }
let srrr =["исследование тромбоцитов в крови", "исследование тромбоцитов в крови", "электролиты крови", "ОАМ", "исследование уровня мочевины и креатинина в крови"];
let vrrr = []; 
srrr.forEach(function(item, index, array) {
    vrrr.push(find(item,array));
    });
vrrr = vrrr.filter(el => el.length > 1);
console.log(vrrr);
console.log(vrrr[0][0] === vrrr[1][0]);

//  let vrrr2 = vrrr.filter((item, ind) => vrrr.indexOf(item) === ind);
console.log([...new Set(vrrr)]);
vrrr[0].concat(vrrr[1]);
console.log(vrrr[0]);

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
