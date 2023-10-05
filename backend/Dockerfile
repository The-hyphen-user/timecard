FROM node:14

WORKDIR /server
COPY package.json .
RUN yarn
COPY . .
CMD ["yarn", "start"]
