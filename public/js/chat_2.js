
const ws = new WebSocket('ws://localhost:3000');
const messages = $('#ulMsgs');
const status = $('#pStatus');

function printMessage(value) {
    $('<li/>'). prop({class: 'list-group-item border-0'}).html(value).appendTo(messages);
}

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
function setStatus(value) {
    status.html(value);
}

$('#frmMsg').on('submit', event => {
    event.preventDefault();

    let vMsg = `<div class="divMsg bg-${getRandomInt(2) ? 'secondary': 'info'} rounded w-75 float-${getRandomInt(2) ? 'right': 'left'} mb-2"><div class="p-2"><p class="card-text text-white"><strong>${$('#inpName').val()}</strong> ${$('#taMsg').val()}</p></div></div>`;
    ws.send(vMsg);

//     $(`.divMsg :contains(${vName})`).addClass('bg-primary');
//     $('.divMsg').each((ind, el) => {
//      $(el).addClass(`${getRandomInt(2) ? 'bg-secondary': 'bg-info'};`)   
//     })
// $('#frmMsg').before(vMsg);
});

ws.onopen = ()=> setStatus('ONLINE');
ws.onclose = ()=> setStatus('DISCONNECTED');
ws.onmessage = response => printMessage(response.data);
