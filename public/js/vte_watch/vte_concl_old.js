let objBallsRiskVTE = JSON.parse(localStorage.getItem('objScalesVTE'));
console.log(objBallsRiskVTE);
let oPat = JSON.parse(localStorage.getItem('Patient'));
console.log(oPat);
oPat.pkHighRiskOfBleeding = false;


objBallsRiskVTE.vCounterIMPROVE > 7 || objBallsRiskVTE.vCounterHAS_BLED > 2 || objBallsRiskVTE.vCounterMajorBleedingScoreRF > 0 || objBallsRiskVTE.vCounterTraumBleedingRF > 0 || objBallsRiskVTE.vCounterObstBleedingRF > 2 ? oPat.pkRiskBleed = 1 : oPat.pkRiskBleed = 0;

const ageEnding = item => {
    return vA === 1 ? 'год' : vA > 1 && vA < 5 ? 'года' : 'лет';
}


function ballsEnding(counter) {
    let vBalls;
    if (counter == 1) {
        vBalls = ' балл';
    }
    if (counter > 1 && counter < 5) {
        vBalls = ' балла';
    }
    if (counter > 4) {
        vBalls = ' баллов';
    }
    return counter + vBalls;
}

function countStratRF(vCounterRF, vScaleTitle) {
    let vStratRF = '';
    switch (vScaleTitle) {
        case 'Padua':
            vCounterRF > 3 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'IMPROVE':
            vCounterRF > 7 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'HAS_BLED':
            vCounterRF > 2 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'CHA2DS2_VASсOrRusSurgOrTraumRF':
            vCounterRF == 0 ? vStratRF = 'низкий' : (vCounterRF >= 1 && vCounterRF <= 2) ? vStratRF = 'умеренный' : vStratRF = 'высокий';
            return vStratRF;
            break;

        case 'Caprini':
            vCounterRF == 0 ? vStratRF = 'низкий' : (vCounterRF >= 1 && vCounterRF <= 2) ? vStratRF = 'умеренный' : (vCounterRF >= 3 && vCounterRF <= 4) ? vStratRF = 'высокий' : vStratRF = 'очень высокий';
            return vStratRF;
            break;
        case 'SurgOrTraumBleedingRF':
            vCounterRF >= 1 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'GreenTop37aRus':
            (vCounterRF > 0 && vCounterRF <= 2) ? vStratRF = 'умеренный': (vCounterRF > 2 && vCounterRF != 0) ? vStratRF = 'высокий' : '';
            return vStratRF;
    }
}

// $('#btnTwo').on('click', function () {
// $('#pTitleOfConclusion').show();

