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

app.post("/health", (req, res) => {
  const body = req.body || "Health is good";
  res.status(201).json({
    msg: body,
  });
});

app.listen(3000, () => {
  console.log(`Server listening at 3000`);
});
