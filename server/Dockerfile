# Use Node.js base image
FROM node:20-bullseye

# Set working directory
WORKDIR /app

ARG CACHEBUST=1

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 5000
