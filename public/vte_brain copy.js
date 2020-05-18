module.exports.countKindsRF = (tArr, oP) => {
    let oP_2 = JSON.parse(oP);
    let objRF = {},
        tArr_2 = [],
        tArr_3 = [];

    tArr.split(',').forEach(el => tArr_2.push(el.split('')));
    tArr_2.forEach(el => {
        let el_2 = [];
        el.forEach(item => el_2.push(item = +item))
        el = el_2;
        el_2 = [];
        tArr_3.push(el);
    });

    objRF = {
        vCounterPaduaScore: 0,
        vCounterCHA2DS2_VASс: 0,
        vCounterIMPROVE: 0,
        vCounterHAS_BLED: 0,
        vCounterRusSurgRF: 0,
        vCounterCapriniRF: 0,
        vCounterMajorBleedingScoreRF: 0,
        vSetRusSurgRF: [],
        vSetRusTraumRF: [],
        vCounterRusTraumRF: 0,
        vCounterTraumBleedingRF: 0,
        vCounterGreenTop37a: 0,
        vCounterObstRuRF: 0,
        vCounterObstBleedingRF: 0
    };
    let i = [],
        m = 0;
    tArr_2.forEach(el => {
        i.push(el[2]);
        i.push(el[3]);
        i.push(el[4]);
        m = Number(i.join(''));
        i = [];
        objRF.vCounterIMPROVE += Number(m);
    });

    tArr_3.forEach(el => {
        objRF.vCounterPaduaScore += el[1];
        objRF.vCounterCHA2DS2_VASс += el[5];
        objRF.vCounterHAS_BLED += el[6];
        objRF.vSetRusSurgRF.push(el[7]);
        objRF.vCounterCapriniRF += el[8];
        objRF.vCounterMajorBleedingScoreRF += el[9];
        objRF.vCounterTraumBleedingRF += el[10];
        objRF.vSetRusTraumRF.push(el[11]);
        objRF.vCounterGreenTop37a += el[12];
        objRF.vCounterObstBleedingRF += el[13];
        objRF.vCounterObstRuRF += el[14];
    });

    objRF.vSetRusTraumRF.concat(objRF.vSetRusTraumRF, objRF.vSetRusSurgRF);

    objRF.vSetRusSurgRF = objRF.vSetRusSurgRF.filter(function (item, pos) {
        return objRF.vSetRusSurgRF.indexOf(item) == pos;
    });
    objRF.vSetRusTraumRF = objRF.vSetRusTraumRF.filter(function (item, pos) {
        return objRF.vSetRusTraumRF.indexOf(item) == pos;
    });

    function estimateSurgRiskGrade(age, time, kindSurg, risk) {
        let i = 0;
        if (age >= 40 && age <= 60) i++;
        if (age > 60) i += 2;
        if (time == true) i++;
        if (kindSurg >= 1) i++;
        if (risk == true) i++;
        return i;
    }

    if (oP_2.isOrNoSurg) {
        oP_2.gradeOfOper === 1 || oP_2.gradeOfOper === 2 ? objRF.vCounterCapriniRF += 2 : oP_2.gradeOfOper === 3 ? (objRF.vCounterRusSurgRF = 3, objRF.vCounterCapriniRF += 5, objRF.vCounterRusTraumRF = 3) : objRF.vCounterCapriniRF += 1;
        objRF.vCounterRusSurgRF = estimateSurgRiskGrade(oP_2.age, oP_2.operTimeMore60, oP_2.gradeOfOper, objRF.vSetRusSurgRF.includes(1));
        objRF.vCounterRusTraumRF = estimateSurgRiskGrade(oP_2.age, oP_2.operTimeMore60, oP_2.gradeOfOper, objRF.vSetRusTraumRF.includes(1));    
    };

    objRF.vSetRusSurgRF.includes(2) && objRF.vCounterRusSurgRF < 3 ? objRF.vCounterRusSurgRF = 2 : '';
    objRF.vSetRusSurgRF.includes(3) ? objRF.vCounterRusSurgRF = 3 : '';

    objRF.vSetRusTraumRF.indexOf(2) != -1 && objRF.vCounterRusTraumRF < 3 ? objRF.vCounterRusTraumRF = 2: '';
    objRF.vSetRusTraumRF.indexOf(3) != -1 ? objRF.vCounterRusTraumRF = 3 : '';

    objRF.vCounterMajorBleedingScoreRF > 0 ? objRF.vCounterMajorBleedingScoreRF = 1 : '';
    objRF.vCounterTraumBleedingRF > 0 ? objRF.vCounterTraumBleedingRF = 1 : '';

    // if (oP_2.isOrNoSurg) {
    //     oP_2.gradeOfOper === 3 ? objRF.vCounterRusSurgRF = 3 : objRF.vCounterRusSurgRF = estimateSurgRiskGrade(oP_2.age, oP_2.operTimeMore60, oP_2.gradeOfOper, objRF.vSetRusSurgRF.includes(1));

    // };

    // objRF.vSetRusSurgRF.includes(2) && objRF.vCounterRusSurgRF < 3 ? objRF.vCounterRusSurgRF = 2 : '';
    // objRF.vSetRusSurgRF.includes(3) ? objRF.vCounterRusSurgRF = 3 : '';

    // if (oP_2.isOrNoSurg) {
    //     oP_2.gradeOfOper === 3 ? objRF.vCounterCapriniRF += 5 : (oP_2.gradeOfOper === 1 || oP_2.gradeOfOper === 2) ? objRF.vCounterCapriniRF += 2 : objRF.vCounterCapriniRF += 1;
    // };

    // if (oP_2.isOrNoSurg) {
    //     oP_2.gradeOfOper === 3 ? objRF.vCounterRusTraumRF = 3 : objRF.vCounterRusTraumRF = estimateSurgRiskGrade(oP_2.age, oP_2.operTimeMore60, oP_2.gradeOfOper, objRF.vSetRusTraumRF.includes(1));
    // };

    // (objRF.vSetRusTraumRF.indexOf(2) != -1 && objRF.vCounterRusTraumRF < 3) ? objRF.vCounterRusTraumRF = 2: '';
    // (objRF.vSetRusTraumRF.indexOf(3) != -1) ? objRF.vCounterRusTraumRF = 3: '';

    // (objRF.vCounterMajorBleedingScoreRF > 0) ? objRF.vCounterMajorBleedingScoreRF = 1: '';
    // (objRF.vCounterTraumBleedingRF > 0) ? objRF.vCounterTraumBleedingRF = 1: '';
    // console.log(objRF);
    return objRF;
};