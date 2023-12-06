# FROM node:16-alpine
# WORKDIR '/app'
# COPY ./package.json ./
# RUN yarn
# COPY . .
# CMD ["yarn", "start"]


FROM node:16-alpine as builder
WORKDIR /app
COPY package.json .
# COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html


# FROM nginx:alpine
# EXPOSE 80
# # COPY ./nginx/default.conf /etx/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html
# # CMD ["nginx", "-g", "daemon off;"]