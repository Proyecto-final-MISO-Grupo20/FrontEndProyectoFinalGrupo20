# STAGE 1
# Use the official Node.js image
FROM node:18-alpine as build

# Create user and group
RUN addgroup -S group20Group && adduser -S group20 -G group20Group

# Set the working directory
WORKDIR /abc-jobs-frontend

# Copy dependencies files
COPY package.json .

# Install pnpm
RUN npm i -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of files
COPY . .

# Build the web application
RUN pnpm build


# STAGE 2
# Use the official Nginx image
FROM nginx

# Copy the Angular app build to nginx directory
COPY --from=build /abc-jobs-frontend/dist/group20-frontend /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the host system
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
