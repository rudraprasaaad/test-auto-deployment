import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
  res.status(201).json({
    msg: "Hello from response",
  });
});

app.listen(3000, () => {
  console.log("Server started at " + 3000);
});
