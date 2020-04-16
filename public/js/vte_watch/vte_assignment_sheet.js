$(document).ready(function () {
    let oPat = JSON.parse(localStorage.getItem('Patient'));
    let oUsr = JSON.parse(localStorage.getItem('User'));
    localStorage.removeItem('Patient');
    console.log(oPat, oUsr);

    oPat.pkIsOrNoSurg ? (
        relDayOfManipul = 1 + Math.round(diffDates(new Date(oPat.pkDateOfOper), new Date(oPat.pkStartDateOfVTEProphyl))),
        oPat.aOrdersContainer.push(['Компрессионный трикотаж на ноги', [relDayOfManipul, 1 + relDayOfManipul, 2 + relDayOfManipul]]),
        oPat.aOrdersContainer.push(['Активизация пациента', [1 + relDayOfManipul, 2 + relDayOfManipul, 3 + relDayOfManipul]])
    ) : '';
    console.log(oPat.aOrdersContainer);
    let aLineOfFuncs = [];

    // $('<div/>').prop({
    //         id: 'invitToAct_1',
    //         class: 'invits'
    //     })
    //     .html('')
    //     .appendTo('#dialogMain');
    // $('<div/>').prop({
    //     id: 'dialog_0'
    // }).appendTo('#dialogMain');
    // $('<br>').prop({}).appendTo('#dialogMain');
    // $('<input/>').prop({
    //         id: 'btnOne',
    //         type: 'button',
    //         value: 'OK'
    //     }).appendTo('#dialogMain');


    $('caption').text(`${oUsr.org}, ${oUsr.depart}`);
    let aTCont_1 = ['<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>'];  
    let tArD = [];
    let tArMY = [];
    for (let i = 0; i < 14; i++) {
        tArD.push(`<td>${(addDays('2020-04-16', i)).getDate()}</td>`);
        tArMY.push(`<td>${1 + (addDays('2020-04-16', i)).getMonth()}/${(addDays('2020-04-16', i)).getFullYear().toString().slice(2)}</td>`);
    };
    $('#tlAssignSheet > tbody:last-child').append(`<tr class="trDates"><td id="tdSignTitle" colspan="6" rowspan="2">Назначения:</td><td colspan="1">м./г.</td>${tArMY.join('')}</tr><tr class="trSignature"></td><td colspan="1">День</td>${tArD.join('')}</tr>`);

console.log(tArMY.join(''));

    let vCnt = 0;
    $(oPat.aOrdersContainer).each((ind, el) => {
        el[1] = el[1].filter(item => item < 14);
        let aTCont_2 = [...aTCont_1];

        $(el[1]).each((ind1, el1) => {
            el1 = el1 + oPat.pkDaysSincePrevAnalysisToStartVTEProph;
            aTCont_2[el1] = `<td>${oUsr.signature}</td>`;
        });
        $('#tlAssignSheet > tbody:last-child').append(`<tr class="trSignature"><td colspan="6" rowspan="2">${el[0]}</td><td colspan="1">врач</td>${aTCont_2.join('')}</tr><tr class="trSignature"></td><td colspan="1">сест.</td>${aTCont_1.join('')}</tr>`);
        vCnt++;
    });

    while (vCnt < 20) {
        $('#tlAssignSheet > tbody:last-child').append(`<tr class="trSignature"><td colspan="6" rowspan="2"></td><td colspan="1">врач</td>${aTCont_1.join()}</tr><tr class="trSignature"></td><td colspan="1">сест.</td>${aTCont_1.join()}</tr>`);
        vCnt++;
    }

    prepareToStart();


    function clearValues() {
        $('.invits').html('');
        $('.dialogs').hide();
        $('#inpDate_4').val(formatDate());
        $('.selects').off('input').empty();
        $('#btnOne, #btnTwo').off('click');
    }

    function executeFuncsLine() {
        aLineOfFuncs.length > 0 ? (aLineOfFuncs[0](), aLineOfFuncs.shift()) : '';
    }

    function prepareToStart() {
        aLineOfFuncs.push();
        clearValues();
        executeFuncsLine();
    }


    function askPersonDates() {
        console.log('askPersonDates');
        $('#invitToAct_1').html('Введите данные пациента (не обязательно):');
        $('<input/>').prop({
                id: 'inpText_0',
                type: 'text',
                placeholder: 'Фамилия, имя, отчество'
            })
            .appendTo('#dialog_0');
        $('<br>').prop({}).appendTo('#dialog_0');
        $('<input/>').prop({
                id: 'inpText_1',
                type: 'number',
                placeholder: 'Номер палаты'
            })
            .appendTo('#dialog_0');
        $('<br>').prop({}).appendTo('#dialog_0');
        $('<input/>').prop({
                id: 'inpText_2',
                type: 'number',
                placeholder: 'Номер мед. карты'
            })
            .appendTo('#dialog_0');
        $('#btnOne').on('click', definePersonDates);
    }

    function definePersonDates() {
        console.log('definePersonDates');
        oPat.pkName = `ФИО: ${$('#inpText_0').val()}`;
        oPat.pkRoom = `Палата №: ${$('#inpText_1').val()}`;
        oPat.pkMedCard = `Мед. карта №: ${$('#inpText_2').val()}`;
        console.log(oPat.pkName, oPat.pkRoom, oPat.pkMedCard);
        $('caption').innerText(`ФИО: ${$('#inpText_0').val()}`);
        $('#dialog_0').empty();
        clearValues();
        executeFuncsLine();


    }


});