# FROM node:16-alpine
# WORKDIR '/app'
# COPY ./package.json ./
# RUN yarn
# COPY . .
# CMD ["yarn", "start"]


# FROM node:16-alpine as builder
# WORKDIR /app
# COPY package.json .
# # COPY yarn.lock .
# RUN yarn
# COPY . .
# RUN yarn build

# FROM nginx:alpine
# EXPOSE 3000
# COPY --from=builder /app/build /usr/share/nginx/html
# # COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:alpine
# EXPOSE 80
# # COPY ./nginx/default.conf /etx/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html
# # CMD ["nginx", "-g", "daemon off;"]



FROM node:alpine as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

#for react router
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]