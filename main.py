"""
Remote-play hosts a FastAPI webserver to handle incoming requests
and translate them to mouse and keyboard actions using pyautogui.
"""

import os
import sys
import netifaces
import pyautogui
import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import console

app = FastAPI()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """Handle websocket connections"""
    print('Websocket is accepting client connection..')
    await websocket.accept()

    while True:
        try:
            data = await websocket.receive_json()
            if data['type'] == "move":
                pyautogui.moveRel(data['x'], data['y'])
            elif data['type'] == "tap":
                pyautogui.leftClick()
            elif data['type'] == "doubletap":
                pyautogui.rightClick()
            elif data['type'] == "scrolly":
                if data['y'] == "up":
                    pyautogui.scroll(-15)
                elif data['y'] == "down":
                    pyautogui.scroll(15)
            elif data['type'] == "scrollx":
                if data['x'] == "left":
                    pyautogui.hscroll(15)
                elif data['x'] == "right":
                    pyautogui.hscroll(-15)
        except WebSocketDisconnect:
            print("Client disconnected.")
            break
        # Since we're already handling the specific exception above and loggin the exception
        # we can suppress pylint W0703 - Catching too general exception Exception (broad-except)
        except Exception as error: # pylint: disable=W0703
            print(f"ERROR: {error}")
            await websocket.close()
            break


@app.get("/{cmd}")
def handle_command(cmd):
    """Handle keypress commands"""
    if cmd == "mute":
        pyautogui.press("volumemute")
    elif cmd == "toggle":
        pyautogui.press("space")
    elif cmd == "seek_left":
        pyautogui.press("left")
    elif cmd == "seek_right":
        pyautogui.press("right")
    elif cmd == "volume_up":
        # MacOS requires special control for volume
        if sys.platform == "darwin":
            pyautogui.press("KEYTYPE_SOUND_UP")
        else:
            pyautogui.press("volumeup")
    elif cmd == "volume_down":
        if sys.platform == "darwin":
            pyautogui.press("KEYTYPE_SOUND_DOWN")
        else:
            pyautogui.press("volumedown")


@app.get("/")
def index():
    """Returns the static index page on root"""
    return FileResponse('static/index.html', media_type='text/html')


def get_host_ips():
    """Get IP addresses of the host where the app is running"""
    ip_list = []
    for interface in netifaces.interfaces():
        for link in netifaces.ifaddresses(interface).get(netifaces.AF_INET, {}):
            ip_addr = link.get('addr', None)
            # ignore loopback address
            if ip_addr and ip_addr != '127.0.0.1':
                ip_list.append(ip_addr)
    return ip_list


def log_startup_message(port_num):
    """Log a startup message to the console"""
    console.log("remote-play", color='c', end='')
    console.log(" by ", end='')
    console.log("@shubham1172", color='c', end='\n\n')
    console.log("Start a browser on your device and")
    console.log("connect using an IP address from below:")
    for ip_addr in get_host_ips():
        console.log(f"http://{ip_addr}:{port_num}", color='g')
    console.log("\n")


if __name__ == "__main__":
    pyautogui.FAILSAFE = False
    pyautogui.PAUSE = 0

    # See https://stackoverflow.com/a/42615559/4654175
    if getattr(sys, 'frozen', False):
        # If the application is run as a bundle, the PyInstaller bootloader
        # extends the sys module by a flag frozen=True and sets the app
        # path into variable _MEIPASS'.
        # Since _MEIPASS does not exists at development time,
        # pylint needs to be suppressed.
        application_path = sys._MEIPASS  # pylint: disable=no-member,protected-access
    else:
        application_path = os.path.dirname(os.path.abspath(__file__))

    app.mount(
        "/static", StaticFiles(directory=os.path.join(application_path, "static")))

    host = os.environ.get("REMOTE_PLAY_HOST", "0.0.0.0")
    port = os.environ.get("REMOTE_PLAY_PORT", 8000)

    log_startup_message(port)

    uvicorn.run(app, host=host, port=port)
