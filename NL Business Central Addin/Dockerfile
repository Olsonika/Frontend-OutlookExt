# Use a Node.js base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build

# Expose the port for the app
EXPOSE 8080

# Set environment variables (will be injected at runtime)
ENV API_BASE_URL=""
ENV API_USER=""
ENV API_PASSWORD=""

# Start the production server
CMD ["npx", "http-server", "dist", "-a", "0.0.0.0"]
