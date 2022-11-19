# TypeScript

## Introduction

- Superset of JS
- Allows use of strict types: (Benefit = less errors)
- Modern ES6+ features supported (Arrow functions, let, const) (Uses a babel-like compiler internally)
- Extra features on top of ES6+ (Interfaces, Generics, Tuples, etc)

TS has utilities to build JS for the web (since only JS runs) that supports everything above. 
- TS does not execute in a browser
- TS comes with a powerful compiler that compiles the code into JS which can then run in the browser
- Features compiled to JS are "workarounds" and any possible errors are thrown by the compiler

Example of a need for TS:
* Consider a function for adding two numbers
* If we pass it two strings instead, it performs string concatenation instead of addition
* This is a logical error as the original function never meant to concatenate strings
* With types, we can catch such errors at build or compile time using a tool such as TS i.e write better code

***Installation***: `npm i -g typescript`. This command installs the TS compiler (globally) which provides us with a `tsc` command.

***Compilation***: `tsc sandbox.ts` where sandbox.ts is the typescript file to be compiled. The corresponding JS file `sandbox.js` will be output (***writes to it, creates one if it does not exist***)

***Compile with a watcher***: `tsc sandbox.ts -w` where `-w` watches for any changes to the files and automatically re-builds the JS for it

Example:
```ts
// using-ts.ts
const button = document.querySelector("button")! as HTMLButtonElement;
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function() {
  console.log(add(+input1.value, +input2.value));
});
```
The compiled output in JS will be (`tsc using-ts.ts`):
```js
const button = document.querySelector("button")! as HTMLButtonElement;
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function() {
  console.log(add(+input1.value, +input2.value));
});
```

If in case there is an error, TS will complain in the terminal (& editor if the plugin is enabled) like so.
```
(base) ➜  adjusted-project tsc using-ts.ts
using-ts.ts:10:19 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

10   console.log(add(input1.value, +input2.value));
                     ~~~~~~~~~~~~

Found 1 error in using-ts.ts:10
```
However, *TS will always output the JS, even in cases where there is an error!*

*TypeScript forces us to write cleaner, better, and less error-prone code.*

### Advantages of using TypeScript

TS adds:
- Types: You need to be explicit about what you want and avoid unnecessary behaviour
- Next-gen JS features: Compiles it down to JS that works on older browsers just like what a tool like Babel can do
- Non-JS features like Interfaces or Generics: These cannot be compiled into JS but still help you write better code (will be checked and removed during compilation)
- Meta-programming features like Decorators
- Rich config options (`.tsconfig`)
- Modern tooling that helps even in non-TS projects

## Data types

***The following are data types in JS that are also types in TS!***
1. Number (`number`). Ex `0`, `1.1`, `1.234`
2. String (`string`). Ex: `"Hi"`, `'hello there'`
3. Boolean (`boolean`). Ex: `true`, `false`
4. Object (`object` or `{}`). Ex: `{}`. `{ a: 10, foo: 'Hey' }`
5. Arrays (`array` or `[]`): Ex: `[1, 2, 3]`, `["Jim", "Tom"]`
6. `undefined`: TS uses this type a bit differently than JS does

In JavaScript, we use the `typeof` operator to read the type of a value or an expression. With TS, however, we use type annotations to read the same.

Type annotations v/s `typeof` operator:
* Annotations in TS are checked at compile time
* `typeof` checks the type of the value at runtime i.e when the JS code is executing in an environment, like the browser.

***Data types in TS that are not valid in JS!***
1. Tuples (`[type1, type2, ...]`): These are fixed-length arrays!
2. Enums (`{ VAL1, VAL2, ...]`): Automatically enumerated global constant identifiers!
3. Any (`any`): Least specific type of assignment. Can assign any type of value to such a type.
4. Union types (`|`): Combines two types i.e allows either one of the combined types
5. Literal type: The type is limited to a single value. Ex: type is the number `5` instead of the set of all numbers
6. Unknown (`unknown`): Similar to any but more restrictive. Needs type checking before it can be used i.e assigned to something else
7. Void (`void`): A special return type of a function when it returns nothing (Implicit return)
8. Never (`never`): Another special return type of a function

### Type annotations

Expected data types for assignments, i.e variables and parameters, can be denoted using the `: <type>` suffix as shown below:
```ts
// Examples:
const x: number = 10;
function add(n1: number, n2: number) { /*...*/ }
function print(word: string) { /*...*/ }
function logIfNecessary(shouldLog: boolean) { /*...*/ }
```

All the special syntax introduced by TS (such as these type annotations) are removed in the generated JS.

