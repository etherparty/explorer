FROM ubuntu:16.04

RUN apt-get update && apt-get install -y nodejs npm
RUN apt-get install -y curl && npm cache clean -f && npm install -g n && n stable
RUN apt-get install -y net-tools

WORKDIR /explorer
COPY . .

EXPOSE 8000
CMD ["npm","start"]
