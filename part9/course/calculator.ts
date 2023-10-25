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
  // have to narrow the type to access the field as the default type of the error object in TypeScript is unknown
  // can not use error.message like in regular js
  // instanceof is one typeguard, another is typeof
  // https://www.typescriptlang.org/docs/handbook/2/narrowing.html
  if (error instanceof Error) {
    // the type is narrowed and we can refer to error.message
    errorMessage += error.message;
  }
  // here we can not use error.message
  console.log(errorMessage);
}

calculator(1, 2, "multiply");
