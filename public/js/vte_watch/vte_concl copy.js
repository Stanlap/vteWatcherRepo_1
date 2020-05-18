let oScalesVTE = JSON.parse(localStorage.getItem('objScalesVTE'));
console.log(oScalesVTE);
let oPat = JSON.parse(localStorage.getItem('Patient'));
console.log(oPat);
oPat.pkHighRiskOfBleed = false;


oScalesVTE.sIMPROVE > 7 || oScalesVTE.sHAS_BLED > 2 || oScalesVTE.sMajorBleedScore > 0 || oScalesVTE.sTraumBleed > 0 || oScalesVTE.sObstBleed > 2 ? oPat.pkRiskBleed = 1 : oPat.pkRiskBleed = 0;

oScalesVTE.sPadua = 4

const ballsEnding = item => {
    return item === 1 ? 'балл' : item > 1 && item < 5 ? 'балла' : 'баллов';
}

function countStratRF(vCounterRF, vScaleTitle) {
    let vStratRF = '';
    switch (vScaleTitle) {
        case 'Padua':
            vCounterRF > 3 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
        case 'IMPROVE':
            vCounterRF > 7 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
        case 'HAS_BLED':
            vCounterRF > 2 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
        case 'CHA2DS2_VASсOrRusSurgOrTraumRF':
            vCounterRF == 0 ? vStratRF = 'низкий' : (vCounterRF >= 1 && vCounterRF <= 2) ? vStratRF = 'умеренный' : vStratRF = 'высокий';
            return vStratRF;
        case 'Caprini':
            vCounterRF == 0 ? vStratRF = 'низкий' : (vCounterRF >= 1 && vCounterRF <= 2) ? vStratRF = 'умеренный' : (vCounterRF >= 3 && vCounterRF <= 4) ? vStratRF = 'высокий' : vStratRF = 'очень высокий';
            return vStratRF;
        case 'SurgOrTraumBleedingRF':
            vCounterRF >= 1 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
        case 'GreenTop37aRus':
            (vCounterRF > 0 && vCounterRF <= 2) ? vStratRF = 'умеренный': (vCounterRF > 2 && vCounterRF != 0) ? vStratRF = 'высокий' : '';
            return vStratRF;
    }
}
$('#divT_1, #divT_2, #divT_3').hide();
oPat.pkGeneralListOfRF.length ? (
    $('<p>', {
        text: (`Риск-факторы: ${oPat.pkGeneralListOfRF}.`)
    }).appendTo($('#divT_1')),
    $('#divT_1').show()
) : '';

oPat.pkAllChoosedOperations ? (
    $('<p>', {
        text: (`Операции: ${oPat.pkAllChoosedOperations}.`)
    }).appendTo($('#divT_1')),
    $('#divT_1').show()
) : '';

oScalesVTE.sPadua > 3 && oPat.pkMedProfiles.includes(1) ? $('<p>', {
    text: (`Padua: ${oScalesVTE.sPadua} ${ballsEnding(oScalesVTE.sPadua)}. Риск ${countStratRF(oScalesVTE.sPadua, 'Padua')}.`)
}).appendTo($('#divT_2')) : '';

oScalesVTE.sCHA2DS2_VASс >= 1 && oPat.pkMedProfiles.includes(2) ? $('<p>', {
    text: (`CHA2DS2-VASс: ${oScalesVTE.sCHA2DS2_VASс} ${ballsEnding(oScalesVTE.sCHA2DS2_VASс)}. Риск ' + ${countStratRF(oScalesVTE.sCHA2DS2_VASс, 'CHA2DS2_VASсOrRusSurgOrTraumRF')}.`)}).appendTo($('#divT_2')) : '';

oPat.pkIsOrNoSurg && oScalesVTE.sCaprini >= 2 && oPat.pkAllSurgProfiles ? $('<p>', {
    text: (`Caprini: ${oScalesVTE.sCaprini} ${ballsEnding(oScalesVTE.sCaprini)}. Риск ${countStratRF(oScalesVTE.sCaprini, 'Caprini')}.`)
}).appendTo($('#divT_2')) : '';

oPat.pkIsOrNoSurg && oScalesVTE.sRusSurgRF >= 1 && oPat.pkAllSurgProfiles ? $('<p>', {
    text: (`Российская риска ВТЭО в хирургии: ${oScalesVTE.sRusSurgRF} ${ballsEnding(oScalesVTE.sRusSurgRF)}. Риск ${countStratRF(oScalesVTE.sRusSurgRF, 'CHA2DS2_VASсOrRusSurgOrTraumRF')}.`)
}).appendTo($('#divT_2')): '';

