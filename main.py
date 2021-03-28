import pyautogui
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"))

@app.get("/{cmd}")
def handle_toggle(cmd):
    if cmd == "mute":
        pyautogui.press("m")
    elif cmd == "toggle":
        pyautogui.press("space")
    elif cmd == "seek_left":
        pyautogui.press("left")
    elif cmd == "seek_right":
        pyautogui.press("right")
    elif cmd == "volume_up":
        pyautogui.press("volumeup")
    elif cmd == "volume_down":
        pyautogui.press("volumedown")

@app.get("/")
def index():
    return FileResponse('static/index.html', media_type='text/html')