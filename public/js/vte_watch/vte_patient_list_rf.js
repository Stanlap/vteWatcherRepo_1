let objPatient = JSON.parse(localStorage.getItem('Patient'))
console.log(objPatient);

$('#divAllRF div').hide();
$('.divMiddleLvlRF').hide();
$('.divFemaleLvl').show();


$('.divSingleLvlRF').on('click', function (el) {
    el = $(this).closest('.divMiddleLvlRF').prev().find('input:checkbox');
    ($(this).closest('.divMiddleLvlRF').find('input:checkbox').is(':checked')) ? el.prop('checked', true): el.prop('checked', false);
});

$('.divMiddleLvlRF').on('click', function (event, el) {
    el = $(this).prev();
    (el.find('input:checkbox').is(':checked')) ? $(this).prev().hide(): ($(this).prev().show(), $(this).hide(), el.find('button').html('&gt;'));
    console.log(event.type, event.target.id, event.relatedTarget + ' 2 event');
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
    //    console.log($(this).html());
    ($(this).html() === ('&gt;')) ? ($(this).closest('.divTogglerRF').next().show(), $(this).html('&lt;')) : ($(this).parents('.divTogglerRF').next().hide(), $(this).html('&gt;'));
    //    console.log($(this).html());
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
// function goToRF() {
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

$.extend({
    distinct: function (anArray) {
        let result = [];
        $.each(anArray, function (i, v) {
            if ($.inArray(v, result) === -1) result.push(v);
        });
        return result;
    }
});


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
