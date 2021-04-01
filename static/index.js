document.addEventListener("DOMContentLoaded", function (event) {
    var hammer = new Hammer(document.getElementById('touchpad'))
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammer.on('tap', function (ev) {
        // left mouse button click
        callEndpoint('/touchpad/lmb')
    });
    hammer.on('pan', function (ev) {
        // cursor control
        callEndpoint(`/touchpad/move?dx=${ev.deltaX/2}&dy=${ev.deltaY/2}`)
    });
});

function callEndpoint(endpoint) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send();
}