(oPat.pkGeneralListOfRF != '') ? $('<p>', {
    text: ('Заболевания и риск-факторы: ' + oPat.pkGeneralListOfRF + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_1')): '';

// (oPat.pkGeneralListOfRF != '') ? $('<p>', {
//     text: (oPat.pkGeneralListOfRF + '.'),
//     class: 'pTextContainer'
// }).appendTo($('#pTextCollector_1')):  $('<p>',{
//     text: 'нет.',
//     class: 'pTextContainer'
// }).appendTo($('#pTextCollector_1'));

(oPat.pkAllChoosedOperations != '') ? $('<p>', {
    text: ('Операции:' + oPat.pkAllChoosedOperations + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_1')): '';

($('#pTextCollector_1').children().length > 0) ? $('#pTitleOfConclusion').show(): $('#pBestConclusion').show();

(objBallsRiskVTE.vCounterPaduaScore > 3 && oPat.pkValuesMedPfofile.includes(1)) ? $('<p>', {
    text: ('Padua: ' + ballsEnding(objBallsRiskVTE.vCounterPaduaScore) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterPaduaScore, 'Padua') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_2')): '';

(objBallsRiskVTE.vCounterCHA2DS2_VASс >= 1 && oPat.pkValuesMedPfofile.includes(2)) ? $('<p>', {
    text: ('CHA2DS2-VASс: ' + ballsEnding(objBallsRiskVTE.vCounterCHA2DS2_VASс) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterCHA2DS2_VASс, 'CHA2DS2_VASсOrRusSurgOrTraumRF') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_2')): '';

( oPat.pkIsOrNoSurg && objBallsRiskVTE.vCounterCapriniRF >= 2 && oPat.pkAllSurgProfiles == true) ? $('<p>', {
    text: ('Caprini: ' + ballsEnding(objBallsRiskVTE.vCounterCapriniRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterCapriniRF, 'Caprini') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_2')): '';

( oPat.pkIsOrNoSurg && objBallsRiskVTE.vCounterRusSurgRF >= 1 && oPat.pkAllSurgProfiles == true) ? $('<p>', {
    text: ('Российская риска ВТЭО в хирургии: ' + ballsEnding(objBallsRiskVTE.vCounterRusSurgRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterRusSurgRF, 'CHA2DS2_VASсOrRusSurgOrTraumRF') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_2')): '';

( oPat.pkIsOrNoSurg && objBallsRiskVTE.vCounterRusTraumRF > 2 && oPat.pkValuesMedPfofile.includes(4)) ? $('<p>', {
    text: ('Российская риска ВТЭО в травматологии: ' + ballsEnding(objBallsRiskVTE.vCounterRusTraumRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterRusTraumRF, 'CHA2DS2_VASсOrRusSurgOrTraumRF') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_2')): '';

(objBallsRiskVTE.vCounterGreenTop37a > 0 && oPat.pkGender === 0 && oPat.pkValuesMedPfofile.includes(10)) ? $('<p>', {
    text: ('GreenTopGuideline37a: ' + ballsEnding(objBallsRiskVTE.vCounterGreenTop37a) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterGreenTop37a, 'GreenTop37aRus') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_2')): '';
(objBallsRiskVTE.vCounterObstRuRF > 0 && oPat.pkGender === 0 && oPat.pkValuesMedPfofile.includes(10)) ? $('<p>', {
    text: ('Российская риска ВТЭО в акушерстве-гинекологии: ' + ballsEnding(objBallsRiskVTE.vCounterObstRuRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterObstRuRF, 'GreenTop37aRus') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_2')): '';
$('#pTextCollector_2').children().length > 0 ? $('#pTextCollector_2').show() : $('#pBestConclusion').show();
$('#pTextCollector_2').children().length === 0 && oPat.pkRiskVTE === 0 ? $('#pBestConclusion').show() : '';



(objBallsRiskVTE.vCounterIMPROVE > 7 && oPat.pkValuesMedPfofile.includes(1)) ? $('<p>', {
    text: ('IMPROVE: ' + ballsEnding(objBallsRiskVTE.vCounterIMPROVE) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterIMPROVE, 'IMPROVE') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';
(objBallsRiskVTE.vCounterHAS_BLED > 2 && oPat.pkValuesMedPfofile.includes(2)) ? $('<p>', {
    text: ('HAS-BLED: ' + ballsEnding(objBallsRiskVTE.vCounterHAS_BLED) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterHAS_BLED, 'HAS_BLED') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';

(objBallsRiskVTE.vCounterMajorBleedingScoreRF > 0 && oPat.pkAllSurgProfiles == true) ? $('<p>', {
    text: ('Major Bleeding Score: ' + ballsEnding(objBallsRiskVTE.vCounterMajorBleedingScoreRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterMajorBleedingScoreRF, 'SurgOrTraumBleedingRF') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';

(objBallsRiskVTE.vCounterTraumBleedingRF > 0 && oPat.pkValuesMedPfofile.includes(4)) ? $('<p>', {
    text: ('... при больших травматологических вмешательствах: ' + ballsEnding(objBallsRiskVTE.vCounterTraumBleedingRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterTraumBleedingRF, 'SurgOrTraumBleedingRF') + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';

(objBallsRiskVTE.vCounterObstBleedingRF > 0 && oPat.pkGender === 0 && oPat.pkValuesMedPfofile.includes(10)) ? $('<p>', {
    text: ('... в акушерстве-гинекологии: ' + ballsEnding(objBallsRiskVTE.vCounterObstBleedingRF) + '.'),
    class: 'pTextContainer'
}).appendTo($('#pTextCollector_3')): '';

$('#pTextCollector_3').children().length > 0 && oPat.pkCalculateRiskOfBleeding ? ($('#pTextCollector_3').show(), oPat.pkHighRiskOfBleeding = true) : '';

$('.pTextContainer:contains("высокий")').css({
    'color': 'red'
});
$('.pTextContainer:contains("умеренный")').css({
    'color': 'orange'
});



oPat.pkMedProfile = 1;

function getMainMedProfile() {
    let arrStratRF = [0, 0, 0, [0, 0], 0];
    objBallsRiskVTE.vCounterPaduaScore > 3 ? arrStratRF[1] = 2 : '';
    if (oPat.pkValuesMedPfofile.includes(2)) {
        objBallsRiskVTE.vCounterCHA2DS2_VASс > 0 ? arrStratRF[2] = 2 : '';
    };
    if (oPat.pkIsOrNoSurg) {
        objBallsRiskVTE.vCounterRusSurgRF >= 1 && objBallsRiskVTE.vCounterRusSurgRF <= 2 ? arrStratRF[3][0] = 1 : objBallsRiskVTE.vCounterRusSurgRF >= 3 ? arrStratRF[3][0] = 2 : '';
        objBallsRiskVTE.vCounterCapriniRF === 2 ? arrStratRF[3][1] = 1 : objBallsRiskVTE.vCounterCapriniRF >= 3 ? arrStratRF[3][1] = 2 : '';
        // !!!!!! Код ниже для шкалы Caprini с умеренным риском профилактики ВТЭО с одного балла по шкале.
        // objBallsRiskVTE.vCounterCapriniRF >= 1 && objBallsRiskVTE.vCounterCapriniRF <= 2 ? arrStratRF[3][1] = 1 : objBallsRiskVTE.vCounterCapriniRF >= 3 ? arrStratRF[3][1] = 2 : '';
    };
    if (oPat.pkValuesMedPfofile.includes(4)) {
        objBallsRiskVTE.vCounterRusTraumRF >= 1 && objBallsRiskVTE.vCounterRusTraumRF <= 2 ? arrStratRF[4] = 1 : objBallsRiskVTE.vCounterRusTraumRF >= 2 ? arrStratRF[4] = 2 : '';
    };
    objBallsRiskVTE.vCounterObstRuRF == 2 ? arrStratRF[5] = 1 : objBallsRiskVTE.vCounterObstRuRF > 2 ? arrStratRF[5] = 2 : '';

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


$('#btnTwo').bind('click', function(){
    let VTEProphylDecision = false;
    if(oPat.pkHighRiskOfBleeding){
        VTEProphylDecision = confirm('Риск кровотечения высокий. Отменить мед. профилактику ВТЭО?');
    };
    if(oPat.pkRiskVTE > 0){
            VTEProphylDecision === false ? $(location).attr('href', '/vte_drug') : $(location).attr('href', '/vte_assignment_sheet');
    }else{
        $(location).attr('href', '/vte_assignment_sheet');
    };
// $('#btnTwo').bind('click', function(){
//     if(oPat.pkHighRiskOfBleeding){
//          let VTEProphylDecision = confirm('Риск кровотечения высокий. Отменить мед. профилактику ВТЭО?');
//         VTEProphylDecision === false && oPat.pkRiskVTE > 0 ? $(location).attr('href', '/vte_drug') : alert('Переходим к листу профилактики ВТЭО.');        
//     }else{
        oPat.pkRiskVTE > 0 ? $(location).attr('href', '/vte_drug') : alert('Переходим к листу профилактики ВТЭО.');        
//     };
});