"""
PyInstaller hooks.
See https://github.com/pyinstaller/pyinstaller/issues/5359,
https://github.com/pyinstaller/pyinstaller/issues/5603
"""

from PyInstaller.utils.hooks import collect_submodules

# By default, pydantic from PyPi comes with all modules
# compiled as cpython extensions, which seems to
# prevent the pyinstaller from automatically picking
# up the module imports from __init__ and other
# modules that reside within the package...
hiddenimports = collect_submodules('pydantic')

hiddenimports += collect_submodules('uvicorn')

hiddenimports += collect_submodules('websockets')

# ... as well as the ones that come from the standard
# library
hiddenimports += [
    'colorsys',
    'dataclasses',
    'decimal',
    'json',
    'ipaddress',
    'pathlib',
    'uuid',
    'typing_extensions',
]
