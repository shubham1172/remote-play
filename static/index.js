const ws = new WebSocket("ws://" + location.host + "/ws");
let start = { x: 0, y: 0 };

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("touchpad").addEventListener("touchstart", touchStart);
  document.getElementById("touchpad").addEventListener("touchmove", touchMove);

  var hammer = new Hammer(document.getElementById("touchpad"));
  hammer.on("tap", function (ev) {
    // left mouse button click
    ws.send(JSON.stringify({ type: "tap" }));
  });
});

function touchStart(ev) {
  ev.preventDefault();
  start.x = ev.changedTouches[0].clientX;
  start.y = ev.changedTouches[0].clientY;
}

function touchMove(ev) {
  ev.preventDefault();
  offsetX = ev.changedTouches[0].clientX - start.x;
  offsetY = ev.changedTouches[0].clientY - start.y;

  ws.send(JSON.stringify({ type: "move", x: offsetX * 2, y: offsetY * 2 }));

  start.x = ev.changedTouches[0].clientX;
  start.y = ev.changedTouches[0].clientY;
}

function callEndpoint(endpoint) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", endpoint, true);
  xhr.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  xhr.send();
}
