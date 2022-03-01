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
  document.getElementById("touchpad").addEventListener("touchstart", touchStart);
  document.getElementById("touchpad").addEventListener("touchmove", touchMove);
  const hammer = new Hammer.Manager(document.getElementById("touchpad"));
  const vscrollHammer = new Hammer.Manager(document.getElementById("vscrollpad"));
  const hscrollHammer = new Hammer.Manager(document.getElementById("hscrollpad"));

  var singleTap = new Hammer.Tap({
    event: "tap",
    taps: 1
  });
  var doubleTap = new Hammer.Tap({
    event: "doubletap",
    taps: 2
  });

  hammer.add([doubleTap, singleTap]);
  hammer.on("tap", ev => {
    // left mouse button click
    ws.send(JSON.stringify({ type: "tap" }));
  });
  hammer.on("doubletap", ev => {
    // right mouse button click 
    ws.send(JSON.stringify({ type: "doubletap" }));
  });
  doubleTap.recognizeWith(singleTap);
  doubleTap.requireFailure(singleTap);
  singleTap.requireFailure(doubleTap);

  var scrolly = new Hammer.Pan({
    event: "vscroll",
    threshhold: 50,
    direction: Hammer.DIRECTION_VERTICAL
  });
  var scrollx = new Hammer.Pan({
    event: "hscroll",
    threshhold: 50,
    direction: Hammer.DIRECTION_HORIZONTAL
  });

  vscrollHammer.add(scrolly);
  hscrollHammer.add(scrollx);

  vscrollHammer.on("vscroll", ev => { 
    // scroll up
    if (ev.direction == 8){
      ws.send(JSON.stringify({ type: "scrolly", y: "up"}));
    }
    if (ev.direction == 16){
      ws.send(JSON.stringify({ type: "scrolly", y: "down"}));
    }
  });
  
  hscrollHammer.on("hscroll", ev => {
    // scroll right 
    if (ev.direction == 2){
      ws.send(JSON.stringify({ type: "scrollx", x: "left"}));
    }
    if (ev.direction == 4){
      ws.send(JSON.stringify({ type: "scrollx", x: "right"}));
    }
  });

});
