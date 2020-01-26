$(document).ready(function () {
    let objPatient = JSON.parse(localStorage.getItem('Patient'));
    // localStorage.clear();
    console.log(objPatient);
    console.log(objPatient.pkMedProfile);
    // switch (objPatient.pkChoosedDrugGroupLat) {
    function defineMinTreatmentPeriod(mP, chosDrug) {
        let mTP = 0;
        switch (chosDrug) {

            case 'Enoxaparin sodium':
                (mP === 1 || mP === 2) ? mTP = 6: (mP === 3 || mP === 4) ? mTP = 7 : '';
                break;

            case 'Nadroparin calcium':
                (mP < 4) ? mTP = 7: '';
                break;

            case 'Heparin sodium':
                mTP = 7;
                break;

            case 'Fondaparinux sodium':
                (mP === 1 || mP === 2) ? mTP = 6: (mP === 3) ? mTP = 5 : '';
                break;

            case 'Dabigatran etexilate':
                (mP === 4 && objPatient.pkArtroplastyKneeJoint === true) ? mTP = 28: '';
                break;

                // case 'Rivaroxaban':
                //     break;

            case 'Apixaban':
                (mP === 4 && objPatient.pkArtroplastyKneeJoint === true) ? mTP = 32: '';
                break;

            case 'Warfarin':
                mTP = 4;
                break;
            default:
                mTP = 10;

        };
        return mTP;
    }

    objPatient.pkMinTreatmentPeriod = defineMinTreatmentPeriod(objPatient.pkMedProfile, objPatient.pkChoosedDrugGroupLat);

    console.log(objPatient.pkMinTreatmentPeriod);

});