$(document).ready(function () {
    let oPat = JSON.parse(localStorage.getItem('Patient')),
        vTakesVTEProph = confirm('Если пациент уже получает антикоагулянтную терапию, нажмите "OK"'),
        aPairs = [],
        oDrugsPairs = {},
        aChoosedMedicines = [],
        oChoosDrug_2 = {},
        aLineOfFuncs = [];

    localStorage.removeItem('Patient');

    $('<div/>').attr({
            id: 'invitToAct_1',
            class: 'invits'
        })
        .html('')
        .appendTo('#dialogMain');
    $('<div/>').attr({
        id: 'dialog_0'
    }).appendTo('#dialogMain');
    $('<div/>').attr({
        id: 'dialog_1',
        class: 'dialogs'
    }).appendTo('#dialogMain');
    $('<select/>').attr({
            id: 'select_1',
            value: '',
            class: 'selects'
        })
        .appendTo('#dialog_1');
    $('<div/>').attr({
        id: 'dialog_2',
        class: 'dialogs'
    }).appendTo('#dialogMain');
    $('<div/>').attr({
            id: 'invitToAct_2',
            class: 'invits'
        })
        .appendTo('#dialog_2');
    $('<select/>').attr({
            id: 'select_2',
            value: '',
            class: 'selects'
        })
        .appendTo('#dialog_2');
    $('<div/>').attr({
        id: 'dialog_3',
        class: 'dialogs'
    }).appendTo('#dialogMain');
    $('<div/>').attr({
            id: 'invitToAct_3',
            class: 'invits'
        })
        .appendTo('#dialog_3');
    $('<select/>').attr({
            id: 'select_3',
            value: '',
            class: 'selects'
        })
        .appendTo('#dialog_3');
        $('<div/>').attr({
            id: 'dialog_4',
            class: 'dialogs'
        }).appendTo('#dialogMain');
        $('<input/>').attr({
            id: 'inpDate',
            type: 'date',
            value: formatDate()
        })
        .appendTo('#dialog_4');
    $('<br>').attr({}).appendTo('#dialogMain');
    $('<input/>').attr({
            id: 'btnOne',
            type: 'button',
            value: 'OK'
        })
        .appendTo('#dialogMain');

    oPat.pkIsOrNoSurg ? oPat.pkstartDateOfVTEProphyl = oPat.pkDateOfOper : oPat.pkstartDateOfVTEProphyl = formatDate();
    console.log(oPat.pkstartDateOfVTEProphyl);

    oPat.pkRiskVTE === 1 ? delete oDrugsList['Bemiparinum natrium'].drugs['Zibor 3500'] : oPat.pkRiskVTE === 2 ? delete oDrugsList['Bemiparinum natrium'].drugs['Zibor 2500'] : '';

    prepareToStart();

    function getArrPairs(vArr, ) {
        return Object.keys(vArr).map(function (index) {
            return vArr[index].pair;
        });
    }

    function getObjFromArrPairs(vArrP) {
        let vObjP = {};
        $(vArrP).each(function (index) {
            vObjP[Object.keys(vArrP[index])] = Object.values(vArrP[index])[0];
        });
        return vObjP;
    }

    function checkConditions(oP) {
        oPat.pkDateOfChildbirth === formatDate() ? delete oP['Heparin sodium'] : '';
        if (oPat.pkAge < 18) {
            with(oP) {
                delete Apixaban;
                delete Rivaroxaban;
            }
            delete oP['Enoxaparin sodium'];
            delete oP['Nadroparin calcium'];
            delete oP['Bemiparinum natrium'];
            delete oP['Dabigatran etexilate'];
            delete oP['Acetylsalicylic acid'];
        };
        (oPat.pkAge > 60) ? delete oP.Warfarin: '';
        if (oPat.pkSevereHepaticFailure) {
            with(oP) {
                delete Rivaroxaban;
                delete Apixaban;
                delete Warfarin;
            }
            delete oP['Heparin sodium'];
            delete oP['Dabigatran etexilate'];
            delete oP['Acetylsalicylic acid'];
        };
        (oPat.pkHeartInsuff3_4 || oPat.pkActiveUlcerOfStomachOrDuodenum) ? delete oP['Acetylsalicylic acid']: '';
        oPat.pkUncontrolledSystemicHypertension ? delete oP['Heparin sodium'] : '';
        (oPat.pkIsOrNoSurg && oPat.pkPullOfSurg) ? delete oP['Heparin sodium']: '';
        oPat.pkSevereHepaticFailure ? delete oP['Bemiparinum natrium'] : '';
        (oPat.pkCC < 15 || oPat.pkChronicDialysis) ? (delete oP.Rivaroxaban, delete oP.Edoxaban) : '';
        (oPat.pkCC < 30 || oPat.pkChronicDialysis) ? (delete oP['Acetylsalicylic acid'], delete oP['Dabigatran etexilate'], delete oP['Fondaparinux sodium'], delete oP.Warfarin) : '';

        oPat.pkWeekOfPregnancy > 0 ? (delete oP['Heparin sodium'], delete oP.Rivaroxaban, delete oP.Apixaban) : '';
        (oPat.pkWeekOfPregnancy > 0 && oPat.pkArtificialHeartValve) ? delete oP['Enoxaparin sodium']: '';

        (oPat.pkWeekOfPregnancy < 13 || oPat.pkWeekOfPregnancy > 28) && oPat.pkWeekOfPregnancy !== 0 ? delete oP['Acetylsalicylic acid'] : '';
        oPat.pkWeekOfPregnancy > 36 ? delete oP.Warfarin : '';

        if (oPat.vGender == 0 && oPat.pkAge < 45 && oPat.pkWeekOfPregnancy == 0) {
            let vAns = confirm('Если пациентка кормит грудью, следует отменить грудное вскармливание. Ваше решение?');
            if (vAns == false) {
                with(oP) {
                    delete Apixaban;
                    delete Rivaroxaban;
                    delete Warfarin;
                }
                delete oP['Acetylsalicylic acid'];
                delete oP['Dabigatran etexilate'];
                delete oP['Heparin sodium'];
            }
        };
        return oP;
    };

    function clearValues() {
        $('.invits').html('');
        $('.dialogs').hide();
        $('#inpDate').val(formatDate());
        $('.selects').off('input').empty();
        $('#btnOne, #btnTwo').off('click');
    }

    function executeFuncsLine() {
        aLineOfFuncs.length > 0 ? (aLineOfFuncs[0](), aLineOfFuncs.shift()) : '';
    }

    function prepareToStart() {
        oDrugsPairs = checkConditions(getObjFromArrPairs(getArrPairs(oDrugsList)));
        aLineOfFuncs.push(askGroupOfMedicine, askNameOfMedicine, askOfficDoseOfMedicine);
        vTakesVTEProph ? aLineOfFuncs.push(askHadTakenSingleDoseOfMedicine) : '';
        aLineOfFuncs.push(askAnotherDrug);
        clearValues();
        executeFuncsLine();
    }

    function askGroupOfMedicine() {
        console.log('askGroupOfMedicine');
        $('#invitToAct_1').html('Выберите лек. группу препарата:');
        $('#dialog_1').show();
        $.each(oDrugsPairs, function (key, value) {
            $('#select_1').append('<option value="' + value + '">' + value + '</option>');
        });
        $('#btnOne').on('click', defineGroupOfMedicine);
        $('#select_1').on('input', tryChooseDrugGroup);
    }

    function defineGroupOfMedicine() {
        oChoosDrug.titleGroupCyr = $('#select_1').val();
        $.each(oDrugsPairs, function (index, value) {
            value === oChoosDrug.titleGroupCyr ? oChoosDrug.titleGroupLat = index : '';
        });
        console.log(oChoosDrug.titleGroupCyr, oChoosDrug.titleGroupLat);
        clearValues();
        executeFuncsLine();
    }

    let tCtr = [0, 0, 0, 0];
    function tryChooseDrugGroup() {
        let vDec = false;
        console.log('tryChooseDrugGroup');
        if (!oPat.pkIsOrNoSurg && oPat.pkPullOfSurg && $('#select_1').val() === 'Гепарин натрия' && tCtr[0] === 0) {
            vDec = confirm('Гепарин противопоказан при офтальмологических операциях. Отказаться от данного препарата?');
            vDec ? ($('#select_1 :selected').remove()) : tCtr[0] = 1;
        };
        if ($('#select_1').val() === 'Гепарин натрия' && oPat.pkDiabetes && tCtr[1] === 0) {
            vDec = confirm('Гепарин противопоказан при наличии диабетической ретинопатии. Отказаться от данного препарата?');
            vDec ? ($('#select_1 :selected').remove()) : tCtr[1] = 0;
        };
        if ($('#select_1').val() === 'Ацетилсалициловая кислота' && tCtr[2] === 0) {
            vDec = confirm('Ацетилсалициловая кислота противопоказана при приеме с метотрексатом в дозе 15 мг в неделю и более, бронх. астме, индуцированной приемом салицилатов. Отказаться от данного препарата?');
            vDec ? ($('#select_1 :selected').remove()) : tCtr[2] = 1;
        };
        if ($('#select_1').val() === 'Ривароксабан' && tCtr[3] === 0) {
            vDec = confirm('Ривароксабан противопоказан при врожденном дефиците лактозы. Отказаться от данного препарата?');
            vDec ? ($('#select_1 :selected').remove(), $('#select_1').val('')) : tCtr[3] = 1;
        };
    };

    function askNameOfMedicine() {
        console.log('askNameOfMedicine');
        $('#invitToAct_1').text('Выберите препарат по коммерческому названию:');
        $('#dialog_1').show();
        let vPath = '';
        $.each(oDrugsPairs, function (index, value) {
            value === oChoosDrug.titleGroupCyr ? vPath = index : '';
        });
        aPairs = Object.keys(oDrugsList[vPath].drugs).map(function (name) {
            return [oDrugsList[vPath].drugs[name].nameCyr, oDrugsList[vPath].drugs[name].nameLat];
        });
        oDrugsPairs = {};
        aPairs.forEach(item => oDrugsPairs[item[1]] = item[0]);
        $.each(oDrugsPairs, function (key, value) {
            $('#select_1').append('<option value="' + value + '">' + value + '</option>');
        });
        $('#btnOne').on('click', defineNameOfMedicine);
    };

    function defineNameOfMedicine() {
        $.each(oDrugsPairs, function (index, value) {
            value === $('#select_1').val() ? (oChoosDrug.titleDrugLat = index, oChoosDrug.titleDrugCyr = value) : '';
        });
        console.log(oChoosDrug.titleDrugLat, oChoosDrug.titleDrugCyr);
        clearValues();
        executeFuncsLine();
    }

    let vPath_2 = '',
        vPath_3 = '';
    function askOfficDoseOfMedicine() {
        console.log('askOfficDoseOfMedicine');

        let vPath_1 = oDrugsList['Dabigatran etexilate'];
        vPath_2 = oDrugsList[oChoosDrug.titleGroupLat];
        vPath_3 = vPath_2.drugs;

        (oPat.vMedProfile === 2 && (oPat.pkAge > 75 || oPat.pkCC < 51)) ? (vPath_1.singleProphDose = 110, vPath_1.drugs.Pradaxa.officDose = [110]) : '';
        if (oPat.vMedProfile === 4) {
            vPath_1.timesADay = 1;
            oPat.pkAge < 76 ? (vPath_1.singleProphDose = 220, vPath_1.drugs.Pradaxa.officDose = [110]) : '';
        };

        $('#invitToAct_1').text(`Выберите аптечную дозу препарата (${vPath_2.officUnits}):`);
        $('#dialog_1').show();

        $.each(vPath_3[oChoosDrug.titleDrugLat].officDose, function (key, value) {
            $('#select_1').append('<option value="' + value + '">' + value + '</option>');
        });
        if (oChoosDrug.titleGroupLat === 'Acetylsalicylic acid') {
            $('#invitToAct_2').text(`Выберите разовую дозу препарата (${vPath_2.officUnits}):`);
            $('#dialog_2').show();
            $.each([100, 200, 300], function (key, value) {
                $('#select_2').append('<option value="' + key + '">' + value + '</option>');
            });
            $('#select_2').on('input', askAspirineTakingShedule);
        };
        $('#btnOne').on('click', defineOfficDoseOfMedicine);
    };

    function defineOfficDoseOfMedicine() {
        console.log('defineOfficDoseOfMedicine');
        oChoosDrug.officDose = +$('#select_1').val();
        $('#select_2').val() ? oChoosDrug.singleDoseOfAspirin = $('#select_2 :selected').text() : oChoosDrug.singleDoseOfAspirin = '';
        $('#select_3').val() ? oChoosDrug.sheduleAspirinTakingDaily = $('#select_3 :selected').text() : oChoosDrug.sheduleAspirinTakingDaily = '';
        console.log(oChoosDrug.officDose, oChoosDrug.singleDoseOfAspirin, oChoosDrug.sheduleAspirinTakingDaily);
        // let vTGLat = oDrugsList[vOCD.titleGroupLat],
        //     vOfDos = vOCD.officDose,
        //     vOfDosGen = vOCD.officDose,
        console.log(parseFloat($('#select_1').val()));
        makeSignatureOfMedicine(oChoosDrug, oDrugsList[oChoosDrug.titleGroupLat], oChoosDrug.oOfficDose, oChoosDrug.officDose);
        clearValues();
        executeFuncsLine();
    }

    function askAspirineTakingShedule() {
        console.log('askAspirineTakingShedule', $('#select_2').val());
        if (+($('#select_2').val()) === 2) {
            $('#dialog_3').show();
            $('#invitToAct_3').text('Выберите частоту приема препарата:');
            $.each(['ежедневно', 'через день'], function (key, value) {
                $('#select_3').append('<option value="' + key + '">' + value + '</option>');
            });
        }
    }

    function askHadTakenSingleDoseOfMedicine() {
        console.log('askHadTakenSingleDoseOfMedicine');
        $('#invitToAct_1').text(`Укажите разовую дозу препарата, которую уже получает пациент (${vPath_2.officUnits}):`);
        $('<input/>').attr({
            id: 'inpText_1',
            type: 'number',
            value: oChoosDrug.officDose
        }).appendTo('#dialog_0');
        $('#btnOne').on('click', defineRealSingleDoseOfMedicine);
    }

    function defineRealSingleDoseOfMedicine() {
        console.log('defineRealSingleDoseOfMedicine');
        let tRSD = correctEnteredValue($('#inpText_1').val());
        !isFinite(tRSD) || tRSD === 0 ? (alert(`Вы ввели некорректное значение ${$('#inpText_1').val()}`), $('#inpText_1').val('').focus()) : (oChoosDrug.realSingleDose = correctEnteredValue($('#inpText_1').val()), $('#inpText_1').hide(), $('#inpText_1').off('input'), clearValues(), executeFuncsLine());
        $('#inpText_1').remove();
        console.log(oChoosDrug);
    }

    function correctEnteredValue(el) {
        el = +el.replace(/\s+/g, '').replace(",", ".");
        return parseFloat(el.toFixed(1));
    }

    function makeSignatureOfMedicine(vOCD, vTGLat, vOfDos, vOfDosGen) {
        console.log('makeSignatureOfMedicine');
        let vT_3,
            vT_4 = ' mg, ',
            vT_5 = '';

        switch (vOCD.titleGroupLat) {
            case 'Enoxaparin sodium':
                console.log('Enoxaparin sodium');
                vOfDos.Ml = vOfDosGen;
                vOfDos.Mg = vOfDos.Ml * 100;
                vOfDos.aXa = vOfDos.Ml * 10000;
                if (vOfDos.Mg === 30 && oPat.vRiscVTE === 2) {
                    vTGLat.timesADay = 2;
                    vTGLat.singleProphDose = 30;
                }
                (oPat.vRiscVTE === 1 || oPat.pkCC < 30) ? (vTGLat.singleProphDose = 20, oChoosDrug.numberOfOfficDose = 1) : '';
                vT_3 = vOfDos.Mg;
                while (vT_3 < vTGLat.singleProphDose) {
                    vT_3 += vT_3;
                    oChoosDrug.numberOfOfficDose++;
                };
                vT_5 = (vTGLat.singleProphDose / 100) + ' ml, ';
                break;

            case 'Nadroparin calcium':
                console.log('Nadroparin calcium');

                vOfDos.Ml = vOfDosGen;
                vOfDos.aXa = vOfDos.Ml * 9500;
                ((oPat.vMedProfile === 1 || oPat.vMedProfile === 2) && oPat.vWeight > 70) ? vTGLat.singleProphDose = 0.6: '';
                (oPat.vMedProfile === 3) ? vTGLat.singleProphDose = 0.3: '';
                if (oPat.vMedProfile === 4) {
                    oPat.vWeight < 50 ? vTGLat.singleProphDose = 0.2 : oPat.vWeight > 70 ? vTGLat.singleProphDose = 0.4 : vTGLat.singleProphDose = 0.3;
                };
                oPat.pkCC < 30 ? vTGLat.singleProphDose = +(vTGLat.singleProphDose *= 0.75).toFixed(2) : '';

                vI = vOfDos.Ml;
                while (vI < vTGLat.singleProphDose) {
                    vI += vI;
                    oChoosDrug.numberOfOfficDose++;
                }
                vT_5 = vTGLat.singleProphDose + ' ml, ';
                vTGLat.singleProphDose *= 100;
                break;

            case 'Bemiparinum natrium':
                console.log('Bemiparinum natrium');
                vTGLat.singleProphDose = vOfDosGen;
                // oPat.pkRiskVTE === 1 ? vTGLat.singleProphDose = 2500 : '';
                vT_4 = ' ME, ';
                break;

            case 'Heparin sodium':
                console.log('Heparin sodium');
                oPat.vWeight < 50 ? vTGLat.timesADay = 2 : '';
                oPat.vWeight > 150 ? vTGLat.singleProphDose = 6500 : '';
                vOfDos.ME = vOfDosGen;
                vOfDos.Ml = vOfDos.ME / 1000;
                oChoosDrug.numberOfOfficDose = (vTGLat.singleProphDose / 25000).toFixed(1);
                vT_4 = ' ME, ';
                break;

            case 'Fondaparinux sodium':
                console.log('Fondaparinux sodium');
                oPat.pkCC < 50 ? vTGLat.singleProphDose *= 0.6 : '';
                vOfDos.Ml = vOfDosGen;
                vOfDos.Mg = vOfDos.Ml * 5;
                vT_5 = (vTGLat.singleProphDose) + ' ml, ';
                vTGLat.singleProphDose *= 5;
                break;

            case 'Acetylsalicylic acid':
                console.log('Acetylsalicylic acid');
                oChoosDrug.sheduleAspirinTakingDaily === 'через день' ?
                    oChoosDrug.frequencyOfDrugTaking = '2 сут.' : '';
                // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! problem
                // vOfDosGen = oChoosDrug.singleDoseOfAspirin;
                vOfDos.Mg = vOfDosGen;
                vTGLat.singleProphDose = oChoosDrug.singleDoseOfAspirin;
                oChoosDrug.tempCont = (`${(vTGLat.singleProphDose/vOfDosGen).toFixed(1)} ${vTGLat.container},`);
                $('#btnTry').trigger('click').remove();
                oChoosDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDos.Mg).toFixed(1);
                break;

            case 'Dabigatran etexilate':
                console.log('Dabigatran etexilate');

                vOfDos.Mg = vOfDosGen;
                vI = vOfDosGen;
                while (vI < vTGLat.singleProphDose) {
                    vI += vI;
                    oChoosDrug.numberOfOfficDose++;
                }
                break;

            case 'Rivaroxaban':
                console.log('Rivaroxaban');
                (oPat.pkCC > 30 || oPat.pkCC < 51) ? vTGLat.singleProphDose = 15: '';
                vOfDos.Mg = vOfDosGen;
                oChoosDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Apixaban':
                console.log('Apixaban');
                vOfDos.Mg = vOfDosGen;
                oChoosDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Edoxaban':
                console.log('Edoxaban');
                (oPat.pkCC > 15 || oPat.pkCC < 51) ? vTGLat.singleProphDose = 30: '';
                vOfDos.Mg = vOfDosGen;
                oChoosDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Warfarin':
                console.log('Warfarin');
                vOfDos.Mg = vOfDosGen;
                oChoosDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;
        };
        vOCD.singleProphDose = (`${vTGLat.singleProphDose}${vT_4}${vT_5}`);
        vOCD.tempCont = (`${vTGLat.container} ${vOCD.numberOfOfficDose},`);
        let vTimE_S = 'раза';

        (vTGLat.timesADay === 1 || vTGLat.timesADay > 4) ? vTimE_S = 'раз': '';

        let vText_1 = convertObjPairsToString(vOfDos),
            vText_2 = (`${oChoosDrug.tempCont} ${oChoosDrug.singleProphDose}`);
        vOCD.signature = `${vOCD.titleDrugCyr} (${vOCD.titleDrugLat}${vText_1}, ${vTGLat.container} 1) ${vTGLat.delivery}, ${vText_2} ${vTGLat.timesADay} ${vTimE_S}/${oChoosDrug.frequencyOfDrugTaking}`;
        console.log(vOCD);


        aChoosedMedicines.push(oChoosDrug_2);
    }

    function convertObjPairsToString(vObj) {
        let vText = '',
            vPairs = Object.entries(vObj);
        vPairs.forEach(entry => {
            let key = entry[0];
            let value = entry[1];
            vText += (`, ${value} ${key}`);
        });
        return vText;
    }

    function askOfStartDateVTEProphyl() {
        console.log('askOfStartDateVTEProphyl');
        $('#invitToAct').html('Укажите дату начала профилактики ВТЭО:');
        $('#dialog_4').show();
        objPatient.pkIsOrNoSurg ? $('#inpDate').val(objPatient.pkDateOfOper) : $('#inpDate').val(formatDate());
        $('#btnOne').on('click', defineStartDateVTEProphyl);
    }

    function defineStartDateVTEProphyl() {
        oChoosDrug.startDateOfVTEProphyl = $('#inpDate').val();
        clearValues();
        executeFuncsLine();
    }


    function askAnotherDrug() {
        $('#invitToAct_1').html('Выбрать следующий препарат?');
        $('<input/>').attr({
                id: 'btnTwo',
                type: 'button',
                value: 'Exit'
            })
            .appendTo('#dialogMain');

        $('#btnOne').on('click', defineAnotherDrug);
        $('#btnTwo').on('click', goToAssignSheet);
        console.log(aChoosedMedicines);
    }

    function defineAnotherDrug() {
        console.log('defineAnotherDrug');
        $('#btnTwo').remove();
        prepareToStart();
    }

    function defineMinTreatmentPeriod(mP, choosDrug, mTP = 10) {
        switch (choosDrug) {
            case 'Эноксапарин натрия':
                (mP === 1 || mP === 2) ? mTP = 6: (mP === 3 || mP === 4) ? mTP = 7 : '';
                break;
            case 'Надропарин кальция':
                (mP < 4) ? mTP = 7: '';
                break;
            case 'Гепарин натрия':
                mTP = 7;
                break;
            case 'Фондапаринукс натрия':
                (mP === 1 || mP === 2) ? mTP = 6: (mP === 3) ? mTP = 5 : '';
                break;
            case 'Дабигатрана этексилат':
                (mP === 4 && oPat.pkArtroplastyKneeJoint === true) ? mTP = 28: '';
                break;
            case 'Апиксабан':
                (mP === 4 && oPat.pkArtroplastyKneeJoint === true) ? mTP = 32: '';
                break;
            case 'Варфарин':
                mTP = 4;
                break;
        };
        return mTP;
    }

    function goToAssignSheet() {
        let serialObj = JSON.stringify(oPat);
        localStorage.setItem('Patient', serialObj);
        serialObj = JSON.stringify(aChoosedMedicines);
        localStorage.setItem('ChoosedMedicines', serialObj);
        $(location).attr('href', '/vte_assignment_sheet');
    }

});