# Stage 1: Build React Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./
RUN npm run build

# Stage 2: Production PHP Application (PHP 8.4 required by Laravel 13 & Symfony 8)
FROM php:8.4-cli-alpine

RUN apk add --no-cache \
    sqlite-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    git \
    && docker-php-ext-install pdo pdo_sqlite pcntl bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY backend /var/www
COPY --from=frontend-builder /app/dist/. /var/www/public/

RUN cp -n .env.example .env || true && \
    composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-reqs && \
    php artisan key:generate --force && \
    mkdir -p /var/www/database && \
    touch /var/www/database/database.sqlite && \
    php artisan migrate --force && \
    php artisan db:seed --force && \
    chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/database

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]
