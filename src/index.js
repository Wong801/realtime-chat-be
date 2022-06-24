const cors = require('cors')
const express = require("express");
const app = express()
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: '*'
  }
});
require("./loaders")(app);
require("./service/socket")(io)

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

http.listen(port, () => {
  console.log(`Listening on port *:${port}`);
});