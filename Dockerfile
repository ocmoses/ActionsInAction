FROM node:16.8.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

RUN apt update && apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring -y
RUN curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
| tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
    | tee /etc/apt/sources.list.d/nginx.list
RUN echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
    | tee /etc/apt/preferences.d/99nginx
RUN apt update && apt install nginx -y
RUN apt install vim -y && apt install net-tools && apt install telnet
COPY default /etc/nginx/conf.d
COPY default /etc/nginx/sites-enabled
#RUN service nginx restart

#CMD ["npm", "run", "start"]
CMD ["sh", "start.sh"]
