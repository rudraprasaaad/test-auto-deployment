import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
  const body = req.body || "Hello!!";
  res.status(201).json({
    msg: body,
  });
});

app.listen(3000, () => {
  console.log(`Server started at 3000`);
});
