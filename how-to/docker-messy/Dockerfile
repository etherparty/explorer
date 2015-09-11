FROM ubuntu:14.04.2

# v010
#
# one of many attempts to get this thing running. 
# want inspiration what to try ... feel free to look here.
# for a clean version ... see   docker1 Dockerfile 

# Export GOPATH
ENV GOPATH /root/go
ENV PATH /root/go/bin:$PATH

# GOPATH
RUN mkdir -p /root/go

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -qy git mercurial software-properties-common
RUN apt-get install -qy libgmp3-dev libreadline6-dev
RUN apt-get install -qy build-essential

# golang
RUN add-apt-repository ppa:ethereum/ethereum
RUN apt-get update
RUN apt-get install -qy golang

RUN sudo apt-get install -y ethereum;


# useful for /bin/bash debugging:
RUN apt-get -y install wget tar git sudo curl screen lynx


# node.js

RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
# RUN curl -sL https://deb.nodesource.com/setup | sudo bash -

RUN sudo apt-get install -y nodejs

# RUN npm install --unsafe-perm -g bower

RUN npm install -g bower




# if that stupid fucking idiot bower 
# really has to be run as non-root, then:
# RUN useradd nodeuser -g root 2> /dev/null
# RUN echo "nodeuser ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/nodeuser
# *grrr* there is no need for non-root security inside docker containers *grrr*
# dunno which folders to open for him, nothing works. 
# And that beast is never cleaning up, seemingly. Lots of rm ... needed
# RUN chmod -R -f g+rwX /



# EthExplorer

RUN git clone https://github.com/etherparty/explorer

# RUN sudo chmod -R u+rwX /explorer
# RUN sudo chmod -R g+rwX /explorer
# RUN sudo chown -R nodeuser /explorer

# RUN cd /explorer rm -f -r node_modules; npm --allow-root install

# RUN cd /explorer rm -f -r node_modules;

# RUN sudo -u nodeuser sh -c "cd /explorer; npm install"


RUN cd /explorer; npm install

#RUN sudo chmod -R 777 /root/.npm
#RUN sudo chmod -R 777 /explorer
#RUN sudo chmod -R 777 /root

# RUN sudo -u nodeuser sh -c "cd /explorer; bower install"
# RUN cd /explorer; bower install

RUN cd /explorer; bower --allow-root install

# RUN sudo chmod -R 777 /root/.npm
# RUN sudo chmod -R 777 /explorer
# RUN sudo chmod -R 777 /root


RUN echo because echo
ADD start_EthExp_and_geth.sh /start_EthExp_and_geth.sh
RUN sudo chmod uga+x /start_EthExp_and_geth.sh
RUN echo copied starterscript


# accept the "Disclaimer of Liabilites and Warranties"
# RUN mkdir -p /tmp/embark/keystore
# doesn't work i.e. run container with -i -t for the time being


EXPOSE 8000 8545 30303

CMD /bin/sh /start_EthExp_and_geth.sh
