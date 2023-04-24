FROM node:16-alpine
WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i --legacy-peer-deps
EXPOSE 3000
CMD ["npm", "start"]