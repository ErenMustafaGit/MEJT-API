# MEJT-API

[MEJT URL](https://mejt.erenc.fr/)

## Project Structure

```
.
├── app.js
├── config/
├── controllers/
├── node_modules/
├── package.json
├── routes/
│   ├── demo.route.js
│   └── index.js
├── services/
├── common/
├── vercel.json
└── yarn.lock
```

### Brief Overview

#### `app.js`

Express app entry point

#### `config/`

for configuration stuff... for example, database connection setup

#### `controllers/`

mostly express route handlers

#### `node_modules/`

black hole 🙃

#### `routes/`

- `index.js` – bootstraps all routes. new namespaces should always be registered here
- `demo.route.js` – sample standalone route

#### `services/`

for "external" services (e.g. a weather.service.js file for interacting with darksky API)
