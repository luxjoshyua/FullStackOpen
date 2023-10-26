const calculateBmi = (height: number, weight: number): String => {
  // convert height from cm to m
  const heightInMeters = height / 100;
  // ** means to the power of, in this case 2
  let result = weight / heightInMeters ** 2;

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

console.log(calculateBmi(180, 74));
