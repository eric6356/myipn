#!/bin/sh
zip -x "*node_modules*" "*.DS_Store" -x npm-debug.log -x .git -x README.md -x screenshot.png -x pack.sh -r output.zip *
