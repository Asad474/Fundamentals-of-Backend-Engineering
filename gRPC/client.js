const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:4000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: "Coding",
  },
  (err, response) => {
    console.log("Received from the server", JSON.stringify(response));
  }
);

client.readTodos({}, (err, response) => {
  console.log("Todos Received from the server", JSON.stringify(response));
});

const call = client.readTodosStream();
call.on("data", (item) => {
  console.log("Receieved Item from server", JSON.stringify(item));
});

call.on("end", (e) => console.log("Server done."));
