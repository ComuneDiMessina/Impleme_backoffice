FROM nginx:1.21.4

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./backoffice/ /usr/share/nginx/html/