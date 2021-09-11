# See https://stackoverflow.com/a/64642492/4654175
# This is run as a part of the package workflow.
import os
import pyautogui
import sys

FUNC_KEYDOWN = """\
def _keyDown(key):
    if key.upper() in special_key_translate_table:
        _specialKeyEvent(key.upper(), 'down')
    elif key not in keyboardMapping or keyboardMapping[key] is None:
        return    
    else:
        _normalKeyEvent(key, 'down')

"""

FUNC_KEYUP = """\
def _keyUp(key):
    if key.upper() in special_key_translate_table:
        _specialKeyEvent(key.upper(), 'up')
    elif key not in keyboardMapping or keyboardMapping[key] is None:
        return
    else:
        _normalKeyEvent(key, 'up')

"""


def update_code(code, func_name, func_def):
    # Replace the function with func_name in the code with func_def

    # Make sure that the function exists.
    start_idx = code.find(f'def {func_name}(')
    if start_idx < 0:
        raise AttributeError(f'function {func_name} not found in the file')

    # Get the end of the function based on the file's indentation.
    end_idx = start_idx
    while True:
        nidx = code.find('\n', end_idx)
        if nidx == -1 or (nidx+1) == len(code) or not code[nidx+1].isspace():
            break
        end_idx = nidx+1

    return code[:start_idx] + func_def + code[end_idx:]


# Only applicable for MacOS.
if __name__ == "__main__" and sys.platform == "darwin":
    fpath = os.path.join(os.path.dirname(
        pyautogui.__file__), "_pyautogui_osx.py")
    with open(fpath, 'r+') as file:
        contents = file.read()
        contents = update_code(
            contents, func_name='_keyDown', func_def=FUNC_KEYDOWN)
        contents = update_code(
            contents, func_name='_keyUp', func_def=FUNC_KEYUP)
        # Overwrite the file
        file.seek(0)
        file.write(contents)
