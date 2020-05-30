module.exports.countKindsRF = (tArr, oP) => {
    oP = oP.split(',');
    let tArr_2 = [];
tArr.split(',').forEach(el => tArr_2.push(el.split('')));
tArr = [];
tArr_2.forEach(el => {
    let el_2 = [];
    el.forEach(item => el_2.push(item = +item))
    el = el_2;
    el_2 = [];
    tArr.push(el);
});

    oRF = {
        sPadua: 0,
        sCHA2DS2_VASс: 0,
        sIMPROVE: 0,
        sHAS_BLED: 0,
        sRusSurgRF: 0,
        sCaprini: 0,
        sMajorBleed: 0,
        aSetRusSurgRF: [],
        aSetRusTraumRF: [],
        sRusTraumRF: 0,
        sTraumBleed: 0,
        sGreenTop37a: 0,
        sObstRusRF: 0,
        sObstBleed: 0
    };
    let i = [],
        m = 0;
    tArr_2.forEach(el => {
        i.push(el[2]);
        i.push(el[3]);
        i.push(el[4]);
        m = Number(i.join(''));
        i = [];
        oRF.sIMPROVE += Number(m);
    });

    tArr.forEach(el => {
        oRF.sPadua += el[1];
        oRF.sCHA2DS2_VASс += el[5];
        oRF.sHAS_BLED += el[6];
        oRF.aSetRusSurgRF.push(el[7]);
        oRF.sCaprini += el[8];
        oRF.sMajorBleed += el[9];
        oRF.sTraumBleed += el[10];
        oRF.aSetRusTraumRF.push(el[11]);
        oRF.sGreenTop37a += el[12];
        oRF.sObstBleed += el[13];
        oRF.sObstRusRF += el[14];
    });

    oRF.aSetRusTraumRF.concat(oRF.aSetRusTraumRF, oRF.aSetRusSurgRF);

    oRF.aSetRusSurgRF = oRF.aSetRusSurgRF.filter(function (item, pos) {
        return oRF.aSetRusSurgRF.indexOf(item) == pos;
    });
    oRF.aSetRusTraumRF = oRF.aSetRusTraumRF.filter(function (item, pos) {
        return oRF.aSetRusTraumRF.indexOf(item) == pos;
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

    if (oP[1]) {
        +oP[3] === 1 || +oP[3] === 2 ? oRF.sCaprini += 2 : +oP[3] === 3 ? (oRF.sRusSurgRFF = 3, oRF.sCaprini += 5, oRF.sRusTraumRF = 3) : oRF.sCaprini += 1;
        oRF.sRusSurgRFF = estimateSurgRiskGrade(+oP[0], oP[2], +oP[3], oRF.aSetRusSurgRF.includes(1));
        oRF.sRusTraumRF = estimateSurgRiskGrade(+oP[0], oP[2], +oP[3], oRF.aSetRusTraumRF.includes(1));    
    };
console.log(+oP[3], oRF.sCaprini);
    oRF.aSetRusSurgRF.includes(2) && oRF.sRusSurgRFF < 3 ? oRF.sRusSurgRFF = 2 : '';
    oRF.aSetRusSurgRF.includes(3) ? oRF.sRusSurgRFF = 3 : '';

    oRF.aSetRusTraumRF.indexOf(2) != -1 && oRF.sRusTraumRF < 3 ? oRF.sRusTraumRF = 2: '';
    oRF.aSetRusTraumRF.indexOf(3) != -1 ? oRF.sRusTraumRF = 3 : '';

    oRF.sMajorBleed > 0 ? oRF.sMajorBleed = 1 : '';
    oRF.sTraumBleed > 0 ? oRF.sTraumBleed = 1 : '';
    return oRF;
};