$(document).ready(function () {
    let objPatient = JSON.parse(localStorage.getItem('Patient'));
    // localStorage.clear();
    console.log(objPatient.pkMedProfile);


    $('<div/>').attr({
        id: 'invitToAct_1'
    })
    .html('Выберите препарат по МНН:')
    .appendTo('#drugChooser');
// $('<input/>').attr({
//         id: 'inpText_4',
//         type: 'text',
//         list: 'dlstList_1'
//     })
//     .appendTo('#drugChooser');
$('<datalist/>').attr({
        id: 'dlstList_1',
    })
    // .appendTo('#inpText_1');
$('<br>').appendTo('#drugChooser');
$('<label/>').attr({
        id: 'lblLatinTitle',
        for: 'chkUseLatinDrugName'
    })
    .hide()
    .html('Указывать латинское название')
    .appendTo('#drugChooser');
$('<input/>').attr({
        type: 'checkbox',
        id: 'chkUseLatinDrugName'
    })
    .appendTo('#lblLatinTitle');
$('<div/>').attr({
        id: 'invitToAct_2'
    })
    .html('Выберите разовую дозу препарата:')
    .hide()
    .appendTo('#drugChooser');
$('<input/>').attr({
        id: 'inpText_2',
        type: 'text',
        list: 'dlstList_2'
    })
    .hide()
    .appendTo('#drugChooser');
$('<datalist/>').attr({
        id: 'dlstList_2',
    })
    .appendTo('#inpText_2');

function getArrPairs(vArr, ) {
    return Object.keys(vArr).map(function (index) {
        return vArr[index].pair;
    });
}
let vArrPairs = getArrPairs(objDrugsList);
console.log(vArrPairs);

function getObjFromArrPairs(vArrP) {
    let vObjP = {};
    $(vArrP).each(function (index) {
        vObjP[Object.keys(vArrP[index])] = Object.values(vArrP[index])[0];
    });
    return vObjP;
}
let vObjDrugPairs = getObjFromArrPairs(vArrPairs);
console.log(vObjDrugPairs);
addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));
// $('#dlstList_1').val('')
// console.log(();
// console.log($('#dlstList_1').prop('id'));
let vPrevUsedDrugGroup = '',
    vDecision = confirm('Если пациенту уже проводится медикаментозная профилактика ВТЭО, нажмите "ОК".');
if (vDecision) {
    $('#invitToAct_1').html('Выберите лек. группу препарата, который принимает пациент:');
    $('#inpText_4').bind('input', doFirstChoice);
    !vDecision;
} else {
    doFirstChoice();
    $('#btnOne').hide();
};

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function doFirstChoice() {
    console.log('func_0');
    vPrevUsedDrugGroup = getKeyByValue(vObjDrugPairs, $('#inpText_4').val());
    console.log(vPrevUsedDrugGroup);
    $('#btnOne').show();
    checkConditions();
    tryChooseDrugGroup();
    $('#inpText_4').val('');
    $('#inpText_4').unbind('input', doFirstChoice);

};

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        vDateNow = '';
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    vDateNow = [year, month, day].join('-');
    return vDateNow;
}

