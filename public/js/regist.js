// let passwArr = document.getElementsByName('passwords');
let passwArr = document.querySelectorAll('input[type="password"]');
passwArr.forEach(function (el) {
    el.addEventListener('input', function () {
        if (el.validity.patternMismatch) {
            el.setCustomValidity('Пароль допускает строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 знаков.');
        } else {
            el.setCustomValidity('');
        }
    });
});
let btn = document.getElementById('btn1');
btn.addEventListener('click', () => {
    if (passwArr.item(0).value !== passwArr.item(1).value) {
        alert('Пароли не совпадают!');
        passwArr.forEach(function (el) {
            el.value = '';
        });
        passwArr.item(0).focus();
    }
})