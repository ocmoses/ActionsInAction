FROM node:16.8.0 as build-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN pwd
RUN ls -latr
RUN apt-get update && apt-get install nginx -y
RUN apt install vim -y && apt install net-tools && apt install telnet
COPY default /etc/nginx/sites-enabled
RUN /etc/init.d/nginx reload
RUN service nginx restart
# Nginx
# FROM nginx:latest
# COPY --from=build-deps /app/.next /usr/share/nginx/html
# EXPOSE 80
CMD ["npm", "run", "start"]