# Step 1: Base image
FROM node:14

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy application files
COPY . .

# Step 5: Expose the port and run the app
EXPOSE 5000
CMD ["npm", "start"]
