FROM ubuntu:14.04.2

# golang etherium buildtools nodejs ethexplorer startscript
#
# v012
#
# clean version ... for trial and error see docker2 Dockerfile
# this whole installation ... runs through almost perfectly.
# 
# BUT the server can only be seen from inside the container.
# help help HELP please
# thx
#

# GOPATH, export GOPATH
RUN mkdir -p /root/go
ENV GOPATH /root/go
ENV PATH /root/go/bin:$PATH

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update; apt-get upgrade -y

RUN apt-get install -qy build-essential mercurial software-properties-common

# golang
RUN add-apt-repository ppa:ethereum/ethereum
RUN apt-get update
RUN apt-get install -qy golang

# etherium
RUN sudo apt-get install -y ethereum

# useful for /bin/bash debugging:
RUN apt-get -y install wget tar git sudo curl screen lynx

# node.js
RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
RUN sudo apt-get install -y nodejs
RUN npm install -g bower

# EthExplorer
RUN git clone https://github.com/etherparty/explorer

# build
RUN cd /explorer; npm install
RUN cd /explorer; bower --allow-root install

# start script that will start both servers:
ADD start_EthExp_and_geth.sh /start_EthExp_and_geth.sh
RUN sudo chmod uga+x /start_EthExp_and_geth.sh

EXPOSE 8000 8545 30303

CMD /bin/sh /start_EthExp_and_geth.sh



# /start_EthExp_and_geth.sh #
#############################
# cd /explorer
# npm start &
# geth geth --rpc --rpccorsdomain "http://localhost:8000"
#


# Problem:
# The server can only be seen from inside the container.
# see README-how-to.md for details
#