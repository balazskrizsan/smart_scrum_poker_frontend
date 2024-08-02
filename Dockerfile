FROM nginx:alpine

COPY /dist/sj /usr/share/nginx/html
COPY /Dockerfile_nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
