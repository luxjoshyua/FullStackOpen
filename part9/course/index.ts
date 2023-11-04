import express from "express";
const app = express();
import { calculator, Operation } from "./calculator";

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  // the body field is explicitly typed any, as is req.query
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // validate the data
  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "..." });
  }

  // assert the type
  // const operation = op as Operation;

  // const result = calculator(Number(value1), Number(value2), operation);

  // written shorter
  const result = calculator(Number(value1), Number(value2), op as Operation);

  // don't need res.send({result}) because of app.use(express.json()) above
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
