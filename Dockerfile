FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g npm@8.5.4
RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:16 as build

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma/schema.prisma ./dist/prisma
COPY --from=builder /app/prisma/migrations ./dist/prisma/migrations

EXPOSE 8080
CMD [ "node", "dist/src/main", "--force-node-api-uncaught-exceptions-policy=true"]