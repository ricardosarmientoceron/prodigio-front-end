#Primera Etapa
FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine

#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/app/dist/proyecto-angular-employees /usr/share/nginx/html

#COPY --from=build-step /app/proyecto-angular-employees /usr/share/nginx/html
#COPY ["docker.Sample.csproj", "docker.Sample/"].