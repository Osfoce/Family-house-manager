import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("Server is running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
