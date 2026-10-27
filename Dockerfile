# First image to compile typescript to javascript
FROM node:24.22.1-alpine AS build-image
WORKDIR /code
COPY . .
RUN npm install
RUN npm run build

# Second image, that creates an image for production
FROM node:24.22.1-alpine AS prod-image
WORKDIR /code
COPY --from=build-image ./code/dist ./dist
COPY package* ./
RUN npm ci --omit=dev --omit=optional \
  # Package managers are not needed at runtime and ship their own vulnerable dependencies
  && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack /opt/yarn-* \
    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack /usr/local/bin/yarn /usr/local/bin/yarnpkg

CMD [ "node", "--no-warnings", "./dist/src/index.js" ]
