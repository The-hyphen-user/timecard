FROM node:16-alpine

WORKDIR /backend
COPY package.json .
RUN yarn
COPY . .
CMD ["yarn", "start"]
