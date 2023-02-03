FROM node:14 as base 

# Set Working Directory
WORKDIR /usr/src/app

# Install Dependencies
COPY yarn.lock package.json ./
RUN yarn install

FROM node:14 as builder 

WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ /usr/src/app/

# Copy Project files
COPY . .

# Setting .env variable file
ENV API_URL=#{API_URL}#
ENV AZURE_CLIENT_ID=#{AZURE_CLIENT_ID}#
ENV AZURE_TENANT_ID=#{AZURE_TENANT_ID}#
ENV AZURE_REDIRECT_URI=#{AZURE_REDIRECT_URI}#
ENV AZURE_SCOPE=#{AZURE_SCOPE}#
ENV OOT_REDIRECT_URI=#{OOT_REDIRECT_URI}#
RUN touch .env && \
    echo "REACT_APP_API_URL=$API_URL" >> .env && \
    echo "REACT_APP_AZURE_CLIENT_ID=$AZURE_CLIENT_ID" >> .env && \
    echo "REACT_APP_AZURE_TENANT_ID=$AZURE_TENANT_ID" >> .env && \
    echo "REACT_APP_AZURE_REDIRECT_URI=$AZURE_REDIRECT_URI" >> .env && \
    echo "REACT_APP_AZURE_SCOPE=$AZURE_SCOPE" >> .env && \
    echo "REACT_APP_OOT_REDIRECT_URI=$OOT_REDIRECT_URI" >> .env

## Create production build
RUN yarn add typescript
RUN yarn build

FROM nginx:alpine 

## Remove default nginx index page
RUN rm -rf /etc/nginx/html/index.html

## Copy files to nginx location
COPY --from=builder /usr/src/app/build /etc/nginx/html/
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/nginx.conf

RUN ls -la /etc/nginx/html/

EXPOSE 8000

ENTRYPOINT [ "nginx", "-g", "daemon off;" ] 