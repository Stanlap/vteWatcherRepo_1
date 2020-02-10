let gender = 0,
    age = 18,
    weight = 70,
    race = 0,
    creatinVal = 0,
    creatinUnits = {
        'мг/100 мл, мг/дл, мг%': false,
        'мкг/мл, мг/100 мл': false,
        'ммоль/л': false,
        'мкмоль/л': false
    };

function uniformCrValue(cU, vC) {
    cU['мг/100 мл, мг/дл, мг%'] ? vC = 1 : cU['мкг/мл, мг/100 мл'] ? vC = 10 : cU['ммоль/л'] ? vC = 0.0884 : cU['мкмоль/л'] ? vC = 88.4 : '';
    return vC;
}

// Template:
// creatinUnits['мг/100 мл, мг/дл, мг%'] = true;
// creatinUnits['мкг/мл, мг/100 мл'] = true;
// creatinUnits['мкмоль/л'] = true;
creatinUnits['ммоль/л'] = true;
gender = 0;
age = 38;
weight = 80,
creatinVal = 0.08;

function findGenderCoefCockcroftGault(vG) {
    if (vG === 0) return 0.85;
    return 1;
}
function findGenderCoefMDRD(vG) {
    if (vG === 0) return 0.742;
    return 1;
}
function findGenderCoefCKD_EPI(vG) {
    if (vG === 0) return 0.7;
    return 0.9;
}
function findRaceCoefCKD_EPI(vR) {
    if (vR > 0) return 1.159;
    return 1;
}

// Формула Кокрофта-Голта:
let formCockcroftGaultResCC = parseInt(((140 - age) * weight) / (72 * creatinVal) * uniformCrValue(creatinUnits, vC = 1) * findGenderCoefCockcroftGault(gender));

// Формула MDRD (мл/мин/1,73 м2)
let formMDRDResGFR = parseInt((175 * creatinVal / uniformCrValue(creatinUnits, vC = 1)  - 1.154 * age - 0.203) * findGenderCoefMDRD(gender));

// Формула CKD-EPI (мл/мин/1,73 м2)
let formCKD_EPIResGFR = 0;
gender === 1 ? formCKD_EPIResGFR = parseInt((141 * Math.min(((creatinVal / uniformCrValue(creatinUnits, vC = 1)) / 0.9), 1) - 0.411 * Math.max(((creatinVal / uniformCrValue(creatinUnits, vC = 1)) / 0.9), 1) - 1.209 * 0.993 * age) * findRaceCoefCKD_EPI(race)) : gender === 0 ? formCKD_EPIResGFR = parseInt((144 * Math.min(((creatinVal / uniformCrValue(creatinUnits, vC = 1)) / 0.7), 1) - 0.329 * Math.max(((creatinVal / uniformCrValue(creatinUnits, vC = 1)) / 0.7), 1) - 1.209 * 0.993 * age) * findRaceCoefCKD_EPI(race)) : '';

console.log(`CockcroftGault ${formCockcroftGaultResCC}`);
console.log(`MDRD ${formMDRDResGFR}`);
console.log(`CKD_EPI ${formCKD_EPIResGFR}`);



