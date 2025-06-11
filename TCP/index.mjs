import net from "net";

const server = net.createServer((socket) => {
  console.log(
    `TCP handshake successful with ${socket.remoteAddress}:${socket.remotePort}`
  );

  socket.write("Hello Client");

  socket.on("data", (data) => {
    console.log(`Recieved data: ${data.toString()}`);
  });
});

server.listen(8080, () => {
  console.log("Server is listening at port 8080");
});
