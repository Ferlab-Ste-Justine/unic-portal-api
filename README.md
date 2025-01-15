<p align="center">
  <img src="unic-logo.svg" alt="unic-logo" width="300" />
</p>
<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge" alt="License"></a>
</p>

# unic-portal-api

GraphQL API application for the UNIC portal, with an integration with [Keycloak](https://www.keycloak.org/docs/latest/securing_apps/index.html#_nodejs_adapter) for authentication.

## Development

Certificat ca-unic-qa.crt + VPN required.

* Fill `.env` with the right values matching `.env.example` and your environment.
* Add crt path to `NODE_EXTRA_CA_CERTS=`
* Installing dependencies: `npm install`
* Run `npm run dev`

## Test build and Start

* Execute: `npm run build` then `npm run start`

### General

* Make sure that all the needed env vars point to where they should

* When adding a new env var, please update the `.env.example`

### Test

* Execute: `npm run test`
