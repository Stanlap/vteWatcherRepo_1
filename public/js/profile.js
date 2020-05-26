let oUser = {};
$('#btn1').on('click', function () {

    oUser.name = $('#name').val();
    oUser.patronymic = $('#patronymic').val();
    oUser.surname = $('#surname').val();
    oUser.chief = $('#chief').val();
    oUser.org = $('#org').val();
    oUser.depart = $('#depart').val();
    oUser.signature = (oUser.name + oUser.patronymic + oUser.surname).match(/[А-Я]/g).join('');
    oUser.surnameAndInitials = (`${oUser.surname} ${(oUser.name).match(/[А-Я]/g)}. ${(oUser.patronymic).match(/[А-Я]/g)}.`);

    let serialObj = JSON.stringify(oUser);
    localStorage.removeItem('User');
    localStorage.setItem('User', serialObj);
    alert(`User ${oUser.surnameAndInitials} has creared!`);
    this.form.reset();
});

$('#btn3').on('click', function () {
    localStorage.getItem('User') ? (
        oUser = JSON.parse(localStorage.getItem('User')),
        $('#name').val(oUser.name),
        $('#patronymic').val(oUser.patronymic),
        $('#surname').val(oUser.surname),
        $('#chief').val(oUser.chief),
        $('#org').val(oUser.org),
        $('#depart').val(oUser.depart)
    ) : '';
});

$('#btn4').on('click', function () {
    alert(`User ${oUser.surnameAndInitials} deleted!`);
    localStorage.removeItem('User');
});