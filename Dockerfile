FROM node:16.13-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN npm install

FROM alpine:3.15

WORKDIR /usr/src/app

# copy from build image
COPY --from=build /usr/src/app .

RUN apk add --update nodejs=16.14.2-r0 --no-cache

EXPOSE 5000

CMD ["node", "src/index.js"]
