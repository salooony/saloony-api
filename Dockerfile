FROM node:22-alpine

WORKDIR /app

# Needed for puppeteer (whatsapp-web.js) on Alpine (musl).
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

# Avoid downloading Chrome-for-Testing (glibc) which won't run on Alpine.
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package.json package-lock.json ./

RUN npm install --include=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
