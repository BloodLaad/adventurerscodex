#
# Build Step
#
FROM node:14
LABEL org.opencontainers.image.authors="BloodLaad"
LABEL description="Adventures Codex as selfhostable PWA"
WORKDIR /app

# install sw-precache
RUN npm install --global sw-precache

# Copy in the dependencies first so Docker can cache them
COPY package.json .
COPY package-lock.json .
RUN npm install

# Build the project
COPY . .
RUN npm run build

# Prepare PWA
WORKDIR /app/dist
# Rename manifest
RUN mv manifest*?.json manifest.json
# Generate service worker
RUN sw-precache


#
# Deploy Step
#
WORKDIR /app
ENTRYPOINT ["npm", "run", "start"]