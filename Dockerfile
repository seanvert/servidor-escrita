#syntax=docker/dockerfile:1
FROM node:slim

ENV NODE_ENV=production

WORKDIR /app

RUN git clone https://github.com/seanvert/servidor-escrita.git /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

# this can be uncommented to run locally if there is no internet connection or gh is unavailable
# COPY . .

CMD ["yarn", "start"]
