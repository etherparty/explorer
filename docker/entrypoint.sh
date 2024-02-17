#!/bin/sh

sed -e "s!'http:\/\/localhost:8545'!'$ETH_NODE_URL'!" -i ./app/app.js

/usr/local/bin/npx http-server ./app -p 3000 -c-1
