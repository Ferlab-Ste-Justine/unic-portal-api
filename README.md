<p align="center">
  <img src="ferlab.png" alt="ferlab repository img" width="200" />
</p>
<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge" alt="License"></a>
</p>

# unic-portal-api

This is an GraphQL API application for the UNIC portal, with an integration with [Keycloak](https://www.keycloak.org/docs/latest/securing_apps/index.html#_nodejs_adapter) for authentication.

## Development

* Edit start.sh
* Execute: `sh start.sh`

## Test build and Start

* Execute: `npm run build` then `npm run start`

### General

* Make sure that all the needed env vars point to where they should.

* When adding a new env var, update the .env.example. Otherwise, an error will be thrown.

* Installing dependencies: `npm install`.

### Test

* Execute: `npm run test`
