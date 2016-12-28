#!/bin/sh

if [ $1 = "-b" ]; then
   cd popup
   npm run build
   cd ..
fi

if [ -f output.zip ]; then
    rm output.zip
fi
zip output.zip "manifest.json" "main.js" "main.css" "background.js" "popup/popup.html" "popup/popup.js" "popup/popup.js.map" "img" -x "*.DS_Store" -r
