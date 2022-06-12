# Stage 1
#"build-stage", based on Node.js, to build and compile the frontend
FROM node:16-alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm run build
CMD ["npm", "start"]

# Stage 2
#based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:stable-alpine
#COPY --from=development /app/build /usr/share/nginx/html
# Copy the default nginx.conf provided by node
#COPY --from=development /nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]