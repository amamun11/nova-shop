# Stage 1: Build React Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend ./frontend
COPY backend/public ./backend/public
RUN cd frontend && npm run build

# Stage 2: Production PHP Application
FROM php:8.3-cli-alpine

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
COPY --from=frontend-builder /app/backend/public /var/www/public

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN cp -n .env.example .env || true && \
    php artisan key:generate --force && \
    mkdir -p /var/www/database && \
    touch /var/www/database/database.sqlite && \
    php artisan migrate --force && \
    php artisan db:seed --force && \
    chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/database

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]
