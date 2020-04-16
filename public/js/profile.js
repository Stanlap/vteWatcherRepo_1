let objUser = {};
$('#btn1').on('click', function () {

    objUser.name = $('#name').val();
    objUser.patronymic = $('#patronymic').val();
    objUser.surname = $('#surname').val();
    objUser.chief = $('#chief').val();
    objUser.org = $('#org').val();
    objUser.depart = $('#depart').val();
    objUser.signature = (objUser.name + objUser.patronymic + objUser.surname).match(/[А-Я]/g).join('');
    objUser.surnameAndInitials = (`${objUser.surname} ${(objUser.name).match(/[А-Я]/g)}. ${(objUser.patronymic).match(/[А-Я]/g)}.`);

    let serialObj = JSON.stringify(objUser);
    localStorage.removeItem('User');
    localStorage.setItem('User', serialObj);
    alert(`User ${objUser.surnameAndInitials} has creared!`);
});

$('#btn3').on('click', function () {
    objUser = JSON.parse(localStorage.getItem('User'));
    $('#name').val(objUser.name);
    $('#patronymic').val(objUser.patronymic);
    $('#surname').val(objUser.surname);
    $('#chief').val(objUser.chief);
    $('#org').val(objUser.org);
    $('#depart').val(objUser.depart);
});

$('#btn4').on('click', function () {
    alert(`User ${objUser.surnameAndInitials} deleted!`);
    localStorage.removeItem('User');
});