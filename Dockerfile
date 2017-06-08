# To run app in the container do this (fill <host-ip> with your IP address):
# docker build --tag bookmarks-app:latest .
# docker run --name bookmarks-app-container --env DATABASE_URL=postgres://postgres@<host-ip>:5432/bookmarks-db -p 3000:3000 bookmarks-app

FROM node:8.0.0
MAINTAINER Josef Zavisek

# ARG number
# RUN echo $number

# Create new service account with home folder
RUN useradd --user-group --create-home --shell /bin/false nodejs

# Set environment variables
ENV HOME=/home/nodejs

# Create home directory and set rights for service account
RUN mkdir -p $HOME/app
RUN chown -R nodejs:nodejs $HOME/*

# Switch current user to service account
USER nodejs

# Set working dir
WORKDIR $HOME/app

# Install dependencies
COPY package.json .
RUN npm install --production

# Copy source codes
COPY . .

# Run server
CMD ["node", "."]