function checkConditions() {
    objPatient.pkDateOfChildbirth === formatDate() ? delete vObjDrugPairs['Heparin sodium'] : '';
    if (objPatient.vAge < 18) {
        with(vObjDrugPairs) {
            delete Apixaban;
            delete Rivaroxaban;
        }
        delete vObjDrugPairs['Enoxaparin sodium'];
        delete vObjDrugPairs['Nadroparin calcium'];
        delete vObjDrugPairs['Dabigatran etexilate'];
        delete vObjDrugPairs['Acetylsalicylic acid'];
    };
    (objPatient.vAge > 60) ? delete vObjDrugPairs.Warfarin: '';
    if (objPatient.pkSevereHepaticFailure) {
        with(vObjDrugPairs) {
            delete Rivaroxaban;
            delete Apixaban;
            delete Warfarin;
        }
        delete vObjDrugPairs['Heparin sodium'];
        delete vObjDrugPairs['Dabigatran etexilate'];
        delete vObjDrugPairs['Acetylsalicylic acid'];
    };
    (objPatient.pkHeartInsuff3_4 || objPatient.pkActiveUlcerOfStomachOrDuodenum) ? delete vObjDrugPairs['Acetylsalicylic acid']: '';
    objPatient.pkUncontrolledSystemicHypertension ? delete vObjDrugPairs['Heparin sodium'] : '';
    (objPatient.pkIsOrNoSurg && objPatient.pkPullOfSurg) ? delete vObjDrugPairs['Heparin sodium']: '';

    (objPatient.vCC < 15 || objPatient.pkChronicDialysis) ? (delete vObjDrugPairs.Rivaroxaban, delete vObjDrugPairs.Apixaban) : '';
    objPatient.vCC < 30 ? (delete vObjDrugPairs['Acetylsalicylic acid'], delete vObjDrugPairs['Dabigatran etexilate'], delete vObjDrugPairs['Fondaparinux sodium'], delete vObjDrugPairs.Warfarin) : '';

    objPatient.pkWeekOfPregnancy > 0 ? (delete vObjDrugPairs['Heparin sodium'], delete vObjDrugPairs.Rivaroxaban, delete vObjDrugPairs.Apixaban) : '';
    (objPatient.pkWeekOfPregnancy > 0 && objPatient.pkArtificialHeartValve) ? delete vObjDrugPairs['Enoxaparin sodium']: '';

    (objPatient.pkWeekOfPregnancy < 13 || objPatient.pkWeekOfPregnancy > 28) && objPatient.pkWeekOfPregnancy !== 0 ? delete vObjDrugPairs['Acetylsalicylic acid'] : '';
    objPatient.pkWeekOfPregnancy > 36 ? delete vObjDrugPairs.Warfarin : '';

    if (objPatient.vGender == 0 && objPatient.vAge < 45 && objPatient.pkWeekOfPregnancy == 0) {
        let vAns = confirm('Если пациентка кормит грудью, следует отменить грудное вскармливание. Ваше решение?');
        if (vAns == false) {
            with(vObjDrugPairs) {
                delete Apixaban;
                delete Rivaroxaban;
                delete Warfarin;
            }
            delete vObjDrugPairs['Acetylsalicylic acid'];
            delete vObjDrugPairs['Dabigatran etexilate'];
            delete vObjDrugPairs['Heparin sodium'];
        }
    };
};

function addOptionsToDatalist(vDrug, vDL) {
    vDL.find('option').remove();
    $.each(vDrug, function (key, value) {
        vDL.append($('<option>', {
                key: value
            })
            .text(value));
    });
    vDrug = {};
}
addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));

$('#chkUseLatinDrugName').on('click', function () {
    $(this).is(':checked') ? $('#drugLatinName, #inpText_2').show() : $('#drugLatinName, #inpText_2').hide();
});

function tryChooseDrugGroup() {
    console.log('func_1');
    $('#invitToAct_1').text('Выберите препарат по коммерческому названию:');

    if (!objPatient.pkIsOrNoSurg && objPatient.pkPullOfSurg && $('#inpText_4').val() === 'Гепарин натрия') {
        vDecision = confirm('Гепарин противопоказан при офтальмологических операциях. Отказаться от данного препарата?');
        vDecision ? (delete vObjDrugPairs['Heparin sodium'], !vDecision) : '';
    };
    if ($('#inpText_4').val() === 'Гепарин натрия' && objPatient.pkDiabetes) {
        vDecision = confirm('Гепарин противопоказан при наличии диабетической ретинопатии. Отказаться от данного препарата?');
        vDecision ? (delete vObjDrugPairs['Heparin sodium'], !vDecision, $('#inpText_4').val('')) : $('#inpText_4').val('');
    };
    if ($('#inpText_4').val() === 'Ацетилсалициловая кислота') {
        vDecision = confirm('Ацетилсалициловая кислота противопоказана при приеме с метотрексатом в дозе 15 мг в неделю и более, бронх. астме, индуцированной приемом салицилатов. Отказаться от данного препарата?');
        vDecision ? (delete vObjDrugPairs['Acetylsalicylic acid'], !vDecision, $('#inpText_4').val('')) : $('#inpText_4').val('');
    };
    if ($('#inpText_4').val() === 'Ривароксабан') {
        vDecision = confirm('Ривароксабан противопоказан при врожденном дефиците лактозы. Отказаться от данного препарата?');
        vDecision ? (delete vObjDrugPairs['Rivaroxaban'], !vDecision, $('#inpText_4').val('')) : $('#inpText_4').val('');
    };
    !vObjDrugPairs.hasOwnProperty(vPrevUsedDrugGroup) && vPrevUsedDrugGroup ? alert(`Препараты группы ${vPrevUsedDrugGroup} противопоказаны данному пациенту, выберите другой.`) : '';
    addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));
    $('#btnOne').hide();
    $('#inpText_4').unbind('input', doFirstChoice);
    $('#inpText_4').bind('input', passManagementToButtonOne);
};

