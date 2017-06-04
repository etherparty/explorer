#!/bin/sh

if [ "$WEB3_RPC" != "" ]; then
	mv app/app.js app/app.js.orig
	cat app/app.js.orig | sed "s|http://localhost:8545|$WEB3_RPC|" > app/app.js
fi

node_modules/http-server/bin/http-server ./app -a 0.0.0.0 -p 8000 -c-1