# golang - ether - node.js - EthExplorer 
# build  - config - start - on Debian 8
#
# AltSheets, September 2015
#
# Creating this took many many hours ... see how-to/README.md
# please donate if you can: altsheets.ddns.net/give Thanks!

# clean situation:
apt-get update; apt-get upgrade -y; apt-get -y autoremove

# install dependencies
apt-get install -qy build-essential software-properties-common mercurial python-software-properties 
apt-get install -qy libgmp3-dev git screen sudo tar curl wget    

# golang, GOPATH, PATH
curl -O https://storage.googleapis.com/golang/go1.4.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.4.2.linux-amd64.tar.gz

mkdir -p ~/go/bin; echo "export GOPATH=$HOME/go" >> ~/.bashrc
echo "export PATH=\$PATH:$HOME/go/bin:/usr/local/go/bin" >> ~/.bashrc
source ~/.bashrc

# etherium

# ubuntu: 
add-apt-repository -y ppa:ethereum/ethereum
apt-get install -y ethereum

# debian:
add-apt-repository -ry ppa:ethereum/ethereum
apt-get update
git clone https://github.com/ethereum/go-ethereum
cd go-ethereum
make geth
ln -s ~/go-ethereum/build/bin/geth ~/go/bin/


# node.js
cd ~
# curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y nodejs
npm install -g bower


# EthExplorer
cd ~
git clone https://github.com/altsheets/explorer
cd explorer 

# huge swapfile, for building:
swapoff /swap
dd if=/dev/zero of=/swap bs=50M count=80
chmod 0600 /swap
mkswap /swap
swapon /swap
cp /etc/fstab /etc/fstab.ORIGINAL
echo "/swap  none  swap  sw 0  0" > /etc/fstab

# build
npm install
bower --allow-root install

# configure EthExplorer
nano app/app.js 	# change GETH_HOSTNAME to your hostname or IP address
nano package.json	# change scripts--> start --> localhost

# start EthExplorer
screen -S EthExp npm start
# Ctrl A-D to leave screen


# open your browser at
# http://your.ipaddress.or.hostname:8000
# copy the shown geth command

# start ethereum
screen -S ether sh -c '##### paste the shown geth command here #####'
# Ctrl A-D to leave screen

screen -ls
screen -r EthExplorer

# reload your browser at
# http://your.ipaddress.or.hostname:8000

# Problems: all solved.
# Read more at how-to/README.md
