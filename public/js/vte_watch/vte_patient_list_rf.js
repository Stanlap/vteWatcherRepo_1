let oPat = JSON.parse(localStorage.getItem('Patient'));
localStorage.removeItem('Patient')
console.log(oPat);
let objSelectedOper = JSON.parse(localStorage.getItem('SelectedOper'));
localStorage.removeItem('SelectedOper');
console.log(objSelectedOper);

oPat.pkSevereHepaticFailure = false;
oPat.pkHeartInsuff3_4 = false;
oPat.pkDiabetes = false;
oPat.pkActiveUlcerOfStomachOrDuodenum = false;
oPat.pkChronicDialysis = false;
oPat.pkArtificialHeartValve = false;
oPat.pkUncontrolledSystemicHypertension = false;
oPat.pkRace = 0;
oPat.pkHipFractureSurgery = false;

$('#divAllRF div').hide();
$('.divMiddleLvlRF').hide();
$('.divFemaleLvl').show();

$.extend({
    distinct: function (anArray) {
        let result = [];
        $.each(anArray, function (i, v) {
            if ($.inArray(v, result) === -1) result.push(v);
        });
        return result;
    }
});

$('.divSingleLvlRF').on('click', function (el) {
    el = $(this).closest('.divMiddleLvlRF').prev().find('input:checkbox');
    ($(this).closest('.divMiddleLvlRF').find('input:checkbox').is(':checked')) ? el.prop('checked', true): el.prop('checked', false);
});

$('.divMiddleLvlRF').on('click', function (event, el) {
    el = $(this).prev();
    (el.find('input:checkbox').is(':checked')) ? $(this).prev().hide(): ($(this).prev().show(), $(this).hide(), el.find('button').html('&gt;'));
});

$('.divSingleLvlRF label').next().on('click', function (ev) {
    $(this).next().show();
    $(this).hide();
    ev.stopPropagation();
});

$('.divSingleLvlRF label').next().next().on('click', function (ev) {
    $(this).prev().show();
    $(this).hide();
    ev.stopPropagation();
});

$('.btnTogglerRF').on('click', function () {
    ($(this).html() === ('&gt;')) ? ($(this).closest('.divTogglerRF').next().show(), $(this).html('&lt;')) : ($(this).parents('.divTogglerRF').next().hide(), $(this).html('&gt;'));
});

let selectedRF = [];

if (oPat.pkValuesMedPfofile.includes(1)) {
    selectedRF = $.merge($(selectedRF), $('.clsTherRF'));
    oPat.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.clsNonsurgBleedingRF')) : '';
};

if (oPat.pkValuesMedPfofile.includes(2)) {
    selectedRF = $.merge($(selectedRF), $('.clsAtrFibrRF'));
    oPat.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.clsFibrBleedingRF')) : '';
};


function isMedProfilesMoreTwo() {
    $.each(oPat.pkValuesMedPfofile, function (index, value) {
        if (value > 2) return true;
    });
};

if (isMedProfilesMoreTwo()) {
    selectedRF = $.merge($(selectedRF), $('.clsSurgRF'));
    (oPat.pkCalculateRiskOfBleeding && oPat.pkValuesMedPfofile.includes(4) && oPat.pkValuesMedPfofile.includes(10)) ? selectedRF = $.merge($(selectedRF), $('.clsSurgBleedingRF')): '';
    (oPat.pkCalculateRiskOfBleeding && $.inArray(4, oPat.pkValuesMedPfofile) === -1 && $.inArray(10, oPat.pkValuesMedPfofile) === -1) ? selectedRF = $.merge($(selectedRF), $('.clsSurgBleedingRF')): '';
};

if (oPat.pkValuesMedPfofile.includes(4)) {
    selectedRF = $.merge($(selectedRF), $('.clsTraumRF'));
    oPat.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.clsTraumBleedingRF')) : '';
};

(oPat.pkValuesMedPfofile.includes(5)) ? selectedRF = $.merge($(selectedRF), $('.clsNeurosurgRF')): '';
(oPat.pkValuesMedPfofile.includes(8)) ? selectedRF = $.merge($(selectedRF), $('.clsCombustRF')): '';
(oPat.pkValuesMedPfofile.includes(9)) ? selectedRF = $.merge($(selectedRF), $('.clsOncoRF')): '';

