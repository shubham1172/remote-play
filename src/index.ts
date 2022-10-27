import * as Hammer from "hammerjs";

import "./style.scss";

let ws: WebSocket;

if (location.protocol === "https:") {
  ws = new WebSocket(`wss://${window.location.host}/ws`);
} else {
  ws = new WebSocket(`ws://${window.location.host}/ws`);
}

const start = { x: 0, y: 0 };
const appThemeLocalKey = "darkModeLocal";

function callEndpoint(endpoint: string) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", endpoint, true);
  xhr.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  xhr.send();
}

function touchStart(ev: TouchEvent) {
  ev.preventDefault();
  start.x = ev.changedTouches[0].clientX;
  start.y = ev.changedTouches[0].clientY;
}

function touchMove(ev: TouchEvent) {
  ev.preventDefault();
  const offsetX = ev.changedTouches[0].clientX - start.x;
  const offsetY = ev.changedTouches[0].clientY - start.y;

  ws.send(JSON.stringify({ type: "move", x: offsetX * 2, y: offsetY * 2 }));

  start.x = ev.changedTouches[0].clientX;
  start.y = ev.changedTouches[0].clientY;
}

function configureDisplayTheme() {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // if first time, then set theme based on system preference
  if (localStorage.getItem(appThemeLocalKey) === null) {
    if (prefersDarkScheme) {
      localStorage.setItem(appThemeLocalKey, "dark");
    } else {
      localStorage.setItem(appThemeLocalKey, "light");
    }
  }
  // set theme based on local storage
  if (localStorage.getItem(appThemeLocalKey) == "dark") {
    document.documentElement.classList.toggle("dark", true);
    (document.getElementById("darkMode") as HTMLInputElement).checked = true;
  } else {
    document.documentElement.classList.toggle("dark", false);
    (document.getElementById("darkMode") as HTMLInputElement).checked = false;
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  (document.getElementById("touchpad") as HTMLElement).addEventListener(
    "touchstart",
    touchStart
  );
  (document.getElementById("touchpad") as HTMLElement).addEventListener(
    "touchmove",
    touchMove
  );
  const hammer = new Hammer.Manager(
    document.getElementById("touchpad") as HTMLElement
  );
  const vscrollHammer = new Hammer.Manager(
    document.getElementById("vscrollpad") as HTMLElement
  );
  const hscrollHammer = new Hammer.Manager(
    document.getElementById("hscrollpad") as HTMLElement
  );

  var singleTap = new Hammer.Tap({
    event: "tap",
    taps: 1,
  });
  var doubleTap = new Hammer.Tap({
    event: "doubletap",
    taps: 2,
  });

  hammer.add([doubleTap, singleTap]);
  hammer.on("tap", (ev) => {
    // left mouse button click
    ws.send(JSON.stringify({ type: "tap" }));
  });
  hammer.on("doubletap", (ev) => {
    // right mouse button click
    ws.send(JSON.stringify({ type: "doubletap" }));
  });
  doubleTap.recognizeWith(singleTap);
  doubleTap.requireFailure(singleTap);
  singleTap.requireFailure(doubleTap);

  var scrolly = new Hammer.Pan({
    event: "vscroll",
    threshold: 50,
    direction: Hammer.DIRECTION_VERTICAL,
  });
  var scrollx = new Hammer.Pan({
    event: "hscroll",
    threshold: 50,
    direction: Hammer.DIRECTION_HORIZONTAL,
  });

  vscrollHammer.add(scrolly);
  hscrollHammer.add(scrollx);

  vscrollHammer.on("vscroll", (ev) => {
    // scroll vertically
    if (ev.direction == 8) {
      // direction = up
      ws.send(JSON.stringify({ type: "scrolly", y: "up" }));
    }
    if (ev.direction == 16) {
      // direction = down
      ws.send(JSON.stringify({ type: "scrolly", y: "down" }));
    }
  });

  hscrollHammer.on("hscroll", (ev) => {
    // scroll horizontally
    if (ev.direction == 2) {
      //direction = left
      ws.send(JSON.stringify({ type: "scrollx", x: "left" }));
    }
    if (ev.direction == 4) {
      // direction = right
      ws.send(JSON.stringify({ type: "scrollx", x: "right" }));
    }
  });

  const darkSwitch = document.querySelector("input[name=darkMode]");

  darkSwitch?.addEventListener("change", function (_event) {
    // toggles darkmode when user taps switch
    if (localStorage.getItem(appThemeLocalKey) == "dark") {
      document.documentElement.classList.toggle("dark", false);
      (document.getElementById("darkMode") as HTMLInputElement).checked = false;
      localStorage.setItem(appThemeLocalKey, "light");
    } else if (localStorage.getItem(appThemeLocalKey) == "light") {
      document.documentElement.classList.toggle("dark", true);
      (document.getElementById("darkMode") as HTMLInputElement).checked = true;
      localStorage.setItem(appThemeLocalKey, "dark");
    }
  });
  configureDisplayTheme();
});

// moved the callEndPoiny function that is being run from the index markup file
document
  .querySelectorAll("main.container button")
  .forEach((button: HTMLButtonElement) => {
    button.addEventListener("click", (event) => {
      callEndpoint(`/${(event.target as HTMLButtonElement).name}`);
    });
  });
