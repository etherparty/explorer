# Summary
How to get this running on your Linux server?  
See [debian-ubuntu.sh](debian-ubuntu.sh). 

##Solved!

Finally, all problems are solved:

### pull request

I made an [improvement](https://github.com/altsheets/explorer/tree/dc70bf32d542f8e906a8ae17206155da90a0614c) of the [original EthExplorer](https://github.com/etherparty/explorer/tree/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9).

Now the user has to edit [app/app.js](https://github.com/altsheets/explorer/blob/99a8d79e7e631db737ba1abc0bcf7817c2c1ef9f/app/app.js#L6) Line 6, and [package.json](https://github.com/altsheets/explorer/blob/99a8d79e7e631db737ba1abc0bcf7817c2c1ef9f/package.json#L24) Line 24.

I had to change these files:
* [app/app.js](https://github.com/altsheets/explorer/blob/99a8d79e7e631db737ba1abc0bcf7817c2c1ef9f/app/app.js#L1-L19) Lines 1-19 and 49-51
* [app/index.htm](https://github.com/altsheets/explorer/blob/99a8d79e7e631db737ba1abc0bcf7817c2c1ef9f/app/index.html#L83-L85) Lines 58-60 and 83-85
* [styles/main.css](https://github.com/altsheets/explorer/blob/dc70bf32d542f8e906a8ae17206155da90a0614c/app/styles/main.css#L32-L34) Lines 32-34

The geth command is fully corrected. 

### manually

With the [old version](https://github.com/etherparty/explorer/tree/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9), the user must find these places:

* change [original app/app.js Line 30](https://github.com/altsheets/explorer/blob/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9/app/app.js#L30)
* and [original package.json Line 24](https://github.com/altsheets/explorer/blob/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9/package.json#L24)

And most importantly, the user must start geth like this (differently than the app says):

    geth --rpc --rpcaddr your.ip.address.here --rpcport 8545  --rpcapi "web3,eth" --rpccorsdomain "http://your.ip.address.here:8000"
    
A big thanks to Joey for your help!

*Done.*

---
# The past

(Only) if you want to know what kind of ordeal I went through, and what I learned on the way ... then:

* [README-how-to.md](README-how-to.md) and the links within describe a lot of my path from an empty droplet to a running app 
* [nginx/README.md](nginx/README.md) is an unfinished attempt at putting the app.js into PM2 and behind nginx.

----

# License

AltSheets, September 2015, all this is licensed under (MIT + G), with G = [giveback-license v05](http://altsheets.ddns.net/give).
