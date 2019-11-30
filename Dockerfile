FROM node:10.0.0
RUN mkdir -p /core
WORKDIR /core
COPY ./dist dist
COPY ./config config
COPY ./ecosystem.config.js ecosystem.config.js
COPY package.json package.json 
RUN npm install --production --registry=https://registry.npm.taobao.org
EXPOSE 8080
CMD npm run start