if (oPat.pkValuesMedPfofile.includes(10)) {
    oPat.pkObstOrGynProfile === 0 ? selectedRF = $.merge($(selectedRF), $('.clsObstRF')): '';
    oPat.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.clsObstBleedingRF')) : '';
    oPat.pkPregnancyOrChildbirth === 1 ? selectedRF = $.merge($(selectedRF), $('.clsLabourRF')): '';
};

selectedRF = $.distinct(selectedRF);
$(selectedRF).show();

$('.divTogglerRF').show();

$('#divProfileOfPatient').hide();
if (oPat.pkGender === 1) {
    $('#chkFemale').prop('checked', false);
    $('#chkMaleDouble').prop('checked', true);
    $('.divFemaleLvl').hide();
} else {
    $('#chkFemale').prop('checked', true);
    $('#chkMaleDouble').prop('checked', false);
    $('.divFemaleLvl').show();
}

oPat.pkPregnancyOrChildbirth < 2 ? $('#chkPostpartum').prop('checked', true): '';





$('#btnIsRenalInsuff').on('click', function () {
    ($(this).html() === ('&gt;')) ? $('#frmGFR_CC').hide(): ($('#frmGFR_CC').show(), alert('Критически важно! Вводимые единицы измерения креатинина должны точно соответствовать его введенному значению. К сведению: если значение креатинина не введено, программа расценивает функцию почек как норму при назначении профилактики ВТЭО.'));
});

$('.chkLungDiseases_1').on('click', function () {
    $('.chkLungDiseases_1').not(this).prop('checked', false);
    if ($(this).is(':checked')) {
        ($(this).attr('id') === 'chkSevereLungDiseases') ? $('#chkIsBedRestMore3Days, #chkBedRestMore3Days').prop('checked', true): '';
        if ($(this).attr('id') === 'chkModerateLungDiseases') {
            if ($('.chkBedRestMore3Days_1').is(':checked')) {} else {
                $('#chkIsBedRestMore3Days').prop('checked', false);
                if ($('#chkBedRestMore3Days').attr('data-hasMarked') == '0') {
                    $('#chkIsBedRestMore3Days, #chkBedRestMore3Days').prop('checked', false);
                }
            }
        }
    }
});

$('.chkBedRestMore3Days_1').on('click', function () {
    ($(this).is(':checked')) ? $('#chkIsBedRestMore3Days, #chkBedRestMore3Days').prop('checked', true): ($('.chkBedRestMore3Days_1').is(':checked')) ? $('#chkIsBedRestMore3Days, #chkBedRestMore3Days').prop('checked', true) : ($('#chkBedRestMore3Days').attr('data-hasMarked') == '0') ? $('#chkIsBedRestMore3Days, #chkBedRestMore3Days').prop('checked', false) : '';
    console.log($('#chkBedRestMore3Days').attr('data-hasMarked'));
});

$('#chkBedRestMore3Days').on('click', function () {
    let a = $(this).attr('data-hasMarked');
    console.log(a);
    ($(this).is(':checked')) ? $(this).attr('data-hasMarked', '1'): $(this).attr('data-hasMarked', '0');
    ($('#chkIsBedRestMore3Days').is(':checked')) ? (alert('Отмечены ранее патологические состояния и риск-факторы, которые требуют соблюдения больным строгого постального режима'), $(this).prop('checked', true)) : '';
    console.log($(this).attr('data-hasMarked'));
});


$('.chkGlomerularFiltrationRate_1').on('click', function () {
    $('.chkGlomerularFiltrationRate_1').not(this).prop('checked', false);
});

$('.chkDiabetes_1').on('click', function () {
    $('.chkDiabetes_1').not(this).prop('checked', false);
});
$('.chkSystemicHypertension_1').on('click', function () {
    $('.chkSystemicHypertension_1').not(this).prop('checked', false);
});

$('.chkBurnsSuperficial_1').on('click', function () {
    $('.chkBurnsSuperficial_1').not(this).prop('checked', false);
});

$('.chkBurnsDeep_1').on('click', function () {
    $('.chkBurnsDeep_1').not(this).prop('checked', false);
});

$('.chkThermalInhalationInjury_1').on('click', function () {
    $('.chkThermalInhalationInjury_1').not(this).prop('checked', false);
});

$('.chkSpinalCordInjure_1').on('click', function () {
    $('.chkSpinalCordInjure_1').not(this).prop('checked', false);
});