oPat.pkIsOrNoSurg && oScalesVTE.sRusTraumRF > 2 && oPat.pkMedProfiles.includes(4) ? $('<p>', {
    text: (`Российская риска ВТЭО в травматологии: ${oScalesVTE.sRusTraumRF} ${ballsEnding(oScalesVTE.sRusTraumRF)}. Риск ${countStratRF(oScalesVTE.sRusTraumRF, 'CHA2DS2_VASсOrRusSurgOrTraumRF')}.`)
}).appendTo($('#divT_2')): '';

oScalesVTE.sGreenTop37a > 0 && oPat.pkGender === 0 && oPat.pkMedProfiles.includes(10) ? $('<p>', {
    text: (`GreenTopGuideline37a: ${oScalesVTE.sGreenTop37a}${ballsEnding(oScalesVTE.sGreenTop37a)}. Риск ${countStratRF(oScalesVTE.sGreenTop37a, 'GreenTop37aRus')}.`)
}).appendTo($('#divT_2')): '';

oScalesVTE.sObstRusRF > 0 && oPat.pkGender === 0 && oPat.pkMedProfiles.includes(10) ? $('<p>', {
    text: (`Российская риска ВТЭО в акушерстве-гинекологии: ${oScalesVTE.sObstRusRF} ${ballsEnding(oScalesVTE.sObstRusRF)}. Риск ${countStratRF(oScalesVTE.sObstRusRF, 'GreenTop37aRus')}.`)}).appendTo($('#divT_2')): '';

// [[[[[[[]]]]]]]


// oPat.pkGeneralListOfRF.length && oPat.pkAllChoosedOperations.length ? '' : $('<p>', {
//     text: (`Риск ВТЭО низкий. Медикаментозная профилактика не показана.`)
// }).appendTo($('#divT_1'));



$('#divT_2').children() ? $('#divT_2').show(): '';

// : $('#pBestConclusion').show();
// $('#divT_2').children().length === 0 && oPat.pkRiskVTE === 0 ? $('#pBestConclusion').show() : '';



