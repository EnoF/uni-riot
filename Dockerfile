FROM node:6.8.0

ARG proxy
ARG noproxy

ENV no_proxy=${noproxy}
ENV http_proxy=${proxy}
ENV https_proxy=${proxy}

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
COPY ./dist /usr/app/dist
