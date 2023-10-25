// string literal types
// variable can accept multiple values by creating a union type e.g. string | number
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
// type keyword defines a new name for a type: a type alias
// as the type is a union of three possible values, it is handy to give it an alias that has a representative name
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
type Operation = "multiply" | "add" | "divide";

// defines the expected return value from the function of string or number
// type Result = string | number;

// defines the expected return value from the function of number
const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

calculator(1, 2, "multiply");
