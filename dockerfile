FROM node:18-alpine3.19 as build

WORKDIR /app

COPY package*.json ./
COPY ./src ./src
COPY tsconfig.json ./

# tmp
# COPY .env ./

RUN npm install

RUN npm run build

RUN rm -r /app/node_modules

# stage 2: run application
FROM node:18-alpine3.19 
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app
# COPY --from=build /app/.env /app

ENV NODE_ENV=production
RUN npm install

CMD ["npm", "run", "prod"]

