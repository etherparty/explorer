# SOLVED
... and much easier. See [../README.md](../README.md) for the solution. 

*No need to continue reading here* (unless you know the solution for "node app/app.js" problem at the bottom).

---
---

# TODO
One day I might have the time to do this:

* really put the app behind an nginx proxy 
* solve correct calling of the app.js by PM2 

This was a long ordeal:

# app behind nginx
As all [my begging for help](../README-how-to.md) ... did not result in working answers, I continued myself. Pity me: I am an experienced coder, but really not a Linux admin. Right now however, I have to become one I guess. But hey - I succeeded to solve "problem 1" it alone - *YIEHAH*! 

## TOC:
* second attempt: SUCCESSFUL! 
  * port 8001 <-- nginx <-- port 8000 <-- npm [SOLVED]
* first attempt with PM2 as a manager. 
  * Unfinished. S.th. wrong with app/app.js ?

The successful attempt first:

## port 4400 <-- nginx <-- port 8000 <-- npm [SOLVED]
Ideas from https://gist.github.com/carlosvillu/1125682 - and from my own experiences with django.

    apt-get -y install nginx

	cat > /etc/nginx/sites-available/node_proxy.conf <<EOF
	server {
	    listen 8001 default_server;
	    # proxy to node
	    location / {
	        proxy_pass         http://127.0.0.1:8000/;
	    }
	}
	EOF
	
	ln -s /etc/nginx/sites-available/node_proxy.conf /etc/nginx/sites-enabled/node_proxy.conf
	/etc/init.d/nginx restart

	 cd explorer; screen -S EthExp npm start
	 
And voila: The server is visible. *Hooooooooooooooraaaaaaaaaaayyyy* !


----

	
... the following stays here for later. Because of course, the node.js app should be started automatically, by some fancy process manager - but this doesn't work yet with the [current app/app.js](https://github.com/altsheets/explorer/blob/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9/app/app.js):

## nginx <-- PM2 <-- app.js

This is roughly following the [digitalocean manual](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) 

    apt-get update; apt-get upgrade;  
    apt-get install -y build-essential openssl libssl-dev pkg-config

As I have an app.js, I skip the hello.js in the digitalocean manual ... but:

    node app/app.js

resulted in  "ReferenceError: angular is not defined". So I guess [Whit's original code](https://github.com/etherparty/explorer/blob/master/app/app.js) has to be changed somehow, to enable it to be [run by PM2](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04#test-application-optional)

... stopping this - for now. 