$('#chkSepsis').on('click', function () {
    ($(this).is(':checked')) ? $('#chkAcuteInflammatoryDisease').prop('checked', true): '';
});
$('#chkHeartInsuff3_4').on('click', function () {
    ($(this).is(':checked') && $('#lblSomeHeartInsuff').is(':visible')) ? $('#chkSomeHeartInsuff').prop('checked', true): '';
});
$('#chkHeartInsuffLess1Month').on('click', () => ($(this).is(':checked') && $('#lblSomeHeartInsuff').is(':visible')) ? $('#chkSomeHeartInsuff').prop('checked', true) : '')

$('#chkCongestHeartFailOrSystLVDysfunctEFLess40Percent').on('click', function () {
    ($(this).is(':checked') && $('#lblSomeHeartInsuff').is(':visible')) ? $('#chkSomeHeartInsuff').prop('checked', true): '';
});
$('.chkNeoplasm_2').on('click', function () {
    ($(this).is(':checked')) ? $('#chkActiveNeoplasm').prop('checked', true).closest('.divSingleLvlRF').hide():
        ($('#chkActiveNeoplasm').attr('data-hasMarked') == '0') ? $('#chkActiveNeoplasm').prop('checked', false).closest('.divSingleLvlRF').show() : '';
});
$('#chkActiveNeoplasm').on('change', function () {
    ($(this).is(':checked')) ? $(this).attr('data-hasMarked', '1'): $(this).attr('data-hasMarked', '0');
});
$('#chkAcuteRheumaticDiseases').on('click', function () {
    ($(this).is(':checked')) ? $('#chkRheumaticDiseases').prop('checked', true).closest('.divSingleLvlRF').hide():
        ($('#chkRheumaticDiseases').attr('data-hasMarked') == '0') ? $('#chkRheumaticDiseases').prop('checked', false).closest('.divSingleLvlRF').show() : '';
});

$('#chkPlateletsLess150').on('click', function () {
    if ($(this).is(':checked')) {
        $(this).attr('data-hasMarked', '1');
    } else {
        $(this).attr('data-hasMarked', '0');
        $('#chkPlateletsLess50, #chkPlateletsLess75').prop('checked', false);
    }
});
$('#chkPlateletsLess75').on('click', function () {
    if ($(this).is(':checked')) {
        $('#chkPlateletsLess150').prop('checked', true).closest('.divSingleLvlRF').hide();
        $(this).attr('data-hasMarked', '1');

    } else {
        $('#chkPlateletsLess50').prop('checked', false).closest('.divSingleLvlRF').show();
        $('#chkPlateletsLess150').attr('data-hasMarked') == '0' ? $('#chkPlateletsLess150').prop('checked', false).closest('.divSingleLvlRF').show() : $('#chkPlateletsLess150').closest('.divSingleLvlRF').show();
        $(this).attr('data-hasMarked', '0');
    }
});
$('#chkPlateletsLess50').on('click', function () {
    ($(this).is(':checked')) ? $('#chkPlateletsLess150, #chkPlateletsLess75').prop('checked', true).closest('.divSingleLvlRF').hide():
        ($('#chkPlateletsLess150').attr('data-hasMarked') == '1' && $('#chkPlateletsLess75').attr('data-hasMarked') == '0') ? ($('#chkPlateletsLess150').prop('checked', true).closest('.divSingleLvlRF').show(), $('#chkPlateletsLess75').prop('checked', false).closest('.divSingleLvlRF').show()) : ($('#chkPlateletsLess75').attr('data-hasMarked') == '1') ?
        $('#chkPlateletsLess75, #chkPlateletsLess150').prop('checked', true).closest('.divSingleLvlRF').show() :
        ($('#chkPlateletsLess75, #chkPlateletsLess150').attr('data-hasMarked') == '0') ? $('#chkPlateletsLess75, #chkPlateletsLess150').prop('checked', false).closest('.divSingleLvlRF').show() : '';
});


function countStratRF(vCounterRF, x) {
    let vStratRF = '';
    switch (x) {
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
            //
            //            vCounterRF > 2 ? vStratRF = 'высокий' : vStratRF = 'умеренный';
            return vStratRF;
    }
}
$.each(objCreatinineUnits, function(key, value) {
    $('#slctCrUnitsGroup')
    .append($('<option>', { value : key })
    .text(key));
    });

