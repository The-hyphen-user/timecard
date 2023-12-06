FROM node:16-alpine

WORKDIR /backend
COPY package.json .
RUN yarn install --production  # Install only production dependencies
COPY . .
CMD ["yarn", "start"]
