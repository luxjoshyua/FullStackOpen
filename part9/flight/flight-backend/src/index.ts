import express from "express";
import cors from "cors";
const app = express();
import diaryRouter from "./routes/diaries";

app.use(express.json());

app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api", (_req, res) => {
  res.send("root working");
});

// app.get("/api/ping", (_req, res) => {
//   res.send("root working");
// });

// app.post("/api/diaries", (req, res) => {
//   console.log(req.body);
//   console.log("posting something");
//   return res.status(200).send("POST").end();
// });

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
