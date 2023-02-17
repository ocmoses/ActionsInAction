FROM node:16.8.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

RUN apt-get update && apt-get install nginx -y
RUN apt install vim -y && apt install net-tools && apt install telnet
COPY default /etc/nginx/conf.d
COPY default /etc/nginx/sites-enabled
RUN service nginx restart

CMD ["npm", "run", "start"]
