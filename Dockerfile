FROM node:latest
RUN mkdir /src
WORKDIR /src
RUN npm install -g yarn
COPY . ./
RUN yarn
CMD ["yarn","start"]
