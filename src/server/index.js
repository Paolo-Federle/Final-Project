
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
  interval = setInterval(() => getApiAndEmit(socket), 5000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
    // get messages, later try to avoid findmany
    // Fetch?
    // getByRoomId(roomId)
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

app.get('*', (req, res) => {
    res.json({ ok: true });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
