# Remote-Play

Remote-Play uses _pyautogui_ to press keyboard shortcuts to control your media. It uses _fastapi_ to serve a minimal UI to your mobile device.

Can be used with various players like Hotstar, Amazon Prime, Netflix, etc.

Remote-Play supports basic functionalities like Pause/Play, Mute, Volume control, Seeking and also comes with a touchpad with mouse cursor movement and left-mouse button support by tapping.

## Using Remote-Play

### Download the latest version

#### Get a public version
- Head to [Releases](https://github.com/shubham1172/remote-play/releases) and download the right release depending on your OS

#### Get a development version (unstable)
- Head to [Package workflow](https://github.com/shubham1172/remote-play/actions/workflows/package.yml) and click on the latest run
- Scroll down to find the `artifacts` associated and download the right one for your OS

### Installing
- Extract the zip from the step above and copy to any suitable location
- Set the environment variables REMOTE_PLAY_HOST (default="0.0.0.0") and REMOTE_PLAY_PORT (default=8000) to customize the web server's host and port.
- Open the remote-play folder and start the app - remote-play.exe for Windows, remote-play for Linux/MacOS

### Get your computer's IP address:

- Windows users: type the following command in your CMD prompt

```
ipconfig
```

- Linux/Mac users: type the following command in your terminal

```
ifconfig
```

### Connect to your phone

Go to `ip_address:8000` on your phone's browser. (Replace ip_address with your computer's IP address')

### Start using Remote-Play on your phone

**Note**: Make sure that your media player is an active window.

![Screenshot](/docs/screenshot.jpeg)
