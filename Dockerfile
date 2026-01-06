FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --include=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
