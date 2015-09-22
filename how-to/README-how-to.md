# Summary

**Solved!**

change app/app.js

    https://github.com/altsheets/explorer/blob/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9/app/app.js#L30

and package.json

    https://github.com/altsheets/explorer/blob/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9/package.json#L24

and start geth (differently than the app says):

    geth --rpc --rpcaddr your.ip.address.here --rpcport 8545  --rpcapi "web3,eth" --rpccorsdomain "http://your.ip.address.here:8000"

and forget [nginx](nginx) - for now.
    
A big thanks to Joey!

*Done.*

## what helped

* Joey
* leaving nginx out of the game (it was only my desperate workaround anyways)
* querying geth

    curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}' http://localhost:8000  
    curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}' http://46.101.137.79:8545  
* having Joey look at the original [app.js](https://github.com/altsheets/explorer/blob/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9/app/app.js)
* checking the ports 

    netstat -an |grep 8000
* and in the end, me staring really long at the original [app.js](https://github.com/altsheets/explorer/blob/ea1d1c3c1739c5d7b947d2602d06aec28e40fad9/app/app.js)     

A big thanks to Joey!


---
---
---

This was a real ordeal:


# TODO
One day I might go through it:

* create a perfect docker-solved/Dockerfile
* really put the app behind an [nginx proxy](nginx). 


# TOC

* Summary
  * what helped
* TODO
* **TOC**
* Quickstart
* How to get this running
  * Please help ...
  * node.js
  * Unlucky day, really. Really?
  * The happy outcome
* Docker container
  * Docker Preschool Final Exam
  * Docker - what?
  * Remaining problems
  * Problem 1 - port not transparent to the internet
    * [Probably SOLVED](#probably-solved)
  * Problem 2 - EthExplorer<->geth
    * [SOLVED](#solved)
* Should I better drop programming, and take up book writing?
  


# Quickstart for those with a node.js configured system

... when I do this:

    mkdir AEEE; cd AEEE
    git clone https://github.com/altsheets/explorer.git
    cd explorer
    npm install
    npm start

Locally, all is cool:

    curl localhost:8000

But for the internet, it is invisible:

    browser http://46.101.137.79:8000
    
For the *whole installation manual* incl. all necessary tools, see [debian-ubuntu.sh](debian-ubuntu.sh). Or use my [Docker instructions](#docker-container), to build all this in a safe, and replicable environment. 

If fixed the above problem with ngix as a proxy:

	browser http://46.101.137.79:8001

Now I cannot connect geth<->EthExplorer. Please scroll down to "problem 2".
 

# How to get this running
... as easy as Whit has described it in his [/README.md](/README.md) it actually is - but only on Windows, unfortunately. I have already coded a lot there, and it's looking beautiful & useful - and running smooth, and without any trouble - including all my extensions. But of course, the natural habitat for this will be a Linux server, so ... 

... I have not slept for 33 (thirty three) hours -half of which was coding- but unfortunately, the other half was this misbehaving kindergarten of nasty and renitent software packages.

## Please help ...
If you know a bit about ONE of these questions:

* node.js
* geth and Etherium in general
* docker
* linux in general, and specifically about
* firewalls and port forwarding.

By now I know my way around quite a bit, but still - I have about 1000% more experience on other OSes. So some of my approaches might be  funny or outright ridiculous - please laugh *with me* about them, and teach me better ways.

And pleeeeeeeease ... solve my problem.

## node.js
Took up the longest part. My fault, really: I made the unfortunate decision to directly jump onto the newest version, it had just come out one day before. Node.js-4.0.0 - halleluja.

But where ever I looked, and compared - that 4.0.0 is announced to be ... stable. Ready. And for ... production. And the version history before was more than confusing, so I was happy to be offered a clear situation.  In spite of better experience (to "never upgrade until the 2nd servicepack has been released"), and against my clear intuition - I wasted a good part of the night ...

for recreating that 4.0.0 situation - that is actually working really well on WINDOWS   
... on different DEBIAN machines, in the cloud.

First I thought: Too little RAM, so I increased the swap. Then I thought "[oh, perhaps I have to build at home, and later push the ready rock into the cloud](https://www.reddit.com/r/node/comments/3kgxym/ram_build_install_on_windows_and_run_start_on/)".  Then, not much later, I already suspected that an [older nodejs version might be less memory hungry](https://www.reddit.com/r/node/comments/3kh9nb/do_older_versions_of_nodejs_use_less_ram_for/) - all wrong. The 512MG RAM were NOT the problem (I had created a large enough swap, anyways).

It turned out, that the problem was hidden in a debug file that is [./../../../../../../../here] (https://www.reddit.com/r/node/comments/3kh9nb/do_older_versions_of_nodejs_use_less_ram_for/cuxq45q) "builderror.log" - hidden in a *seven* branches deep tree. While the build ... just slowed down? or halted? or took long? Or - what? I had put the seemingly very slow building task on a "screen", CTRL-A-D'ed me away, and decided to do something else for the next hours. 

But it all just repeated, when a generous man gave me a 2GB RAM droplet, where I made 4GB swap, just to be sure. 
Big disappointment: The thing crashed into the same folder - 7 branches deep, did I mention that :-) ?

I could finally solve THAT problem - by [downgrading](https://www.reddit.com/r/node/comments/3kgxym/ram_build_install_on_windows_and_run_start_on/cuxqsy5). And whooosh, building the whole project was done in few seconds.

But then the problems still did not stop. One of these days ... Since this sad morning, all went downhill. I should have really gone to bed, instead of running against those walls again and again and again and again.

## Unlucky day, really. Really?

I spare you the rest. Much more trouble, and despair. 

And also successes, and progress - just enough to keep me going. And I was already too tired ... to give up.

Do you recognize this situation?  You KNOW that it is solvable, because others have solved it before you. And it's just a damn computer, not a moody or psychopathic human. So there is no reason to believe that it will continue to go bad. Suddenly it WILL work. That kept me going. You are reading the linugistic diarrhea of an underslept, overworked, underachieving ... half-nerd = who is today seriously doubting if he should rather give up computers altogether, and start selling delicious tomatoes to friendly tomato buyers, instead.

    
## The happy outcome:

* an issue posted to [npm/npm](https://github.com/npm/npm/issues/9554). Not my best one ever. But the 7 branches deep debug.file without any other mentioning ... ah, I think I already told you - right?  :-) Anyways, perhaps there is something substantial to learn from that bug today?

* *my* *complete* [*INSTALL* *RECIPE*](debian-ubuntu.sh) for this fabulous *light* *weight* *block* *explorer*:

* --> [etherparty/explorer](https://github.com/etherparty/explorer) - I am loving it already, by now I know every line of code of it.
And also know the parts which I do not understand yet. 

* Whew: node.js is quite an abstraction animal. Modules are routed through controllers into a factory to provide services? And where do those injections prick me *lol*? A steep learning curve. But this is really only my second day with it - so I need some patience, I guess.  And together with node.js, all the other necessary tools around it ... golang etherium geth ... can now be easily installed onto an empty droplet - with my new manual. *tattaa*

* BUT: The last meters are not ready yet. So when my bed was calling me loudly, I decided to turn down the offer, and instead start completely anew, but this time inside a ...

# Docker container:
 
My motivation is easy to understand, and two-fold: *You* can identically replicate the situation, so you could help me easier - and the three server ports SHOULD have been easier to connect to *each other*. That was my plan at least. Almost a working day later ... same outcome as above *g*. But I learnt a lot on the way ...

* [docker-messy](docker-messy/Dockerfile) was one of the outcomes that actually ran through. What a mess.
* [docker-clean](docker-clean/Dockerfile) then is the cleaned up version. Unless you have a lot of humor, better go for this one. 

Building takes a a loooong time (result is ~1GB disk) - but it is running through smoothly now. So you can go for a walk into the autumn forest, while the last 2 lines are running:

## Docker Preschool Final Exam:
The first line is for Debian, all the others are [here](https://docs.docker.com/installation/).

    apt-add-repository "http://http.debian.net/debian jessie-backports main" 
    apt-get update; apt-get install -y wget lynx curl screen nano docker.io
    
    mkdir AEEEdocker; cd AEEEdocker
    rm -f Dockerfile start_EthExp_and_geth.sh
    
    wget https://raw.githubusercontent.com/altsheets/explorer/master/how-to/docker-clean/Dockerfile
    wget https://raw.githubusercontent.com/altsheets/explorer/master/how-to/docker-clean/start_EthExp_and_geth.sh
    cat  Dockerfile  start_EthExp_and_geth.sh
    
    LASTHASH=$(docker build -q . | grep Success | awk '{print $3}')
    docker run -i -t -p 8545:8545 -p 30303:30303 -p 8000:8000 $LASTHASH
    
and here you come back from the forest :-) and press

    y 
Enter.

That automatically starts the EthExplorer, and [after pressing y](https://github.com/ethereum/go-ethereum/issues/1799) the blockchain also starts syncing.

Perhaps it might be important to remove the backports? I don't know. But the command is (also see ([*](http://forums.debian.net/viewtopic.php?f=10&t=112926#p535761))):

    sudo apt-add-repository -r "http://http.debian.net/debian jessie-backports main"
    

## Docker - what?
Just for clarification about docker: You now have two systems running: Your
* "host" system = where you input the above commands. And 
* "guest" system = where you pressed "y". 

The "guest" image is based on "FROM ubuntu:14.04.2" and then got all the necessary tools installed in the above build process (see [Dockerfile](docker-clean/Dockerfile)).

The guest ports are EXPOSEd (see bottom of Dockerfile), and then connected to the host machine ports with "-p 8000:8000". 


## Remaining problems

### Problem 1 - port not transparent to the internet

When I am on the host machine I cannot see the ports.
When I am somewhere else on the internet, I cannot see the ports.

Of course, you want to debug it inside the container *guest* machine. That works like this:

    docker run -i -t -p 8545:8545 -p 30303:30303 -p 8000:8000 $LASTHASH /bin/bash
    
    screen -S server /start_EthExp_and_geth.sh
    
    y
Enter.   
Ctrl-A-D to leave the screen. Now see .. that you do see something ...:

    ls
    curl localhost:8000
    curl localhost:8545
    curl localhost:30303
    lynx localhost:8000
    
But from the outside (i.e. open a new terminal to/on the *host* machine):

    curl localhost:8000
    curl localhost:8545
    curl localhost:30303
    lynx localhost:8000
    
it is resulting in *nothing nix nada zilch*. 

http://46.101.137.79:8000 is not visible. I get a 

    This webpage is not available - ERR_CONNECTION_REFUSED
    
...   		

So somehow the port mapping is not working here. With my other docker project, it was no problem at all (see [chaincountdown/docker/](https://github.com/altsheets/chaincountdown/tree/master/docker)) to get the port 8888 mapped to the host machine, and transparent to the internet. 


If you have an idea, try it out:

    nano Dockerfile
    docker build .
    

Yes, a firewall question. Probably. But I am too afraid of iptables, to even look at them.

#### Probably SOLVED
I have found a hack how to solve the above. [Using nginx as a proxy](nginx) - please click!!!! 

But of course, the real solution is better than a workaround. See [#Summary](Summary) at the top.

### Problem 2 - EthExplorer<->geth 
EthExplorer<->geth are not talking to each other.  

The app [is greeting me with](http://46.101.137.79:8001) 

	geth --rpc --rpccorsdomain "http://46.101.137.79:8001"
	
which does not solve it.

I tried all of these:

	geth --rpc --rpccorsdomain "http://46.101.137.79:8000"
	geth --rpc --rpccorsdomain "http://46.101.137.79:8001"
	geth --rpc --rpccorsdomain "http://localhost:8000"
	geth --rpc --rpccorsdomain "http://localhost:8001"
	
but none creates the connection app<->geth.

#### SOLVED

See [Summary](#summary) at the top.


# Should I better drop programming, and take up book writing?

:-)

Bottom line after these day+night+day+day is clear: I might simply suck as a computer freak. * meh * 

Perhaps I should give up? 

Perhaps I should rather write a book to the ... ? /end 


----
ANP (AltSheets Nerd Prose), September 2015, published under giveback-license v05.    
http://altsheets.ddns.net/give. When did you last time support an author? A stay-awake-author?

