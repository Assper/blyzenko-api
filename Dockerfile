FROM node:16

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY nest-cli.json /usr/src/app/nest-cli.json
COPY tsconfig.json /usr/src/app/tsconfig.json
COPY tsconfig.build.json /usr/src/app/tsconfig.build.json
COPY .env /usr/src/app/.env
COPY ./src /usr/src/app/src

RUN npm install

EXPOSE 7000

CMD ["npm", "run", "start:dev"]