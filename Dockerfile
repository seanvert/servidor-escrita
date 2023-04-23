#syntax=docker/dockerfile:1
FROM node:slim

ENV NODE_ENV=production

WORKDIR /app

RUN git clone https://github.com/seanvert/servidor-escrita.git /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["yarn", "start"]
