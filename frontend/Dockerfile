# Fetching the minified node image on apline linux
FROM node:20

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /frontend

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Exposing server port
EXPOSE 3000

# Starting our application
CMD npm run dev
