FROM node:18.15-alpine AS base
RUN npm install -g npm@latest

FROM base AS builder
WORKDIR /opt/cvjob
COPY ./ ./
RUN npm ci --quiet && npm run build

FROM base
WORKDIR /opt/cvjob
ENV NODE_ENV production
COPY package*.json ./
RUN npm ci --omit=dev --quiet
COPY --from=builder /opt/cvjob/dist ./dist
CMD [ "node", "dist/index.js" ]
