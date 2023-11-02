interface CalculateBMI {
  value1: number;
  value2: number;
}

const parseArgument = (args: string[]): CalculateBMI => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): String => {
  // convert height from cm to m
  const heightInMeters = height / 100;
  // ** means to the power of, in this case 2
  const heightSquared = heightInMeters ** 2;

  // console.log(heightSquared);
  // let result = weight / heightInMeters ** 2;
  let result = weight / heightSquared;
  console.log(`bmi result: ${result}`);

  if (isNaN(result)) {
    console.log("Please enter numbers");
    return;
  } else if (result < 18.5) {
    return "Underweight";
  } else if (result >= 18.5 && result <= 24.9) {
    return "Normal (healthy weight)";
  } else if (result >= 25 && result <= 29.9) {
    return "Overweight";
  } else if (result >= 30) {
    return "Obese";
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

// const height: number = Number(process.argv[2]);
// const weight: number = Number(process.argv[3]);
// console.log(calculateBmi(180, 74));
// console.log(calculateBmi(240, 50));
