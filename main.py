import os
import pyautogui
import sys
import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print('Websocket is accepting client connection..')
    await websocket.accept()

    while True:
        try:
            data = await websocket.receive_json()
            if data['type'] == "move":
                pyautogui.moveRel(data['x'], data['y'])
            elif data['type'] == "tap":
                pyautogui.leftClick()
        except WebSocketDisconnect:
            print("Client disconnected.")
            break
    await websocket.close()

@app.get("/{cmd}")
def handle_command(cmd):
    if cmd == "mute":
        pyautogui.press("m")
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
    return FileResponse('static/index.html', media_type='text/html')

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
        application_path = sys._MEIPASS  # pylint: disable=no-member
    else:
        application_path = os.path.dirname(os.path.abspath(__file__))

    app.mount(
        "/static", StaticFiles(directory=os.path.join(application_path, "static")))

    host = os.environ.get("REMOTE_PLAY_HOST", "0.0.0.0")
    port = os.environ.get("REMOTE_PLAY_PORT", 8000)

    uvicorn.run(app, host=host, port=port)