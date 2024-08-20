# Fetching the minified node image on apline linux
FROM node:20

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /backend

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install
RUN npm install --save-dev sequelize-cli

# Starting our application
CMD [ "node", "app.js" ]

# Exposing server port
EXPOSE 3000