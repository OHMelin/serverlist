FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/.output /app/.output

COPY --from=build /app/server/instrumentation.mjs /app/instrumentation.mjs
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "--import", "/app/instrumentation.mjs", ".output/server/index.mjs"]
