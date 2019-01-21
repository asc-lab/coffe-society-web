FROM nginx
MAINTAINER ASC-LAB

COPY ./nginx/nginx.conf /etc/nginx/

COPY ./nginx/conf.d/* /etc/nginx/conf.d/

COPY ./build /usr/share/nginx/html
