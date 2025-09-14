FROM node:18-alpine AS build

# Build args (set when running `docker build --build-arg ...`)
ARG VITE_API_URL="http://localhost:8000"
ARG NODE_ENV=production

# Make sure Vite picks up VITE_* env vars at build time
ENV VITE_API_URL=${VITE_API_URL}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Install dependencies (copy package files first for caching)
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source
COPY . .

# Build production assets
RUN npm run build

FROM nginx:stable-alpine AS production

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (if provided)
# If you created nginx.conf (see below), copy it and use it.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
