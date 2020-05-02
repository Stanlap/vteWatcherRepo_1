'use strict';
let oPat = JSON.parse(localStorage.getItem('Patient'));
localStorage.removeItem('Patient')
console.log(oPat);
let vIsShow = false;
$('#inpDateOfOper').prop({
    value: new Date()
});

$(`<input class="form-control" type="date" value= "${formatDate()}" id="inpDateOfOper_2">`).appendTo('#divForDate');

$('#lblTimeOfSurg').hide();
$('#rdoSmallOper').on('click', function () {
    $(this).prop('checked') ? $('#lblTimeOfSurg').show() : '';
});
$('#rdoLargeOper').on('click', function () {
    $(this).prop('checked') ? ($('#lblTimeOfSurg').hide(), $('#chkTimeOfSurg').prop('checked', false)) : '';
});


$(oPat.pkMedProfiles).each((ind, el) => {
    let vContent = '';
    el === 3 ? (vContent = '<li class="list-group-item" value="0"> плановая холецистэктомия</li><li class="list-group-item" value="0"> неосложненная аппендэктомия</li><li class="list-group-item" value="0"> грыжесечение</li><li class="list-group-item" value="1"> гастрэктомия</li><li class="list-group-item" value="1"> резекция печени</li><li class="list-group-item" value="1"> панкреатодуоденальная резекция</li><li class="list-group-item" value="1"> колэктомия</li><li class="list-group-item" value="1"> резекция желудка или кишечника</li><li class="list-group-item" value="1"> осложненная аппендэктомия</li><li class="list-group-item" value="1"> холецистэктомия по экстренным показаниям</li><li class="list-group-item" value="1"> пульмонэктомия или расширенная резекция легкого</li><li class="list-group-item" value="1"> ампутация бедра</li><li class="list-group-item" value="1"> бариатрические операции</li><li class="list-group-item" value="1"> лапароскопическое вмешательство (длительностью &gt; 45 мин.)</li>', createCard('Общая хирургия', el, vContent)) : '';

    el === 4 ? (vContent = '<li class="list-group-item" value="1"> ампутация бедра</li><li class="list-group-item" value="0"> вмешательство по поводу деформации стопы</li><li class="list-group-item" value="2"> эндоскопические операции на суставах нижней конечности</li><li class="list-group-item" value="0"> операции на мягких тканях нижних конечностей с последующей иммобилизацией</li><li class="list-group-item" value="1"> остеотомии и остеосинтез таза</li><li class="list-group-item" value="1"> остеотомии и остеосинтез голени</li><li class="list-group-item" value="3"> эндопротезирование тазобедренного сустава</li><li class="list-group-item" value="3"> эндопротезирование коленного сустава</li><li class="list-group-item" value="3"> операции при переломах бедра</li><li class="list-group-item" value="1"> операции на позвоночном столбе</li>', createCard('Травматология и ортопедия', el, vContent)) : '';

    el === 5 ? (vContent = '<li class="list-group-item" value="1"> операции на головном и спинном мозге</li>', createCard('Нейрохирургия', el, vContent)) : '';

    el === 6 ? (vContent = '<li class="list-group-item" value="0"> флебэктомия</li><li class="list-group-item" value="0"> стволовая лазерная или радиочастотная облитерация</li><li class="list-group-item" value="0"> кроссэктомия при восходящем тромбофлебите поверхностных вен</li><li class="list-group-item" value="1"> артериальная реконструкция</li><li class="list-group-item" value="1"> аорто-коронарное шунтирование</li><li class="list-group-item" value="1"> операция на открытом сердце</li>', createCard('Сердечно-сосудистая хирургия', el, vContent)) : '';

    el === 7 ? (vContent = '<li class="list-group-item" value="0"> трансуретральная аденомэктомия</li><li class="list-group-item" value="1"> чреспузырная аденомэктомия</li><li class="list-group-item" value="1"> экстирпация мочевого пузыря</li><li class="list-group-item" value="1"> нефрэктомия с лимфоаденэктомией и/или удалением опухолевого тромба из нижней полой вены</li>', createCard('Урология', el, vContent)) : '';

    el === 8 ? (vContent = '<li class="list-group-item" value="0"> некрэктомия ожоговых ран на площади до 10% поверхности тела</li><li class="list-group-item" value="0"> аутодермопластика до 15% поверхности тела</li><li class="list-group-item" value="1"> некрэктомия ожоговых ран на площади свыше 10% поверхности тела</li><li class="list-group-item" value="1"> аутодермопластика свыше 15% поверхности тела</li>', createCard('Комбустиология', el, vContent)) : '';

    el === 10 ? (vContent = '<li class="list-group-item" value="0"> аборт</li><li class="list-group-item" value="1"> кесарево сечение плановое </li><li class="list-group-item" value="1"> кесарево сечение в родах</li><li class="list-group-item" value="1"> ампутация матки</li><li class="list-group-item" value="1"> экстирпация матки</li>', createCard('Акушерство и гинекология', el, vContent)) : '';
});

