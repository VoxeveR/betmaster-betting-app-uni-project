# Użyj oficjalnego obrazu Node.js do budowania aplikacji
FROM node:18 as build

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki projektu
COPY package.json yarn.lock ./

# Zainstaluj zależności
RUN yarn install

# Skopiuj resztę kodu aplikacji
COPY . .

# Zbuduj aplikację
RUN yarn build

# Użyj lekkiego obrazu Nginx do serwowania plików
FROM nginx:alpine

# Skopiuj zbudowane pliki do katalogu Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Skopiuj niestandardową konfigurację Nginx (opcjonalnie)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ustaw port, na którym będzie działać Nginx
EXPOSE 80

# Uruchom Nginx
CMD ["nginx", "-g", "daemon off;"]