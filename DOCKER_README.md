# Rizon Technologies – Docker Setup

## Services & Ports

| Service     | URL / Port                    |
|-------------|-------------------------------|
| Laravel app | http://localhost:8000         |
| phpMyAdmin  | http://localhost:8080         |
| MySQL       | localhost:**3307** (host only)|

---

## Project Structure After Adding Files

```
rizon/
├── docker/
│   ├── nginx/
│   │   └── default.conf        ← Nginx virtual host
│   └── php/
│       └── Dockerfile          ← PHP 8.3-FPM + Composer + Vite build
├── docker-compose.yml
├── .dockerignore
└── .env.docker                 ← Copy this to .env
```

---

## First-Time Setup

### 1. Copy the env file
```bash
cp .env.docker .env
```

### 2. Build images and start all containers
```bash
docker compose up -d --build
```
> First build takes a few minutes — it installs Composer deps and runs `npm run build` inside the image.

### 3. Generate the app key
```bash
docker compose exec app php artisan key:generate
```

### 4. Run migrations
```bash
docker compose exec app php artisan migrate --force
```

### 5. (Optional) Seed the database
```bash
docker compose exec app php artisan db:seed
```

Visit http://localhost:8000 — your site should be live.

---

## Daily Usage

```bash
# Start everything
docker compose up -d

# Stop everything (data is preserved)
docker compose down

# Rebuild after changing Dockerfile or package.json/composer.json
docker compose up -d --build

# Tail logs from all containers
docker compose logs -f

# Tail logs from one container
docker compose logs -f app

# Run any Artisan command
docker compose exec app php artisan <command>

# Open a shell inside the app container
docker compose exec app bash

# Run composer
docker compose exec app composer <command>
```

---

## Frontend Development (Hot Reload)

The Dockerfile builds assets at image build time (`npm run build`).
For live hot-reload during development, run Vite directly on your **host machine** (outside Docker) alongside the Docker stack:

```bash
# Terminal 1 – start Docker stack
docker compose up -d

# Terminal 2 – run Vite on host (uses your local Node)
npm run dev
```

Vite's `vite.config.js` already has `host: '0.0.0.0'` and `hmr: { host: 'localhost' }` set, so this works out of the box.

---

## Resetting the Database

```bash
# Wipe DB volume and start fresh
docker compose down -v
docker compose up -d
docker compose exec app php artisan migrate --seed
```

---

## Notes

- **`DB_HOST` must be `mysql`** (the Docker service name), not `127.0.0.1`.
- MySQL is on host port **3307** to avoid conflicts with any locally installed MySQL.
- The `queue` container runs `php artisan queue:work` automatically on startup.
- `SESSION_DRIVER=database` and `CACHE_STORE=database` match your `.env.example` defaults.
- Storage and bootstrap/cache are in named volumes so they persist across container restarts.
