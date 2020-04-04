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
    pkCalculateRiskOfBleeding: true,
    pkPregnancyOrChildbirth: 2,
    pkBMI: 0,
    pkAllChoosedOperations: [],
    pkGradeOfOper: 0,
    pkOperTimeMore60: false,
    pkAllSurgProfiles: false,
    pkPullOfSurg: false,
    pkArtroplastyHipJoint: false,
    pkArtroplastyKneeJoint: false,
    pkArtroplasty: false,
    pkObstOrGynProfile: 2,
    pkIsSpinalAnesth: false,
    pkStandDateITCath: '',
    pkRemoveDateITCath: ''
};
$('span.preComment').on('click', function () {
    $(this).next().show()
    $(this).hide()
})

$('span.comments').on('click', function () {
    $(this).prev().show()
    $(this).hide()
});

$('#dateOfBirth').on('change', function () {
    objPatient.pkBirthDateOfPatient = new Date($('#dateOfBirth').prop('value'));
});

$('#chkMale').on('click', function () {
    ($(this).is(':checked')) ? $('#slctMedicalProfileOfPatient [value="10"]').hide(): $('#slctMedicalProfileOfPatient [value="10"]').show();
});

$('#slctMedicalProfileOfPatient').on('click', function () {
    objPatient.pkValuesMedPfofile = [];
    $('#slctMedicalProfileOfPatient option:selected').each(function (i, el) {
        objPatient.pkValuesMedPfofile.push(+$(this).prop('value'));
        $(el).prop('value') < 3 ? $('.lblIsOrNoSurg').hide() : ($(el).prop('value') > 2 && $(el).prop('value')) < 10 ? $('.lblIsOrNoSurg').show() : $(el).prop('value') === 10 ? $('#divObstOrGynProfile').show() : $('#divObstOrGynProfile').show();
    });
});
$('#slctMedicalProfileOfPatient').on('change', function () {
    $('#chkMale').prop('disabled', true);
    $('.lblIsOrNoSurg, #divChooseKindOfOper, #divCreateKindOfOper, #divSmallOrLargeOper, #divObstOrGynProfile, #divPregnancyOrChildbirth, #divDateOfOper').hide();
    $('#chkIsOrNoSurg, #chkCreateKindOfOper, #divPregnancyOrChildbirth input:checked, #divObstOrGynProfile input:checked, #divSmallOrLargeOper input:checked').prop('checked', false);
    $('#taNonTrivialOperTitle').val('');
    $('.btnAccordChooseOper').prop('value', 1).next().hide();
    $('.btnAccordChooseOper').hide();
});

