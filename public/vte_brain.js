let objRF = {
    vCounterPaduaScore : 0,
    vCounterCHA2DS2_VASс : 0,
    vCounterIMPROVE : 0,
    vCounterHAS_BLED : 0,
    vCounterRusSurgRF : 0,
    vCounterCapriniRF : 0,
    vCounterMajorBleedingScoreRF : 0,
    vSetRusSurgRF : [],
    vSetRusTraumRF : [],
    vCounterRusTraumRF : 0,
    vCounterTraumBleedingRF : 0,
    vCounterGreenTop37a : 0,
    vCounterObstRuRF : 0,
    vCounterObstBleedingRF : 0
};

    module.exports.countKindsRF = () => {

        let i = [], m = 0, tArr;

        rfArr.each(function (el) {
        tArr = $(this).val().split('');
        vCounterPaduaScore += Number(tArr[1]);
        i.push(tArr[2]);
        i.push(tArr[3]);
        i.push(tArr[4]);
        m = Number(i.join(''));
        i = [];
        objRF.vCounterIMPROVE += Number(m);
        objRF.vCounterCHA2DS2_VASс += Number(tArr[5]);
        objRF.vCounterHAS_BLED += Number(tArr[6]);
        objRF.vSetRusSurgRF.push(tArr[7]);
        objRF.vCounterCapriniRF += Number(tArr[8]);
        objRF.vCounterMajorBleedingScoreRF += Number(tArr[9]);
        objRF.vCounterTraumBleedingRF += Number(tArr[10]);
        objRF.vSetRusTraumRF.push(tArr[11]);
        objRF.vCounterGreenTop37a += Number(tArr[12]);
        objRF.vCounterObstBleedingRF += Number(tArr[13]);
        objRF.vCounterObstRuRF += Number(tArr[14]);
    });

    objRF.vSetRusSurgRF = $.distinct(objRF.vSetRusSurgRF);
    objRF.vSetRusTraumRF = $.merge(objRF.objRF.vSetRusTraumRF, objRF.vSetRusSurgRF);
    objRF.vSetRusTraumRF = $.distinct(objRF.objRF.vSetRusTraumRF);

    }


    function estimateSurgRiskGrade(age, time, kindSurg, risk) {
        let i = 0;
        // Базовые условия, которые назначают баллы каждому параметру:
        if (age >= 40 && age <= 60) i++;
        if (age > 60) i += 2;
        if (time == true) i++;
        if (kindSurg >= 1) i++;
        if (risk == true) i++;
        return i;
    }

    let vGradeOfOper = 0;

    if (objPatient.pkIsOrNoSurg) {
        (vGradeOfOper == 3) ? objRF.vCounterRusSurgRF = 3: objRF.vCounterRusSurgRF = estimateSurgRiskGrade(objPatient.pkAge, objPatient.operTimeMore60, vGradeOfOper, objRF.vSetRusSurgRF.includes('1'));
    };

    (objRF.vSetRusSurgRF.indexOf('2') != -1 && objRF.vCounterRusSurgRF < 3) ? objRF.vCounterRusSurgRF = 2: '';
    (objRF.vSetRusSurgRF.indexOf('3') != -1) ? objRF.vCounterRusSurgRF = 3: '';

    if (objPatient.pkIsOrNoSurg) {
        (vGradeOfOper == 3) ? objRF.vCounterCapriniRF += 5: (vGradeOfOper == 1 || vGradeOfOper == 2) ? objRF.vCounterCapriniRF += 2 : objRF.vCounterCapriniRF += 1;
    };

    if (objPatient.pkIsOrNoSurg) {
        (vGradeOfOper == 3) ? objRF.vCounterRusTraumRF = 3: objRF.vCounterRusTraumRF = estimateSurgRiskGrade(objPatient.pkAge, objPatient.operTimeMore60, vGradeOfOper, objRF.vSetRusTraumRF.includes('1'));
    };

    (objRF.vSetRusTraumRF.indexOf('2') != -1 && objRF.vCounterRusTraumRF < 3) ? objRF.vCounterRusTraumRF = 2: '';
    (objRF.vSetRusTraumRF.indexOf('3') != -1) ? objRF.vCounterRusTraumRF = 3: '';

    (objRF.vCounterMajorBleedingScoreRF > 0) ? objRF.vCounterMajorBleedingScoreRF = 1: '';
    (objRF.vCounterTraumBleedingRF > 0) ? objRF.vCounterTraumBleedingRF = 1: '';

    // $('#chkTimeOfSurg').is(':checked') ? objPatient.operTimeMore60 = true:'';