// console.log(`CC and GFR: ${calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)}`);

// let vRace = 1,
//     vCreatinineValueEntered = '',
//     vCreatinineUnits = '';
//     function calculateGFRAndСС() {
//     // Код универсального калькулятора для расчета КК и СКФ взят из открытолго источника http://boris.bikbov.ru/ Программирование: Бикбов Б.Т. Выполняя условия автора, дословно приводим комментарий, на котором настаивает автор кода:
//     // Данный код может свободно распространяться и модифицироваться при использовании в некоммерческих целях
//     // Обязательным условием использования и распространения данного кода являются:
//     // 1. Сохранение комментариев с указанием авторства Бикбова Б.Т. в программном коде JavaScript
//     // 2. Указание авторства Бикбова Б.Т. на странице с использованием данного програмного кода
//     // 3. Указание активной ссылки на сайт http://boris.bikbov.ru/ на странице с использованием данного програмного кода
//     //Комментарий автора кода.


//     let gfr_cg = '',
//         bsa = '',
//         gfr_cg_bsa = '',
//         vMDRD = '',
//         vMDRD_Standartized = '',
//         vCreatinineValue = '';
//         vSKD_EPI = '';

//         vCreatinineValue = vCreatinineValueEntered;
//     vCreatinineUnits = Number(vCreatinineUnits);
//     //    vCreatinineValue.replace(/[,]+/g, '.');

//     if ((vCreatinineValue <= 0.00003) || (vCreatinineValue >= 6500)) {
//         vCreatinineValue = 0;
//     }
//     // конвертирую креатинин
//     switch (parseInt(vCreatinineUnits)) {
//         case 1: // ммоль/л
//             vCreatinineValue = 1000 * vCreatinineValue / 88.4;
//             break;
//         case 2: // мкмоль/л
//             vCreatinineValue /= 88.4;
//             break;
//         case 4: // мкмоль/л
//             vCreatinineValue /= 10;
//             break;
//     }
//     // взрослые
//     if (vCreatinineValue > 0 && oPat.pkGender >= 0 && oPat.pkAge > 0) {
//         // CKD-EPI
//         if (oPat.pkGender == 0) {
//             if (vCreatinineValue <= 0.7) {
//                 vSKD_EPI = Math.pow((vCreatinineValue / 0.7), -0.329) * Math.pow(0.993, oPat.pkAge);
//             } else {
//                 vSKD_EPI = Math.pow((vCreatinineValue / 0.7), -1.209) * Math.pow(0.993, oPat.pkAge);
//             }
//         } else {
//             if (vCreatinineValue <= 0.9) {
//                 vSKD_EPI = Math.pow((vCreatinineValue / 0.9), -0.411) * Math.pow(0.993, oPat.pkAge);
//             } else {
//                 vSKD_EPI = Math.pow((vCreatinineValue / 0.9), -1.209) * Math.pow(0.993, oPat.pkAge);
//             }
//         }
//         // коэффициент для расы
//         if (vRace == 1) { // белые
//             if (oPat.pkGender == 0) {
//                 vSKD_EPI = vSKD_EPI * 144;
//             } else {
//                 vSKD_EPI = vSKD_EPI * 141;
//             }
//         } else { // негроидная
//             if (oPat.pkGender == 0) {
//                 vSKD_EPI = vSKD_EPI * 166;
//             } else {
//                 vSKD_EPI = vSKD_EPI * 163;
//             }
//         }
//         vSKD_EPI = Math.round(vSKD_EPI);
//         if (vRace == 2) { // негродидная
//             vRace = 1.212;
//         }
//         // 186 - для нестандартизованных наборов креатинина, 175 - для стандартизованных
//         if (oPat.pkGender == 0) {
//             vMDRD = Math.round((186 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(oPat.pkAge, -0.203)) * vRace * 0.742));
//             vMDRD_Standartized = Math.round((175 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(oPat.pkAge, -0.203)) * vRace * 0.742));
//         } else {
//             vMDRD = Math.round((186 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(oPat.pkAge, -0.203)) * vRace * oPat.pkGender));
//             vMDRD_Standartized = Math.round((175 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(oPat.pkAge, -0.203)) * vRace * oPat.pkGender));
//         }
//         //         кокрофт
//         if (oPat.pkWeight > 0) {
//             gfr_cg = ((140 - oPat.pkAge) * oPat.pkWeight / 72) / vCreatinineValue;
//             if (oPat.pkGender == 0) {
//                 gfr_cg = gfr_cg * 0.85;
//             }
//             if (oPat.pkHeight > 0) {
//                 bsa = (oPat.pkHeight * oPat.pkWeight / 3600);
//                 bsa = Math.sqrt(bsa);
//                 gfr_cg_bsa = gfr_cg * 1.73 / bsa;
//             }
//         }
//     }
//     oPat.pkGFR = Math.min(vSKD_EPI, vMDRD, vMDRD_Standartized);
//     oPat.pkCC = Math.round(gfr_cg_bsa);
//     console.log(oPat.pkGFR, oPat.pkCC);
//     console.log(vCreatinineValue, vCreatinineUnits, oPat.pkGender, oPat.pkAge, vRace, oPat.pkWeight, oPat.pkHeight);
// }





