"""
Console provides helper function to
write colorful messages to STDOUT.
"""


def log(msg, *args, end='\n', color=None):
    """
    logs msg % args to the console
    color can be g (green), c (cyan)
    """
    # use https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
    # to add codes as needed.
    code = 0
    if color == 'g':
        code = 32
    elif color == 'c':
        code = 96
    if code > 0:
        print("%s%s%s" % ('\x1b[%dm' % code, msg % args, '\x1b[39m'), end=end)
    else:
        print(msg % args, end=end)
