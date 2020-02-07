$(document).ready(function () {
    let objPatient = JSON.parse(localStorage.getItem('Patient'));
    let objChoosedMedicines = JSON.parse(localStorage.getItem('ChoosedMedicines'));
    // console.log(objPatient, objChoosedMedicines);

    function defineMinTreatmentPeriod(mP, chosDrug, mTP) {
        switch (chosDrug) {

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
                (mP === 4 && objPatient.pkArtroplastyKneeJoint === true) ? mTP = 28: '';
                break;

            case 'Апиксабан':
                (mP === 4 && objPatient.pkArtroplastyKneeJoint === true) ? mTP = 32: '';
                break;

            case 'Варфарин':
                mTP = 4;
                break;

        };
        return mTP;
    }

    $(objChoosedMedicines).each(function(ind, el) {
        el.treatPeriod = defineMinTreatmentPeriod(objPatient.pkMedProfile, el.titleGroupRu, 10);
      });

      console.log(objChoosedMedicines);
      

    objPatient.pkMinTreatmentPeriod = defineMinTreatmentPeriod(objPatient.pkMedProfile, objChoosedMedicines[0].titleGroupRu);
    console.log(objPatient.pkMedProfile);
    console.log(objPatient.pkMinTreatmentPeriod);

});