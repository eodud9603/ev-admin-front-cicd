
# base image
FROM node:18.12.1 as build

# set working directory
WORKDIR /app

# copy package.json and yarn.lock
COPY package.json yarn.lock ./

# install dependencies
RUN yarn install --frozen-lockfile

# copy source files
COPY . .

# build application
RUN yarn build

# new base image
FROM nginx:1.19.0
# copy dist folder from build image to nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# expose port
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
