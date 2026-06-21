# microservice-platform

A two-service Docker platform (user-service + product-service) connected via docker-compose. Use this repo to practice branching across multiple services, Docker builds, and multi-service coordination.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐
│   user-service  │     │  product-service  │
│   Port 3001     │     │  Port 3002        │
│   Node.js       │     │  Node.js          │
│   GET /users    │     │  GET /products    │
│   POST /users   │     │  POST /products   │
└────────┬────────┘     └────────┬──────────┘
         │                       │
         └──────────┬────────────┘
                    │
            docker-compose.yml
```

## Run Locally

**Requirement:** Docker Desktop installed and running. Git Bash works with Docker.

```bash
cd sample-repositories/microservice-platform

# Build and start both services
docker-compose up --build

# Services available at:
# http://localhost:3001  → user-service
# http://localhost:3002  → product-service

# Stop all services
docker-compose down
```

## Test the APIs

```bash
# User service
curl http://localhost:3001/users
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Sarowar","email":"sarowar@example.com"}'

# Product service
curl http://localhost:3002/products
curl http://localhost:3002/products/1
```

## Structure

```
microservice-platform/
├── docker-compose.yml
├── .gitignore
├── user-service/
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
└── product-service/
    ├── app.js
    ├── package.json
    └── Dockerfile
```

## Git Practice Scenarios

- Branch off `main`, update both services, merge back
- Practice merge conflicts when two branches change the same service
- Tag releases that coordinate both services (e.g., `v1.2.0`)
- Use `git log -- user-service/` to see only changes to one service