### Type inference

We *do not* have to be explicit about the type for every declaration!

TS is smart enough to ***infer*** the types in many cases based on the value being assigned to a variable.

Ex:
```ts
const num: number = 5;
// is equivalent to:
const num = 5;
```
If you hover over it in VSCode, the type will appear.

*Utilise inference whenever possible.*  It is a good practice which:
* Allows TS to calculate the type 
* Reduces redundancy in code

#### When is it good to explicitly set the type?

We should set the type when the *declaration* of a variable & its *assignment* happen separately. An example is that of a `let` variable that is assigned later.

```ts
// Use inference:
const a = 5;

// Define a type explicitly (skip inference):
let b: string;
// ... later in the code:
b = document.getElementByClass('.btn').innerHTML;
```

Without an assignment or a type declaration, TS will assign an `any` type to the variable;

```ts
let a; // "any" type
```

### JS pattern that is a TS anti-pattern

Type checking using `typeof` operator i.e adding a guard clause or performing duck-typing is not required in TS because of the use of type annotations that the compiler checks at build time.

```ts
function add(n1: number, n2: number) {
  // The following runtime check is unnecessary in TS 
  // because we already expect numbers (checked at compile time):
  if (typeof n1 === 'number' && typeof n2 === 'number') {
    // function logic:
    return n1 + n2;
  }
}
```

### The undefined type

This type `undefined` is special in JS. It denotes that a value has been declared but not assigned.

```js
let x; // JS value of `x` is undefined
```

In JS, returning nothing from a function returns `undefined` as well!
```js
const foo = () => {}
foo(); // Returns `undefined` in JS
```

In TS, however, `undefined` can be used as a type, BUT:
* A declared but unassigned value is type `any`
* Be explicit if you want an `undefined` type.
```ts
let x; // `any` type
let y: undefined; // `undefined` type
```
* When a function returns nothing, its type is **`void`** (Not `undefined`). However, the generated JS that runs will return `undefined`. This is a subtle but important difference between JS & TS. 

### Object types

* Object types are also inferred during declaration with assignment
```ts
const user = {
  name: 'Jim',
  age: 25
}
```
The inferred type:
```ts
const user: {
    name: string;
    age: number;
}
```
Note that the key-values are `property: type` in the object type and we semicolons `;` delimit them.

