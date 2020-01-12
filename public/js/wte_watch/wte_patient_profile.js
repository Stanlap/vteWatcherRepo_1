'use strict';

let objPatient = {
    pkGender: 0,
    pkAge: 0,
    pkHeight: 0,
    pkWeight: 0,
    pkMedProfile: 0,
    pkRiskVTE: 0,
    pkWeekOfPregnancy: 0,
    pkDateOfChildbirth: '',
    pkSevereHepaticFailure: false,
    pkHeartInsuff3_4: false,
    pkIsOrNoSurg: false,
    pkDateOfOper: '',
    pkDiabetes: false,
    pkActiveUlcerOfStomachOrDuodenum: false,
    pkChronicDialysis: false,
    pkArtificialHeartValve: false,
    pkUncontrolledSystemicHypertension: false,
    pkArtroplasty: false,
    pkPullOfSurg: false,
    pkCC: 125,
    pkBirthDateOfPatient: '',
    // pkGeneralListOfRF: '',
    // pkGeneralListOfOper: '',
    pkAllSurgProfiles: [],
pkValuesMedPfofile: [],
pkSelectedRF: []



};


$('#dateOfBirth').on('input', function () {
    objPatient.pkBirthDateOfPatient = new Date($('#dateOfBirth').prop('value'));
});

$('#chkMale').on('click', function () {
    ($(this).is(':checked')) ? $('#slctMedicalProfileOfPatient [value="10"]').hide(): $('#slctMedicalProfileOfPatient [value="10"]').show();
});


$.extend({
    distinct: function (anArray) {
        let result = [];
        $.each(anArray, function (i, v) {
            if ($.inArray(v, result) === -1) result.push(v);
        });
        return result;
    }
});
$('#slctMedicalProfileOfPatient').on('change', function () {
    $('#chkMale').prop('disabled', true);
    objPatient.pkValuesMedPfofile = $('#slctMedicalProfileOfPatient option:selected');

    $('.lblIsOrNoSurg, #divChooseKindOfOper, #divCreateKindOfOper, #divSmallOrLargeOper, #divObstOrGynProfile, #divPregnancyOrChildbirth').hide();
    $('#chkIsOrNoSurg, #chkCreateKindOfOper, #divPregnancyOrChildbirth input:checked, #divObstOrGynProfile input:checked, #divSmallOrLargeOper input:checked').prop('checked', false);
    $('.btnAccordChooseOper').prop('value', 1).next().hide();
    $('.btnAccordChooseOper').hide();
    objPatient.pkAllSurgProfiles = (objPatient.pkValuesMedPfofile.is('[value = 3]') || objPatient.pkValuesMedPfofile.is('[value = 4]') || objPatient.pkValuesMedPfofile.is('[value = 5]') || objPatient.pkValuesMedPfofile.is('[value = 6]') || objPatient.pkValuesMedPfofile.is('[value = 7]') || objPatient.pkValuesMedPfofile.is('[value = 8]') || objPatient.pkValuesMedPfofile.is('[value = 9]'));
    if (objPatient.pkAllSurgProfiles === true) {
        $('.lblIsOrNoSurg').show();
    }
    (objPatient.pkValuesMedPfofile.is('[value = 10]')) ?
    $('#divObstOrGynProfile').show(): '';
});
$('input[name=rdoObstOrGynProfile]:radio').on('click', function () {

    if ($(this).val() == 0) {
        $('#divPregnancyOrChildbirth').show();
    } else {
        $('#divPregnancyOrChildbirth').hide();
        $('input[name="rdoPregnancyOrChildbirth"]:checked').prop('checked', false);
    }
    $('.lblIsOrNoSurg').show();
});
$('#chkIsOrNoSurg').on('click', function () {
    if ($(this).is(':checked')) {
        $('#divChooseKindOfOper, #divCreateKindOfOper, #divDateOfOper').show();
        $('#btnOne').prop('disabled', true);
        (objPatient.pkValuesMedPfofile.is('[value = 3]')) ? $('.btnGenSurgOper').show(): '';
        (objPatient.pkValuesMedPfofile.is('[value = 4]')) ? $('.btnTraumOrthOper').show(): '';
        (objPatient.pkValuesMedPfofile.is('[value = 5]')) ? $('.btnNeurosurgOper').show(): '';
        (objPatient.pkValuesMedPfofile.is('[value = 6]')) ? $('.btnCardiovascOper').show(): '';
        (objPatient.pkValuesMedPfofile.is('[value = 7]')) ? $('.btnUrolOper').show(): '';
        (objPatient.pkValuesMedPfofile.is('[value = 8]')) ? $('.btnCombustOper').show(): '';
        (objPatient.pkValuesMedPfofile.is('[value = 9]')) ? $('#divChooseKindOfOper').hide(): '';
        (objPatient.pkValuesMedPfofile.is('[value = 10]')) ?
        $('.btnObsGynOper').show(): '';
    } else {
        $('#divChooseKindOfOper, #divCreateKindOfOper, #divSmallOrLargeOper, #divDateOfOper').hide();
        $('#btnOne').prop('disabled', false);

        $('.btnAccordChooseOper').prop('value', 1).next().hide();
        $('#divChooseKindOfOper option:selected').prop('selected', false);
        $('#chkCreateKindOfOper').prop('checked', false);
        $('#divSmallOrLargeOper input:checked').prop('checked', false);
    }
});
$('.btnAccordChooseOper').on('click', function (el) {
    el = $(this);
    if (el.val() === 0) {
        el.next().hide();
        el.val(1);
    } else {
        el.val(0);
        el.next().show();
    }
});
$('#chkCreateKindOfOper').on('click', function () {
    ($(this).is(':checked')) ? ($('#divSmallOrLargeOper').show(), $('#divChooseKindOfOper').hide(), $('#divChooseKindOfOper option:selected').prop('selected', false),
        $('.btnObsGynOper').show()) : ($('#divSmallOrLargeOper, .lblTimeOfSurg').hide(),
        $('.btnObsGynOper').show(),
        $('#divSmallOrLargeOper input:checked').prop('checked', false), $('#divChooseKindOfOper').show());
});
$('input[name=rdoSmallOrLargeOper]:radio').on('click', function () {
    ($(this).val() == 1) ? ($('.lblTimeOfSurg').hide(), $('#chkTimeOfSurg').prop('checked', false)) : $('.lblTimeOfSurg').show();
});

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

