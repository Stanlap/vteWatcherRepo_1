$(document).ready(function () {
    let aLineOfFuncs = [askAssignSheet, askAgreement, askPrintAndSave],
        vPersonality = confirm('Вы укажете ФИО, № палаты, № истории б-ни пациента?') ? aLineOfFuncs.unshift(askPersonDates) : '',
        oPat = JSON.parse(localStorage.getItem('Patient')),
        oUsr = JSON.parse(localStorage.getItem('User'));
    localStorage.removeItem('Patient');
    console.log(oPat, oUsr);
    let vAgreement = '',
        vTblAssignSheet = '';
    oPat.pkIsOrNoSurg ? (
        relDayOfManipul = 1 + Math.round(diffDates(new Date(oPat.pkDateOfOper), new Date(oPat.pkStartDateOfVTEProphyl))),
        oPat.aOrdersContainer.push(['компрессионный трикотаж на ноги', [relDayOfManipul, 1 + relDayOfManipul, 2 + relDayOfManipul]]),
        oPat.aOrdersContainer.push(['активизация пациента', [1 + relDayOfManipul, 2 + relDayOfManipul, 3 + relDayOfManipul]])
    ) : '';
    console.log(oPat.aOrdersContainer);
    let aVTEPrPlan = [];
    $(oPat.aOrdersContainer).each((ind, el) => aVTEPrPlan.push(' ' + el[0]));

    $('<div/>').prop({
            id: 'invitToAct_1',
            class: 'invits'
        })
        .html('')
        .appendTo('#dialogMain');
    $('<div/>').prop({
        id: 'dialog_0',
        class: 'dialogs'
    }).appendTo('#dialogMain');
    $('<br>').prop({}).appendTo('#dialogMain');
    $('<input/>').prop({
        id: 'btnOne',
        type: 'button',
        value: 'OK'
    }).appendTo('#dialogMain');

    clearValues();
    executeFuncsLine();


    function clearValues() {
        $('.invits').html('');
        $('.dialogs').hide();
        $('#btnOne').off('click');
    }

    function executeFuncsLine() {
        aLineOfFuncs.length > 0 ? (aLineOfFuncs[0](), aLineOfFuncs.shift()) : '';
    }

    function askAssignSheet() {
        console.log('askAssignSheet');
        $('#invitToAct_1').html('Проверьте лист назначений:');
        $('#dialog_0').show();
        $('<table/>').prop({
                id: 'tblAssignSheet',
            })
            .appendTo('#dialog_0');

        $('<caption/>').prop({
                id: 'tblAssignSheet'
            })
            .html(`${oUsr.org} ${oUsr.depart}`)
            .appendTo('#tblAssignSheet');

        $('<tbody/>')
            .html(`<tr><th colspan="5" contenteditable>Мед. карта: ${oPat.pkMedCard}</th><th colspan="13" contenteditable>Пациент: ${oPat.pkName}</th><th colspan="3" contenteditable>Палата: ${oPat.pkRoom}</th></tr><tr id="trDocTitle"><td id="tdDocTitle" colspan="21">Лист врачебных назначений профилактики ВТЭО</td></tr>`)
            .appendTo('#tblAssignSheet');

        let tArD = [],
            tArMY = [],
            vCnt = 0,
            vCnt_1 = 0,
            aTCont_1 = [],
            aTCont_3 = [];

        while (vCnt_1 < 14) {
            aTCont_1.push('<td></td>');
            aTCont_3.push('<td class="tdPhysitian"></td>');
            vCnt_1++;
        };

        for (let i = 0; i < 14; i++) {
            tArD.push(`<td>${(addDays('2020-04-16', i)).getDate()}</td>`);
            tArMY.push(`<td>${1 + (addDays('2020-04-16', i)).getMonth()}/${(addDays('2020-04-16', i)).getFullYear().toString().slice(2)}</td>`);
        };
        $('#tblAssignSheet > tbody:last-child').append(`<tr class="trDates"><td id="tdSignTitle" colspan="6" rowspan="2">Назначения:</td><td colspan="1">м./г.</td>${tArMY.join('')}</tr><tr class="trSignature"></td><td colspan="1">День</td>${tArD.join('')}</tr>`);

        $(oPat.aOrdersContainer).each((ind, el) => {
            el[1] = el[1].filter(item => item < 14);
            let aTCont_2 = [...aTCont_3];

            $(el[1]).each((ind1, el1) => {
                el1 = el1 + oPat.pkDaysSincePrevAnalysisToStartVTEProph;
                aTCont_2[el1] = `<td class="tdPhysitian">${oUsr.signature}</td>`;
            });
            $('#tblAssignSheet > tbody:last-child').append(`<tr class="trSignature"><td colspan="6" rowspan="2" contenteditable>${el[0]}</td><td colspan="1">врач</td>${aTCont_2.join('')}</tr><tr class="trSignature"></td><td colspan="1">сест.</td>${aTCont_1.join('')}</tr>`);
            vCnt++;
        });

        while (vCnt < 20) {
            $('#tblAssignSheet > tbody:last-child').append(`<tr class="trSignature"><td colspan="6" rowspan="2" contenteditable></td><td colspan="1">врач</td>${aTCont_3.join()}</tr><tr class="trSignature"></td><td colspan="1">сест.</td>${aTCont_1.join()}</tr>`);
            vCnt++;
        }

        $('.tdPhysitian').dblclick(function () {
            $(this).html() === '' ? $(this).html(oUsr.signature) : $(this).html('');
        });
        $('#btnOne').on('click', defineAssignSheet);
    }

    function defineAssignSheet() {
        console.log('defineAssignSheet');
        $('a, p, footer, input, #invitToAct_1').hide();
        // vTblAssignSheet = $('body').html();
        vTblAssignSheet = printDoc($('body').html(), 1);
        $('a, p, footer, input, #invitToAct_1').show();
        $('#dialog_0').empty();
        clearValues();
        executeFuncsLine();
    }

    function askAgreement() {
        console.log('askAgreement');
        $('#invitToAct_1').html('Проверьте текст согласия на профилактику ВТЭО:');
        $('#dialog_0').show();
        $('<textarea/>').prop({
            contenteditable: true,
            id: 'taDialog_0'
        }).html(fillAgreement()).appendTo('#dialog_0');
        $('#btnOne').on('click', defineAgreement);
    }

    function defineAgreement() {
        console.log('askAgreement');
        vAgreement = $('#taDialog_0').html();
        // printDoc(vAgreement);
        $('#dialog_0').empty();
        clearValues();
        executeFuncsLine();
    }

    function askPersonDates() {
        console.log('askPersonDates');
        $('#invitToAct_1').html('Введите данные пациента:');
        $('#dialog_0').show();
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
                placeholder: 'Номер палаты',
                autocomplete: 'off'
            })
            .appendTo('#dialog_0');
        $('<br>').prop({}).appendTo('#dialog_0');
        $('<input/>').prop({
                id: 'inpText_2',
                type: 'number',
                placeholder: 'Номер мед. карты',
                autocomplete: 'off'
            })
            .appendTo('#dialog_0');
        $('#btnOne').on('click', definePersonDates);
    }

    function definePersonDates() {
        console.log('definePersonDates');
        oPat.pkName = $('#inpText_0').val();
        oPat.pkRoom = $('#inpText_1').val();
        oPat.pkMedCard = $('#inpText_2').val();
        $('#dialog_0').empty();
        clearValues();
        executeFuncsLine();
    }

    function fillAgreement() {
        return `        СОГЛАСИЕ ПАЦИЕНТА НА ПРЕДЛОЖЕННЫЙ ПЛАН
        ПРОФИЛАКТИКИ ТРОМБОЭМБОЛИИ ЛЕГОЧНОЙ АРТЕРИИ
        Приложение к медицинской карте N ${oPat.pkMedCard ? oPat.pkMedCard: '_______'}
        Я,
        ${oPat.pkName ? oPat.pkName : '________________________________________________________'}
        получил  разъяснения  по  поводу  необходимости  профилактики тромбоэмболии
        легочной  артерии,  информацию  об  особенностях,  длительности  течения  и
        прогнозе этого осложнения в послеоперационном периоде. ${oPat.pkGeneralListOfRF !== 'отсутствуют' ? 'У меня имеются риск-факторы развития ВТЭО: ' + oPat.pkGeneralListOfRF + '.': ''} ${oPat.pkAllChoosedOperations.length > 0 ? 'Мне предстоит оперативное вмешательство: ' + oPat.pkAllChoosedOperations + '.': ''} ${oPat.pkIsCentrAVAccess && !oPat.pkHasCentrAVAccess ? 'Мне планируется установка центрального венозного (артериального) катетера.': ''} ${oPat.pkIsSpinalAnesth ? 'Оперативное вмешательство будет выполнено под с/м анестезией.': ''} ${aVTEPrPlan.length > 0 ? `Краткий план назначенной мне профилактики ВТЭО: ${aVTEPrPlan}.`: ''}
        ${oPat.pkStartDateOfVTEProphyl ? 'Начало профилактики ВТЭО: ' + convertDateToRuFormat(new Date(oPat.pkStartDateOfVTEProphyl)) + ' г.': ''} 
        Мне даны полные разъяснения о ее целях и продолжительности, возможных неблагоприятных эффектах лекарственных средств, а также о том, что предстоит мне делать в случае их возникновения.
        Я извещен о необходимости соблюдать режим в ходе профилактики, немедленно сообщать врачу о любом ухудшении самочувствия.
        Я извещен, что несоблюдение рекомендаций врача может осложнить лечение и отрицательно сказаться на состоянии здоровья.
        Я извещен о возможном течении заболевания при отказе от профилактики тромбоэмболии легочной артерии.
        Я имел возможность задать любые интересующие меня вопросы, касающиеся состояния моего здоровья, профилактики тромбоэмболии легочной артерии, получил на них удовлетворяющие меня ответы.
        Я получил информацию об альтернативных методах профилактики, а также об их примерной стоимости.
        Беседу провел врач ${oUsr.surnameAndInitials} (_______________)      ${convertDateToRuFormat(new Date())} г.
        Пациент ${oPat.pkName ? oPat.pkName: '__________________________________'} (_______________)      ${convertDateToRuFormat(new Date())} г.`;
    }


    function printDoc(item_1, pr = 0) {
        nick = 0;
        $('<iframe/>').prop({
            id: 'if_1',
            hidden: true
        }).appendTo('body');
        let vDoc = $('#if_1')[0].contentDocument || $('#if_1')[0].contentWindow.document,
        vWin = $('#if_1')[0].contentWindow || $('#if_1')[0];
        vDoc.getElementsByTagName('body')[0].innerHTML = item_1;
        pr === 0  ? vWin.print(): '';
        return vWin;
    }


    function askPrintAndSave() {
        console.log('askPrintAndSave');
        $('#invitToAct_1').html('Дальнейшие действия с документами:');
        $('#dialog_0').show();
        $('<label/>').attr({
            for: 'chkB_0'
        }).html('Распечатать').appendTo('#dialog_0');
        $('<input/>').prop({
            id: 'chkB_0',
            type: 'checkbox',
            checked: 'checked'
        }).appendTo('#dialog_0');
        $('<br>').appendTo('#dialog_0');
        $('<label/>').attr({
            for: 'chkB_1'
        }).html('Сохранить').appendTo('#dialog_0');
        $('<input/>').prop({
            id: 'chkB_1',
            type: 'checkbox'
        }).appendTo('#dialog_0');
        $('#btnOne').on('click', definePrintAndSave);
    }

    function definePrintAndSave() {
        console.log('definePrintAndSave');
      $('#chkB_0').prop('checked') ? (vTblAssignSheet.print(), printDoc(vAgreement)): '';
      $('#if_1').remove();  
      $('#chkB_1').prop('checked') ? '': ''; 
      $('#dialog_0').empty();
        clearValues();
        executeFuncsLine();

    }
    // $('<div/>').prop({
    //     id: 'to_print',
    // })
    // .html('Probe to print')
    // .appendTo('#dialogMain');


    //     let html_to_print=vAgreement
    // let iframe=$('<iframe id="if_1">'); // создаем iframe в переменную
    // $('body').append(iframe); //добавляем эту переменную с iframe в наш body (в самый конец)
    // let doc = $('#if_1')[0].contentDocument || $('#if_1')[0].contentWindow.document;
    // let win = $('#if_1')[0].contentWindow || $('#if_1')[0];
    // doc.getElementsByTagName('body')[0].innerHTML=html_to_print;
    // win.print();

    // $('iframe').remove();





    if (window.webkitRequestFileSystem) {
        console.log("fileSystem api  поддерживается!");
    } else {
        console.log("fileSystem api не поддерживается!");

        function error(err) {
            console.log(err);
        }

        function success(file) {
            var fileSystem = file.root.createReader();
            fileSystem.readEntries(function (results) {
                console.log(results);
            });

        }

        window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024, success, error);
        var fileSystem = file.root.createReader();

        function createFile(name, content, type) {
            window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024, function (file) {
                var strblob = new Blob([content], {
                    type: type
                });
                file.root.getFile(name, {
                    create: true
                }, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.write(strblob);
                        console.log(fileEntry.toURL());
                    }, error);
                }, error);
            }, error);
        }

        createFile("test.html", "<h1>Секретная страница fileSystem api! Тссс...</h1>", "text/html");
    }
});