function passManagementToButtonOne() {
    $('#btnOne').show().bind('click', chooseDrugGroup);
};

function chooseDrugGroup() {
    console.log('func_2');
    $('#inpText_4').unbind('input', passManagementToButtonOne);

    $('#inpText_4').val() === '' ? alert('Введите название лекарственного препарата.') : '';

    $('#btnOne, #lblLatinTitle').show();
    $('#inpText_2').val('');

    objChoosedDrug.objChoosedDrugGroup = $('#inpText_4').val();
    console.log(objChoosedDrug.objChoosedDrugGroup);

    $.each(vObjDrugPairs, function (index, value) {
        value === objChoosedDrug.objChoosedDrugGroup ? objChoosedDrug.objChoosedDrugGroupLat = index : '';
    });
    vArrPairs = Object.keys(objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs).map(function (name) {
        return [objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs[name].nameCyr, objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs[name].nameLat];

    });
    vObjDrugPairs = {};
    vArrPairs.forEach(entry => {
        let key = entry[0];
        let value = entry[1];
        vObjDrugPairs[entry[1]] = entry[0];
    });
    console.log(vObjDrugPairs);
    addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));
    $('#inpText_4').val('');
    $('#btnOne').hide();
    $('#inpText_4').bind('input', chooseDrug);
    $('#btnOne').unbind('click', chooseDrugGroup);

};
//    $('#btnOne').bind('click', chooseDrugGroup);

function chooseDrug() {
    console.log('func_3');

    $.each(vObjDrugPairs, function (index, value) {
        value === $('#inpText_4').val() ? $('#inpText_2').val(index) : '';
    });

    $('#inpText_4').val() === '' ? $('#inpText_2').val('') : '';
    $('#btnOne').show();
    $('#btnOne').bind('click', addDrugTitles);

}

function addDrugTitles() {
    console.log('func_4');
    $('#inpText_4').unbind('input', chooseDrug);
    objChoosedDrug.titleCyr = $('#inpText_4').val();
    objChoosedDrug.titleLat = $('#inpText_2').val();

    $('#inpText_4').val('');
    $('#invitToAct_1').text('Выберите аптечную дозу препарата:');
    $('#lblLatinTitle, #inpText_2').hide();
    if (objChoosedDrug.objChoosedDrugGroupLat === 'Acetylsalicylic acid') {
        $('#inpText_2, #invitToAct_2').show();
        $('#inpText_2').val('');
        vSingleDosesList = {
            1: '100',
            2: '200',
            3: '300'
        };
        addOptionsToDatalist(vSingleDosesList, $('#dlstList_2'));
    };
    let vTPath_1 = objDrugsList['Dabigatran etexilate'];
    (objPatient.vMedProfile === 2 && (objPatient.vAge > 75 || objPatient.vCC < 51)) ? (vTPath_1.singleProphDose = 110, vTPath_1.drugs.Pradaxa.officDose = [110]) : '';
    if (objPatient.vMedProfile === 4) {
        vTPath_1.timesADay = 1;
        objPatient.vAge < 76 ? (vTPath_1.singleProphDose = 220, vTPath_1.drugs.Pradaxa.officDose = [110]) : '';
    };

    let vTPath_2 = objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs;
    addOptionsToDatalist(vTPath_2[objChoosedDrug.titleLat].officDose, $('#dlstList_1'));

    $('#inpText_4').unbind('input', chooseDrug);
    console.log(objChoosedDrug.titleLat);
    $('#inpText_4').bind('input', attachFunc_makeNoteOfDrug);

    $('#btnOne').unbind('click', addDrugTitles).hide();

};

