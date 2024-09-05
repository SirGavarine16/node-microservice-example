FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./src /app/src

COPY ./tsconfig.json /app

CMD ["npm", "run", "dev"]