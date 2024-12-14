# Use Node.js for building
FROM node:20.8.1 as builder

# Set working directory
WORKDIR /src

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and build React app
COPY . .
RUN npm run build

# Serve the app with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
