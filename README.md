## UI repo

npm i
npm start


#To trigger a webhook build 
curl -X POST -d {} "https://webhooks.amplify.us-east-1.amazonaws.com/prod/webhooks?id=5cf7a352-ef80-490b-a8ec-f7dd37d97b79&token=jZxV5MwnV47TUeQbuJIXD3gyrbJR8V9l04WFxHARM&operation=startbuild" -H "Content-Type:application/json"
