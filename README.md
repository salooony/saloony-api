# 💼 Saloony API

Saloony is a RESTful API built with [NestJS](https://nestjs.com/) designed to serve as the backend for a modern salon management platform. It provides modular, scalable architecture with built-in configuration, validation, and Swagger documentation.

## ⚙️ Requirements

* [Docker](https://www.docker.com/) (required)
* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)

---

## 🧰 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/saloony.git
   cd saloony
   ```

2. **Copy environment file**:

   ```bash
   cp .env.dist .env
   ```

3. **Start the application using Docker Compose**:

   ```bash
   docker compose up --build
   ```

> This will automatically build the image and start the API container.

---

## 📄 Environment Variables

Saloony uses a `.env` file to configure the app. You’ll find a sample in `.env.dist`.

### Example:

```env
# Application
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=nestuser
DB_PASSWORD=changeme
DB_NAME=saloony

# Authentication
JWT_SECRET=supersecretkey
```

---

## 🐳 Running with Docker

1. **Build and start the stack**:

   ```bash
   docker compose up --build
   ```

2. **Stop the stack**:

   ```bash
   docker compose down
   ```

> Make sure your `.env` file is correctly configured before starting.

---

## 📚 Swagger API Docs

After starting the server, the Swagger documentation is available at:

```
http://localhost:3000/api
```

---

## 🧪 Scripts (for container development only)

You can still run scripts manually inside the container:

```bash
docker exec -it saloony-api npm run build
```
