
require('dotenv').config();

const express = require("express");
const cors = require('cors');

const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routers/index");

const app = express();
app.disable('x-powered-by');
app.use(cors({
    origin: "*"
}))

// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));

app.use(index);

const userRouter = require('./routers/user');
app.use('/user', userRouter);
const roomRouter = require('./routers/room');
app.use('/room', roomRouter);
const messageRouter = require('./routers/message');
app.use('/message', messageRouter);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
//   set time to make the socket check
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
    // get messages, later try to avoid findmany
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

app.get('*', (req, res) => {
    res.json({ ok: true });
});

server.listen(port, () => console.log(`Listening on port ${port}`));



// // ----- working socket

// require('dotenv').config();

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const port = process.env.PORT || 4001;
// const index = require("./routers/index");

// // const cors = require('cors');
// const app = express();
// // app.disable('x-powered-by');
// // app.use(cors({
// //     origin: "*"
// // }))


// app.use(index);

// const server = http.createServer(app);

// const io = socketIo(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   });

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

// server.listen(port, () => console.log(`Listening on port ${port}`));







// -------------------------------- old working code
// // Load our .env file
// require('dotenv').config();

// // Import express and cors
// const express = require('express');
// const cors = require('cors');

// // Set up express
// const app = express();
// app.disable('x-powered-by');
// app.use(cors({
//     origin: "*"
// }))
// // Tell express to use a JSON parser middleware
// app.use(express.json());
// // Tell express to use a URL Encoding middleware
// app.use(express.urlencoded({ extended: true }));

// const port = process.env.PORT || 4000;


// const userRouter = require('./routers/user');
// app.use('/user', userRouter);
// const roomRouter = require('./routers/room');
// app.use('/room', roomRouter);
// const messageRouter = require('./routers/message');
// app.use('/message', roomRouter);


// // Set up a default "catch all" route to use when someone visits a route
// // that we haven't built
// app.get('*', (req, res) => {
//     res.json({ ok: true });
// });

// // Start our API server

// app.listen(port, () => {
//     console.log(`\n Server is running on http://localhost:${port}\n`);
// });
