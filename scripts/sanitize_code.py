#!/usr/bin/env python3
"""Sanitize PDF generation code to remove forbidden Unicode characters."""
import sys, re

def sanitize(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()
    # Replace common forbidden patterns
    replacements = {
        '\u00b2': '<super>2</super>',
        '\u00b3': '<super>3</super>',
        '\u2070': '<super>0</super>',
        '\u2074': '<super>4</super>',
        '\u2075': '<super>5</super>',
        '\u2076': '<super>6</super>',
        '\u2077': '<super>7</super>',
        '\u2078': '<super>8</super>',
        '\u2079': '<super>9</super>',
        '\u2080': '<sub>0</sub>',
        '\u2081': '<sub>1</sub>',
        '\u2082': '<sub>2</sub>',
        '\u2083': '<sub>3</sub>',
        '\u2084': '<sub>4</sub>',
        '\u2085': '<sub>5</sub>',
        '\u2086': '<sub>6</sub>',
        '\u2087': '<sub>7</sub>',
        '\u2088': '<sub>8</sub>',
        '\u2089': '<sub>9</sub>',
    }
    for old, new in replacements.items():
        code = code.replace(old, new)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(code)
    print(f"Sanitized: {filepath}")

if __name__ == '__main__':
    sanitize(sys.argv[1])
