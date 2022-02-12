const ws = new WebSocket(`ws://${window.location.host}/ws`);
const start = { x: 0, y: 0 };

function callEndpoint(endpoint) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", endpoint, true);
  xhr.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  xhr.send();
}

function touchStart(ev) {
  ev.preventDefault();
  start.x = ev.changedTouches[0].clientX;
  start.y = ev.changedTouches[0].clientY;
}

function touchMove(ev) {
  ev.preventDefault();
  const offsetX = ev.changedTouches[0].clientX - start.x;
  const offsetY = ev.changedTouches[0].clientY - start.y;

  ws.send(JSON.stringify({ type: "move", x: offsetX * 2, y: offsetY * 2 }));

  start.x = ev.changedTouches[0].clientX;
  start.y = ev.changedTouches[0].clientY;
}

document.addEventListener("DOMContentLoaded", event => {
  document
    .getElementById("touchpad")
    .addEventListener("touchstart", touchStart);
  document.getElementById("touchpad").addEventListener("touchmove", touchMove);
  var singleTap = new Hammer.Tap({
    event: "tap",
    taps: 1
  });
  var doubleTap = new Hammer.Tap({
    event: "doubletap",
    taps: 2
  });
  const hammer = new Hammer.Manager(document.getElementById("touchpad"));
  hammer.add([doubleTap, singleTap]);
  doubleTap.recognizeWith(singleTap);
  doubleTap.requireFailure(singleTap);
  singleTap.requireFailure(doubleTap);
  hammer.on("tap", ev => {
    // left mouse button click
    ws.send(JSON.stringify({ type: "tap" }));
  });
  hammer.on("doubletap", ev => {
    // right mouse button click
    ws.send(JSON.stringify({ type: "doubletap" }));
  });
});
