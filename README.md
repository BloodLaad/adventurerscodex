# My Adventurers Codex

Fork of [Adventurers Codex](https://github.com/adventurerscodex/adventurerscodex). Reverted to last selvhostable Version.

Added PWA features for offline usage and Container for easy hosting.

## Setup

Docker:
```bash
docker run -p 8080:8080 --rm --name adventurerscodex ghcr.io/bloodlaad/adventurerscodex:master
```

Manual:
- Run `npm install`
- Run `npm run build`
- Link generated manifes.\<fingerprint\>.json in index.html
- Run `npx sw-precache`in the dist directory.
- Run `npm run start`

## Refs

- manifest.json
  - https://www.npmjs.com/package/webpack-pwa-manifest?activeTab=readme
- Service Worker
  - https://dev.to/developertharun/convert-any-website-into-a-pwa-in-just-3-simple-steps-35pp
- Project sadly to old
  - https://webpack.js.org/guides/progressive-web-application/