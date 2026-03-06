FROM node:18-alpine
WORKDIR /app
COPY package.json .
# Use install since we are regenerating the lockfile
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
