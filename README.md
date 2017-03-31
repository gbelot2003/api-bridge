# api-bridge
Watch changes in a folder in a server 'A' and when a file has been uploaded to this via ssh/sftp this server in node.js will parse the file and will send it to another server 'B' to save it in a datastore.

1. git clone https://github.com/normancarcamo/api-bridge
2. cd api-bridge
3. npm install
4. set environment variables or write them directly into the file "settings.js"
5. npm run serve (recommended), npm run dev (using nodemon to debug), npm start (without nodemon but still been dev mode).
