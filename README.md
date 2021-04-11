# Remote-Play

Remote-Play uses _pyautogui_ to press keyboard shortcuts to control your media. It uses _fastapi_ to serve a minimal UI to your mobile device.

Can be used with various players like Hotstar, Amazon Prime, Netflix, etc.

Remote-Play supports basic functionalities like Pause/Play, Mute, Volume control, Seeking and also comes with a touchpad with mouse cursor movement and left-mouse button support by tapping.

## Using Remote-Play

### Clone the repository

```bash
git clone https://github.com/shubham1172/remote-play.git
cd remote-play
```

### Install requirements

```
pip3 install -r requirements.txt
```

### Start the web-server

```
uvicorn main:app --reload --host 0.0.0.0
```

### Get your computer's IP address:

- Windows users: type the following command in your CMD prompt

```
ipconfig
```

- Linux/Mac users: type following command in your terminal

```
ifconfig
```

### Connect to your phone

Go to `ip_address:8000` on your phone's browser. (Replace ip_address with your computer's IP address')

### **Note**: Make sure that your media player is an active window.

![Screenshot](/docs/screenshot.jpeg)
