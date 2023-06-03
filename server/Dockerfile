FROM node:alpine
WORKDIR api/app
COPY package*.json .
RUN npm i
COPY . . 
CMD ["node", "index.js"]