function createCard(title, ind, content) {
    $('#accListOp').append(`<div class="card"><div class="card-header" id="divCHeader_${ind}"><h5 class="mb-0"><button class="btn btn-block" type="button" data-toggle="collapse" data-target="#collapse_${ind}" aria-controls="collapse_${ind}">${title}</button></h5></div>
    <div id="collapse_${ind}" class="collapse ${vIsShow ? '': 'show'}" aria-labelledby="divCHeader_${ind}" data-parent="#accListOp"><div class="card-body"><ul class="list-group list-group-flush">${content}</ul></div></div></div>`);
    vIsShow = true;
}
$("#accListOp li").click(function (vTB) {
    vTB = $(this).parents('.collapse').siblings().find('button');
    $(this).toggleClass('list-group-item-secondary');
    $(this).siblings('.list-group-item-secondary').length > 0 || $(this).hasClass('list-group-item-secondary') ? $(vTB).addClass('btn-secondary') : $(vTB).removeClass('btn-secondary');
});

$('#btnCreateOwnOpProf').on('click', () => {
    $('#divCreateOwnOpProf').show();
    $('#accListOp').hide();
    $('#accListOp li').removeClass('list-group-item-secondary');
    $('#accListOp button').removeClass('btn-secondary');
});
$('#btnChooseOp').on('click', () => {
    $('#accListOp').show();
    $('#divCreateOwnOpProf').hide();
    $('#divCreateOwnOpProf radio').prop({
        checked: false
    });
    $('#taNonTrivialOperTitle').val('');
});
$('#btnOperTomorrow').on('click', () => {
    $('#divForDate').empty();
    $(`<input class="form-control" type="date" value= "${correctDate(addDays(new Date(), 1))}" id="inpDateOfOper_2">`).appendTo('#divForDate');
});

// $('#lblCreateKindOfOper').hide();

// $('span.preComment').on('click', function () {
//     $(this).next().show()
//     $(this).hide()
// })

// $('span.comments').on('click', function () {
//     $(this).prev().show()
//     $(this).hide()
// });

// $('#dateOfBirth').on('change', function () {
//     oPat.pkBirthDateOfPatient = new Date($('#dateOfBirth').prop('value'));
// });

// $('#chkMale').on('click', function () {
//     ($(this).is(':checked')) ? $('#slctMedicalProfileOfPatient [value="10"]').hide(): $('#slctMedicalProfileOfPatient [value="10"]').show();
// });

// $('#slctMedicalProfileOfPatient').on('click', function () {
//     oPat.pkMedProfiles = [];
//     $('#slctMedicalProfileOfPatient option:selected').each(function (i, el) {
//         oPat.pkMedProfiles.push(+$(this).prop('value'));
//         $(el).prop('value') < 3 ? $('.lblIsOrNoSurg').hide() : ($(el).prop('value') > 2 && $(el).prop('value')) < 10 ? $('.lblIsOrNoSurg').show() : $(el).prop('value') === 10 ? $('#divObstOrGynProfile').show() : $('#divObstOrGynProfile').show();
//     });
// });


// $('#slctMedicalProfileOfPatient').on('change', function () {
//     $('.lblIsOrNoSurg, #divChooseKindOfOper, #divCreateKindOfOper, #divSmallOrLargeOper, #divObstOrGynProfile, #divPregnancyOrChildbirth, #divDateOfOper,#divAnesthesia').hide();
//     $('#chkIsOrNoSurg, #btnCreateOwnOpProf, #divPregnancyOrChildbirth input:checked, #divObstOrGynProfile input:checked, #divSmallOrLargeOper input:checked').prop('checked', false);
//     $('#taNonTrivialOperTitle').val('');
//     $('.btnAccordChooseOper').prop('value', 1).next().hide();
//     $('.btnAccordChooseOper').hide();
// });