$('input[name=rdoObstOrGynProfile]:radio').on('click', function () {
    objPatient.pkObstOrGynProfile = $(this).val();
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
        $('#divChooseKindOfOper, #divCreateKindOfOper, #divDateOfOper, #divAnesthesia').show();
        $('#btnOne').prop('disabled', true);
        objPatient.pkValuesMedPfofile.includes(3) ? $('.btnGenSurgOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(4) ? $('.btnTraumOrthOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(5) ? $('.btnNeurosurgOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(6) ? $('.btnCardiovascOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(7) ? $('.btnUrolOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(8) ? $('.btnCombustOper').show() : '';
        objPatient.pkValuesMedPfofile.includes(10) ? $('.btnObsGynOper').show() : '';
    } else {
        $('#divChooseKindOfOper, #divCreateKindOfOper, #divSmallOrLargeOper, #divDateOfOper, #divAnesthesia').hide();
        $('#btnOne').prop('disabled', false);
        $('.btnAccordChooseOper').prop('value', 1).next().hide();
        $('#divChooseKindOfOper option:selected').prop('selected', false);
        $('#chkCreateKindOfOper').prop('checked', false);
        $('#divSmallOrLargeOper input:checked').prop('checked', false);
        $('#taNonTrivialOperTitle').val('');
    }
});

$('#selKindOfAnesth').on('input', () => {
            if (+$('#selKindOfAnesth option:selected').val() === 3) {
                objPatient.pkIsSpinalAnesth = true;
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
                objPatient.pkDateOfOper !== '' ? $('#inpDate_0, #inpDate_1').val(objPatient.pkDateOfOper) : $('#inpDate_0, #inpDate_1').val(formatDate());
                objPatient.pkDateOfOper !== '' ? $('#inpDate_0, #inpDate_1').val(objPatient.pkDateOfOper) : $('#inpDate_0, #inpDate_1').val(formatDate());

            } else {
                $('#dialog_0').remove();
            };
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
            ($(this).is(':checked')) ? $('#divSmallOrLargeOper').show(): ($('#divSmallOrLargeOper, .lblTimeOfSurg').hide(), $('#taNonTrivialOperTitle').val(''), $('#divSmallOrLargeOper input:checked').prop('checked', false));
            // $('#divSmallOrLargeOper input:checked').prop('checked', false), $('#divChooseKindOfOper').show());
        });
        // $('#chkCreateKindOfOper').on('click', function () {
        //     ($(this).is(':checked')) ? ($('#divSmallOrLargeOper').show(), $('#divChooseKindOfOper').hide(),
        //         $('.btnObsGynOper').show()) : ($('#divSmallOrLargeOper, .lblTimeOfSurg').hide(),
        //         $('.btnObsGynOper, #divChooseKindOfOper').show(), $('#taNonTrivialOperTitle').val(''), $('#divSmallOrLargeOper input:checked').prop('checked', false));
        //     // $('#divSmallOrLargeOper input:checked').prop('checked', false), $('#divChooseKindOfOper').show());
        // });

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
            (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        $('#btnOperToday').on('click', function () {
            $('#inpDateOfOper').hide();
            objPatient.pkDateOfOper = formatDate();
            (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        $('#btnOperTomorrow').on('click', function () {
            let vTomorrow = addDays(new Date(), 1);
            $('#inpDateOfOper').hide();
            objPatient.pkDateOfOper = (`${vTomorrow.getFullYear()}-${('0' + (vTomorrow.getMonth() + 1)).slice(-2)}-${('0' + vTomorrow.getDate()).slice(-2)}`);
            (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        $('#btnOperSomeDate').on('click', function () {
            $('#inpDateOfOper').show().val('');
        });

        $('#inpDateOfOper').on('change', function () {
            objPatient.pkDateOfOper = $(this).val();
            (objPatient.pkDateOfOper !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        $('#weight').on('change', () => {
            ($('#weight').prop('value') < 50 || $('#weight').prop('value') > 120) ? alert(`Вес пациента действительно ${$('#weight').prop('value')} кг?`): '';
            (getCurrentAge(objPatient.pkBirthDateOfPatient) < 18 || getCurrentAge(objPatient.pkBirthDateOfPatient) > 100) ?
            alert(`Возраст пациента действительно ${getCurrentAge(objPatient.pkBirthDateOfPatient)} лет?`): '';
        });

        $('#height').on('change', () => {
            ($('#height').prop('value') < 150 || $('#height').prop('value') > 190) ? alert(`Рост пациента действительно ${$('#height').prop('value')} см?`): '';
            (getCurrentAge(objPatient.pkBirthDateOfPatient) < 18 || getCurrentAge(objPatient.pkBirthDateOfPatient) > 100) ?
            alert(`Возраст пациента действительно ${getCurrentAge(objPatient.pkBirthDateOfPatient)} лет?`): '';
        });

        function showBtnGoToRF() {

            objPatient.pkAge = getCurrentAge(objPatient.pkBirthDateOfPatient);
            objPatient.pkAge !== 0 && $('#weight').val().length > 0 && $('#height').val().length > 0 && $('#slctMedicalProfileOfPatient option:selected').is(':checked') ? $('#btnOne').show() : $('#btnOne').hide();
        }

        $('#slctMedicalProfileOfPatient option').bind('click', showBtnGoToRF); $('#age, #weight, #height, #dateOfBirth').bind('input', showBtnGoToRF);

        $('#btnOne').bind('click', goToRF);

        $('#slctMedicalProfileOfPatient').click(function () {
            (objPatient.pkValuesMedPfofile.includes(10) && $('input[name=rdoObstOrGynProfile]:checked').val() === undefined) ? $('#btnOne').prop('disabled', true): $('#btnOne').prop('disabled', false);
        });

        $('input[name=rdoObstOrGynProfile]').click(function () {
            ($(this).val() == 1) ? ($('#btnOne').prop('disabled', false), $('#inpWeekOfPregnancy').val(''), objPatient.pkWeekOfPregnancy = 0) : ($('#btnOne').prop('disabled', true), $('#diobjPatient.pkDateOfChildbirth').hide(), $('#inpDateOfChildbirth').val(''), objPatient.pkDateOfChildbirth = '');
        });

        $('input[name=rdoPregnancyOrChildbirth]').click(function () {
            ($(this).val() == 0) ? ($('#inpWeekOfPregnancy').show(), $('#diobjPatient.pkDateOfChildbirth').hide(), $('#inpDateOfChildbirth').val(''), objPatient.pkDateOfChildbirth = '') : ($('#inpWeekOfPregnancy').hide(), objPatient.pkWeekOfPregnancy = 0, $('#diobjPatient.pkDateOfChildbirth').show());
            ($(this).val() == 1) ? ($('#inpWeekOfPregnancy').val(''), objPatient.pkWeekOfPregnancy = 0, $('#inpWeekOfPregnancy').hide(), $('#btnOne').prop('disabled', false), $('#divDateOfChildbirth').show()) : (objPatient.pkDateOfChildbirth != '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
            ($(this).val() == 0) ? ($('#inpWeekOfPregnancy').show(), $('#divDateOfChildbirth').hide()) : (objPatient.pkWeekOfPregnancy !== 0) ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        $('#inpWeekOfPregnancy').on('input', function () {
            objPatient.pkWeekOfPregnancy = Number($(this).val());
            (objPatient.pkWeekOfPregnancy !== 0) ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        $('#btnChildbirthYesterday').on('click', function () {
            let vYesterday = addDays(new Date(), -1);
            $('#inpDateOfChildbirth').hide();
            objPatient.pkDateOfChildbirth = (`${vYesterday.getFullYear()}-${('0' + (vYesterday.getMonth() + 1)).slice(-2)}-${('0' + vYesterday.getDate()).slice(-2)}`);
            (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        $('#btnChildbirthToday').on('click', function () {
            $('#inpDateOfChildbirth').hide();
            objPatient.pkDateOfChildbirth = formatDate();
            (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        $('#btnChildbirthSomeDate').on('click', function () {
            $('#inpDateOfChildbirth').show().val('');
        });

        $('#inpDateOfChildbirth').on('change', function () {
            objPatient.pkDateOfChildbirth = $(this).val();
            (objPatient.pkDateOfChildbirth !== '') ? $('#btnOne').prop('disabled', false): $('#btnOne').prop('disabled', true);
        });

        function goToRF() {
            ($('#chkMale').is(':checked')) ? objPatient.pkGender = 1: '';
            objPatient.pkWeight = Number($('#weight').val());
            objPatient.pkHeight = Number($('#height').val());
            objPatient.pkIsSpinalAnesth ? (objPatient.pkStandDateITCath = $('#inpDate_0').val(), objPatient.pkRemoveDateITCath = $('#inpDate_1').val()) : '';
            function searchBMI(w, h) {
                return (Math.ceil(w / (Math.pow((h / 100), 2))));
            }
            objPatient.pkBMI = searchBMI($('#weight').val(), $('#height').val());
            objPatient.pkValuesMedPfofile = [];
            $('#slctMedicalProfileOfPatient option:selected').each(function (i, el) {
                objPatient.pkValuesMedPfofile.push(+$(this).prop('value'));
            });
            let isElem = false;

            function isSurgProfiles() {
                $.each(objPatient.pkValuesMedPfofile, function (index, value) {
                    if (value > 2 && value < 10) isElem = true;
                });
                return isElem;
            }
            objPatient.pkAllSurgProfiles = isSurgProfiles();

            $('#chkIsOrNoSurg').is(':checked') ? objPatient.pkIsOrNoSurg = true : '';

            if (objPatient.pkIsOrNoSurg) {
                ($('.divGenSurgOper select').prop('selectedIndex') == 4 || $('.divTraumOrthOper select').prop('selectedIndex') == 9 || $('.divNeurosurgOper select').prop('selectedIndex') == 0 || $('.divUrolOper select').prop('selectedIndex') == 0 || $('.divUrolOper select').prop('selectedIndex') == 1) ? objPatient.pkPullOfSurg = true: '';
            }

            ($('.divTraumOrthOper select').prop('selectedIndex') == 6 || $('.divTraumOrthOper select').prop('selectedIndex') == 7) ? ($('#chkArtroplasty').prop('checked', true), objPatient.pkArtroplasty = true) : '';

            ($('.divTraumOrthOper select').prop('selectedIndex') == 6) ? ($('#chkArtroplasty').prop('checked', true), objPatient.pkArtroplastyHipJoint = true) : '';
            ($('.divTraumOrthOper select').prop('selectedIndex') == 7) ? ($('#chkArtroplasty').prop('checked', true), objPatient.pkArtroplastyKneeJoint = true) : '';

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
                objPatient.pkAllChoosedOperations.push($('#divChooseKindOfOper option:selected')[el].innerText);
            });

            $('#taNonTrivialOperTitle').val() ? objPatient.pkAllChoosedOperations.push(` ${$('#taNonTrivialOperTitle').val()}`) : '';


            function getMaxOfArray(numArray) {
                return Math.max.apply(null, numArray);
            }

            $('input[name=rdoSmallOrLargeOper]:checked').val() !== undefined ? pkOperDifficultyGrades.push(Number($('input[name=rdoSmallOrLargeOper]:checked').val())) : '';

            objPatient.pkGradeOfOper = getMaxOfArray(pkOperDifficultyGrades.map(Number));

            $('#chkCalculateRiskOfBleeding').is(':checked') ? objPatient.pkCalculateRiskOfBleeding = true : '';
            $('input[name=rdoPregnancyOrChildbirth]:checked').val() != undefined ? objPatient.pkPregnancyOrChildbirth = $('input[name=rdoPregnancyOrChildbirth]:checked').val() : '';

            ($('#chkTimeOfSurg').is(':checked')) ? objPatient.pkOperTimeMore60 = true: '';

            let serialObj = JSON.stringify(objPatient);
            localStorage.setItem('Patient', serialObj);
            serialObj = JSON.stringify(objSelectedOper);
            localStorage.setItem('SelectedOper', serialObj);
            // let returnObj = JSON.parse(localStorage.getItem('Patient'))
            // console.log(returnObj);
            $(location).attr('href', '/vte_patient_list_rf');
        }