# ---- Base Node ----
FROM node:14-alpine AS base
# Set working directory
WORKDIR /app
# Copy project file
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
# Install production dependencies
RUN npm ci --only=production
# Copy production dependencies
RUN cp -R node_modules prod_node_modules
# Install all dependencies
RUN npm ci

# ---- Release ----
FROM base AS release
# Copy production dependencies
COPY --from=dependencies /app/prod_node_modules ./node_modules
# Copy app sources
COPY . .
# Expose port
EXPOSE 5001
# Start the application
CMD ["npm", "start"]
