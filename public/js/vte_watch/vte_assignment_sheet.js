$(document).ready(function () {
    let aLineOfFuncs = [askAssignSheet],
        vPersonality = confirm('Вы укажете ФИО, № палаты, № истории б-ни пациента?') ? aLineOfFuncs.unshift(askPersonDates) : '',
        oPat = JSON.parse(localStorage.getItem('Patient')),
        oUsr = JSON.parse(localStorage.getItem('User'));
    localStorage.removeItem('Patient');
    console.log(oPat, oUsr);
    let vAgreement = '';

    oPat.pkIsOrNoSurg ? (
        relDayOfManipul = 1 + Math.round(diffDates(new Date(oPat.pkDateOfOper), new Date(oPat.pkStartDateOfVTEProphyl))),
        oPat.aOrdersContainer.push(['Компрессионный трикотаж на ноги', [relDayOfManipul, 1 + relDayOfManipul, 2 + relDayOfManipul]]),
        oPat.aOrdersContainer.push(['Активизация пациента', [1 + relDayOfManipul, 2 + relDayOfManipul, 3 + relDayOfManipul]])
    ) : '';
    console.log(oPat.aOrdersContainer);

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
        $('invitToAct_1').html('Проверьте лист назначений:');
        $('#dialog_0').show();
        $('<table/>').prop({
                id: 'tlAssignSheet',
            })
            .appendTo('#dialog_0');

        $('<caption/>').prop({
                id: 'tlAssignSheet',
            })
            .html(`${oUsr.org} ${oUsr.depart}`)
            .appendTo('#tlAssignSheet');

        $('<tbody/>')
            .html(`<tr><th colspan="5" contenteditable>Мед. карта: ${oPat.pkMedCard}</th><th colspan="13" contenteditable>Пациент: ${oPat.pkName}</th><th colspan="3" contenteditable>Палата: ${oPat.pkRoom}</th></tr><tr id="trDocTitle"><td id="tdDocTitle" colspan="21">Лист врачебных назначений профилактики ВТЭО</td></tr>`)
            .appendTo('#tlAssignSheet');

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
        $('#tlAssignSheet > tbody:last-child').append(`<tr class="trDates"><td id="tdSignTitle" colspan="6" rowspan="2">Назначения:</td><td colspan="1">м./г.</td>${tArMY.join('')}</tr><tr class="trSignature"></td><td colspan="1">День</td>${tArD.join('')}</tr>`);

        console.log(tArMY.join(''));

        $(oPat.aOrdersContainer).each((ind, el) => {
            el[1] = el[1].filter(item => item < 14);
            let aTCont_2 = [...aTCont_3];

            $(el[1]).each((ind1, el1) => {
                el1 = el1 + oPat.pkDaysSincePrevAnalysisToStartVTEProph;
                aTCont_2[el1] = `<td class="tdPhysitian">${oUsr.signature}</td>`;
            });
            $('#tlAssignSheet > tbody:last-child').append(`<tr class="trSignature"><td colspan="6" rowspan="2" contenteditable>${el[0]}</td><td colspan="1">врач</td>${aTCont_2.join('')}</tr><tr class="trSignature"></td><td colspan="1">сест.</td>${aTCont_1.join('')}</tr>`);
            vCnt++;
        });

        while (vCnt < 20) {
            $('#tlAssignSheet > tbody:last-child').append(`<tr class="trSignature"><td colspan="6" rowspan="2" contenteditable></td><td colspan="1">врач</td>${aTCont_3.join()}</tr><tr class="trSignature"></td><td colspan="1">сест.</td>${aTCont_1.join()}</tr>`);
            vCnt++;
        }

        $('.tdPhysitian').dblclick(function () {
            $(this).html() === '' ? $(this).html(oUsr.signature) : $(this).html('');
        });
        $('#btnOne').on('click', defineAssignSheet);

    }

    function defineAssignSheet() {
        console.log('defineAssignSheet');
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
        oPat.pkName = $('#inpText_0').val();
        oPat.pkRoom = $('#inpText_1').val();
        oPat.pkMedCard = $('#inpText_2').val();
        vAgreement = `    СОГЛАСИЕ ПАЦИЕНТА НА ПРЕДЛОЖЕННЫЙ ПЛАН
        ПРОФИЛАКТИКИ ТРОМБОЭМБОЛИИ ЛЕГОЧНОЙ АРТЕРИИ
        Я,
        ${oPat.pkName ? oPat.pkName : '________________________________________________________'}
        (фамилия, имя, отчество)
        получил  разъяснения  по  поводу  необходимости  профилактики тромбоэмболии
        легочной  артерии,  информацию  об  особенностях,  длительности  течения  и
        прогнозе этого осложнения в послеоперационном периоде.
        ${oPat.pkGeneralListOfRF !== 'отсутствуют' ? 'У меня имеются риск-факторы развития ВТЭО: ' + oPat.pkGeneralListOfRF + '.': ''}
        ${oPat.pkAllChoosedOperations.length > 0 ? 'Мне предстоит оперативное вмешательство: ' + oPat.pkAllChoosedOperations + '.': ''} ${oPat.pkIsCentrAVAccess ? 'Мне планируется установка центрального венозного (артериального) катетера.': ''} ${oPat.pkIsSpinalAnesth ? 'Оперативное вмешательство будет выполнено под с/м анестезией.': ''}
        ${oPat.pkStartDateOfVTEProphyl ? 'Начало профилактики ВТЭО: ' + convertDateToRuFormat(new Date(oPat.pkStartDateOfVTEProphyl)) + ' г.': ''}
        Мне даны полные разъяснения о ее целях и продолжительности, возможных неблагоприятных эффектах лекарственных средств, а также о том, что предстоит мне делать в случае их возникновения.
        Я извещен о необходимости соблюдать режим в ходе профилактики, немедленно сообщать врачу о любом ухудшении самочувствия.
        Я извещен, что несоблюдение рекомендаций врача может осложнить лечение и отрицательно сказаться на состоянии здоровья.
        Я извещен о возможном течении заболевания при отказе от профилактики тромбоэмболии легочной артерии.
        Я имел возможность задать любые интересующие меня вопросы, касающиеся состояния моего здоровья, профилактики тромбоэмболии легочной артерии, получил на них удовлетворяющие меня ответы.
        Я получил информацию об альтернативных методах профилактики, а также об их примерной стоимости.
        Беседу провел врач ${oUsr.surnameAndInitials} (_______________)      ${convertDateToRuFormat(new Date())} г.
        Пациент ${oPat.pkName} (_______________)      ${convertDateToRuFormat(new Date())} г.`
        console.log(vAgreement);    
        $('#dialog_0').empty();
        clearValues();
        executeFuncsLine();
    }

    // const convertDateToRuFormat = (date) =>{
    //     let vD = new Date(date);
    //     function getZero(num){
    //         if (num > 0 && num < 10) { 
    //             return '0' + num;
    //         } else {
    //             return num;
    //         }
    //     }
    //     return getZero(vD.getDate()) + '.' + getZero(vD.getMonth() + 1) + '.' + vD.getFullYear()
    // }

    


    // console.log((new Date()).getMonth(),
    // (new Date()).getFullYear(),
    // (new Date()).getDate());

    // const convertDateToRuFormat = (date) =>{
    //     let vD = new Date(date);
    //     function getZero(num){
    //         if (num > 0 && num < 10) { 
    //             return '0' + num;
    //         } else {
    //             return num;
    //         }
    //     }
    //     return getZero(vD.getDate()) + '.' + getZero(vD.getMonth() + 1) + '.' + vD.getFullYear()
    // }

    // console.log(vAgreement);


      if(window.webkitRequestFileSystem){
        console.log("fileSystem api  поддерживается!");
    }else{
        console.log("fileSystem api не поддерживается!");

        function error(err){
            console.log(err);
          }
        
          function success(file){
            var fileSystem = file.root.createReader();
              fileSystem.readEntries (function(results) {
                console.log(results);
            });
        
          }
        
        window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, success, error);
        var fileSystem = file.root.createReader();
        function createFile(name, content, type){
            window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(file){
                    var strblob = new Blob([content], {
                          type: type
                      });
                      file.root.getFile(name, {create: true}, function(fileEntry) {
                            fileEntry.createWriter(function(fileWriter) {
                                fileWriter.write(strblob);
                                console.log(fileEntry.toURL());
                          }, error);
                        },error);
                    }, error);
        }
        
        createFile("test.html", "<h1>Секретная страница fileSystem api! Тссс...</h1>", "text/html");
    }});