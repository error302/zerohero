# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy app files
COPY server.js ./
COPY public/ ./public/
COPY data/ ./data/

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
