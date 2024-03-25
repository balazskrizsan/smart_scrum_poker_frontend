FROM nginx:alpine

COPY /dist/sj /usr/share/nginx/html

EXPOSE 80