* The `object` type is the *least specific* object type in TS. Generally, more specific types are needed to validate the props
```ts
const user: {} = { // Alternate syntax: `const user: object = {`
  name: 'Jim',
  age: 25
}

console.log(user.name) // ERROR! since the type `object` or `{}` has no properties
```

* Nested objects can also have types defined.
```ts
const user = {
  name: 'Jim',
  age: 25,
  friends: ['Tim', 'Pim', 'Dim'],
  address: {
    house: '2 robert place',
    street: 'highway 14',
    city: 'London'
  }
}

// Type for the object above:
const user: {
    name: string;
    age: number;
    friends: string[];
    address: {
        house: string;
        street: string;
        city: string;
    };
}
```

### Array types

* Array types are defined using the `<elementType>[]` syntax
```ts
let names: string[]; // Defines a type of an array of string type elements

// Alternate syntax:
const names: Array<string>;
```

* Array types can also be inferred!
```ts
const friends = ['Tim', 'Pim', 'Dim'];

// TS type for the above object:
const friends: string[]
```

* TS is smart enough to infer the type of the array items as well! This is great for providing auto-completion through intellisense.
```ts
const friends = ['Tim', 'Pim', 'Dim'];
for(const friend of friends) {
  console.log('Hello, ' + friend.toUpperCase()); // `.toUpperCase()` - No error, auto suggested by TS enabled editor
}
```

* Mixed element types are recognized and inferred by TS. The `|` symbol is used as the union of types i.e mixed element types can be thought of as a union
```ts
const arr = [1, 'Ram']; // Inferred as (number | string)[]
```

### Tuple data type

Tuples are fixed-length arrays!

* Tuples are identified by a special syntax
```ts
// Ex:
[number, string]
```

* Usually tuples have to be identified ***explicitly*** (In order to avoid being confused with an array)
```ts
const ageAndName = [28, 'Rashmi'];
// Inferred as `(string | number)[]` which is a mixed-array and not a tuple

// Be explicit if you need a tuple:
const ageAndName: [number, string] = [28, 'Rashmi'];
```

* Element type mismatch or tuple length mismatch errors are recognized!
```ts
const foo: [number, string] = [28, true]; // ERROR!
const bar: [number, string] = [28, 'Rashmi', 'additionalElement']; // ERROR!
```

* ***TS drawback***: It cannot handle errors with `.push()` (When you push an element, it gets added to the tuple but this operation should ideally not be possible since a tuple is a fixed-length array!)
```ts
const ageAndName: [number, string] = [28, 'Rashmi'];
ageAndName.push('something'); // ALLOWED but should be a type error :/
```

### Enums

Enums are data types that are useful for generating human readable identifiers that internally map to other values.

For example, if you want to provide admin privileges via code and the levels are 1-4 then remembering what 1 as a level is or what 4 is difficult.

One approach can be to set string values like so:
```ts
// ...
{
	role: 'SUPER_USER_ROLE';
}
// ...
if (role === 'SUPER_USER_ROLE') { ... }
```
However, strings can be mistyped and difficult to remember! On top of this, we might want the role to be a number internally (Like `1`)

TS makes it easy to provide such identifiers with their values using `enum`

**Syntax:**
```ts
enum EnumName { ENUM_VALUE_1, ENUM_VALUE_2, ... }
// convention: PascalCase
```

**Usage:**
The enum can be referenced like you would reference an object and its key. Hence, it can be used in your if conditionals, assignments and so on! (Internally, the generated JS for an enum is basically an object!)
```ts
EnumName.ENUM_VALUE_1 // Referencing an enum
```

Example:
```ts
enum Role { ADMIN, USER, READ_ONLY };

const person = {
  name: 'Pushkar',
  role: Role.ADMIN // references an enum
}

if (person.role === Role.USER) { // enum values can be used in conditionals too!
  console.log('You are a user');
}
```
The generated JS file looks like:
```js
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
    Role[Role["READ_ONLY"] = 2] = "READ_ONLY";
})(Role || (Role = {}));
;
var person = {
    name: 'Pushkar',
    role: Role.ADMIN // references an enum
};
if (person.role === Role.USER) { // enum values can be used in conditionals too!
    console.log('You are a user');
}
```

**Note:**
* The default internal values for each enum starts with a `0` and increments by 1 for each new enum (Left to right)
* You can *explicitly set the internal values* for an enum using the `=` operator (Some values are not allowed like objects and boolean)
```ts
enum Role { ADMIN = 5, USER = "Hello", READ_ONLY = 'blah' };
```
Generated JS:
```js
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 5] = "ADMIN";
    Role["USER"] = "Hello";
    Role["READ_ONLY"] = "blah";
})(Role || (Role = {}));
;
```

As a user, you are not expected to remember the internal values i.e the mapping between the identifier and the value.

### Any type

It is the least specific type or ***most flexible*** in TS. When you declare a variable but do no assign it a value immediately, or if you don't explicitly declare the type then `any` is what gets assigned.

```ts
let x; // `any` type
```
Do not use `any` if you know what type to expect from a value. It is not a very helpful type and we can perform fewer type checks on it.

One place we can use it is when we expect value whose type is known only at *runtime*. Ex: a data point from a server response. In such a case, you can combine `any` with a JS use guard clauses / `typeof` operator.

**Note**: We can assign an `any` type value to other variables or params that require a specific type and we will NOT have errors as `any` is a flexible type. Think of it as being almost as good as turning off type checking.

### Union types

The union `|` operator allows us to combine types. It is a useful feature when you want to allow more than one core type.

**Syntax**: `type1 | type2 | ... ;`

```ts
let x: number | string = 5; // allowed
let y: number | string = 'Hola!'; // allowed
let z: number | string = true; // ERROR!
```

Sometimes, TS cannot guarantee not running into errors when dealing with union types. In such a case, rely on runtime checks.
Ex:
```ts
const add = (a: number | string, b: number | string) => {
  return a + b; // TS ERROR!
  // Cannot understand that we can concatenate number/string union type
}

// Solution: NO ERROR! (runtime checks)
const add = (a: number | string, b: number | string) => {
  if (typeof a === 'number' && typeof b === 'number') 
    return a + b;
  else if (typeof a === 'string' && typeof b === 'string') 
    return a + b;
}
```

### Literal types

A literal type is ONE value instead of the whole set of values that form a type. 

Ex: 
```ts
let x: 5 = 5; // The type is also 5 - Not a number
x = 6; // ERROR!!
```

When are literal types useful? They are useful when you want to *set some identifiers*.
```ts
const add = (a: number, b: number, resultType: 'print' | 'return') => {
  if (resultType === 'print') {
    console.log(a + b);
    return;
  }

  return a + b;
}
```
`resultType` has a union type of two literal types, `'print'` and `'return'`. An invocation such as `add(1, 2, 'blah')` will fail the type check.

When you need more values for identifiers, it is better to go with an `enum`!

Literal types can also be inferred by TS.

### Unknown type

Holds any value like `any` but is more restrictive. It is not used when you want flexibility like `any` i.e TS will throw errors during assignments to other variables and so on.

Use it when you are unsure of what the value will be but if we can be certain of it *through type checking* then we can perform operations on it i.e type resolution has occurred. Cannot assign an `unknown` value to a known value (But, any is fine)

Ex:
```ts
let foo; // any type
let bar: string;

foo = 5;
bar = foo; // NO ERROR

// -------

let foo: unknown;
let bar: string;

foo = 5;
bar = foo; // ERROR!!
// Type 'unknown' is not assignable to type 'string'
```
With type resolution:
```ts
let foo: unknown;
let bar: string;

if (typeof foo === 'string') {
  bar = foo; // NO ERROR post resolution
}
```

Bottomline: `unknown` needs extra type checking before use.

### Type aliases

We can create type aliases in order to:
* Have a centralized place to manage a particular type from
* Avoid redundancy i.e You can use the alias name as a placeholder for the type it references (reusability)

**Syntax:** Use the `type` keyword 
```ts
// convention: PascalCase
type ResultType = 'print' | 'return';

type Role = 'admin' | 'user';

type User = {
  name: string,
  age: number,
  role: Role
}

const printUserDetails = (user: User, resultType: ResultType) => {
  /* ... */
}

const getUserRole = ({ role }: User) => { // Type aliases are reusable!
  /* ... */
}
```

## Functions

Functions can be written like they are in JS i.e they are the same in TS but with type annotations:
* Parameters can be given a type
```ts
function add(n1: number, n2: number) {
  /* ... */
}
```
* Return types can be inferred (Let TS do this; recommended)
```ts
function add(n1: number, n2: number) {
  return n1 + n2
}
// TYPE: function add(n1: number,  n2: number): number
```
* Return types can be set explicitly (use `:` after the arguments list)
```ts
function add(n1: number, n2: number): number {
  return n1 + n2
}
```

### Void versus undefined return type

Functions in TS that do NOT return a value i.e implicit return have the `void` return type
```ts
function foo(n1: number, n2: number) {}
// TYPE: function foo(n1: number, n2: number): void
```

Functions in TS that return an empty value i.e explicit `return undefined;` have the `undefined` return type
```ts
function foo(n1: number, n2: number) {
  return undefined;
}
// TYPE: function foo(n1: number, n2: number): undefined
```

### Functions as types

Functions in JS are *first-class objects* i.e they can be passed around as arguments to other functions, assigned to variables, etc.

* TS provides a `Function` type to describe them
```ts
function add(n1: number, n2: number) {
  return n1 + n2;
}

let newAdd: Function;

newAdd = add;
newAdd(1, 2); // 3 (AS EXPECTED)

newAdd = () => {}; // Random function
newAdd(5, 10); // No output (NOT EXPECTED!!)
// Need a more specific type definition!
```
* It is more useful to provide more specific function types!
```ts
function add(n1: number, n2: number) {
  return n1 + n2;
}

// More specific function type! 
let newAdd: (a: number, b: number) => number;

newAdd = add;
newAdd(1, 2); // 3 (AS EXPECTED)

newAdd = () => {}; // ERROR! for function type mismatches!!
```
* Callbacks can also be given a function type but the return type is not really checked! *Ignored intentionally*
```ts
type Adder = (a: number, b: number) => void;

function doSomething(x: number, cb: Adder) {
  cb(x, 10);
}

doSomething(
  5, 
  (a, b) => {
    return a + b; // Even though we return a vlaue, it is ignored by the invoking fn.
    // Hence, passes check.
    // But, params to the callback are strictly checked!!
  }
)
```

### Never type

`never` is a newer type: It is seen only as a function return type like `void`. It is also a rare occurrence.

There are two cases in which the return type of a function can be `never`:
1. When the function throws an error (& never returns)
2. When the function never stops executing i.e infinite loop (& hence never returns)
In both these cases, it is appropriate to assign a `never` return type to the function.
**Note**: `never` was added later to TS as a type and TS does NOT infer the type i.e it defaults to `void` still. Explicitly define this return type.
```ts
function foo(msg: string): never {
  throw new Error(msg);
}

// ---

function foo(msg: string) { // Inferred as `void`
  throw new Error(msg);
}

// ---

function foo(msg: string): never {
  while (true) {}
}
```
