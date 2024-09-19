FROM node:lts-alpine as build

ENV VITE_CONTACT_SERVICE_URL http://188.245.151.183:8080/api/v1/person

ENV VITE_ORDER_SERVICE_URL=http://188.245.151.183:8081/api/v1/order

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
