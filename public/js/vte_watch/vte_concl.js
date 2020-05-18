let oSc = JSON.parse(localStorage.getItem('objScalesVTE'));
console.log(oSc);
let oPat = JSON.parse(localStorage.getItem('Patient'));
console.log(oPat);
oPat.pkHighRiskOfBleed = false;


oSc.sIMPROVE > 7 || oSc.sHAS_BLED > 2 || oSc.sMajorBleed > 0 || oSc.sTraumBleed > 0 || oSc.sObstBleed > 2 ? oPat.pkRiskBleed = 1 : oPat.pkRiskBleed = 0;

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
            (vCounterRF === 1) ? vStratRF = 'умеренный': (vCounterRF > 1) ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
    }
}

oPat.pkGeneralListOfRF.length ? $('<p>', {
    text: (`Риск-факторы: ${oPat.pkGeneralListOfRF}.`)
}).appendTo($('.textContainer')): '';

oPat.pkAllChoosedOperations ? $('<p>', {
    text: (`Операции: ${oPat.pkAllChoosedOperations}.`)
}).appendTo($('.textContainer')): '';

$('<div/>').prop({'id': 'divT_2'}).text('Шкалы риска ВТЭО:').appendTo('.textContainer').hide();

$('<div/>').prop({'id': 'divT_3'}).text('Шкалы риска кровотечения при профилактике ВТЭО:').appendTo('.textContainer').hide();

// oSc.sPadua = 4;
// oSc.sCHA2DS2_VASс = 2;
// oSc.sCaprini = 3;
// oSc.sRusSurgRF = 2;
// oSc.sRusTraumRF = 3;
// sGreenTop37a = 1;
// oSc.sObstRusRF = 1;

const makeScale = (sVal, sName, sExactName, par) => 
$('<p>', {text : `Шкала ${sName}: ${sVal} ${ballsEnding(sVal)}. Риск ${countStratRF(sVal, sExactName)}.`}).appendTo(par);

let vPar = '#divT_2';

oSc.sPadua > 3 && oPat.pkMedProfiles.includes(1) ? makeScale(oSc.sPadua, 'Padua', 'Padua', vPar): '';
oSc.sCHA2DS2_VASс >= 1 && oPat.pkMedProfiles.includes(2) ? makeScale(oSc.sCHA2DS2_VASс, 'CHA2DS2-VASс', 'CHA2DS2_VASсOrRusSurgOrTraumRF', vPar): '';
oPat.pkIsOrNoSurg && oSc.sCaprini >= 2 && oPat.pkAllSurgProfiles == true ? makeScale(oSc.sCaprini, 'Caprini', 'Caprini', vPar): '';
oPat.pkIsOrNoSurg && oSc.sRusSurgRF >= 1 && oPat.pkAllSurgProfiles == true ? makeScale(oSc.sRusSurgRF, 'Российская риска ВТЭО в хирургии', 'CHA2DS2_VASсOrRusSurgOrTraumRF', vPar): '';
oPat.pkIsOrNoSurg && oSc.sRusTraumRF > 2 && oPat.pkMedProfiles.includes(4) ? makeScale(oSc.sRusTraumRF, 'Российская риска ВТЭО в травматологии', 'CHA2DS2_VASсOrRusSurgOrTraumRF', vPar): '';
oSc.sGreenTop37a > 0 && oPat.pkMedProfiles.includes(10) ? makeScale(oSc.sGreenTop37a, 'GreenTopGuideline37a', 'GreenTop37aRus', vPar): '';
oSc.sObstRusRF > 0 && oPat.pkMedProfiles.includes(10) ? makeScale(oSc.sObstRusRF, 'Российская риска ВТЭО в акушерстве-гинекологии', 'GreenTop37aRus', vPar): '';

$('#divT_2').children().length ? $('#divT_2').show() : '';

vPar = '#divT_3';

oSc.sIMPROVE > 7 && oPat.pkMedProfiles.includes(1) ? makeScale(oSc.sIMPROVE, 'IMPROVE', 'IMPROVE', vPar): '';
oSc.sHAS_BLED > 2 && oPat.pkMedProfiles.includes(2) ? makeScale(oSc.sHAS_BLED, 'HAS-BLED', 'HAS_BLED', vPar): '';
oSc.sMajorBleed > 0 && oPat.pkAllSurgProfiles == true ? makeScale(oSc.sMajorBleed, 'Major Bleeding Score', 'SurgOrTraumBleedingRF', vPar): '';
oSc.sTraumBleed > 0 && oPat.pkMedProfiles.includes(4) ? makeScale(oSc.sTraumBleed, '... при больших травматологических вмешательствах', 'SurgOrTraumBleedingRF', vPar): '';
oSc.sObstBleed > 0 && oPat.pkGender === 0 && oPat.pkMedProfiles.includes(10) ?
$('<p>', {text: `... в акушерстве-гинекологии: ${oSc.sObstBleed} ${ballsEnding(oSc.sObstBleed)}.`}).appendTo($('#divT_3')): '';

