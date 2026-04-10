#!/usr/bin/env python3
"""Add Z.ai metadata to PDF files."""
import sys, os
from pypdf import PdfReader, PdfWriter

def add_metadata(filepath, title=None):
    reader = PdfReader(filepath)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    t = title or os.path.splitext(os.path.basename(filepath))[0]
    writer.add_metadata({
        '/Title': t,
        '/Author': 'Z.ai',
        '/Creator': 'Z.ai',
        '/Subject': t,
    })
    with open(filepath, 'wb') as f:
        writer.write(f)
    print(f"Metadata added to {filepath}")

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('files', nargs='+')
    parser.add_argument('-t', '--title', default=None)
    parser.add_argument('-q', '--quiet', action='store_true')
    args = parser.parse_args()
    for f in args.files:
        add_metadata(f, args.title)
        if not args.quiet:
            print(f"Done: {f}")
