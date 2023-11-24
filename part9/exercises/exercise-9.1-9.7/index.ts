import express from "express";
const app = express();
app.use(express.json());
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// height and weight are the two queries to include
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    res.end();
  }

  const result = calculateBmi(height, weight);
  res.json({ height, weight, bmi: result });
});

app.post("/exercises", (req, res) => {
  const dailyExercisesParam = req.query.daily_exercises as string;
  const targetParam = req.query.target as string;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dailyExercises: number[] = JSON.parse(dailyExercisesParam);
    if (!Array.isArray(dailyExercises) || dailyExercises.some(isNaN)) {
      return res.status(400).send({ error: "malformatted parameters" });
    }

    const target: number = Number(targetParam);

    if (!dailyExercises || !target) {
      return res.status(400).send({ error: "parameters missing" });
    }

    if (isNaN(target)) {
      return res.status(400).send({ error: "malformatted parameters" });
    }

    const result = calculateExercises(dailyExercises, target);
    return res.json(result).end();
  } catch (error) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