$('#divT_3').children().length && oPat.pkCalculateRiskOfBleeding ? ($('#divT_3').show(), oPat.pkHighRiskOfBleed = true) : '';

// !oPat.pkGeneralListOfRF.length && !oPat.pkAllChoosedOperations.length ? 
// $('<p>', {
//     text: (`Риск ВТЭО низкий. Медикаментозная профилактика не показана.`)
// }).appendTo($('.textContainer')): '';

// $('#divT_2').children().length && oPat.pkRiskVTE === 0 ? $('#pBestConclusion').show() : '';

$('.textContainer p:contains("высокий")').addClass('text-danger');
$('.textContainer p:contains("умеренный")').addClass('text-warning');

// var myList = document.getElementById("tCont").textContent;
// console.log(myList);
// var myP = document.getElementById("tCont");
// console.log(myP.innerText);


oPat.pkMainProfile = 1;

function getMainMedProfile() {
    let arrStratRF = [0, 0, 0, [0, 0], 0];
    oSc.sPadua > 3 ? arrStratRF[1] = 2 : '';
    if (oPat.pkMedProfiles.includes(2)) {
        oSc.sCHA2DS2_VASс > 0 ? arrStratRF[2] = 2 : '';
    };
    if (oPat.pkIsOrNoSurg) {
        oSc.sRusSurgRF >= 1 && oSc.sRusSurgRF <= 2 ? arrStratRF[3][0] = 1 : oSc.sRusSurgRF >= 3 ? arrStratRF[3][0] = 2 : '';
        oSc.sCaprini === 2 ? arrStratRF[3][1] = 1 : oSc.sCaprini >= 3 ? arrStratRF[3][1] = 2 : '';
        // !!!!!! Код ниже для шкалы Caprini с умеренным риском профилактики ВТЭО с одного балла по шкале.
        // oSc.sCaprini >= 1 && oSc.sCaprini <= 2 ? arrStratRF[3][1] = 1 : oSc.sCaprini >= 3 ? arrStratRF[3][1] = 2 : '';
    };
    if (oPat.pkMedProfiles.includes(4)) {
        oSc.sRusTraumRF >= 1 && oSc.sRusTraumRF <= 2 ? arrStratRF[4] = 1 : oSc.sRusTraumRF >= 2 ? arrStratRF[4] = 2 : '';
    };
    oSc.sObstRusRF == 2 ? arrStratRF[5] = 1 : oSc.sObstRusRF > 2 ? arrStratRF[5] = 2 : '';

    arrStratRF[3] = Math.max.apply(null, arrStratRF[3]);

    arrStratRF[1] === 2 ? (oPat.pkMainProfile = 1, oPat.pkRiskVTE = arrStratRF[1]) : '';
    arrStratRF[2] === 1 || arrStratRF[2] === 2 ? (oPat.pkMainProfile = 2, oPat.pkRiskVTE = arrStratRF[2]) : '';
    if (arrStratRF[1] === 0 && arrStratRF[2] === 0) {
        arrStratRF[3] >= 1 ? (oPat.pkMainProfile = 3, oPat.pkRiskVTE = arrStratRF[3]) : '';
        arrStratRF[4] >= 1 ? (oPat.pkMainProfile = 4, oPat.pkRiskVTE = arrStratRF[4]) : '';
        //    arrStratRF[3] === 2 ? oPat.pkMainProfile = 3 : '';       arrStratRF[4] === 2 ? oPat.pkMainProfile = 4 : '';
    };
    oPat.pkDateOfChildbirth ? (oPat.pkMainProfile = 5, oPat.pkRiskVTE = arrStratRF[5]) : '';

    oPat.pkRiskVTE = arrStratRF[oPat.pkMainProfile];
}

getMainMedProfile();

console.log(oPat.pkMainProfile);
console.log(oPat.pkRiskVTE);

$('#btnOne').on('click', function(){
    let VTEProphylDecision = false;
    if(oPat.pkHighRiskOfBleeding){
        VTEProphylDecision = confirm('Риск кровотечения высокий. Отменить мед. профилактику ВТЭО?');
    };
    if(oPat.pkRiskVTE > 0){
            VTEProphylDecision ? $(location).attr('href', '/vte_assignment_sheet') :$(location).attr('href', '/vte_drug');
    }else{
        $(location).attr('href', '/vte_assignment_sheet');
    };
        oPat.pkRiskVTE > 0 ? $(location).attr('href', '/vte_drug') : alert('Переходим к листу профилактики ВТЭО.');        
});