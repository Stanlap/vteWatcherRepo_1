let objPatient = JSON.parse(localStorage.getItem('Patient'))
console.log(objPatient);

$.extend({
    distinct: function (anArray) {
        let result = [];
        $.each(anArray, function (i, v) {
            if ($.inArray(v, result) === -1) result.push(v);
        });
        return result;
    }
});

objPatient.pkValuesMedPfofile = $.distinct(objPatient.pkValuesMedPfofile);


$('#divAllRF div').hide();
$('.divMiddleLvlRF').hide();
$('.divFemaleLvl').show();

(objPatient.pkPregnancyOrChildbirth) ? $('#chkPostpartum').prop('checked', true): '';

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
let selectedRF = [];

if (objPatient.pkValuesMedPfofile.includes(1)) {
    selectedRF = $.merge($(selectedRF), $('.clsTherRF'));
    objPatient.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.clsNonsurgBleedingRF')) : '';
};

if (objPatient.pkValuesMedPfofile.includes(2)) {
    selectedRF = $.merge($(selectedRF), $('.clsAtrFibrRF'));
    objPatient.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.clsFibrBleedingRF')) : '';
};

function isMedProfilesMoreTwo() {
    $.each(objPatient.pkValuesMedPfofile, function (index, value) {
        if (value > 2) return true;
    });
};

if (isMedProfilesMoreTwo()) {
    selectedRF = $.merge($(selectedRF), $('.clsSurgRF'));
    (objPatient.pkCalculateRiskOfBleeding && objPatient.pkValuesMedPfofile.includes(4) && objPatient.pkValuesMedPfofile.includes(10)) ? selectedRF = $.merge($(selectedRF), $('.clsSurgBleedingRF')): '';
};

if (objPatient.pkValuesMedPfofile.includes(4)) {
    selectedRF = $.merge($(selectedRF), $('.clsTraumRF'));
    objPatient.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.clsTraumBleedingRF')) : '';
};

(objPatient.pkValuesMedPfofile.includes(5)) ? selectedRF = $.merge($(selectedRF), $('.clsNeurosurgRF')): '';
(objPatient.pkValuesMedPfofile.includes(8)) ? selectedRF = $.merge($(selectedRF), $('.clsCombustRF')): '';
(objPatient.pkValuesMedPfofile.includes(9)) ? selectedRF = $.merge($(selectedRF), $('.clsOncoRF')): '';

if (objPatient.pkValuesMedPfofile.includes(10)) {
    ($('input[name=rdoObstOrGynProfile]:checked').val() == 0) ? selectedRF = $.merge($(selectedRF), $('.clsObstRF')): '';
    objPatient.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.clsObstBleedingRF')) : '';
    ($('input[name=rdoPregnancyOrChildbirth]:checked').val() == 1) ? selectedRF = $.merge($(selectedRF), $('.clsLabourRF')): '';
};

selectedRF = $.distinct(selectedRF);
$(selectedRF).show();
$('.divTogglerRF').show();

$('#divProfileOfPatient').hide();
if ($('#chkMale').is(':checked')) {
    $('#chkFemale').prop('checked', false);
    $('#chkMaleDouble').prop('checked', true);
    $('.divFemaleLvl').hide();
} else {
    $('#chkFemale').prop('checked', true);
    $('#chkMaleDouble').prop('checked', false);
    $('.divFemaleLvl').show();
}

$('.chkGlomerularFiltrationRate_1').on('click', function () {
    $('.chkGlomerularFiltrationRate_1').not(this).prop('checked', false);
});

