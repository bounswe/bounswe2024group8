FROM node:20.18.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React app for production
RUN npm run build

# Expose the default port (change if necessary)
EXPOSE 3000

# Start the application (use a static server for production, e.g., serve)
RUN npm install -g serve
CMD ["serve", "-s", "build"]