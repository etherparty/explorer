FROM node:10.15.0-alpine

WORKDIR /app

COPY . .
RUN apk add --no-cache make gcc git musl-dev linux-headers
RUN sed -i "s/bower install/bower install --allow-root/" package.json
RUN npm install --unsafe-perm

RUN npm config set unsafe-perm true
RUN chmod +x /app/docker/entrypoint.sh

ENTRYPOINT [ "/app/docker/entrypoint.sh" ]
