'use strict';
let oPat = {
        pkBirthDateOfPatient: '',
        pkAge: 0,
        pkHeight: 0,
        pkWeight: 0,
        pkBMI: 0,
        pkMedProfiles: []
    },
    aValuesOfMedPfofile = [];
$('#lblIsOrNoSurg, #btnOne').hide();

$('#inpDateOfBirth').on('change', function () {
    oPat.pkBirthDateOfPatient = new Date($('#inpDateOfBirth').prop('value'));
});

$('#chkMale').on('click', function () {
    ($(this).is(':checked')) ? $('#slctMedicalProfileOfPatient [value="10"]').hide(): $('#slctMedicalProfileOfPatient [value="10"]').show();
});
$('#slctMedicalProfileOfPatient').on('click', function () {
    $('#chkMale').prop('disabled', true);
    $('#slctMedicalProfileOfPatient option:selected').each(function (i, el) {
        aValuesOfMedPfofile.push(+$(this).prop('value'));
        $(el).prop('value') < 3 ? $('#lblIsOrNoSurg').hide() :
            ($(el).prop('value') > 2 && $(el).prop('value')) < 10 ? $('#lblIsOrNoSurg').show() : '';
    });
});
$('#btnTwo').on('click', function () {
    $('#slctMedicalProfileOfPatient option').prop('selected') ? $('#chkMale').prop('disabled', true) : $('#chkMale').prop('disabled', false);
});

function getCurrentAge(date) {
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
}

let counter_1 =0;
function restrictParamsOfPat(){
    oPat.pkAge = getCurrentAge(oPat.pkBirthDateOfPatient);

    $('#inpWeight').on('change', () => {
        $('#inpWeight').prop('value') < 50 || $('#inpWeight').prop('value') > 120 ? 
        ($('<div class="alert alert-warning alert-dismissible" id= "warning-alert_1" role="alert">').html(`Вес пациента действительно ${$('#inpWeight').prop('value')} кг?`).appendTo('#fg_2'), $('<button type="button" class="close" id="close_2" data-dismiss="alert" aria-label="Close">').appendTo('#warning-alert_1'), $('<span aria-hidden="true">&times;</span></button>').appendTo('#warning-alert_1 .close')): '';
        (oPat.pkAge < 18 || oPat.pkAge > 100) && counter_1 === 0 ?
        (counter_1 = 1, $('<div class="alert alert-warning alert-dismissible" id= "warning-alert_2" role="alert">').html(`Возраст пациента действительно ${oPat.pkAge} лет?`).appendTo('#fg_1'), $('<button type="button" class="close" id="close_1"  data-dismiss="alert" aria-label="Close">').appendTo('#warning-alert_2'), $('<span aria-hidden="true">&times;</span></button>').appendTo('#warning-alert_2 .close')) : counter_1 = 0;        
    });
    
    
    
    $('#inpHeight').on('change', () => {
        ($('#inpHeight').prop('value') < 150 || $('#inpHeight').prop('value') > 190) ?
        ($('<div class="alert alert-warning alert-dismissible" id= "warning-alert_3" role="alert">').html(`Рост пациента действительно ${$('#inpHeight').prop('value')} см?`).appendTo('#fg_3'), $('<button type="button" class="close" id="close_3" data-dismiss="alert" aria-label="Close">').appendTo('#warning-alert_3'), $('<span aria-hidden="true">&times;</span></button>').appendTo('#warning-alert_3 .close')) :'';
    
        (oPat.pkAge < 18 || oPat.pkAge > 100) && counter_1 === 0 ?
        (counter_1 = 1, $('<div class="alert alert-warning alert-dismissible" id= "warning-alert_2" role="alert">').html(`Возраст пациента действительно ${oPat.pkAge} лет?`).appendTo('#fg_1'), $('<button type="button" class="close" id="close_1"  data-dismiss="alert" aria-label="Close">').appendTo('#warning-alert_2'), $('<span aria-hidden="true">&times;</span></button>').appendTo('#warning-alert_2 .close')) : counter_1 = 0;        
    });
    }
    restrictParamsOfPat();

function showBtnGoToRF() {

    oPat.pkAge = getCurrentAge(oPat.pkBirthDateOfPatient);
    oPat.pkAge !== 0 && $('#inpWeight').val().length > 0 && $('#inpHeight').val().length > 0 && $('#slctMedicalProfileOfPatient option:selected').is(':checked') ? $('#btnOne').show() : $('#btnOne').hide();
}

$('#slctMedicalProfileOfPatient option').on('click', showBtnGoToRF);
$('#inpWeight, #inpHeight, #inpDateOfBirth').on('input', showBtnGoToRF);
$('#btnOne').on('click', goToRF);

// function getSurgProfiles(item, isElem = false) {
//     $.each(item, function (ind, el) {
//         if (el > 2 && el < 10) isElem = true;
//     });
//     return isElem;
// }

function searchBMI(w, h) {
    return (Math.ceil(w / (Math.pow((h / 100), 2))));
}

function goToRF() {
    oPat.pkGender = $('#chkMale').prop('checked') ? 1 : 0;
    oPat.pkWeight = Number($('#inpWeight').val());
    oPat.pkHeight = Number($('#inpHeight').val());
    oPat.pkBMI = searchBMI(oPat.pkWeight, oPat.pkHeight);
    $('#slctMedicalProfileOfPatient option:selected').each(function (ind, el) {
        oPat.pkMedProfiles.push(+$(el).prop('value'));
    });

    // oPat.pkMedProfiles = getSurgProfiles(aValuesOfMedPfofile);

    oPat.pkIsOrNoSurg = $('#chkIsOrNoSurg').prop('checked') ? true : false;
    oPat.pkCalculateRiskOfBleeding = $('#chkCalculateRiskOfBleeding').prop('checked') ? true : false;
    oPat.pkInvasions = $('#chkInvasions').prop('checked') ? true : false;

    let serialObj = JSON.stringify(oPat);
    localStorage.setItem('Patient', serialObj);
    $(location).attr('href', '/vte_patient_list_rf');

    console.log(oPat);
}