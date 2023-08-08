# Build stage
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Production stage
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 5001
CMD [ "node", "server.js" ]
