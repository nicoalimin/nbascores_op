############################
# Build container
############################
FROM node:10-alpine AS dep

WORKDIR /ops

RUN apk add python make
ADD package.json .
RUN npm install && \
npm i @babel/core && \
npm i @babel/node && \
npm i babel-node

ADD . .

############################
# Final container
############################
FROM node:10-alpine

WORKDIR /ops

COPY --from=dep /ops .
