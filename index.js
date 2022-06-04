const express = require("express");
const cors = require("cors");
const { FetchError, default: fetch } = require("node-fetch");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Server is connected" });
});

const run = async () => {
  app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const userRes = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const userData = await userRes.json();

    const todosRes = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    const todosData = await todosRes.json();
    const todosWithoutUserId = todosData.map((todos) => {
      delete todos.userId;
      return todos;
    });
    const combinedUserTodosData = { ...userData, todos: todosWithoutUserId };
    res.send(combinedUserTodosData);
  });
};
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running :D");
});