// $('input[name=rdoObstOrGynProfile]:radio').on('click', function () {
//     oPat.pkObstOrGynProfile = $(this).val();
//     if ($(this).val() == 0) {
//         $('#divPregnancyOrChildbirth').show();
//     } else {
//         $('#divPregnancyOrChildbirth').hide();
//         $('input[name="rdoPregnancyOrChildbirth"]:checked').prop('checked', false);
//     }
//     $('.lblIsOrNoSurg').show();
// });
$('.btnAccordChooseOper').show();
$('.btnAccordChooseOper').prop('value', 1).next().show();

$('#selKindOfAnesth').on('input', () => {
    if (+$('#selKindOfAnesth option:selected').val() === 3) {
        $('<div/>').prop({
                id: 'dialog_0',
            })
            .appendTo('#divAnesthesia');
        $('<br>').appendTo('#dialog_0');
        $('<div/>').prop({
                id: 'invitToAct_0',
            }).html('Укажите дату установки:')
            .appendTo('#dialog_0');
        $('<input/>').prop({
                id: 'inpDate_0',
                type: 'date'
            })
            .appendTo('#dialog_0');

        $('<div/>').prop({
                id: 'invitToAct_1',
            })
            .html('Укажите дату удаления катетера:')
            .appendTo('#dialog_0');
        $('<input/>').prop({
                id: 'inpDate_1',
                type: 'date'
            })
            .appendTo('#dialog_0');
        oPat.pkDateOfOper !== '' ? $('#inpDate_0, #inpDate_1').val(oPat.pkDateOfOper) : $('#inpDate_0, #inpDate_1').val(formatDate());

    } else {
        $('#dialog_0').remove();
    };
});

function createDialog_1() {
    $('<div/>').prop({
            id: 'dialog_1',
        })
        .hide()
        .appendTo('#divCentrAVAccess');
    $('<label/>').attr({
        for: 'chkDialog_1'
    }).html('Катетер уже установлен').appendTo('#dialog_1');

    $('<input/>').prop({
            id: 'chkDialog_1',
            type: 'checkbox'
        })
        .appendTo('#dialog_1');
    $('<div/>').prop({
            id: 'invitToAct_2',
        }).html('Укажите дату установки:')
        .appendTo('#dialog_1');
    $('<input/>').prop({
            id: 'inpDate_2',
            type: 'date',
            value: formatDate()
        })
        .appendTo('#dialog_1');

    $('<div/>').prop({
            id: 'invitToAct_3',
        })
        .html('Укажите дату удаления катетера:')
        .appendTo('#dialog_1');
    $('<input/>').prop({
            id: 'inpDate_3',
            type: 'date',
            value: formatDate()
        })
        .appendTo('#dialog_1');
}

createDialog_1();

$('#chkDialog_1').on('click', function () {
    $(this).prop('checked') ? $('#invitToAct_2, #inpDate_2').hide() : $('#invitToAct_2, #inpDate_2').show();
});