$('.chkDiabetes_1').on('click', function () {
    $('.chkDiabetes_1').not(this).prop('checked', false);
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
$('#chkSomeTherapyOfNeoplasm').on('click', function () {
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

$('#chkSystemicHypertension').on('click', function () {
    if ($(this).is(':checked')) {
        $(this).attr('data-hasMarked', '1');
    } else {
        $(this).attr('data-hasMarked', '0');
        $('#chkSystemicHypertension2Stage, #chkUncontrolledSystemicHypertension').prop('checked', false);
    }
});
$('#chkSystemicHypertension2Stage').on('click', function () {
    if ($(this).is(':checked')) {
        $('#chkSystemicHypertension').prop('checked', true).closest('.divSingleLvlRF').hide();
        $(this).attr('data-hasMarked', '1');

    } else {
        $('#chkUncontrolledSystemicHypertension').prop('checked', false).closest('.divSingleLvlRF').show();
        $('#chkSystemicHypertension').attr('data-hasMarked') == '0' ? $('#chkSystemicHypertension').prop('checked', false).closest('.divSingleLvlRF').show() : $('#chkSystemicHypertension').closest('.divSingleLvlRF').show();
        $(this).attr('data-hasMarked', '0');
    }
});
$('#chkUncontrolledSystemicHypertension').on('click', function () {
    ($(this).is(':checked')) ? $('#chkSystemicHypertension, #chkSystemicHypertension2Stage').prop('checked', true).closest('.divSingleLvlRF').hide():
        ($('#chkSystemicHypertension').attr('data-hasMarked') == '1' && $('#chkSystemicHypertension2Stage').attr('data-hasMarked') == '0') ? ($('#chkSystemicHypertension').prop('checked', true).closest('.divSingleLvlRF').show(), $('#chkSystemicHypertension2Stage').prop('checked', false).closest('.divSingleLvlRF').show()) : ($('#chkSystemicHypertension2Stage').attr('data-hasMarked') == '1') ?
        $('#chkSystemicHypertension2Stage, #chkSystemicHypertension').prop('checked', true).closest('.divSingleLvlRF').show() :
        ($('#chkSystemicHypertension2Stage, #chkSystemicHypertension').attr('data-hasMarked') == '0') ? $('#chkSystemicHypertension2Stage, #chkSystemicHypertension').prop('checked', false).closest('.divSingleLvlRF').show() : '';
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

function calculateGFRAndСС() {
    // Код универсального калькулятора для расчета КК и СКФ взят из открытолго источника http://boris.bikbov.ru/ Программирование: Бикбов Б.Т. Выполняя условия автора, дословно приводим комментарий, на котором настаивает автор кода:
    // Данный код может свободно распространяться и модифицироваться при использовании в некоммерческих целях
    // Обязательным условием использования и распространения данного кода являются:
    // 1. Сохранение комментариев с указанием авторства Бикбова Б.Т. в программном коде JavaScript
    // 2. Указание авторства Бикбова Б.Т. на странице с использованием данного програмного кода
    // 3. Указание активной ссылки на сайт http://boris.bikbov.ru/ на странице с использованием данного програмного кода
    //Комментарий автора кода.


    let gfr_cg = '',
        bsa = '',
        gfr_cg_bsa = '',
        vMDRD = '',
        vMDRD_Standartized = '',
        vSKD_EPI = '';
    vCreatinineUnits = Number(vCreatinineUnits);
    //    vCreatinineValue.replace(/[,]+/g, '.');

    if ((vCreatinineValue <= 0.00003) || (vCreatinineValue >= 6500)) {
        vCreatinineValue = 0;
    }
    // конвертирую креатинин
    switch (parseInt(vCreatinineUnits)) {
        case 1: // ммоль/л
            vCreatinineValue = 1000 * vCreatinineValue / 88.4;
            break;
        case 2: // мкмоль/л
            vCreatinineValue /= 88.4;
            break;
        case 4: // мкмоль/л
            vCreatinineValue /= 10;
            break;
    }
    // взрослые
    if (vCreatinineValue > 0 & objPatient.pkGender >= 0 & objPatient.pkAge > 0) {
        // CKD-EPI
        if (objPatient.pkGender == 0) {
            if (vCreatinineValue <= 0.7) {
                vSKD_EPI = Math.pow((vCreatinineValue / 0.7), -0.329) * Math.pow(0.993, objPatient.pkAge);
            } else {
                vSKD_EPI = Math.pow((vCreatinineValue / 0.7), -1.209) * Math.pow(0.993, objPatient.pkAge);
            }
        } else {
            if (vCreatinineValue <= 0.9) {
                vSKD_EPI = Math.pow((vCreatinineValue / 0.9), -0.411) * Math.pow(0.993, objPatient.pkAge);
            } else {
                vSKD_EPI = Math.pow((vCreatinineValue / 0.9), -1.209) * Math.pow(0.993, objPatient.pkAge);
            }
        }
        // коэффициент для расы
        if (vRace == 1) { // белые
            if (objPatient.pkGender == 0) {
                vSKD_EPI = vSKD_EPI * 144;
            } else {
                vSKD_EPI = vSKD_EPI * 141;
            }
        } else { // негроидная
            if (objPatient.pkGender == 0) {
                vSKD_EPI = vSKD_EPI * 166;
            } else {
                vSKD_EPI = vSKD_EPI * 163;
            }
        }
        vSKD_EPI = Math.round(vSKD_EPI);
        if (vRace == 2) { // негродидная
            vRace = 1.212;
        }
        // 186 - для нестандартизованных наборов креатинина, 175 - для стандартизованных
        if (objPatient.pkGender == 0) {
            vMDRD = Math.round((186 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(objPatient.pkAge, -0.203)) * vRace * 0.742));
            vMDRD_Standartized = Math.round((175 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(objPatient.pkAge, -0.203)) * vRace * 0.742));
        } else {
            vMDRD = Math.round((186 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(objPatient.pkAge, -0.203)) * vRace * objPatient.pkGender));
            vMDRD_Standartized = Math.round((175 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(objPatient.pkAge, -0.203)) * vRace * objPatient.pkGender));
        }
        //         кокрофт
        if (objPatient.pkWeight > 0) {
            gfr_cg = ((140 - objPatient.pkAge) * objPatient.pkWeight / 72) / vCreatinineValue;
            if (objPatient.pkGender == 0) {
                gfr_cg = gfr_cg * 0.85;
            }
            if (objPatient.pkHeight > 0) {
                bsa = (objPatient.pkHeight * objPatient.pkWeight / 3600);
                bsa = Math.sqrt(bsa);
                gfr_cg_bsa = gfr_cg * 1.73 / bsa;
            }
        }
    }
    vGFR = Math.min(vSKD_EPI, vMDRD, vMDRD_Standartized);
    objPatient.pkCC = Math.round(gfr_cg_bsa);
    console.log(vGFR, objPatient.pkCC);
    console.log(vCreatinineValue, vCreatinineUnits, objPatient.pkGender, objPatient.pkAge, vRace, objPatient.pkWeight, objPatient.pkHeight);
}

let vRace = 1,
    vCreatinineValue = '',
    vCreatinineUnits = '';




    function countRF() {
    // $('#divAllRF').hide();
    // objPatient.pkAge = getCurrentAge(vBirthDateOfPatient);
    ($('#inpCreatinineVal').val() == '') ? vCreatinineValue = 90: vCreatinineValue = $('#inpCreatinineVal').val();
    vCreatinineUnits = ($('#slctCrUnitsGroup').val()).replace(/[,]+/g, '.');
    ($('#chkRaceB').is(':checked')) ? vRace = 2: '';
    // console.log(vCreatinineValue, vCreatinineUnits, objPatient.pkGender, objPatient.pkAge, vRace, objPatient.pkWeight, objPatient.pkHeight);
    calculateGFRAndСС();

    (vGFR > 29 && vGFR < 60) ? $('#chkGlomerularFiltrationRate30_59').prop('checked', true): '';
    (vGFR < 30) ? $('#chkGlomerularFiltrationRateLess30').prop('checked', true): '';

        if (objPatient.pkIsOrNoSurg) {
            ($('.divGenSurgOper select').prop('selectedIndex') == 4 || $('.divTraumOrthOper select').prop('selectedIndex') == 8 || $('.divNeurosurgOper select').prop('selectedIndex') == 0 || $('.divUrolOper select').prop('selectedIndex') == 0 || $('.divUrolOper select').prop('selectedIndex') == 1) ? objPatient.pkPullOfSurg = true : '';
        }

    ($('.chkSumTherRF_1').is(':checked')) ? $('#chkAcuteIschemicStrokeOrMiocardInfarction').prop('checked', true): '';
    ($('.chkSumTherRF_2').is(':checked')) ? $('#chkRheumaticDiseasesOrInfection').prop('checked', true): '';
    ($('.chkThromboemb_1').is(':checked')) ? $('#chkVascularAnamnesis, #chkWasSomeVeinThromb').prop('checked', true): '';
    ($('.chkThromboemb_2').is(':checked')) ? $('#chkWasPulmEmb').prop('checked', true): '';
    ($('.chkThromboemb_3').is(':checked')) ? $('#chkFamilyVeinThromb').prop('checked', true): '';
    ($('.chkProvocedVTE_1').is(':checked')) ? $('#chkWasProvocedVTE').prop('checked', true): '';
    ($('.chkTraum_1').is(':checked')) ? $('#chkFracturePpelvisFemurTibiaLess1Month').prop('checked', true): '';
    ($('.chkHighRiskThrombophilia_1').is(':checked')) ? $('#chkIsKnownHighRiskThrombophilia').prop('checked', true): '';
    ($('.chkNeoplasm_1').is(':checked')) ? $('#chkIsActiveNeoplasmOrTherapyOfNeoplasm').prop('checked', true): '';
    ($('.chkStroke_1').is(':checked')) ? $('#chkStroke').prop('checked', true): '';
    ($('#chkIsTraum, #chkLargeOperIn30Days').is(':checked')) ? $('#chkTraumOrOperIn30Days').prop('checked', true): '';
    ($('#chkIsPulmonInsuff').is(':checked') || $('#chkIsHeartInsuff').is(':checked')) ? $('#chkPulmonOrHeartInsuff').prop('checked', true): '';
    ($('.chkSevereRenalInsuff_1').is(':checked')) ? $('#chkSevereRenalInsuff').prop('checked', true): '';
    //    ($('.chkSevereRenalInsuff_2').is(':checked')|| vCreatinineValue > 200 ) ? $('#chkSevereRenalInsuff_3').prop('checked', true): '';
    $('#chkIsLiverFailure').is(':checked') ? objPatient.pkSevereHepaticFailure = true : '';
    $('#chkHeartInsuff3_4').is(':checked') ? objPatient.pkHeartInsuff3_4 = true : '';
    $('#chkIsDiabetes').is(':checked') ? objPatient.pkDiabetes = true : '';
    $('#chkActiveUlcerOfStomachOrDuodenum').is(':checked') ? objPatient.pkActiveUlcerOfStomachOrDuodenum = true : '';
    $('#chkChronicDialysis').is(':checked') ? objPatient.pkChronicDialysis = true : '';
    $('#chkArtificialHeartValve').is(':checked') ? objPatient.pkArtificialHeartValve = true : '';
    $('#chkUncontrolledSystemicHypertension').is(':checked') ? objPatient.pkUncontrolledSystemicHypertension = true : '';

    ($('#chkSevereRenalInsuff, #chkIsLiverFailure').is(':checked')) ? $('#chkSevereRenalOrLiverFailure').prop('checked', true): $('#chkSevereRenalOrLiverFailure').prop('checked', false);


    ($('.chkBurns_1').is(':checked')) ? $('#chkBurnsLess20Percent').prop('checked', true): '';
    ($('.chkBurns_2').is(':checked')) ? $('#chkBurnsMore20Percent').prop('checked', true): '';
    ($('.chkObstComorbidities').is(':checked')) ? $('#chkIsObstComorbidityRF').prop('checked', true): '';
    ($('.chkLabourRuRF_1').is(':checked')) ? $('#chkSeverePreeclampsiaOrStillbirth').prop('checked', true): '';
    ($('.chkSumAtrFibrRF_1').is(':checked')) ? $('#chkVascularAnamnesis').prop('checked', true): '';
    ($('.chkThrombocytopenia_1').is(':checked')) ? $('#chkThrombocytopenia').prop('checked', true): '';

    ($('#chkIsHemorragicSyndrome, #chkPriorMajorBleeding').is(':checked')) ? $('#chkBleedingOrHemorragicSyndrome').prop('checked', true): '';

    ($('#chkIsAcuteInflammatoryDiseaseOrInfection').is(':checked') && $('#chkIsRestrictedMobility').is(':checked')) ? $('#chkAcuteInflammatoryDiseaseOrInfectionWithBedRest').prop('checked', true): '';

    ($('.chkSpinalCordInjure_1, #chkPlegia').is(':checked')) ? $('#chkSpinalCordDamageWithPlegia').prop('checked', true): '';

    ($('.chkStroke_1').is(':checked') && $('#chkPlegia').is(':checked')) ? $('#chkStrokeWithPlegia').prop('checked', true): '';

    ($('#chkArthritis').is(':checked') && $('#chkIsRestrictedMobility').is(':checked')) ? $('#chkArthritisWithRestrictedMobility').prop('checked', true): '';
    ($('#chkIsRestrictedMobility, #chkDehydration').is(':checked')) ? $('#chkIsRestrictedMobilityOrDehydration').prop('checked', true): '';
    ($('.chkСoagulopathy_1').is(':checked')) ? $('#chkСoagulopathyWithoutThrombocytopenia').prop('checked', true): '';

    ($('.divTraumOrthOper select').prop('selectedIndex') == 2) ? $('#chkArthroscopicSurgery').prop('checked', true): '';
    ($('.divTraumOrthOper select').prop('selectedIndex') == 5) ? $('#chkShinFractureSurgery').prop('checked', true): '';
    ($('.divTraumOrthOper select').prop('selectedIndex') == 6) ? ($('#chkArtroplasty').prop('checked', true), objPatient.pkArtroplasty = true): '';
    ($('.divTraumOrthOper select').prop('selectedIndex') == 7) ? $('#chkHipFractureSurgery').prop('checked', true): '';

    ($('.divGenSurgOper select').prop('selectedIndex') == 4) ? $('#chkLiverResection').prop('checked', true): '';
    ($('.divGenSurgOper select').prop('selectedIndex') == 5) ? $('#chkPancreatoDuodResection').prop('checked', true): '';
    ($('.divGenSurgOper select').prop('selectedIndex') == 11) ? $('#chkPulmonectomy').prop('checked', true): '';
    ($('.divGenSurgOper select').prop('selectedIndex') == 14) ? $('#chklaparoscopicIntervention').prop('checked', true): '';

    ($('.divCardiovascOper select').prop('selectedIndex') == 4 || $('.divCardiovascOper select').prop('selectedIndex') == 5) ? $('#chkHeartSurgery').prop('checked', true): '';

    ($('.divNeurosurgOper select').prop('selectedIndex') == 0) ?
    $('#chkBrainOrSpinalCordSurg').prop('checked', true): '';

    ($('.divObsGynOper select').prop('selectedIndex') == 1) ?
    $('#chkElectiveCSection').prop('checked', true): '';
    ($('.divObsGynOper select').prop('selectedIndex') == 2) ?
    $('#chkCSectionInLabour').prop('checked', true): '';

    (objPatient.pkAge > 35) ?
    $('#chkAgeMore35').prop('checked', true): '';
    (objPatient.pkAge > 40) ?
    $('#chkAgeMore40').prop('checked', true): '';
    (objPatient.pkAge > 40 && objPatient.pkAge < 61) ?
    $('#chkAge_41_60').prop('checked', true): '';
    (objPatient.pkAge > 60 && objPatient.pkAge < 76) ?
    $('#chkAge_61_75').prop('checked', true): '';
    (objPatient.pkAge > 64 && objPatient.pkAge < 75) ?
    $('#chkAge_65_74').prop('checked', true): '';
    (objPatient.pkAge >= 40 && objPatient.pkAge < 85) ?
    $('#chkAge_40_84').prop('checked', true): '';
    (objPatient.pkAge > 65) ? $('#chkAgeMore65').prop('checked', true): '';
    (objPatient.pkAge > 70) ? $('#chkAgeMore70').prop('checked', true): '';
    (objPatient.pkAge >= 75) ? $('#chkAgeMore75').prop('checked', true): '';
    (objPatient.pkAge >= 85) ? $('#chkAgeMore85').prop('checked', true): '';

    (objPatient.pkBMI > 25) ? $('#chkBMIMore25').prop('checked', true): '';
    (objPatient.pkBMI > 30) ? $('#chkBMIMore30').prop('checked', true): '';
    (objPatient.pkBMI > 30 && pkBMI < 40) ? $('#chkBMI_30_39').prop('checked', true): '';
    (objPatient.pkBMI > 35) ? $('#chkBMIMore35').prop('checked', true): '';
    (objPatient.pkBMI > 40) ? $('#chkBMIMore40').prop('checked', true): '';

    if (objPatient.pkIsOrNoSurg) {
        (objPatient.pkGradeOfOper > 0) ? ($('#chkLargeSurgery').prop('checked', true)) : $('#chkSmallSurgery').prop('checked', true);
    }

    let vMyArr = [];
        ($('#divAllRF input:checkbox:checked')).each(function () {
        // vMyArr = $(this).val();
        vMyArr.push($(this).val());
        // vMyArr = $(this).val().split('');
        });
        console.log(vMyArr);
}
$('#btnOne').bind('click', countRF);








    // let pkOperDifficultyGrades = [0];
    // let vAllChoosedOperations = [];

    // $.each($('#divChooseKindOfOper option:selected'), function (el) {
    //     pkOperDifficultyGrades.push($('#divChooseKindOfOper option:selected')[el].value);
    //     vAllChoosedOperations.push($('#divChooseKindOfOper option:selected')[el].innerText);
    // })

    // console.log(pkOperDifficultyGrades);
    // console.log(vAllChoosedOperations);

    // let vGradeOfOper = 0;
    // let pkOperDifficultyGradesOfOper = pkOperDifficultyGrades.map(Number);


    // function getMaxOfArray(numArray) {
    //     return Math.max.apply(null, numArray);
    // }
    // let vMaxGradeOfChoosedOper = getMaxOfArray(pkOperDifficultyGradesOfOper);
    // ($('input[name=rdoSmallOrLargeOper]:checked').val() !== undefined) ? vGradeOfOper = Number($('input[name=rdoSmallOrLargeOper]:checked').val()): vGradeOfOper = vMaxGradeOfChoosedOper;

    // if ($('#chkIsOrNoSurg').is(':checked')) {
    //     (vGradeOfOper > 0) ? ($('#chkLargeSurgery').prop('checked', true)) : $('#chkSmallSurgery').prop('checked', true);
    // }

    // console.log(vGradeOfOper);
    // console.log(pkOperDifficultyGradesOfOper.length);
    // console.log($('#chkIsOrNoSurg').is(':checked'));
    // //        console.log($('#chkSmallSurgery').is(':checked'));


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




    // let i = [],
    //     vMyArr = [],
    //     vSetRusSurgRF = [],
    //     m = 0;
    // ($('#divAllRF input:checkbox:checked')).each(function () {
    //     vMyArr = $(this).val().split('');
    //     vCounterPaduaScore += Number(vMyArr[1]);
    //     i.push(vMyArr[2]);
    //     i.push(vMyArr[3]);
    //     i.push(vMyArr[4]);
    //     m = Number(i.join(''));
    //     i = [];
    //     vCounterIMPROVE += Number(m);
    //     vCounterCHA2DS2_VASс += Number(vMyArr[5]);
    //     vCounterHAS_BLED += Number(vMyArr[6]);
    //     vSetRusSurgRF.push(vMyArr[7]);
    //     vCounterCapriniRF += Number(vMyArr[8]);
    //     vCounterMajorBleedingScoreRF += Number(vMyArr[9]);
    //     vCounterTraumBleedingRF += Number(vMyArr[10]);
    //     vSetRusTraumRF.push(vMyArr[11]);
    //     vCounterGreenTop37a += Number(vMyArr[12]);
    //     vCounterObstBleedingRF += Number(vMyArr[13]);
    //     vCounterObstRuRF += Number(vMyArr[14]);
    // })

    // vSetRusSurgRF = $.distinct(vSetRusSurgRF);
    // vSetRusTraumRF = $.merge(vSetRusTraumRF, vSetRusSurgRF);
    // vSetRusTraumRF = $.distinct(vSetRusTraumRF);

    // function estimateSurgRiskGrade(age, time, kindSurg, risk) {
    //     let i = 0;
    //     // Базовые условия, которые назначают баллы каждому параметру:
    //     if (age >= 40 && age <= 60) i++;
    //     if (age > 60) i += 2;
    //     if (time == true) i++;
    //     if (kindSurg >= 1) i++;
    //     if (risk == true) i++;
    //     return i;
    // }

    // let vCounterSurgRF = 0;
    // //        if (vSetRusSurgRF.indexOf('3') != -1){
    // //            vCounterSurgRF = 3;
    // //        } else {
    // //            if (($('#chkIsOrNoSurg').is(':checked'))){
    // //                vCounterSurgRF = estimateSurgRiskGrade(objPatient.pkAge, $('#chkTimeOfSurg').is(':checked'), vGradeOfOper, vSetRusSurgRF.includes('1'));
    // //
    // //            }
    // //        }
    // //        if (vSetRusSurgRF.indexOf('2') != -1 && vCounterSurgRF < 3){
    // //            vCounterSurgRF = 2;
    // //        }
    // console.log(vSetRusSurgRF);
    // if ($('#chkIsOrNoSurg').is(':checked')) {
    //     (vGradeOfOper == 3) ? vCounterRusSurgRF = 3: vCounterRusSurgRF = estimateSurgRiskGrade(objPatient.pkAge, $('#chkTimeOfSurg').is(':checked'), vGradeOfOper, vSetRusSurgRF.includes('1'));
    // }
    // (vSetRusSurgRF.indexOf('2') != -1 && vCounterRusSurgRF < 3) ? vCounterRusSurgRF = 2: '';
    // (vSetRusSurgRF.indexOf('3') != -1) ? vCounterRusSurgRF = 3: '';

    // if ($('#chkIsOrNoSurg').is(':checked')) {
    //     (vGradeOfOper == 3) ? vCounterCapriniRF += 5: (vGradeOfOper == 1 || vGradeOfOper == 2) ? vCounterCapriniRF += 2 : vCounterCapriniRF += 1;
    // }

    // if ($('#chkIsOrNoSurg').is(':checked')) {
    //     (vGradeOfOper == 3) ? vCounterRusTraumRF = 3: vCounterRusTraumRF = estimateSurgRiskGrade(objPatient.pkAge, $('#chkTimeOfSurg').is(':checked'), vGradeOfOper, vSetRusTraumRF.includes('1'));
    // }
    // (vSetRusTraumRF.indexOf('2') != -1 && vCounterRusTraumRF < 3) ? vCounterRusTraumRF = 2: '';
    // (vSetRusTraumRF.indexOf('3') != -1) ? vCounterRusTraumRF = 3: '';



    // (vCounterMajorBleedingScoreRF > 0) ? vCounterMajorBleedingScoreRF = 1: '';
    // (vCounterTraumBleedingRF > 0) ? vCounterTraumBleedingRF = 1: '';

    // console.log($('#divAllRF input:checked'));
    // console.log(objPatient.pkAge);
    // console.log($('#chkTimeOfSurg').is(':checked'));
    // console.log(vSetRusSurgRF.includes('1'));
    // console.log(vGradeOfOper, vGradeOfOper == 0);
    // console.log(vSetRusSurgRF);
    // console.log(vCounterRusSurgRF);
    // console.log(vCounterCapriniRF);
    // console.log(vCounterRusTraumRF);

    // let vIsBedRestBMI = $('#divAllRF input[id*="BMIMore"]:checked ').last();
    // let vIsBedRestAge = $('#divAllRF input[id*="AgeMore"]:checked ').last();
    // $('.chk2_LvlRF, .chk3_LvlRF input:checked').prop('checked', false);
    // console.log($('#divAllRF input:checked'));

    // //    $('#divAllRF input[id*="chkBMI"]:checked, #divAllRF input[id*="chkAge"]:checked ').prop('checked', false);
    // vIsBedRestBMI.prop('checked', true);
    // vIsBedRestAge.prop('checked', true);

    // //    let b = $('#divAllRF input:checked').parent();
    // function getStringOfRF(el) {
    //     let a = 0,
    //         b = '';
    //     $(el).each(function () {
    //         (a > 0) ? b += ',' + $(this).text(): b += $(this).text();
    //         a += 1;
    //     });
    //     return b;
    // }
    // vGeneralListOfRF = getStringOfRF($('#divAllRF input:checked').parent());
    // console.log(vGeneralListOfRF);

    // vGeneralListOfOper = getStringOfRF($('#divChooseKindOfOper option:selected'));
    // console.log(vGeneralListOfOper);

    // console.log('Padua: ' + vCounterPaduaScore, ' IMPROVE: ' + vCounterIMPROVE, ' CHA2DS2-VASс: ' + vCounterCHA2DS2_VASс, ' HAS-BLED: ' + vCounterHAS_BLED, ' Российская шкала риска ВТЭО: ' + vCounterRusSurgRF, ' Caprini: ' + vCounterCapriniRF, ' Major Bleeding Score: ' + vCounterMajorBleedingScoreRF, ' Шкала риска кровотечений при больших травматологических вмешательствах: ' + vCounterTraumBleedingRF, ' Шкала риска ВТЭО в травматологии: ' + vCounterRusTraumRF, ' vCounterGreenTopGuideline37a: ' + vCounterGreenTop37a, ' Contraindications to LMWH use: ' + vCounterObstBleedingRF, ' vCounterGreenTopGuideline37aRus: ' + vCounterObstRuRF);


    // console.log(countStratRF(vCounterPaduaScore, 'Padua'));
    // console.log(countStratRF(vCounterIMPROVE, 'IMPROVE'));
    // console.log(countStratRF(vCounterCHA2DS2_VASс, 'CHA2DS2_VASсOrRusSurgOrTraumRF'));
    // console.log(countStratRF(vCounterHAS_BLED, 'HAS_BLED'));
    // console.log('Российская шкала ВТЭО ' + countStratRF(vCounterRusSurgRF, 'CHA2DS2_VASсOrRusSurgOrTraumRF'));
    // console.log(countStratRF(vCounterCapriniRF, 'Caprini'));
    // console.log(countStratRF(vCounterMajorBleedingScoreRF, 'SurgOrTraumBleedingRF'));
    // console.log(countStratRF(vCounterRusTraumRF, 'CHA2DS2_VASсOrRusSurgOrTraumRF'));
    // console.log(countStratRF(vCounterTraumBleedingRF, 'SurgOrTraumBleedingRF'));
    // console.log(countStratRF(vCounterGreenTop37a, 'GreenTop37aRus'));
    // console.log(countStratRF(vCounterObstRuRF, 'GreenTop37aRus'));

    // console.log(vGFR, objPatient.pkCC);

    // console.log(typeof (vCounterGreenTop37a));
    // console.log(vCounterGreenTop37a);
    // console.log(typeof (vCounterObstRuRF));
    // console.log(vCounterObstRuRF);

// }

