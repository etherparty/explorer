In between, there were problems:

openssl is already the newest version.
openssl set to manually installed.
Some packages could not be installed. This may mean that you have requested an impossible situation or if you are using the unstable distribution that some required packages have not yet been created or been moved out of Incoming. The following information may help to resolve the situation:

The following packages have unmet dependencies:
 libssl-dev : Depends: libssl1.0.0 (= 1.0.1k-3+deb8u1) but 1.0.2d-1 is to be installed
E: Unable to correct problems, you have held broken packages.

I did:

    apt-get remove libssl-dev libssl1.0.0
    apt-get install libssl-dev

which worked, but many packages were removed on the way - so let's see if I have made it worse or better :-)