$('#chkCentrAVAccess').on('click', function () {
    $(this).prop('checked') ? $('#dialog_1').show() : ($('#dialog_1').hide(), $('#chkDialog_1').prop('checked', false), $('#invitToAct_2, #inpDate_2').show());
    oPat.pkIsCentrAVAccess = $(this).prop('checked') ? true : false;
    oPat.pkDateOfOper !== '' ? $('#inpDate_2, #inpDate_3').val(oPat.pkDateOfOper) : $('#inpDate_2, #inpDate_3').val(formatDate());
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

// function formatDate() {
//     let d = new Date(),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear(),
//         vDateNow = '';
//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;
//     vDateNow = [year, month, day].join('-');
//     return vDateNow;
// }

// function addDays(date, days) {
//     let result = new Date(date);
//     result.setDate(result.getDate() + days);
//     return result;
// }

// function correctDate(vD) {
//     return `${vD.getFullYear()}-${('0' + (vD.getMonth() + 1)).slice(-2)}-${('0' + vD.getDate()).slice(-2)}`;
// }

// correctDate(addDays(new Date(), 1))

// $('#btnCreateOwnOpProf').on('click', function () {
//     ($(this).is(':checked')) ? ($('#divSmallOrLargeOper').show(), $('#divChooseKindOfOper').hide(),
//         $('.btnObsGynOper').show()) : ($('#divSmallOrLargeOper, .lblTimeOfSurg').hide(),
//         $('.btnObsGynOper, #divChooseKindOfOper').show(), $('#taNonTrivialOperTitle').val(''), $('#divSmallOrLargeOper input:checked').prop('checked', false));
//     // $('#divSmallOrLargeOper input:checked').prop('checked', false), $('#divChooseKindOfOper').show());
// });


function formatDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        vDateNow = '';
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
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

// $('#OperYesterday').on('click', function () {
//     let vYesterday = addDays(new Date(), -1);
//     $('#inpDateOfOper').hide();
//     oPat.pkDateOfOper = (`${vYesterday.getFullYear()}-${("0" + (vYesterday.getMonth() + 1)).slice(-2)}-${("0" + vYesterday.getDate()).slice(-2)}`);
//     (oPat.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
// });

$('#rdoOperToday').on('click', function () {
    $('#inpDateOfOper').hide();
    oPat.pkDateOfOper = formatDate();
    (oPat.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});

$('#rdoOperTomorrow').on('click', function () {
    let vTomorrow = addDays(new Date(), 1);
    $('#inpDateOfOper').hide();
    oPat.pkDateOfOper = (`${vTomorrow.getFullYear()}-${("0" + (vTomorrow.getMonth() + 1)).slice(-2)}-${("0" + vTomorrow.getDate()).slice(-2)}`);
    (oPat.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});

// $('#rdoOperSomeDate').on('click', function () {
//     $('#inpDateOfOper').show().val('');
// });

$('#inpDateOfOper').on('change', function () {
    oPat.pkDateOfOper = $(this).val();
    (oPat.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
});


// $('#weight').on('change', () => {
//     ($('#weight').prop('value') < 50 || $('#weight').prop('value') > 120) ? alert(`Вес пациента действительно ${$('#weight').prop('value')} кг?`): '';
//     (getCurrentAge(oPat.pkBirthDateOfPatient) < 18 || getCurrentAge(oPat.pkBirthDateOfPatient) > 100) ?
//     alert(`Возраст пациента действительно ${getCurrentAge(oPat.pkBirthDateOfPatient)} лет?`): '';
// });

// $('#height').on('change', () => {
//     ($('#height').prop('value') < 150 || $('#height').prop('value') > 190) ? alert(`Рост пациента действительно ${$('#height').prop('value')} см?`): '';
//     (getCurrentAge(oPat.pkBirthDateOfPatient) < 18 || getCurrentAge(oPat.pkBirthDateOfPatient) > 100) ?
//     alert(`Возраст пациента действительно ${getCurrentAge(oPat.pkBirthDateOfPatient)} лет?`): '';
// });

// function showBtnGoToRF() {

//     oPat.pkAge = getCurrentAge(oPat.pkBirthDateOfPatient);
//     oPat.pkAge !== 0 && $('#weight').val().length > 0 && $('#height').val().length > 0 && $('#slctMedicalProfileOfPatient option:selected').is(':checked') ? $('#btnOne').show() : $('#btnOne').hide();
// }

// $('#slctMedicalProfileOfPatient option').bind('click', showBtnGoToRF);
// $('#age, #weight, #height, #dateOfBirth').bind('input', showBtnGoToRF);

// $('#btnOne').bind('click', goToRF);

// $('#slctMedicalProfileOfPatient').click(function () {
//     (oPat.pkMedProfiles.includes(10) && $('input[name=rdoObstOrGynProfile]:checked').val() === undefined) ? $('#btnOne').prop('disabled', true): $('#btnOne').prop('disabled', false);
// });

// $('input[name=rdoObstOrGynProfile]').click(function () {
//     ($(this).val() == 1) ? ($('#btnOne').prop('disabled', false), $('#inpWeekOfPregnancy').val(''), oPat.pkWeekOfPregnancy = 0) : ($('#btnOne').prop('disabled', true), $('#dioPat.pkDateOfChildbirth').hide(), $('#inpDateOfChildbirth').val(''), oPat.pkDateOfChildbirth = '');
// });

// $('input[name=rdoPregnancyOrChildbirth]').click(function () {
//     ($(this).val() == 0) ? ($('#inpWeekOfPregnancy').show(), $('#dioPat.pkDateOfChildbirth').hide(), $('#inpDateOfChildbirth').val(''), oPat.pkDateOfChildbirth = '') : ($('#inpWeekOfPregnancy').hide(), oPat.pkWeekOfPregnancy = 0, $('#dioPat.pkDateOfChildbirth').show());
//     ($(this).val() == 1) ? ($('#inpWeekOfPregnancy').val(''), oPat.pkWeekOfPregnancy = 0, $('#inpWeekOfPregnancy').hide(), $('#btnOne').prop('disabled', false), $('#divDateOfChildbirth').show()) : (oPat.pkDateOfChildbirth != '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
//     ($(this).val() == 0) ? ($('#inpWeekOfPregnancy').show(), $('#divDateOfChildbirth').hide()) : (oPat.pkWeekOfPregnancy !== 0) ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
// });

// $('#inpWeekOfPregnancy').on('input', function () {
//     oPat.pkWeekOfPregnancy = Number($(this).val());
//     (oPat.pkWeekOfPregnancy !== 0) ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
// });

// $('#btnChildbirthYesterday').on('click', function () {
//     let vYesterday = addDays(new Date(), -1);
//     $('#inpDateOfChildbirth').hide();
//     oPat.pkDateOfChildbirth = (`${vYesterday.getFullYear()}-${("0" + (vYesterday.getMonth() + 1)).slice(-2)}-${("0" + vYesterday.getDate()).slice(-2)}`);
//     (oPat.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
// });

// $('#btnChildbirthToday').on('click', function () {
//     $('#inpDateOfChildbirth').hide();
//     oPat.pkDateOfChildbirth = formatDate();
//     (oPat.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
// });

// $('#btnChildbirthSomeDate').on('click', function () {
//     $('#inpDateOfChildbirth').show().val('');
// });

// $('#inpDateOfChildbirth').on('change', function () {
//     oPat.pkDateOfChildbirth = $(this).val();
//     (oPat.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
// });

function goToRF() {
    // ($('#chkMale').is(':checked')) ? oPat.pkGender = 1: '';
    // oPat.pkWeight = Number($('#weight').val());
    // oPat.pkHeight = Number($('#height').val());

    // function searchBMI(w, h) {
    //     return (Math.ceil(w / (Math.pow((h / 100), 2))));
    // }
    // oPat.pkBMI = searchBMI($('#weight').val(), $('#height').val());
    // oPat.pkMedProfiles = [];
    // $('#slctMedicalProfileOfPatient option:selected').each(function (i, el) {
    //     oPat.pkMedProfiles.push(+$(this).prop('value'));
    // });
    let isElem = false;

    function isSurgProfiles() {
        $.each(oPat.pkMedProfiles, function (index, value) {
            if (value > 2 && value < 10) isElem = true;
        });
        return isElem;
    }
    oPat.pkAllSurgProfiles = isSurgProfiles();

    // $('#chkIsOrNoSurg').is(':checked') ? oPat.pkIsOrNoSurg = true : '';


    if (oPat.pkIsOrNoSurg) {
        ($('.divGenSurgOper select').prop('selectedIndex') == 4 || $('.divTraumOrthOper select').prop('selectedIndex') == 9 || $('.divNeurosurgOper select').prop('selectedIndex') == 0 || $('.divUrolOper select').prop('selectedIndex') == 0 || $('.divUrolOper select').prop('selectedIndex') == 1) ? oPat.pkPullOfSurg = true: '';
        if (+$('#selKindOfAnesth option:selected').val() === 3) {
            oPat.pkIsSpinalAnesth = true;
            oPat.pkStandDateITCath = $('#inpDate_0').val();
            oPat.pkRemoveDateITCath = $('#inpDate_1').val();
        }
        oPat.pkIsGenAnesth = (+$('#selKindOfAnesth option:selected').val() < 3) ? true : false;
    }

    if (oPat.pkIsCentrAVAccess) {
        $('#chkDialog_1').prop('checked') ? (oPat.pkStandDateCentrAVAccess = '', oPat.pkHasCentrAVAccess = true) : (oPat.pkStandDateCentrAVAccess = $('#inpDate_2').val(), oPat.pkHasCentrAVAccess = false);
        oPat.pkRemoveDateCentrAVAccess = $('#inpDate_3').val();
    } else {
        oPat.pkStandDateCentrAVAccess = '';
        oPat.pkRemoveDateCentrAVAccess = '';
    };

    ($('.divTraumOrthOper select').prop('selectedIndex') == 6 || $('.divTraumOrthOper select').prop('selectedIndex') == 7) ? ($('#chkArtroplasty').prop('checked', true), oPat.pkArtroplasty = true) : '';

    ($('.divTraumOrthOper select').prop('selectedIndex') == 6) ? ($('#chkArtroplasty').prop('checked', true), oPat.pkArtroplastyHipJoint = true) : '';
    ($('.divTraumOrthOper select').prop('selectedIndex') == 7) ? ($('#chkArtroplasty').prop('checked', true), oPat.pkArtroplastyKneeJoint = true) : '';

    let objSelectedOper = {
        pkLiverResection: false,
        pkPancreatoDuodResection: false,
        pkPulmonectomy: false,
        pkLaparoscopicIntervention: false,
        pkHeartSurgery: false,
        pkBrainOrSpinalCordSurg: false,
        pkElectiveCSection: false,
        pkSectionInLabour: false,
        pkArthroscopicSurgery: false,
        pkShinFractureSurgery: false,
        pkHipFractureSurgery: false
    };

    ($('.divTraumOrthOper select').prop('selectedIndex') == 2) ? objSelectedOper.pkArthroscopicSurgery = true: '';
    ($('.divTraumOrthOper select').prop('selectedIndex') == 5) ? objSelectedOper.pkShinFractureSurgery = true: '';
    ($('.divTraumOrthOper select').prop('selectedIndex') == 8) ? objSelectedOper.pkHipFractureSurgery = true: '';

    ($('.divGenSurgOper select').prop('selectedIndex') == 4) ? objSelectedOper.pkLiverResection = true: '';
    ($('.divGenSurgOper select').prop('selectedIndex') == 5) ? objSelectedOper.pkPancreatoDuodResection = true: '';
    ($('.divGenSurgOper select').prop('selectedIndex') == 11) ? objSelectedOper.pkPulmonectomy = true: '';
    ($('.divGenSurgOper select').prop('selectedIndex') == 14) ? objSelectedOper.pkLaparoscopicIntervention = true: '';

    ($('.divCardiovascOper select').prop('selectedIndex') == 4 || $('.divCardiovascOper select').prop('selectedIndex') == 5) ? objSelectedOper.pkHeartSurgery = true: '';

    ($('.divNeurosurgOper select').prop('selectedIndex') == 0) ?
    objSelectedOper.pkBrainOrSpinalCordSurg = true: '';

    ($('.divObsGynOper select').prop('selectedIndex') == 1) ?
    objSelectedOper.pkElectiveCSection = true: '';
    ($('.divObsGynOper select').prop('selectedIndex') == 2) ?
    objSelectedOper.pkCSectionInLabour = true: '';

    let pkOperDifficultyGrades = [0];

    $.each($('#divChooseKindOfOper option:selected'), function (el) {
        pkOperDifficultyGrades.push($('#divChooseKindOfOper option:selected')[el].value);
        oPat.pkAllChoosedOperations.push($('#divChooseKindOfOper option:selected')[el].innerText);
    });

    $('#taNonTrivialOperTitle').val() ? oPat.pkAllChoosedOperations.push(` ${$('#taNonTrivialOperTitle').val()}`) : '';


    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    $('input[name=rdoSmallOrLargeOper]:checked').val() !== undefined ? pkOperDifficultyGrades.push(Number($('input[name=rdoSmallOrLargeOper]:checked').val())) : '';

    oPat.pkGradeOfOper = getMaxOfArray(pkOperDifficultyGrades.map(Number));

    // $('#chkCalculateRiskOfBleeding').is(':checked') ? oPat.pkCalculateRiskOfBleeding = true : '';
    // $('input[name=rdoPregnancyOrChildbirth]:checked').val() != undefined ? oPat.pkPregnancyOrChildbirth = $('input[name=rdoPregnancyOrChildbirth]:checked').val() : '';

    ($('#chkTimeOfSurg').is(':checked')) ? oPat.pkOperTimeMore60 = true: '';

    let serialObj = JSON.stringify(oPat);
    localStorage.setItem('Patient', serialObj);
    serialObj = JSON.stringify(objSelectedOper);
    localStorage.setItem('SelectedOper', serialObj);
    // let returnObj = JSON.parse(localStorage.getItem('Patient'))
    // console.log(returnObj);
    $(location).attr('href', '/vte_patient_list_rf');
}