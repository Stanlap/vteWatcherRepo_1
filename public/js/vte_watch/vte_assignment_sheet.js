$(document).ready(function () {
    let objPatient = JSON.parse(localStorage.getItem('Patient'));
    // localStorage.clear();
    console.log(objPatient);
    console.log(objPatient.pkMedProfile);
    objPatient.pkMinTreatmentPeriod = 10;   
    
    switch (objPatient.pkChoosedDrugGroupLat) {

        case 'Enoxaparin sodium':

            break;

        case 'Nadroparin calcium':
            break;

        case 'Heparin sodium':
            break;

        case 'Fondaparinux sodium':
            break;

        case 'Acetylsalicylic acid':
            break;

        case 'Dabigatran etexilate':
            break;

        case 'Rivaroxaban':
            break;

        case 'Apixaban':
            break;

        case 'Warfarin':
            break;
        default:

    };
});