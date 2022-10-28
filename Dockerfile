FROM node:lts-alpine
ENV NODE_ENV=stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]