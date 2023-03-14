const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

const connectDb = require("./config/database.config");
connectDb();

const postRouter = require("./routers/post.router");

app.use(express.json());
app.use(cors());

app.use("/api", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
