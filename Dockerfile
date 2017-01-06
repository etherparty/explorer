FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN chmod +x selectRpcAndRun.sh
CMD ["selectRpcAndRun.sh"]
