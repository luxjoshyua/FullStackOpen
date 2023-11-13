import express from "express";
const app = express();
import diaryRouter from "./routes/diaries";

app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

// app.post("/api/diaries", (req, res) => {
//   console.log(req.body);
//   console.log("posting something");
//   return res.status(200).send("POST").end();
// });

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