function getCurrentAge(date) {
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

$('#btnOperYesterday').on('click', function () {
    let vYesterday = addDays(new Date(), -1);
    $('#inpDateOfOper').hide();
    objPatient.pkDateOfOper = (`${vYesterday.getFullYear()}-${('0' + (vYesterday.getMonth() + 1)).slice(-2)}-${('0' + vYesterday.getDate()).slice(-2)}`);
    console.log(objPatient.pkDateOfOper);
    (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});
$('#btnOperToday').on('click', function () {
    $('#inpDateOfOper').hide();
    objPatient.pkDateOfOper = formatDate();
   console.log(objPatient.pkDateOfOper);
    (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});
$('#btnOperTomorrow').on('click', function () {
    let vTomorrow = addDays(new Date(), 1);
    $('#inpDateOfOper').hide();
    objPatient.pkDateOfOper = (`${vTomorrow.getFullYear()}-${('0' + (vTomorrow.getMonth() + 1)).slice(-2)}-${('0' + vTomorrow.getDate()).slice(-2)}`);
    console.log(objPatient.pkDateOfOper);
    (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});
$('#btnOperSomeDate').on('click', function () {
    $('#inpDateOfOper').show().val('');
});

$('#inpDateOfOper').on('change', function () {
    objPatient.pkDateOfOper = $(this).val();
    console.log(objPatient.pkDateOfOper);
    (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});

$('#weight').on('change', ()=>{
    ($('#weight').prop('value') < 50 || $('#weight').prop('value') > 120) ? alert(`Вес пациента действительно ${$('#weight').prop('value')} кг?`): '';
    (getCurrentAge(objPatient.pkBirthDateOfPatient) < 18 || getCurrentAge(objPatient.pkBirthDateOfPatient) > 100)
    ? alert(`Возраст пациента действительно ${getCurrentAge(objPatient.pkBirthDateOfPatient)} лет?`): '';

});
$('#height').on('change', ()=>{
    ($('#height').prop('value') < 150 || $('#height').prop('value') > 190) ? alert(`Рост пациента действительно ${$('#height').prop('value')} см?`): '';
    (getCurrentAge(objPatient.pkBirthDateOfPatient) < 18 || getCurrentAge(objPatient.pkBirthDateOfPatient) > 100)
    ? alert(`Возраст пациента действительно ${getCurrentAge(objPatient.pkBirthDateOfPatient)} лет?`): '';

});

function showBtnGoToRF() {
   

    (getCurrentAge(objPatient.pkBirthDateOfPatient) !== 0 && ($('#weight').val().length > 0) && ($('#height').val().length > 0) && (objPatient.pkValuesMedPfofile.length > 0)) ?  $('#btnOne').show() : $('#btnOne').hide();
}
$('#btnOne').bind('click', goToRF);

$('#slctMedicalProfileOfPatient option').bind('click', showBtnGoToRF);
$('#age, #weight, #height, #dateOfBirth').bind('input', showBtnGoToRF);

$('#slctMedicalProfileOfPatient option').click(function () {
    ($('#slctMedicalProfileOfPatient option:selected').is('[value = 10]') && $('input[name=rdoObstOrGynProfile]:checked').val() === undefined) ? $('#btnOne').prop('disabled', true): $('#btnOne').prop('disabled', false);
});

$('input[name=rdoObstOrGynProfile]').click(function () {
    ($(this).val() == 1) ? ($('#btnOne').prop('disabled', false), $('#inpWeekOfPregnancy').val(''), objPatient.pkWeekOfPregnancy = 0) : ($('#btnOne').prop('disabled', true), $('#diobjPatient.pkDateOfChildbirth').hide(), $('#inpDateOfChildbirth').val(''), objPatient.pkDateOfChildbirth = '');
});

$('input[name=rdoPregnancyOrChildbirth]').click(function () {
    ($(this).val() == 0) ? ($('#inpWeekOfPregnancy').show(), $('#diobjPatient.pkDateOfChildbirth').hide(), $('#inpDateOfChildbirth').val(''), objPatient.pkDateOfChildbirth = '') : ($('#inpWeekOfPregnancy').hide(), objPatient.pkWeekOfPregnancy = 0, $('#diobjPatient.pkDateOfChildbirth').show());
//});
//
//$('input[name=rdoPregnancyOrChildbirth]').click(function () {
//
    ($(this).val() == 1) ? ($('#inpWeekOfPregnancy').val(''), objPatient.pkWeekOfPregnancy = 0, $('#inpWeekOfPregnancy').hide(), $('#btnOne').prop('disabled', false), $('#divDateOfChildbirth').show()) : (objPatient.pkDateOfChildbirth != '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
    ($(this).val() == 0) ? ($('#inpWeekOfPregnancy').show(), $('#divDateOfChildbirth').hide()) : (objPatient.pkWeekOfPregnancy !== 0) ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});

//objPatient.pkWeekOfPregnancy = 0;
$('#inpWeekOfPregnancy').on('input', function () {
    objPatient.pkWeekOfPregnancy = Number($(this).val());
    (objPatient.pkWeekOfPregnancy !== 0) ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
    console.log(objPatient.pkWeekOfPregnancy);
});


$('#btnChildbirthYesterday').on('click', function () {
//    console.log('OK');
    let vYesterday = addDays(new Date(), -1);
    $('#inpDateOfChildbirth').hide();
    objPatient.pkDateOfChildbirth = (`${vYesterday.getFullYear()}-${('0' + (vYesterday.getMonth() + 1)).slice(-2)}-${('0' + vYesterday.getDate()).slice(-2)}`);
    console.log(objPatient.pkDateOfChildbirth);
    (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});
$('#btnChildbirthToday').on('click', function () {
    $('#inpDateOfChildbirth').hide();
    objPatient.pkDateOfChildbirth = formatDate();
    console.log(objPatient.pkDateOfChildbirth);
    (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});
$('#btnChildbirthSomeDate').on('click', function () {
    $('#inpDateOfChildbirth').show().val('');
});

$('#inpDateOfChildbirth').on('change', function () {
    objPatient.pkDateOfChildbirth = $(this).val();
   console.log(objPatient.pkDateOfChildbirth);
    (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});


//    ($('input[name=rdoObstOrGynProfile]:checked').val() == 0 && $('input[name=rdoPregnancyOrChildbirth]:checked').val() != undefined) ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
//    (objPatient.pkWeekOfPregnancy != 0) ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);



$('.divSingleLvlRF').on('click', function (el) {
    el = $(this).closest('.divMiddleLvlRF').prev().find('input:checkbox');
    ($(this).closest('.divMiddleLvlRF').find('input:checkbox').is(':checked')) ? el.prop('checked', true): el.prop('checked', false);
    //    console.log(event.type, event.target.id, event.relatedTarget + ' 1 event');
    //    console.log(el.is(':checked'))
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

function goToRF() {

    if (objPatient.pkValuesMedPfofile.is('[value = 1]')) {
        objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsTherRF'));
        ($('#chkCalculateRiskOfBleeding').prop('checked')) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsNonsurgBleedingRF')): '';
    }
    if (objPatient.pkValuesMedPfofile.is('[value = 2]')) {
        objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsAtrFibrRF'));
        ($('#chkCalculateRiskOfBleeding').prop('checked')) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsFibrBleedingRF')): '';
    }
    if (objPatient.pkValuesMedPfofile.is('[value = 3]') || objPatient.pkValuesMedPfofile.is('[value = 4]') || objPatient.pkValuesMedPfofile.is('[value = 5]') || objPatient.pkValuesMedPfofile.is('[value = 6]') || objPatient.pkValuesMedPfofile.is('[value = 7]') || objPatient.pkValuesMedPfofile.is('[value = 8]') || objPatient.pkValuesMedPfofile.is('[value = 9]') || objPatient.pkValuesMedPfofile.is('[value = 10]')) {
        objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsSurgRF'));
        ($('#chkCalculateRiskOfBleeding').prop('checked') && objPatient.pkValuesMedPfofile.is('[value != 4]') && objPatient.pkValuesMedPfofile.is('[value != 10]')) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsSurgBleedingRF')): '';
    }
    if (objPatient.pkValuesMedPfofile.is('[value = 4]')) {
        objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsTraumRF'));
        ($('#chkCalculateRiskOfBleeding').prop('checked')) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsTraumBleedingRF')): '';
    }
    (objPatient.pkValuesMedPfofile.is('[value = 5]')) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsNeurosurgRF')): '';
    (objPatient.pkValuesMedPfofile.is('[value = 8]')) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsCombustRF')): '';
    if (objPatient.pkValuesMedPfofile.is('[value = 9]')) {
        objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsOncoRF'));
    }
    if (objPatient.pkValuesMedPfofile.is('[value = 10]')) {
        ($('input[name=rdoObstOrGynProfile]:checked').val() == 0) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsObstRF')): '';
        ($('#chkCalculateRiskOfBleeding').prop('checked')) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsObstBleedingRF')): '';
        ($('input[name=rdoPregnancyOrChildbirth]:checked').val() == 1) ? objPatient.pkSelectedRF = $.merge($(objPatient.pkSelectedRF), $('.clsLabourRF')): '';
    }
    objPatient.pkSelectedRF = $.distinct(objPatient.pkSelectedRF);
    $(objPatient.pkSelectedRF).show();
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

    ($('#chkMale').is(':checked')) ? objPatient.pkGender = 1: '';
    objPatient.pkWeight = Number($('#weight').val());
    objPatient.pkHeight = Number($('#height').val());

    $('#chkIsOrNoSurg').is(':checked') ? objPatient.pkIsOrNoSurg = true : '';

    $('#btnOne').unbind('click', goToRF);
    console.log(objPatient);
    // $('#btnOne').bind('click', countRF).html('Перейти к подсчету риск-факторов ВТЭО');

}
