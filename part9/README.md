# Typescript notes

#### Type annotations

- type annotations are a lightweight way to record the intended contract of a function or variable.
- in this example, the birthdayGreeter function accepts two arguments: one of type string and one of type number. The function returns a string

```
const birthdayGreeter = (name: string, age: number): string => {
  return `Happy birthday ${name}, you are now ${age} years old!`;
};

const birthdayHero = "Jane User";
const age = 22;

console.log(birthdayGreeter(birthdayHero, age));
```

[A useful list of everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

#### Structural typing

- typescript is a structurally typed language. Two elements are considered to be compatible with one another if, for each feature within the type of the first element, a corresponding and identical feature exists within the type of the second element. Two types are considered to be identical if they are compatible with each other.
- [Useful video explanation of structural typing in TS](https://www.youtube.com/watch?v=zfQgsGXTpOg)

#### Type inference

- the TS compiler can attempt to infer the type information if no type has been specified, with the variables type inferred based on their assigned value and their usage
- type inference takes place when initialising variables and members, setting parameter default values, and determining function return types

```
const add = (a: number, b: number) => {
  /* The return value is used to determine
     the return type of the function */
  return a + b;
}
```

the type of the function's return value is inferred by retracing the code back to the return expression. The return expression performs an addition of the parameters `a` and `b`. We can see that `a` and `b` are numbers based on their types. Thus, we can infer the return value to be of type `number`.

#### Type erasure

TS removes all type system constructs during compilation, when TS is compiled to regular JS

Input

```
 let x: SomeType
```

Output

```
let x
```

This means that no type information remains at runtime; nothing says that some variable `x` was declared as being of the type `SomeType`.

#### Key advantages of TypeScript

1. It offers type checking and static code analysis
2. The type annotations in the code can function as a kind of code-level documentation; easy to check from a function signature what kind of arguments the function can consume and what type of data it will return
3. IDEs can provide more specific and smarter IntelliSense when they know exactly what types of data you are processing

#### Tooling

1. First install TS in a project, run `npm install --save-dev ts-node typescript`
2. Once installed, add to `package.json`

```
 "scripts": {
    "ts-node": "ts-node"
  },
```

3. To run on a file, `npm run ts-node -- multiplier.ts`
