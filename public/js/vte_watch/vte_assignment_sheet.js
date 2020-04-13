$(document).ready(function () {
    let aOrdersCont = JSON.parse(localStorage.getItem('ordersCont'));
    localStorage.removeItem('ordersCont');
    console.log(aOrdersCont);
});