$(document).ready(function () {


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
        lineOfFuncs = [];


    let vDS = 7 - (new Date()).getDay(),
        vSats = [vDS, vDS + 7],
        vSuns = [vDS + 1, vDS + 8];
    console.log(vSats, vSuns);

    $(oChoosedMedicines).each((ind, el) => {
        vIsVKI = el.titleGroupRu === 'Варфарин' ? true : false;
    });
    if ($(oChoosedMedicines).length > 1) {
        const bridgeTher = secDrug => 'Гепарин натрия' || secDrug === 'Эноксапарин натрия' || secDrug === 'Надропарин кальция' || secDrug === 'Бемипарин натрия' ? true : false;
        bridgeTher(oChoosedMedicines[1].titleGroupRu) ? lineOfFuncs.push(askOfBridgeTherUsage) : '';
            interactOfXaInhibAndVKA();
    };


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
                item += oPat.pkDaysToStartVTEProph;
                elTemp.push(item);
            });
            el[1] = elTemp;
            elTemp = [];
        });
        console.log(testLine);
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

    function askOfPrevLabExams() {
        // defineAllTestsPlan(oChoosedMedicines);
        $('#dialog_1, #btnOne, #br_1, #inpDate').show();
        $('#inpDate').val(formatDate());
        $('#dialog_2').hide();
        $('#inviteToAct').html('До начала профилактивки ВТЭО необходимо наличие перечисленных ниже исследований. Если обследование неполное, отметьте какие исследования требуется выполнить и установите дату:');
        $('<br>').appendTo('#dialog_1');
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
        $(tL_2).each((ind, el) => el[1].unshift(vFstInv));
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
});