(oScalesVTE.sIMPROVE > 7 && oPat.pkMedProfiles.includes(1)) ? $('<p>', {
    text: ('IMPROVE: ' + ballsEnding(oScalesVTE.sIMPROVE) + '. Риск ' + countStratRF(oScalesVTE.sIMPROVE, 'IMPROVE') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';
(oScalesVTE.sHAS_BLED > 2 && oPat.pkMedProfiles.includes(2)) ? $('<p>', {
    text: ('HAS-BLED: ' + ballsEnding(oScalesVTE.sHAS_BLED) + '. Риск ' + countStratRF(oScalesVTE.sHAS_BLED, 'HAS_BLED') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';

(oScalesVTE.sMajorBleedScore > 0 && oPat.pkAllSurgProfiles == true) ? $('<p>', {
    text: ('Major Bleeding Score: ' + ballsEnding(oScalesVTE.sMajorBleedScore) + '. Риск ' + countStratRF(oScalesVTE.sMajorBleedScore, 'SurgOrTraumBleedingRF') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';

(oScalesVTE.sTraumBleed > 0 && oPat.pkMedProfiles.includes(4)) ? $('<p>', {
    text: ('... при больших травматологических вмешательствах: ' + ballsEnding(oScalesVTE.sTraumBleed) + '. Риск ' + countStratRF(oScalesVTE.sTraumBleed, 'SurgOrTraumBleedingRF') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';

(oScalesVTE.sObstBleed > 0 && oPat.pkGender === 0 && oPat.pkMedProfiles.includes(10)) ? $('<p>', {
    text: ('... в акушерстве-гинекологии: ' + ballsEnding(oScalesVTE.sObstBleed) + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';

$('#pTextCollector_3').children().length > 0 && oPat.pkCalculateRiskOfBleeding ? ($('#pTextCollector_3').show(), oPat.pkHighRiskOfBleed = true) : '';

$('p:contains("высокий")').addClass('text-danger');
$('p:contains("умеренный")').addClass('text-warning');


oPat.pkMedProfile = 1;

function getMainMedProfile() {
    let arrStratRF = [0, 0, 0, [0, 0], 0];
    oScalesVTE.sPadua > 3 ? arrStratRF[1] = 2 : '';
    if (oPat.pkMedProfiles.includes(2)) {
        oScalesVTE.sCHA2DS2_VASс > 0 ? arrStratRF[2] = 2 : '';
    };
    if (oPat.pkIsOrNoSurg) {
        oScalesVTE.sRusSurgRF >= 1 && oScalesVTE.sRusSurgRF <= 2 ? arrStratRF[3][0] = 1 : oScalesVTE.sRusSurgRF >= 3 ? arrStratRF[3][0] = 2 : '';
        oScalesVTE.sCaprini === 2 ? arrStratRF[3][1] = 1 : oScalesVTE.sCaprini >= 3 ? arrStratRF[3][1] = 2 : '';
        // !!!!!! Код ниже для шкалы Caprini с умеренным риском профилактики ВТЭО с одного балла по шкале.
        // oScalesVTE.sCaprini >= 1 && oScalesVTE.sCaprini <= 2 ? arrStratRF[3][1] = 1 : oScalesVTE.sCaprini >= 3 ? arrStratRF[3][1] = 2 : '';
    };
    if (oPat.pkMedProfiles.includes(4)) {
        oScalesVTE.sRusTraumRF >= 1 && oScalesVTE.sRusTraumRF <= 2 ? arrStratRF[4] = 1 : oScalesVTE.sRusTraumRF >= 2 ? arrStratRF[4] = 2 : '';
    };
    oScalesVTE.sObstRusRF == 2 ? arrStratRF[5] = 1 : oScalesVTE.sObstRusRF > 2 ? arrStratRF[5] = 2 : '';

    arrStratRF[3] = Math.max.apply(null, arrStratRF[3]);

    arrStratRF[1] === 2 ? (oPat.pkMedProfile = 1, oPat.pkRiskVTE = arrStratRF[1]) : '';
    arrStratRF[2] === 1 || arrStratRF[2] === 2 ? (oPat.pkMedProfile = 2, oPat.pkRiskVTE = arrStratRF[2]) : '';
    if (arrStratRF[1] === 0 && arrStratRF[2] === 0) {
        arrStratRF[3] >= 1 ? (oPat.pkMedProfile = 3, oPat.pkRiskVTE = arrStratRF[3]) : '';
        arrStratRF[4] >= 1 ? (oPat.pkMedProfile = 4, oPat.pkRiskVTE = arrStratRF[4]) : '';
        //    arrStratRF[3] === 2 ? oPat.pkMedProfile = 3 : '';       arrStratRF[4] === 2 ? oPat.pkMedProfile = 4 : '';
    };
    oPat.pkDateOfChildbirth ? (oPat.pkMedProfile = 5, oPat.pkRiskVTE = arrStratRF[5]) : '';

    oPat.pkRiskVTE = arrStratRF[oPat.pkMedProfile];
}

getMainMedProfile();

// console.log(oPat.pkMedProfile);
// console.log(oPat.pkRiskVTE);
// console.log(oPat.pkSevereHepaticFailure);
// console.log(oPat.pkHeartInsuff3_4);
// console.log(oPat.pkIsOrNoSurg);
// console.log('Diabetes: ' + oPat.pkDiabetes);
// console.log('vActiveUlcer: ' + oPat.pkActiveUlcerOfStomachOrDuodenum);
// console.log('Chronic Dialysis: ' + oPat.pkChronicDialysis);
// console.log('Artificial Heart Valve: ' + oPat.pkArtificialHeartValve);
// console.log('Uncontrolled Systemic Hypertension: ' + oPat.pkUncontrolledSystemicHypertension);
// console.log('Some Surg: ' + oPat.pkPullOfSurg);
// console.log('Artroplasty: ' + oPat.pkArtroplasty);

// delete oPat.pkHeight;
localStorage.removeItem("Patient");
let serialObj = JSON.stringify(oPat);
localStorage.setItem("Patient", serialObj);


$('#btnTwo').bind('click', function () {
    let VTEProphylDecision = false;
    if (oPat.pkHighRiskOfBleed) {
        VTEProphylDecision = confirm('Риск кровотечения высокий. Отменить мед. профилактику ВТЭО?');
    };
    if (oPat.pkRiskVTE > 0) {
        VTEProphylDecision === false ? $(location).attr('href', '/vte_drug') : $(location).attr('href', '/vte_assignment_sheet');
    } else {
        $(location).attr('href', '/vte_assignment_sheet');
    };
    // $('#btnTwo').bind('click', function(){
    //     if(oPat.pkHighRiskOfBleed){
    //          let VTEProphylDecision = confirm('Риск кровотечения высокий. Отменить мед. профилактику ВТЭО?');
    //         VTEProphylDecision === false && oPat.pkRiskVTE > 0 ? $(location).attr('href', '/vte_drug') : alert('Переходим к листу профилактики ВТЭО.');        
    //     }else{
    oPat.pkRiskVTE > 0 ? $(location).attr('href', '/vte_drug') : alert('Переходим к листу профилактики ВТЭО.');
    //     };
});