function countRF() {
    ($('#inpCreatinineVal').val() == '') ? creatinVal = 90 : creatinVal = $('#inpCreatinineVal').val();
    creatinUnits = $('#slctCrUnitsGroup').val();
    ($('#chkRaceB').is(':checked')) ? oPat.pkRace = 1 : '';

console.log(`GFR: ${calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)}`);

oPat.pkCC = calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)[0];
oPat.pkGFR = calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)[1];

oPat.pkGFR > 29 && oPat.pkGFR < 60 ? $('#chkGlomerularFiltrationRate30_59').prop('checked', true) : (oPat.pkGFR < 30) ? $('#chkGlomerularFiltrationRateLess30').prop('checked', true) : '';

    ($('.clsSystemicHypertension2thAndMoreStage').is(':checked')) ? $('#chkSystemicHypertension2thAndMoreStage').prop('checked', true): '';
    ($('.chkSumTherRF_1').is(':checked')) ? $('#chkAcuteIschemicStrokeOrMiocardInfarction').prop('checked', true): '';
    ($('.chkSumTherRF_2').is(':checked')) ? $('#chkRheumaticDiseasesOrInfection').prop('checked', true): '';
    ($('.chkThromboemb_1').is(':checked')) ? $('#chkVascularAnamnesis, #chkWasSomeVeinThromb').prop('checked', true): '';
    ($('.chkThromboemb_2').is(':checked')) ? $('#chkWasPulmEmb').prop('checked', true): '';
    ($('.chkThromboemb_3').is(':checked')) ? $('#chkFamilyVeinThromb').prop('checked', true): '';
    ($('.chkProvocedVTE_1').is(':checked')) ? $('#chkWasProvocedVTE').prop('checked', true): '';
    ($('.chkTraum_1').is(':checked')) ? $('#chkFracturePpelvisFemurTibiaLess1Month').prop('checked', true): '';
    ($('.chkHighRiskThrombophilia_1').is(':checked')) ? $('#chkIsKnownHighRiskThrombophilia').prop('checked', true): '';
    ($('.chkNeoplasm_1').is(':checked')) ? $('#chkIsActiveNeoplasmOrTherapyOfNeoplasm').prop('checked', true): '';
    ($('.chkNeoplasm_2').is(':checked')) ? $('#chkSomeTherapyOfNeoplasm').prop('checked', true): '';
    ($('.chkStroke_1').is(':checked')) ? $('#chkStroke').prop('checked', true): '';
    ($('#chkIsTraum, #chkLargeOperIn30Days').is(':checked')) ? $('#chkTraumOrOperIn30Days').prop('checked', true): '';
    ($('#chkIsPulmonInsuff').is(':checked') || $('#chkIsHeartInsuff').is(':checked')) ? $('#chkPulmonOrHeartInsuff').prop('checked', true): '';
    ($('.chkSevereRenalInsuff_1').is(':checked')) ? $('#chkSevereRenalInsuff').prop('checked', true): '';
    ($('.chkSevereRenalInsuff_2').is(':checked') || oPat.pkGFR < 30) ? $('#chkSevereRenalInsuff_3').prop('checked', true): '';
    $('#chkIsLiverFailure').is(':checked') ? oPat.pkSevereHepaticFailure = true : '';
    $('#chkHeartInsuff3_4').is(':checked') ? oPat.pkHeartInsuff3_4 = true : '';
    $('#chkIsDiabetes').is(':checked') ? oPat.pkDiabetes = true : '';
    $('#chkActiveUlcerOfStomachOrDuodenum').is(':checked') ? oPat.pkActiveUlcerOfStomachOrDuodenum = true : '';
    $('#chkChronicDialysis').is(':checked') ? oPat.pkChronicDialysis = true : '';
    $('#chkArtificialHeartValve').is(':checked') ? oPat.pkArtificialHeartValve = true : '';
    $('#chkUncontrolledSystemicHypertension').is(':checked') ? oPat.pkUncontrolledSystemicHypertension = true : '';

    ($('#chkSevereRenalInsuff, #chkIsLiverFailure').is(':checked')) ? $('#chkSevereRenalOrLiverFailure').prop('checked', true): $('#chkSevereRenalOrLiverFailure').prop('checked', false);


    ($('.chkBurns_1').is(':checked')) ? $('#chkBurnsLess20Percent').prop('checked', true): '';
    ($('.chkBurns_2').is(':checked')) ? $('#chkBurnsMore20Percent').prop('checked', true): '';
    ($('.chkObstComorbidities').is(':checked')) ? $('#chkIsObstComorbidityRF').prop('checked', true): '';
    ($('.chkLabourRuRF_1').is(':checked')) ? $('#chkSeverePreeclampsiaOrStillbirth').prop('checked', true): '';
    ($('.chkSumAtrFibrRF_1').is(':checked')) ? $('#chkVascularAnamnesis').prop('checked', true): '';
    ($('.chkThrombocytopenia_1').is(':checked')) ? $('#chkThrombocytopenia').prop('checked', true): '';

    ($('#chkIsHemorragicSyndrome, #chkPriorMajorBleeding, #chkHbLess_100').is(':checked')) ? $('#chkBleedingOrHemorragicSyndrome').prop('checked', true): '';

    ($('#chkIsAcuteInflammatoryDiseaseOrInfection').is(':checked') && $('#chkIsRestrictedMobility').is(':checked')) ? $('#chkAcuteInflammatoryDiseaseOrInfectionWithBedRest').prop('checked', true): '';

    ($('.chkSpinalCordInjure_1, #chkPlegia').is(':checked')) ? $('#chkSpinalCordDamageWithPlegia').prop('checked', true): '';

    ($('.chkStroke_1').is(':checked') && $('#chkPlegia').is(':checked')) ? $('#chkStrokeWithPlegia').prop('checked', true): '';

    ($('#chkArthritis').is(':checked') && $('#chkIsRestrictedMobility').is(':checked')) ? $('#chkArthritisWithRestrictedMobility').prop('checked', true): '';
    ($('#chkIsRestrictedMobility, #chkDehydration').is(':checked')) ? $('#chkIsRestrictedMobilityOrDehydration').prop('checked', true): '';
    ($('.chkСoagulopathy_1').is(':checked')) ? $('#chkСoagulopathyWithoutThrombocytopenia').prop('checked', true): '';







    (oPat.pkArtroplasty) ? ($('#chkArtroplasty').prop('checked', true)) : '';

    (objSelectedOper.pkArthroscopicSurgery) ? $('#chkArthroscopicSurgery').prop('checked', true): '';
    (objSelectedOper.pkShinFractureSurgery) ? $('#chkShinFractureSurgery').prop('checked', true): '';
    (objSelectedOper.pkHipFractureSurgery) ? ($('#chkHipFractureSurgery').prop('checked', true), oPat.pkHipFractureSurgery = true): oPat.pkHipFractureSurgery = false;

    (objSelectedOper.pkLiverResection) ? $('#chkLiverResection').prop('checked', true): '';
    (objSelectedOper.pkPancreatoDuodResection) ? $('#chkPancreatoDuodResection').prop('checked', true): '';
    (objSelectedOper.pkPulmonectomy) ? $('#chkPulmonectomy').prop('checked', true): '';
    (objSelectedOper.pkLaparoscopicIntervention) ? $('#chklaparoscopicIntervention').prop('checked', true): '';

    (objSelectedOper.pkHeartSurgery) ? $('#chkHeartSurgery').prop('checked', true): '';

    (objSelectedOper.pkBrainOrSpinalCordSurg) ? $('#chkBrainOrSpinalCordSurg').prop('checked', true): '';

    (objSelectedOper.pkElectiveCSection) ? $('#chkElectiveCSection').prop('checked', true): '';
    (objSelectedOper.pkCSectionInLabour) ? $('#chkCSectionInLabour').prop('checked', true): '';

    (oPat.pkAge > 35) ?
    $('#chkAgeMore35').prop('checked', true): '';
    (oPat.pkAge > 40) ?
    $('#chkAgeMore40').prop('checked', true): '';
    (oPat.pkAge > 40 && oPat.pkAge < 61) ?
    $('#chkAge_41_60').prop('checked', true): '';
    (oPat.pkAge > 60 && oPat.pkAge < 76) ?
    $('#chkAge_61_75').prop('checked', true): '';
    (oPat.pkAge > 64 && oPat.pkAge < 75) ?
    $('#chkAge_65_74').prop('checked', true): '';
    (oPat.pkAge >= 40 && oPat.pkAge < 85) ?
    $('#chkAge_40_84').prop('checked', true): '';
    (oPat.pkAge > 65) ? $('#chkAgeMore65').prop('checked', true): '';
    (oPat.pkAge > 70) ? $('#chkAgeMore70').prop('checked', true): '';
    (oPat.pkAge >= 75) ? $('#chkAgeMore75').prop('checked', true): '';
    (oPat.pkAge >= 85) ? $('#chkAgeMore85').prop('checked', true): '';

    (oPat.pkBMI > 25) ? $('#chkBMIMore25').prop('checked', true): '';
    (oPat.pkBMI > 30) ? $('#chkBMIMore30').prop('checked', true): '';
    (oPat.pkBMI > 30 && oPat.pkBMI < 40) ? $('#chkBMI_30_39').prop('checked', true): '';
    (oPat.pkBMI > 35) ? $('#chkBMIMore35').prop('checked', true): '';
    (oPat.pkBMI > 40) ? $('#chkBMIMore40').prop('checked', true): '';

    if (oPat.pkIsOrNoSurg) {
        (oPat.pkGradeOfOper > 0) ? ($('#chkLargeSurgery').prop('checked', true)) : $('#chkSmallSurgery').prop('checked', true);
    }
    let pkRfArr = [], pkRFText = [];
    ($('#divAllRF input:checkbox:checked')).each(function () {
        pkRfArr.push($(this).val());
    });

    console.log(pkRfArr.join());
    // console.log(JSON.stringify($.extend({}, pkRfArr)));
    let vIsBedRestBMI = $('#divAllRF input[id*="BMIMore"]:checked ').last();
    let vIsBedRestAge = $('#divAllRF input[id*="AgeMore"]:checked ').last();
    $('.chk2_LvlRF, .chk3_LvlRF input:checked').prop('checked', false);

    vIsBedRestBMI.prop('checked', true);
    vIsBedRestAge.prop('checked', true);

    function getStringOfRF(el) {
        let a = 0,
            b = '';
        $(el).each(function () {
            (a > 0) ? b += ',' + $(this).text(): b += $(this).text();
            a += 1;
        });
        return b;
    }

    oPat.pkGeneralListOfRF = getStringOfRF($('#divAllRF input:checked').parent()) !== '' ? getStringOfRF($('#divAllRF input:checked').parent()): 'отсутствуют';
    // console.log(oPat);

    let serialObj = JSON.stringify(oPat);
    localStorage.setItem('Patient', serialObj);
    let oPatForCounter = {
        age: oPat.pkAge,
        isOrNoSurg: oPat.pkIsOrNoSurg,
        operTimeMore60: oPat.pkOperTimeMore60,
        gradeOfOper: oPat.pkGradeOfOper

    };
    $.post('/count', {
            'rfArr': pkRfArr.join(),
            'oPatForCounter': JSON.stringify(oPatForCounter),
        },
        function (data) {
            localStorage.setItem('objScalesVTE', data);
            // let fromRfArr = localStorage.getItem('objScalesVTE');
            // let objBallsRiskVTE = JSON.parse(fromRfArr);
            // console.log(objBallsRiskVTE.vCounterPaduaScore);
            // console.log(JSON.parse(data));

            // let objBallsRiskVTE = JSON.parse(localStorage.getItem('objScalesVTE'));
            // localStorage.removeItem('objScalesVTE');
            // console.log(objBallsRiskVTE);
    
        });
        serialObj = JSON.stringify(oPat);
        localStorage.setItem('Patient', serialObj);
        

    $(location).attr('href', '/vte_concl');

}

$('#btnOne').bind('click', countRF);