'use strict';

let objPatient = {
    pkBirthDateOfPatient: '',
    pkAge: 0,
    pkGender: 0,
    pkHeight: 0,
    pkWeight: 0,
    pkWeekOfPregnancy: 0,
    pkDateOfChildbirth: '',
    pkIsOrNoSurg: false,
    pkDateOfOper: '',
    pkValuesMedPfofile: [],
    pkCalculateRiskOfBleeding: true
};

$('#dateOfBirth').on('change', function () {
    objPatient.pkBirthDateOfPatient = new Date($('#dateOfBirth').prop('value'));
});

$('#chkMale').on('click', function () {
    ($(this).is(':checked')) ? $('#slctMedicalProfileOfPatient [value="10"]').hide() : $('#slctMedicalProfileOfPatient [value="10"]').show();
});

$('#slctMedicalProfileOfPatient').on('change', function () {
    $('#chkMale').prop('disabled', true);
    $('.lblIsOrNoSurg, #divChooseKindOfOper, #divCreateKindOfOper, #divSmallOrLargeOper, #divObstOrGynProfile, #divPregnancyOrChildbirth').hide();
    $('#chkIsOrNoSurg, #chkCreateKindOfOper, #divPregnancyOrChildbirth input:checked, #divObstOrGynProfile input:checked, #divSmallOrLargeOper input:checked').prop('checked', false);
    $('.btnAccordChooseOper').prop('value', 1).next().hide();
    $('.btnAccordChooseOper').hide();

    $('#slctMedicalProfileOfPatient option:selected').each(function (i, el) {
        objPatient.pkValuesMedPfofile.push(+$(this).prop('value'));
    });
    console.log(objPatient.pkValuesMedPfofile);

    function isSurgOrObstProfiles() {
        $.each(objPatient.pkValuesMedPfofile, function (index, value) {
            (value > 2 && value < 10) ? $('.lblIsOrNoSurg').show() :
                (value === 10) ? $('#divObstOrGynProfile').show() : '';
            return true;
        });
    }
    isSurgOrObstProfiles();
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
        objPatient.pkValuesMedPfofile.includes(3) ? $('.btnGenSurgOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(4) ? $('.btnTraumOrthOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(5) ? $('.btnNeurosurgOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(6) ? $('.btnCardiovascOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(7) ? $('.btnUrolOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(8) ? $('.btnCombustOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(9) ? $('#divChooseKindOfOper').hide() : '';
        objPatient.pkValuesMedPfofile.includes(10) ? $('.btnObsGynOper').show() : '';
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
    let d = new Date(),
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
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

$('#btnOperYesterday').on('click', function () {
    let vYesterday = addDays(new Date(), -1);
    $('#inpDateOfOper').hide();
    objPatient.pkDateOfOper = (`${vYesterday.getFullYear()}-${('0' + (vYesterday.getMonth() + 1)).slice(-2)}-${('0' + vYesterday.getDate()).slice(-2)}`);
    console.log(objPatient.pkDateOfOper);
    (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
});

$('#btnOperToday').on('click', function () {
    $('#inpDateOfOper').hide();
    objPatient.pkDateOfOper = formatDate();
    console.log(objPatient.pkDateOfOper);
    (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
});

$('#btnOperTomorrow').on('click', function () {
    let vTomorrow = addDays(new Date(), 1);
    $('#inpDateOfOper').hide();
    objPatient.pkDateOfOper = (`${vTomorrow.getFullYear()}-${('0' + (vTomorrow.getMonth() + 1)).slice(-2)}-${('0' + vTomorrow.getDate()).slice(-2)}`);
    console.log(objPatient.pkDateOfOper);
    (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
});

$('#btnOperSomeDate').on('click', function () {
    $('#inpDateOfOper').show().val('');
});

$('#inpDateOfOper').on('change', function () {
    objPatient.pkDateOfOper = $(this).val();
    console.log(objPatient.pkDateOfOper);
    (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
});

$('#weight').on('change', () => {
    ($('#weight').prop('value') < 50 || $('#weight').prop('value') > 120) ? alert(`Вес пациента действительно ${$('#weight').prop('value')} кг?`) : '';
    (getCurrentAge(objPatient.pkBirthDateOfPatient) < 18 || getCurrentAge(objPatient.pkBirthDateOfPatient) > 100) ?
        alert(`Возраст пациента действительно ${getCurrentAge(objPatient.pkBirthDateOfPatient)} лет?`) : '';
});

$('#height').on('change', () => {
    ($('#height').prop('value') < 150 || $('#height').prop('value') > 190) ? alert(`Рост пациента действительно ${$('#height').prop('value')} см?`) : '';
    (getCurrentAge(objPatient.pkBirthDateOfPatient) < 18 || getCurrentAge(objPatient.pkBirthDateOfPatient) > 100) ?
        alert(`Возраст пациента действительно ${getCurrentAge(objPatient.pkBirthDateOfPatient)} лет?`) : '';
});

function showBtnGoToRF() {
    objPatient.pkAge = getCurrentAge(objPatient.pkBirthDateOfPatient);
    (objPatient.pkAge !== 0 && ($('#weight').val().length > 0) && ($('#height').val().length > 0) && (objPatient.pkValuesMedPfofile.length > 0)) ? $('#btnOne').show() : $('#btnOne').hide();
}

$('#btnOne').bind('click', goToRF);

$('#slctMedicalProfileOfPatient option').bind('click', showBtnGoToRF);
$('#age, #weight, #height, #dateOfBirth').bind('input', showBtnGoToRF);

$('#slctMedicalProfileOfPatient option').click(function () {
    (objPatient.pkValuesMedPfofile.includes(10) && $('input[name=rdoObstOrGynProfile]:checked').val() === undefined) ? $('#btnOne').prop('disabled', true) : $('#btnOne').prop('disabled', false);
});

$('input[name=rdoObstOrGynProfile]').click(function () {
    ($(this).val() == 1) ? ($('#btnOne').prop('disabled', false), $('#inpWeekOfPregnancy').val(''), objPatient.pkWeekOfPregnancy = 0) : ($('#btnOne').prop('disabled', true), $('#diobjPatient.pkDateOfChildbirth').hide(), $('#inpDateOfChildbirth').val(''), objPatient.pkDateOfChildbirth = '');
});

$('input[name=rdoPregnancyOrChildbirth]').click(function () {
    ($(this).val() == 0) ? ($('#inpWeekOfPregnancy').show(), $('#diobjPatient.pkDateOfChildbirth').hide(), $('#inpDateOfChildbirth').val(''), objPatient.pkDateOfChildbirth = '') : ($('#inpWeekOfPregnancy').hide(), objPatient.pkWeekOfPregnancy = 0, $('#diobjPatient.pkDateOfChildbirth').show());
    ($(this).val() == 1) ? ($('#inpWeekOfPregnancy').val(''), objPatient.pkWeekOfPregnancy = 0, $('#inpWeekOfPregnancy').hide(), $('#btnOne').prop('disabled', false), $('#divDateOfChildbirth').show()) : (objPatient.pkDateOfChildbirth != '') ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
    ($(this).val() == 0) ? ($('#inpWeekOfPregnancy').show(), $('#divDateOfChildbirth').hide()) : (objPatient.pkWeekOfPregnancy !== 0) ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
});

$('#inpWeekOfPregnancy').on('input', function () {
    objPatient.pkWeekOfPregnancy = Number($(this).val());
    (objPatient.pkWeekOfPregnancy !== 0) ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
    console.log(objPatient.pkWeekOfPregnancy);
});

$('#btnChildbirthYesterday').on('click', function () {
    //    console.log('OK');
    let vYesterday = addDays(new Date(), -1);
    $('#inpDateOfChildbirth').hide();
    objPatient.pkDateOfChildbirth = (`${vYesterday.getFullYear()}-${('0' + (vYesterday.getMonth() + 1)).slice(-2)}-${('0' + vYesterday.getDate()).slice(-2)}`);
    console.log(objPatient.pkDateOfChildbirth);
    (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
});

$('#btnChildbirthToday').on('click', function () {
    $('#inpDateOfChildbirth').hide();
    objPatient.pkDateOfChildbirth = formatDate();
    console.log(objPatient.pkDateOfChildbirth);
    (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
});

$('#btnChildbirthSomeDate').on('click', function () {
    $('#inpDateOfChildbirth').show().val('');
});

$('#inpDateOfChildbirth').on('change', function () {
    objPatient.pkDateOfChildbirth = $(this).val();
    console.log(objPatient.pkDateOfChildbirth);
    (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false) : $('#btnOne').prop('disabled', true);
});

function goToRF() {
    ($('#chkMale').is(':checked')) ? objPatient.pkGender = 1 : '';
    objPatient.pkWeight = Number($('#weight').val());
    objPatient.pkHeight = Number($('#height').val());
    ($('#chkCalculateRiskOfBleeding').is(':checked')) ? objPatient.pkCalculateRiskOfBleeding = true : '';

    $('#chkIsOrNoSurg').is(':checked') ? objPatient.pkIsOrNoSurg = true : '';
    console.log(objPatient);
    let serialObj = JSON.stringify(objPatient);
        localStorage.setItem('Patient', serialObj);
let returnObj = JSON.parse(localStorage.getItem('Patient'))
console.log(returnObj);
$(location).attr('href','/vte_patient_list_rf');
} 