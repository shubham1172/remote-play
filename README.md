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
- Right-mouse-button click using double tap
- Swipe up and down to scroll vertically on the right pad

**Disclaimer**: Horizontal scrolling only supported on OS X / Linux Platforms
- Swipe left and right to scroll horizontally on the bottom pad 

## Using Remote-Play

### Download the latest version

Get the latest stable version by heading to [Releases](https://github.com/shubham1172/remote-play/releases) and download the right release depending on your OS.

or

Get the development (unstable) version by heading to [Package workflow](https://github.com/shubham1172/remote-play/actions/workflows/package.yml). Click on the latest run and scroll down to find the `artifacts` associated and download the right one for your OS.

### Setup and installation

- Extract the zip from the step above and copy to any suitable location
- Set the environment variables `REMOTE_PLAY_HOST` (default="0.0.0.0") and `REMOTE_PLAY_PORT` (default=8000) to customize the web server's host and port.

If you want to use the app with an https connection, you will need to :
- Optionally, create an SSL certificate for the 0.0.0.0 IP address, for example using [mkcert](https://github.com/FiloSottile/mkcert). You may want to add it to your browser's trusted certificates, or else you will get a security warning each time you visit the url. Alternatively, you can use the ones provided at the root of the folder.
- Create two environment variables, named SSL_CERT and SSL_KEY, pointing to the certificate and key file respectively. If you do not want to create these environment variables, you can instead indicate the files when launching the app using the --key and --cert command line arguments.

### Starting up

- Open the remote-play folder and start the app: remote-play.exe for Windows, remote-play for Linux/MacOS
- Navigate to the correct IP address from the console (depending on your network) on your device.

<img src="./docs/screenshot_terminal.png" width="513" height="193" alt="Screenshot of terminal"/>


**Important**: Make sure that your media player is an active window.

Light Theme                |  Dark Theme
:-------------------------:|:-------------------------:
![Screenshot of webapp](./docs/screenshot_webapp.PNG "Light Mode Screenshot")  |  ![Screenshot of darkmode webapp](./docs/screenshot_darkmode_webapp.PNG "Dark Mode Screenshot")

## Contributing

All contributions to Remote-Play are welcome. Please see [CONTRIBUTING.md](/CONTRIBUTING.md) for more.
