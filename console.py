"""
Console provides helper function to
write colorful messages to STDOUT.
"""


def log(msg, *args, end='\n', color=None):
    """
    Logs msg % args to the console.
    color can be g (green), c (cyan), r (red)
    """
    # use https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
    # to add codes as needed.
    code = 0
    if color == 'g':
        code = 32
    elif color == 'c':
        code = 96
    elif color == 'r':
        code = 31
    if code > 0:
        print(f"\x1b[{code}m{msg % args}\x1b[39m", end=end)
    else:
        print(msg % args, end=end)
