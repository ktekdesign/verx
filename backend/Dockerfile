FROM node:21-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 5000

RUN npx prisma generate --schema ./prisma/schema.prisma

CMD ["npm", "run", "dev"]
