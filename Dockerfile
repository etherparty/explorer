FROM iojs
ADD app /app
ADD .bowerrc /
ADD bower.json /
ADD karma.conf.js /
ADD package.json /
WORKDIR /
RUN npm install
ADD selectRpcAndRun.sh /
CMD /selectRpcAndRun.sh

