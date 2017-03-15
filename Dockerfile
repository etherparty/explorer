FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN rm /usr/src/app/.git
RUN npm install && \
    node_modules/.bin/bower install --allow-root
RUN chmod +x selectRpcAndRun.sh
CMD ["./selectRpcAndRun.sh"]
