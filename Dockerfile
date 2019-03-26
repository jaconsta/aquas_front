FROM node:10

RUN npm install -g yarn

# Dependencies
WORKDIR /app/
COPY package.json yarn.lock ./
RUN yarn

COPY . ./

# Run test
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
