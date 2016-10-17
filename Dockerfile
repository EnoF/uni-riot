FROM node:6.8.0

RUN npm -g install yarn

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY ./package.json /usr/app/package.json
RUN yarn install

COPY ./index.js /usr/app/index.js
COPY ./.babelrc /usr/app/.babelrc
COPY ./web.js /usr/app/web.js
COPY ./webpack.config.js /usr/app/webpack.config.js
COPY ./src /usr/app/src