$('#inpText_2').on('input', function () {
    if (+($(this).val()) === 300 && objPatient.pkMedProfile === 4) {
        $('<br>').appendTo('#drugChooser');
        $('<div/>').attr({
                id: 'invitToAct_3'
            })
            .html('Выберите частоту приема препарата:')
            .appendTo('#drugChooser');
        $('<input/>').attr({
                id: 'inpText_3',
                type: 'text',
                list: 'dlstList_3'
            })
            .appendTo('#drugChooser');
        $('<datalist/>').attr({
                id: 'dlstList_3',
            })
            .appendTo('#inpText_3');
        vDailyDosesList = {
            1: 'ежедневно',
            2: 'через день'
        };
        addOptionsToDatalist(vDailyDosesList, $('#dlstList_3'));
    }
})

function attachFunc_makeNoteOfDrug() {
    console.log('func_5');
    $('#btnOne').bind('click', makeNoteOfDrug).show();
    $('#inpText_4').unbind('input', attachFunc_makeNoteOfDrug);
};

function makeNoteOfDrug() {
    console.log('func_6');
    let vT_1 = objDrugsList[objChoosedDrug.objChoosedDrugGroupLat],
        vT_2 = objChoosedDrug.officDose,
        vOfficDose_Gen = parseFloat($('#inpText_4').val()),
        vT_3,
        vT_4 = ' mg, ',
        vT_5 = '';

    switch (objChoosedDrug.objChoosedDrugGroupLat) {

        case 'Enoxaparin sodium':
            console.log('Enoxaparin sodium');
            vT_2.Ml = vOfficDose_Gen;
            vT_2.Mg = vT_2.Ml * 100;
            vT_2.aXa = vT_2.Ml * 10000;
            if (vT_2.Mg === 30 && objPatient.vRiscVTE === 2) {
                vT_1.timesADay = 2;
                vT_1.singleProphDose = 30;
            }
            (objPatient.vRiscVTE === 1 || objPatient.vCC < 30) ? (vT_1.singleProphDose = 20, objChoosedDrug.numberOfOfficDose = 1) : '';
            vT_3 = vT_2.Mg;
            while (vT_3 < vT_1.singleProphDose) {
                vT_3 += vT_3;
                objChoosedDrug.numberOfOfficDose++;
            };
            vT_5 = (vT_1.singleProphDose / 100) + ' ml, ';
            break;

        case 'Nadroparin calcium':
            console.log('Nadroparin calcium');

            vT_2.Ml = vOfficDose_Gen;
            vT_2.aXa = vT_2.Ml * 9500;
            ((objPatient.vMedProfile === 1 || objPatient.vMedProfile === 2) && objPatient.vWeight > 70) ? vT_1.singleProphDose = 0.6: '';
            (objPatient.vMedProfile === 3) ? vT_1.singleProphDose = 0.3: '';
            if (objPatient.vMedProfile === 4) {
                objPatient.vWeight < 50 ? vT_1.singleProphDose = 0.2 : objPatient.vWeight > 70 ? vT_1.singleProphDose = 0.4 : vT_1.singleProphDose = 0.3;
            };
            objPatient.vCC < 30 ? vT_1.singleProphDose = +(vT_1.singleProphDose *= 0.75).toFixed(2) : '';

            vI = vT_2.Ml;
            while (vI < vT_1.singleProphDose) {
                vI += vI;
                objChoosedDrug.numberOfOfficDose++;
            }
            vT_5 = vT_1.singleProphDose + ' ml, ';
            vT_1.singleProphDose *= 100;
            break;


        case 'Heparin sodium':
            console.log('Heparin sodium');
            objPatient.vWeight < 50 ? vT_1.timesADay = 2 : '';
            objPatient.vWeight > 150 ? vT_1.singleProphDose = 6500 : '';
            vT_2.ME = vOfficDose_Gen;
            vT_2.Ml = vT_2.ME / 1000;
            objChoosedDrug.numberOfOfficDose = (vT_1.singleProphDose / 25000).toFixed(1);
            vT_4 = ' ME, ';
            break;

        case 'Fondaparinux sodium':
            console.log('Fondaparinux sodium');
            objPatient.vCC < 50 ? vT_1.singleProphDose *= 0.6 : '';
            vT_2.Ml = vOfficDose_Gen;
            vT_2.Mg = vT_2.Ml * 5;
            vT_5 = (vT_1.singleProphDose) + ' ml, ';
            vT_1.singleProphDose *= 5;
            break;

        case 'Acetylsalicylic acid':
            console.log('Acetylsalicylic acid');
            $('#inpText_3').val() === 'через день' ?
                objChoosedDrug.frequencyOfDrugTaking = '2 сут.' : '';
            vT_2.Mg = vOfficDose_Gen;
            vT_1.singleProphDose = $('#inpText_2').val();
            objChoosedDrug.tempCont = (`${(vT_1.singleProphDose/vOfficDose_Gen).toFixed(1)} ${vT_1.container},`);
            $('#btnTry').trigger('click').remove();
            objChoosedDrug.numberOfOfficDose = (vT_1.singleProphDose / vT_2.Mg).toFixed(1);
            break;

        case 'Dabigatran etexilate':
            console.log('Dabigatran etexilate');

            vT_2.Mg = vOfficDose_Gen;
            vI = vOfficDose_Gen;
            while (vI < vT_1.singleProphDose) {
                vI += vI;
                objChoosedDrug.numberOfOfficDose++;
            }
            break;

        case 'Rivaroxaban':
            console.log('Rivaroxaban');
            (objPatient.vCC > 30 || objPatient.vCC < 51) ? vT_1.singleProphDose = 15: '';
            vT_2.Mg = vOfficDose_Gen;
            objChoosedDrug.numberOfOfficDose = (vT_1.singleProphDose / vOfficDose_Gen).toFixed(1);
            break;

        case 'Apixaban':
            console.log('Apixaban');
            vT_2.Mg = vOfficDose_Gen;
            objChoosedDrug.numberOfOfficDose = (vT_1.singleProphDose / vOfficDose_Gen).toFixed(1);
            break;

        case 'Warfarin':
            console.log('Warfarin');
            vT_2.Mg = vOfficDose_Gen;
            objChoosedDrug.numberOfOfficDose = (vT_1.singleProphDose / vOfficDose_Gen).toFixed(1);
            break;
    };
    objChoosedDrug.singleProphDose = (`${vT_1.singleProphDose}${vT_4}${vT_5}`);
    objChoosedDrug.tempCont = (`${vT_1.container} ${objChoosedDrug.numberOfOfficDose},`);
    let vTimE_S = 'раза';

    function convertObjPairsToString(vObj) {
        let vText = '',
            vPairs = Object.entries(vObj);
        vPairs.forEach(entry => {
            let key = entry[0];
            let value = entry[1];
            vText += (`, ${value} ${key}`);
        });
        return vText;
    }
    (vT_1.timesADay === 1 || vT_1.timesADay > 4) ? vTimE_S = 'раз': '';
    let vText_1 = convertObjPairsToString(vT_2),
        vText_2 = (`${objChoosedDrug.tempCont} ${objChoosedDrug.singleProphDose}`);
alert(`Выбран препарат: ${objChoosedDrug.titleCyr} (${objChoosedDrug.titleLat}${vText_1}, ${vT_1.container} 1) ${vT_1.delivery}, ${vText_2}${vT_1.timesADay} ${vTimE_S}/${objChoosedDrug.frequencyOfDrugTaking}`);
    console.log(`Выбран препарат: ${objChoosedDrug.titleCyr} (${objChoosedDrug.titleLat}${vText_1}, ${vT_1.container} 1) ${vT_1.delivery}, ${vText_2}${vT_1.timesADay} ${vTimE_S}/${objChoosedDrug.frequencyOfDrugTaking}`);
    $('#btnOne').unbind('click', makeNoteOfDrug);
};

//    $('#btnTry').on('click', function () {
//    });
});
