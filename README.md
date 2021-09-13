# Remote-Play

Remote-Play uses _pyautogui_ to press keyboard shortcuts to control your media. It uses _fastapi_ to serve a minimal UI to your mobile device.

Can be used with various players like Hotstar, Amazon Prime, Netflix, etc.

## Supported actions

The following actions are supported:
- Play/Pause (Toggle)
- Volume controls (+, -, and mute)
- Seek controls (<< and >>)
- Mouse cursor movement
- Left-mouse-button click using tapping

## Using Remote-Play

### Download the latest version

Get the latest stable version by heading to [Releases](https://github.com/shubham1172/remote-play/releases) and download the right release depending on your OS.

or

Get the development (unstable) version by heading to [Package workflow](https://github.com/shubham1172/remote-play/actions/workflows/package.yml). Click on the latest run and scroll down to find the `artifacts` associated and download the right one for your OS.

### Setup and installation

- Extract the zip from the step above and copy to any suitable location
- Set the environment variables `REMOTE_PLAY_HOST` (default="0.0.0.0") and `REMOTE_PLAY_PORT` (default=8000) to customize the web server's host and port.

### Starting up

- Open the remote-play folder and start the app: remote-play.exe for Windows, remote-play for Linux/MacOS
- Navigate to the correct IP address from the console (depending on your network) on your device.

<img src="./docs/screenshot_terminal.png" width="513" height="193" alt="Screenshot of terminal"/>


**Important**: Make sure that your media player is an active window.

<img src="./docs/screenshot_webapp.jpeg" alt="Screenshot of webapp"/>

## Contributing

All contributions to Remote-Play are welcome. Please see [CONTRIBUTING.md](/CONTRIBUTING.md) for more.
