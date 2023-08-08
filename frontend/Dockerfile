# Base image
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --quiet

# Copy the source code to the working directory
COPY . .

# Build the React app
RUN npm run build

# ========

# Stage 2: Serve the production-ready React app with Node.js
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage to the current stage
COPY --from=build /app/build ./build

# Install a lightweight HTTP server
RUN npm install -g http-server

# Expose the container's port
EXPOSE 80

# Start the HTTP server to serve the React app
CMD ["http-server", "-p", "80", "./build"]
