# Sample Repositories

Three fully working repositories for hands-on practice.

| Repository | Stack | Purpose |
|-----------|-------|---------|
| [company-website/](company-website/) | HTML/CSS/JS | Static site — deploy to Render Static Site |
| [ecommerce-app/](ecommerce-app/) | Node.js / Express | REST API — deploy to Render Web Service |
| [microservice-platform/](microservice-platform/) | Node.js + Docker | Two-service Docker platform — run locally |

## Quick Start

```bash
# Static site — open directly in browser
open sample-repositories/company-website/index.html

# Express API — run locally
cd sample-repositories/ecommerce-app
npm install
node app.js
# http://localhost:3000

# Microservice platform — requires Docker Desktop
cd sample-repositories/microservice-platform
docker-compose up --build
# user-service:    http://localhost:3001
# product-service: http://localhost:3002
```

See [Lab 10](../labs/lab-10-deployment/README.md) for Render deployment instructions.
