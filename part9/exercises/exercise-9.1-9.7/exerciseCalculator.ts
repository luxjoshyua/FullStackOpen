// interface calculate {
//   target: number;
//   time: number[];
// }

// param args is an array of strings
// const parseArguments = (args: string[]): calculate => {
//   if (args.length < 4) throw new Error("Not enough arguments");

//   const time: number[] = [];

//   for (let i = 3; i < args.length; i++) {
//     if (!isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
//       throw new Error("Values provided weren/t numbers");
//     } else {
//       time.push(Number(args[i]));
//     }
//   }

//   return {
//     target: Number(args[2]),
//     time: time,
//   };
// };

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string | undefined;
  target: number;
  average: number;
}

const compareNumberDifference = (number1: number, number2: number): number => {
  if (number1 < number2) {
    return 1;
  } else if (number1 > number2) {
    return 3;
  } else {
    return 2;
  }
};

/**
 * calculates the average time of daily exercises hours,
 * compares it to the target amount of daily hours
 * returns an object that includes the following values:
 *  - number of days
 *  - number of training days
 *  - original target value
 *  - calculated average time
 *  - boolean describing if the target was reached
 *  - rating between 1-3 tells how well the hours are met. Decide on metric.
 *  - text value explaining the rating
 */
export const calculateExercises = (
  array: number[],
  targetDailyHours: number
): Result => {
  const length = array.length;
  const days = array.filter((value) => value > 0).length;
  const averageHours =
    array.reduce((acc, currentValue) => acc + currentValue, 0) / array.length;
  const averageHoursFixed = parseFloat(averageHours.toFixed(2));

  const compareResult = compareNumberDifference(
    averageHoursFixed,
    targetDailyHours
  );
  let compareResultString;
  switch (compareResult) {
    case 1:
      compareResultString = "Not great, should have been better";
      break;
    case 2:
      compareResultString = "Target met";
      break;
    case 3:
      compareResultString = "Target exceeded, congrats";
      break;
    default:
      break;
  }

  const result: Result = {
    periodLength: length,
    trainingDays: days,
    success: averageHoursFixed < targetDailyHours ? false : true,
    rating: 1,
    ratingDescription: compareResultString,
    target: targetDailyHours,
    average: averageHoursFixed,
  };
  return result;
};

// try {
//   const { target, time } = parseArguments(process.argv);
//   const result = calculateExercises(time, target);
//   console.log(`result: ${JSON.stringify(result)}`);
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }

// write in the terminal $ npm run calculateExercise "3,0,2,4,5,0,3,1" 2
// const array: number[] = [parseFloat(process.argv[2])];
// const targetDailyHours: number = Number(process.argv[3]);

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
