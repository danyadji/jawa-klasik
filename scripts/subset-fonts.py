import os
import sys
from fontTools.subset import main

fonts = [
    ('chyntia-oesman-chyntia-oesman-regular-sans-modern-400.otf', 'chyntia-oesman-regular-sans-modern.woff2'),
    ('Futura Bk BT Book.ttf', 'Futura-Bk-BT-Book.woff2'),
    ('Futura Bk BT Book Italic.ttf', 'Futura-Bk-BT-Book-Italic.woff2'),
    ('Photograph Signature.ttf', 'Photograph-Signature.woff2'),
    ('GreatVibes-Regular.ttf', 'GreatVibes-Regular.woff2'),
    ('GOTHICB.TTF', 'GOTHICB.woff2'),
]

unicodes = 'U+0020-007E,U+00A0-00FF,U+0100-017F,U+2010-2027,U+2030-205E'

for src, dest in fonts:
    src_path = os.path.join('assets', 'fonts', src)
    dest_path = os.path.join('assets', 'fonts', dest)
    sys.argv = [
        'pyftsubset',
        src_path,
        f'--output-file={dest_path}',
        '--flavor=woff2',
        f'--unicodes={unicodes}',
        '--layout-features=*'
    ]
    try:
        main()
        print(f'{src} -> {dest}: {os.path.getsize(dest_path)} bytes')
    except Exception as e:
        print(f'Error subsetting {src}: {e}')
