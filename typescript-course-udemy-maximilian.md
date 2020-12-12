# Typescript Short Notes

* Javascript: Uses **dynamic types** that are resolved at runtime (production)
* Typescript: Uses **static types** that are resolved at compile time (development)

Dynamic types can be checked at runtime (Ex: by using `typeof` operator) but with static types, the check happens automatically when you compile code

TS allows you to 1. *detect errors early* & 2. *avoid certain runtime errors*.

- [Typescript Short Notes](#typescript-short-notes)
  * [Core types](#core-types)
    + [A more specific object](#a-more-specific-object)
    + [Defining Arrays](#defining-arrays)
    + [Using Tuples](#using-tuples)
    + [What are Enums?](#what-are-enums-)
  * [Type inference](#type-inference)
  * [Union of types](#union-of-types)
  * [Literal Types](#literal-types)
  * [Custom types (`type` aliases)](#custom-types---type--aliases-)
  * [Functions: parameter & return types](#functions--parameter---return-types)
  * [Function types](#function-types)
  * [Functions and callbacks](#functions-and-callbacks)
  * [`unknown` type](#-unknown--type)
  * [`never` type](#-never--type)
  * [TS compilation and config](#ts-compilation-and-config)
    + [Watch mode](#watch-mode)
    + [Create a TS project with a config](#create-a-ts-project-with-a-config)
      - [Excluding files](#excluding-files)
      - [Including files](#including-files)
      - [Compilation target](#compilation-target)
      - [Core libraries](#core-libraries)
      - [More compiler options](#more-compiler-options)
        * [`strictNullChecks`](#-strictnullchecks-)
  * [Classes & interfaces](#classes---interfaces)
    + [Creating classes](#creating-classes)
    + [Defining methods](#defining-methods)
    + [Be cautious of `this`](#be-cautious-of--this-)
    + [Private & public fields](#private---public-fields)
    + [Shorthand initialiser](#shorthand-initialiser)
    + [Readonly properties](#readonly-properties)
    + [Inheritance](#inheritance)
    + [Protected access modifier](#protected-access-modifier)
    + [Getters and setters](#getters-and-setters)
    + [Static properties and methods](#static-properties-and-methods)
    + [Abstract classes](#abstract-classes)
    + [Singletons](#singletons)
    + [Interfaces](#interfaces)
      - [Readonly interface properties](#readonly-interface-properties)
      - [Extending interfaces](#extending-interfaces)
      - [Optional properties in interfaces](#optional-properties-in-interfaces)
      - [Interfaces vs custom types](#interfaces-vs-custom-types)
      - [Interfaces vs abstract classes](#interfaces-vs-abstract-classes)
      - [Interfaces as function types](#interfaces-as-function-types)
      - [Interfaces do not get compiled into Javascript](#interfaces-do-not-get-compiled-into-javascript)
  * [Advanced types](#advanced-types)
    + [Intersection type](#intersection-type)
    + [Type guards](#type-guards)
      - [`typeof`](#-typeof-)
      - [`in`](#-in-)
      - [`instanceof`](#-instanceof-)
      - [Discrimated unions](#discrimated-unions)
    + [Type casting](#type-casting)
    + [Property index](#property-index)
    + [Function overloads](#function-overloads)
    + [Optional chaining](#optional-chaining)
    + [Nullish coalescing](#nullish-coalescing)
  * [Generic types](#generic-types)
    + [Generic functions](#generic-functions)
      - [Generic types can be extended from other types](#generic-types-can-be-extended-from-other-types)
      - [The `keyof` operator for generic types](#the--keyof--operator-for-generic-types)
    + [Generic classes](#generic-classes)
  * [Decorators](#decorators)
    + [Class decorators](#class-decorators)
      - [Multiple decorators](#multiple-decorators)
      - [Decorator factories](#decorator-factories)
      - [Property decorators](#property-decorators)
      - [Accessor decorators](#accessor-decorators)
      - [Method decorators](#method-decorators)
      - [Parameter decorators](#parameter-decorators)
      - [Enhancing class constructors using decorators](#enhancing-class-constructors-using-decorators)
      - [Enhancing methods & accessors using decorators](#enhancing-methods---accessors-using-decorators)
      - [Validating data using decorators](#validating-data-using-decorators)
    + [Requiring a namespace](#requiring-a-namespace)
  * [Modules](#modules)
  * [Webpack with Typescript](#webpack-with-typescript)
  * [Typescript and 3rd party libraries](#typescript-and-3rd-party-libraries)
    + [Use `declare` as a last resort](#use--declare--as-a-last-resort)
  * [Typescript with React](#typescript-with-react)
    + [Types for props](#types-for-props)
    + [Types for events](#types-for-events)
    + [Types for hooks](#types-for-hooks)
  * [Typescript with Node & Express](#typescript-with-node---express)
    + [`ts-node` package](#-ts-node--package)
    + [TS for production Node project](#ts-for-production-node-project)

## Core types

1. `number`
2. `string`
3. `boolean`
4. `object` (Very generic, not too useful: only cares if value is an object but nothing specific about it)
5. Arrays (`<type>[]`)
6. Tuples (`[<type>, <type>, ...]`) *(A fixed length & a fixed type array)*
7. `any` *(The most flexible data type. A very loose data type: only use when it is a last resort. Avoid it when possible since it gives you the same experience you get with regular JavaScript)*
8. `enum`
9. `void` *(Usually used as a function return type to indicate that it does not return anything; side effects)*

**The core primitive types in TypeScript are all lowercase!** (Ex: Not `String` but `string` unlike JS)

Typescript also supports some regular Javascript types (Classes) like **`Function`** and **`Date`**!

### A more specific object

The `object` type only cares if it is an object and not the structure of it

```typescript
const person: object = {
  name: 'Pushkar',
  age: 27
}
// It does not care for the structure
```

We can be more specific. Define the structure and also the structure of *nested objects*

```typescript
const person: {
  name: string; // Note the semicolon(;). Use it to distinguish between objects & types!
  age: number;
  details: {
    info: string
  }
} = {
  name: 'Pushkar',
  age: 27,
  details: {
    info: 'A good boy'
  }
}
```

However, in most cases, we can allow TS to *infer the structure* based on initialisation:

```typescript
const person = {
  name: 'Pushkar',
  age: 27,
  details: {
    info: 'A good boy'
  }
}
// Type is inferred
```

### Defining Arrays

Explicit types:

```typescript
const names: string[] = ['Ram', 'Laxman'] // TYPE: string[]
```

TS can also infer the type:

```typescript
const people = ['Hello', 'bye', 1] // TYPE: (string | number)[]
```

### Using Tuples

These are good for records since they are fixed length & fixed type arrays. Good for creating records of a specific structure. 

*Syntax*: Use an array `[]` and inside it define the types of the elements at the respective positions. This is unlike an array where you define the type before the `[]`

```typescript
const record: [number, string, number] = [1, 'Pushkar', 27]
// The length and individual element types of the 
// tuple are preserved even if values are tried.
```

TS cannot really infer a tuple because it will infer an array:

```typescript
const record = [1, 'Pushkar', 27] // TYPE: (string | number)[]
```

### What are Enums?

They are labels for values (Ex: Representing colors with labels of their names but with numeric values for each). It is useful for human readable labels for obscure values (Ex: Different user levels like admin, reader, editor but internally they are stored as numeric or string values but it's easier to use a label to fetch them)

The numeric values start from **`0` by default** and increment by 1 but assigning them explicitly can change theirs and the subsequent enum values.

Note that we can also assign strings or mix both strings and numbers

Syntax: `enum <Name> { <Label1>, <Label2>, ... }`

```typescript
enum Role {
  ADMIN,  // 0
  MEMBER, // 1
  EDITOR  // 2
}

// Usage example:
const record = [Role.ADMIN, 'Pushkar', 27]
```

```typescript
enum Role {
  ADMIN = 100,  // 100
  MEMBER, // 101
  EDITOR = 500  // 500
}
```

```typescript
// Once you assign strings, the next value cannot be auto-incremented 
// Hence, it must be assigned a value explicitly:
enum Role {
  ADMIN = 'ADMIN',  // ADMIN
  MEMBER = 10, // 10
  EDITOR  // 11
}
```

## Type inference

Allow TS to infer type wherever possible. If it cannot, use explicit type assignments.

```typescript
// Don't do this:
const a: number = 5 // It can be easily inferred to be a number

// Do this:
const a = 5

// For function params, inference is not possible, so be explicit:
function add(n1: number, n2: number) {
  return n1 + n2
}
```

## Union of types

When you want to accept two of more different types of values then a union type operator (`|`) can help us perform an **OR** operation on the data types assigned.

```typescript
// Example of union in function params:
function combine(n1: number | string, n2: number | string) { /* ... */ }
```

```typescript
const x: string | number = 5
const y: (string | boolean)[] = ['Hi', true, false]
```

## Literal Types

Instead of types which contain a range of values, literal types provide a specific value (similar to hardcoding or enforcing a specific value). This can sometimes give us more control on the type of value being passed

Provide a value instead of a type in order to use a literal type:

```typescript
const x: 5 = 5
const y: 10 | 'ten' = "ten"
```

```typescript
function combine(n1: number | string, n2: number | string, as: 'as-text' | 'as-number') {
  if (as === 'as-number') 
    return (+n1) + (+n2)
  else
    return `${n1}${n2}`
}

console.log(combine(1, 2, 'as-number'));
console.log(combine('He', 'llo', 'as-text'))
```

## Custom types (`type` aliases)

When we want to reuse types everywhere, we can create an alias out of it and use the aliases' identifier across the app. For example, if we want an alphanumeric type, we can create one and use it across instead of re-typing the type structure everywhere and everytime.

Convention for custom types: Use capitalised words *(Pascal case)*

```typescript
type NumOrString = number | string

const password: NumOrString = 'jacknJy_SS'
```

```typescript
type UserData = {
  name: string,
  id: number,
  age: number
}

const pushkar: UserData = {
  name: 'Pushkar',
  id: 108,
  age: 27
}

const saurabh: UserData = {
  name: 'Saurabh',
  id: 119,
  age: 31
}
```

Biggest benefits of custom types:

1. Avoid unnecessary repetition
2. Manage types centrally

## Functions: parameter & return types

1. We can assign types to function parameters:

   ```typescript
   function add(n1: number, n2: number) {
     return n1 + n2
   }
   ```

2. We can specify return types for more control (using `:` after arguments list). Typescript usually *infers* the return type though:

   ```typescript
   function add(n1: number, n2: number): number {
     return n1 + n2
   }
   
   // But, TS can also infer it (Don't be explicit unless you want more control)
   ```

3. The **`void`** return type is used for functions that do not return anything (Ex: Functions with only side effects such as printing to console)

   ```typescript
   function printResult(n: number) {
     console.log('Result', n); 
   }
   // TS infers the return type to be "void" 
   // i.e Function signature is "printResult(n: number): void"
   
   // But, we can also explicitly define it:
   function printResult(n: number): void {
     console.log('Result', n); 
   }
   ```

4. `void` versus `undefined` return type: TS makes a distinction between undefined and void even though a function that does not return anything still implicitly returns undefined. According to TS, if the `return` keyword is missing, the return type is `void` and not `undefined`. However, if `return;` or `return undefined` are explicitly mention, the return type becomes `undefined`

   ```typescript
   function printResult(n: number) {
     console.log('Result', n); 
     return undefined;
   } // return type: undefined
   
   function printResult(n: number) {
     console.log('Result', n); 
   } // return type: void
   ```

   It is better to stick to `void` when you don't want to return anything (or when what is returned does not matter)

   **Note:** Both `void` and `undefined` return `undefined` in the compiled JavaScript

## Function types

We can assign functions to variables and invoke them. This is regular Javascript. The problem is that, we can re-assign those variables to either non-function types or to a different kind of function. This may not be desirable as it can give rise to runtime errors

With TS, we can specify function types just as any other type. We can control the parameters, their types, and the return type. The advantage is that we can now guard against re-assignment to a non-function value or a function with an unwanted signature. This is generally good practice.

Function types define the *parameters* and *return type* of a function

Syntax for type (uses an arrow function): `(<param>: <type>, ...) => <return type>`

```typescript
function printResult(n: number) {
  console.log('Result', n); 
}

let printer: (n: number) => void

printer = printResult
printer = 5 // ERROR!
```

We can also use it during a function expression initialisation instead of keeping the type inside the signature (An alternate syntax)

```typescript
const add: (n1: number, n2: number) => number = (n1, n2) => {
  return n1 + n2
}
```

## Functions and callbacks

We can define the function signature of callbacks in order to be more strict about the type of callbacks a function can accept:

```typescript
function addAndProcess(n1: number, n2: number, cb: (n: number) => void) {
  cb(n1 + n2)
}

addAndProcess(2, 3, n => {
  console.log(n)
})
```

If the return type of callback is `void` but we still return a value inside it, the code still works (No errors!). This is because it is only an indication that callback return value is never going to be used

```typescript
function addAndProcess(n1: number, n2: number, cb: (n: number) => void) {
  cb(n1 + n2)
}

addAndProcess(2, 3, n => {
  console.log(n)
  return 5 // No error!
})
```

```typescript
function addAndProcess(n1: number, n2: number, cb: (n: number) => string) {
  cb(n1 + n2)
}

addAndProcess(2, 3, n => {
  console.log(n)
  return 5 // ERROR! Expects string but returned number
})
```

## `unknown` type

The `unknown` type is used when TS cannot infer the type. It is slightly better than `any` because it is a little less flexible

If you want to use it as any other type (a combined operation) then you first need to perform type checks unlike in any! This makes it better than any since you need to sure about how it is going to be used

```typescript
let a: any
let b: unknown

const num = 5
a = 10
b = 20

a + num // No error (ANY + NUMBER is valid!)
b + num // ERROR!! (UNKNOWN + NUMBER is NOT valid without confirmation of unknown's type)
```

For `unknown` we need to confirm the type at runtime and then there are no errors!

```typescript
let b: unknown

const num = 5
b = 20

if (typeof b === 'number') { // Confirmation of type needed!
  b + num // No error :)
}
```

## `never` type

When you have errors, the return type will be `never`. This is a special type that indicates that the app crashed and the function did not finish executing

It is better than `void` because `void` does not indicate that an error occurred. With `never` you will ***not*** be able to see `undefined` as the return type

```typescript
let a: never;

a = 5 // Error! Can never use a value for it
```

Due to legacy reasons, `never` is actually shown as `void`:

```typescript
function throwsAnError() {
 throw new Error('ERROR')
} // This function 'never' returns a value (not even undefined)

const result = throwsAnError() // TYPE: "result: void"
```

## TS compilation and config

Install: **`npm i -g typescript`**

Compile: **`tsc <filename>`** *(Ex: `tsc app.ts` generates a file called `app.js`)*

### Watch mode

Use **`tsc <filename> --watch`** or use the shorter `-w` flag

Ex: `tsc app.ts --watch`

### Create a TS project with a config

In the root of the project folder, run **`tsc --init`** which creates a `tsconfig.json` file. It contains some default config options

If we run `tsc` or `tsc -w` now, it will search for all `.ts` files in the project repo and compile them! We don't need to specify each individually

#### Excluding files

We can exclude files with the **`exclude`** option. By default, `node_modules` is excluded but we can specify an array of other files too. 

We can even use wildcards (like `*` & `**` to match any file and recursive search folders)

```json
{  "exclude": [
    "analytics.ts"
  ]
}
```

#### Including files

`include` does the opposite of `exclude`. If we do add it, we must specify everything we wanted inside it else it will not compile (even if those files are not present in an `exclude` option). So, it has a higher priority than exclude

Here too, we can use wildcards (Ex: `*` & `**`) to match many files and folders

```json
{
  "include": [
    "analytics.ts"
  ]
}
```

**Note:** If we exclude a sub-folder or a folder that is included then that sub-folder is actually *excluded*!

**Note:** We can also use **`files`** instead of `include` but the difference is that we cannot match folders in this but we have to list all the files *individually*!

#### Compilation target

There are many compiler options (i.e **`compilerOptions`**) we can set in the config. One of them is **`target`**. When we use this, we define the Javascript standard to which we want to compile down to: `es5`, `es6`, etc.

```json
{
  "compilerOptions": {
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
  }
}
```

#### Core libraries

The **`lib`** compiler option sets the core libraries that TS needs. For example, **`dom`** is a part of the core libraries by default. That is why TS does not complain about DOM instances such as `document` 

```json
{
  "compilerOptions": {
    "lib": ["dom", "es6", "dom.iterable", "scripthost"] // These are available by default (i.e When lib option is not specified)
  }
}
```

#### More compiler options

1. `allowJs`: Compiles javasript files also (if true). Not needed unless you want to compile over old js files
2. `checkJs`: Reports errors in javascript files (if true) but does not compile it (only checking)
3. `declaration`: It will generate a `.d.ts` file with function signatures. Useful while creating libraries that will be used by others (will provide autocomplete and typechecks)
4. `sourceMap`: If true, will enable source mapping directly to the source `.ts` files in the browser. It also needs to be true while debugging in VSCode
5. `outDir`: Specifies the output directory (By default, it is the project root)
6. `rootDir`: Specifies the directory from which to compile all `.ts` files. By default, it is the project root
7. `removeComments`: Removes comments from output files (if true)
8. `strict`: Keeps all the strict checks in place (enabled by default). It is a combo of many other checks:

   1. `noImplicitAny`: Cannot have `any` type. Must be resolved. Will throw an error (if true)
2. `strictNullChecks`: Cannot have values that might possibly be `null`
   3. `strictBindCallApply`: The bind `this` and arguments list must match exactly
4. `noImpliedThis`: Raise error on 'this' expressions with an implied 'any' type (if true)
   5. `alwaysStrict`: Parse in strict mode and emit "use strict" for each source file (if true)
6. There are even more rules that make up `strict`
9. `noEmitOnError`: If there is any error in any of the processed files, no output is generated (not even those files which don't have errors)
10. `noUnusedLocals`: Cannot have local variables that do not get used
11. `noUnusedParameters`: Do not leave parameters unused

##### `strictNullChecks`

This rule is useful when you have cases where a particular value could be null but it is used assuming that the value exists

```typescript
const button = document.getElementById('button')
button.addEventListener('click', () => {}) // ERROR! button can be null if element wasn't found
```

To override the rule, we can *append `!`* at the end of lines of violation:

```typescript
const button = document.getElementById('button')!
button.addEventListener('click', () => {}) // No Error because of !
```

Alternate fix (ESNext):

```typescript
const button = document.getElementById('button')
button?.addEventListener('click', () => {})
```

Lastly, you can also explcitly check for null case before using props on a DOM element

## Classes & interfaces

### Creating classes

1. Use the `class` keyword
2. Add fields (properties): `<field>: <type> [= <value>];` (Value is optional - provides an initial value)
3. We can specify a constructor. Annotate the parameters
4. Inside the methods (including constructor), access fields using `this` keyword
5. Object instantiation is like regular JS i.e uses the `new` keyword

```typescript
class Department {
  name: string;

  constructor(n: string) {
    this.name = n
  }
}

const accounting = new Department('Accounting')

console.log(accounting.name) // Accounting
```

### Defining methods

We can use the regular JS syntax for object/class methods. The function params can be type annotated and a return type specified

```typescript
class Department {
  name: string;
  constructor(n: string) {
    this.name = n
  }

  describe() {
    console.log('Dept: ' + this.name);
  }
}

const accounting = new Department('Accounting')

accounting.describe() // Dept: Accounting
```

### Be cautious of `this`

The `this` keyword can change depending on invocation (both in JS & TS). However, if you don't want it to be of any structure *not* of the same class, you can pass a special param `this: <classname>` that restricts the `this` value to have the same structure as the class (*Remember*: it has to be the first parameter)

```typescript
const accounting = new Department('Accounting')
const accountingCopy = { describe: accounting.describe }

accountingCopy.describe() // undefined (Runtime unexpected input)
```

```typescript
// Fix:
class Department {
  // ...
  describe(this: Department) {
    console.log('Dept: ' + this.name);
  }
}

const accounting = new Department('Accounting')
const accountingCopy = { describe: accounting.describe }

accountingCopy.describe() // ERROR IN T.S! 
// accountingCopy DOES NOT HAVE THE SAME STRUCTURE AS accounting
```

If the structure matches the `this` constraint i.e matches the class structure, there won't be an error 

```typescript
const accounting = new Department('Accounting')
const accountingCopy = { name: 'ACC_COPY', describe: accounting.describe }

accountingCopy.describe() // Works (No error)
```

It matches only a subset (additional properties can exist that do not exist on the original class):

```typescript
const accounting = new Department('Accounting')
const accountingCopy = { name: 'ACC_COPY', describe: accounting.describe, extra: 'x' }

accountingCopy.describe() // Still works (No error)
```

### Private & public fields

Access modifiers are appended to the class fields. By default, it is `public` so we don't need to add it

```typescript
// Default: public fields
class Department {
  name: string;
  employees: string[] = []

  constructor(n: string) {
    this.name = n
  }

  addEmployee(this: Department, emp: string) {
    console.log('Adding: ' + this.name);
    this.employees.push(emp)
  }
}

const accounting = new Department('Accounting')
accounting.addEmployee('Max')
accounting.employees.push('Ram') // Not good! We probably shouldn't be able to do this
// But, it is allowed since "employee" is a public field
```

```typescript
// Using private:
class Department {
  name: string;
  private employees: string[] = []

  constructor(n: string) {
    this.name = n
  }

  addEmployee(this: Department, emp: string) {
    console.log('Adding: ' + this.name);
    this.employees.push(emp)
  }
}

const accounting = new Department('Accounting')
accounting.addEmployee('Max')
accounting.employees.push('Ram') // Error! Not allowed to access private props outside class
```

### Shorthand initialiser

Many times we just add constructor params to fields. This is redundant, we can use a shorthand of specifying params with access modifiers and that gets auto-saved into the class as a field (with the same name)

```typescript
class Department {
  // Other fields can still go here...
  constructor(public name: string, private employees: string[] = []) {
  }
  // ...
}
```

The above is equivalent to the following:

```typescript
class Department {
  name: string;
  private employees: string[] = []

  constructor(n: string) {
    this.name = n
  }
  // ...
}
```

### Readonly properties

It is another access modifier. The field is Initialised once but never changed later! 

It can be used along with both public and private access modifiers.

```typescript
class Department {
  private readonly company = 'HP'
  constructor(public name: string, private employees: string[] = []) {
  }

  updateYear() {
    this.company = 'Samsung' // Error! Read only cannot be reinitialised
  }
}
```

Access modifiers help us write *clear and explicit code*!

### Inheritance

When we need more specific blueprints (more than a base class) we use inheritance. In this case, we will have a base/parent class and a child class!

Inheritance:

1. Allows you to share common functionality
2. Create more specialised blueprints

Use the **`extends`** keyword to inherit. We can inherit only *from one class*

The child class:

1. Automatically gets everything in base class! (methods & properties)
2. Constructor of child class needs to invoke **`super`** which is a call to constructor of parent class. Therefore, call it with arguments needed by the parent class constructor. You must call `super` before accessing `this` in the child constructor *(rule!)*
3. Child class can have new propertiess & methods i.e over & above the base class
4. Child class can also *override methods* of base class! 

```typescript
class Department {
  private readonly company = 'HP'
  // 1. Use protected to make properties in base class available 
  // to child class but not outside of it! 
  // It is an in-between modifier: neither private nor public
  constructor(public name: string, protected employees: string[] = []) {
  }

  printInfo() {
    console.log(`${this.name}: ${this.employees}`); 
  }
}

class ITDepartment extends Department { // 2. Use the "extends" keyword
  private admins: string[]; // 3. Child can have new properties of its own

  constructor(name: string, employees: string[] = [], admins: string[]) {
    super(name, employees) // 4. `super` must be called before accessing `this`
    this.admins = admins
  }

  printAdmins() { // 5. Child can have new methods of its own
    console.log(`IT Dept admins: ${this.admins}`);
    
  }

  printInfo() { // 6. Child can override existing base class methods
    // 7. Can access protected base class
    // values internally (within the class)
    console.log(`IT Dept members: ${this.employees}`);
    // 8. Can access its own private class properties internally 
    console.log(`IT Dept admins: ${this.admins}`);
  }
}

const itDept = new ITDepartment('IT', ['Ram', 'Max'], ['Ram'])
itDept.company // Error! cannot access private prop of base class
itDept.name // Can access public class of base class
itDept.printInfo() // Can access and override base class methods
itDept.printAdmins() // Can access its own properties and methods
```

### Protected access modifier

Child classes can use the base class props i.e `public` & `protected` but they cannot access `private` fields of the base class

`public` fields of base class can be accessed internally as well as externally

`private` fields of base class can be accessed only internally

### Getters and setters

Sometimes we want to pre-process or post-process certain field values. Or, maybe we want to be able to read or safely set a private value wihout being able to directly access it.

Use the `get` and `set` methods for thid purpose! `set` method additionally requires a value parameter that is used for setting!

```typescript
class Department {
  private readonly company = 'HP'
  private establishedYear: number = 0

  constructor(public name: string, protected employees: string[] = []) {
  }

  get established() {
    if (this.establishedYear === 0) {
      throw new Error('Does not have it set yet!')
    }
    return this.establishedYear
  }

  set established(value: number) {
    if (value > 1000 && value < 9999) {
      this.establishedYear = value
    }
  }
}

const accounts = new Department('accounts')

// Use it like fields (internally invoked as function)
accounts.established = 2020
console.log(accounts.established); // 2020
```

### Static properties and methods

These are fields and methods defined on a class, not on object instance i.e shared by all objects!

The `static` keyword placed in front of a field or method identifies it!

We must access such methods directly on the class. We cannot use it with `this.<property>` inside a class method (i.e inside an object) 

If you want to use it, use `<classname>.<prop>`

They work as namespaces!

```typescript
class Department {
  constructor(public name: string, protected employees: string[] = []) {}

  static company = 'HP' // Use the static keyword

  printCompany() {
    console.log(`Company: ${Department.company}`); // Cannot use `this` but class name
  }
}

const accounts = new Department('accounts')

console.log(Department.company) // HP
accounts.printCompany(); // Company: HP
```

**Note:** Inside a static method, `this` refers to the class itself (and not the object). But, just for clarity, you can use the class name instead!

### Abstract classes

Sometimes, we may have classes that are very basic and the implementation depends on a more specialised case.

We can have an abstract class with certain or all methods to be abstract. These force a child class to implement a certain method/property whereas the parent class has only a signature

Abstract class methods are mentioned in parent class but implemented it in child class

Syntax: 

1. `abstract class` on the class signature
2. `abstract <method signature>;`

**Note:** An abstract class can have normal properies and methods too (i.e with implementation)

Use the `extends` keyword, like in regular inheritance, to extend an abstract class.

An abstract method or property has to be *mandatorily* implemented in a child class (only signature is present in parent)

```typescript
abstract class Car {
  // abstract fields:
  abstract name: string;

  // Abstract methods:
  abstract turn(): void;

  // Normal methods:
  info() {
    console.log('A car')
  }
}

class BMW extends Car {
  name: string;
  constructor() {
    super()
    this.name = 'bmw'
  }

  turn() {
    console.log('Turning the BMW');
  }
}

const bmw = new BMW()
bmw.turn() // implemented the abstract method
bmw.info() // Can still access non-abstract methods of parent class
```

### Singletons

Singleton is a common and useful pattern that is used when you want to have exactly one object instance based on a class. Reinitialisation is not possible; we can only use the already instantiated object (first time).

**Singleton pattern in Typescript:**

1. Create a *private constructor* method
2. Create a *static* method to:
   1. Invoke the private constructor
   2. Save the new object into a *private static* field (**Note:** The type is of the class itself)
3. On subsequent instantiation attempts, return the already instantiated object!

Use the class static method to fetch the singleton instance (and not the `new` keyword) outside the class

```typescript
class Config {
  private static instance: Config;
  private constructor(private configName: string) {}

  static getInstance(name: string) {
    // `this` refers to class in a static method (not object)
    if (this.instance) { // Can also use `Config.instance` 
      return this.instance;
    }
    this.instance = new this(name)
    return this.instance
  }

  printConfigName() {
    console.log(this.configName); 
  }
}

const singletonConfig = Config.getInstance('Junu')
const singletonConfig2 = Config.getInstance('Junu2')

console.log(singletonConfig === singletonConfig2); // true
singletonConfig.printConfigName() // Junu
singletonConfig2.printConfigName() // Junu
```

### Interfaces

An interface is like a custom `type`. But, it only defines a *structure of an object*. It can be used to enforce contracts that classes (or objects or functions) should follow.

Therefore, interfaces are just ***contracts*** that a class and the third party accessor of the object adhere to!

```typescript
interface Person {
  name: string;
  age: number;
  getAge: () => number;
}
```

Use the **`implements`** keyword make a class implement an interface i.e have all the properties & methods an interface has!

```typescript
interface Person {
  name: string;
  age: number;
  getAge: () => number;
}

class Employee implements Person {
  constructor(public name: string, public age: number) {}

  getAge() {
    return this.age
  }
}
```

We can implement from ***multiple*** interfaces. That is because, *multiple interfaces get merged when implemented together in a class giving rise to one single object structure that must be followed*.

```typescript
interface Person {
  name: string;
  age: number;
  getAge: () => number;
}

interface Greets {
  hi: () => void,
  bye: () => void,
  greetWithMessage: (msg: string) => void
}

class Employee implements Person, Greets {
  constructor(public name: string, public age: number) {}
  
  hi() {
    console.log('Hi bro');
  }
  
  bye() {
    console.log('bye bro');
  }
  
  greetWithMessage(msg: string) {
    console.log(msg);
  }

  getAge() {
    return this.age
  }
}
```

#### Readonly interface properties

We cannot have *access modifiers* except for **`readonly`**. That is because, private fields cannot be in an interface since it defines the structure of an object from the perspective of external access

```typescript
interface Person {
  readonly name: string; // This means that name can only be intialised once in the class
  age: number;
  getAge: () => number;
}
```

#### Extending interfaces

Instead of implementing multiple interfaces, we can also extend interfaces from one another. This is similar to reusing interfaces when building more complex ones. For example, we can be using a `Person` in one place but a `GreetingPerson` in another place. A greeting person is also a person so the interface can be extended

Use the `extends` keyword (similar to classes)

```typescript
interface Person {
  readonly name: string;
  age: number;
  getAge: () => number;
}

interface GreetingPerson extends Person {
  hi: () => void,
  bye: () => void,
  greetWithMessage: (msg: string) => void
}

class Employee implements GreetingPerson { /* ... */ }
```

We can extend ***multiple*** interfaces too! Use commas (`,`). It is similar to using intersection on multiple object types

```typescript
interface GreetingPerson extends Person, Animal { /* ... */ }
```

#### Optional properties in interfaces

You can use the **`?`** operator to specifying optional properties. 

**Note:** The class implementing the interface can also implement it as a mandatory or optional properties. The logic must be written accordingly

```typescript
interface Person {
  name: string;
  age?: number;
  getAge: () => number;
}

class Employee implements Person {
  age?: number;
  constructor(public name: string, age: number) {
    if (age) {
      this.age = age
    } 
  }

  getAge() {
    if (this.age) {
      return this.age
    }
    return 0
  }
}
```

#### Interfaces vs custom types

- `type` defines a custom type. It can be any type. Interfaces always define an object structure
- `type` can also be of any type (flexible): It can have unions. Interfaces are only objects
- Interfaces are implemented by classes but they cannot implement a `type`

#### Interfaces vs abstract classes

* Abstract classes can have both abstract properties and methods as well as normal ones with implementations. Interfaces only have signatures and no implementation
* We can only extend one abstract class (or regular classes). We can implement many interfaces because these interface structures get merged into one single object structure that the class needs to implement
* Interfaces are for **contracts**. It is not just for the class. It is for both:
  * (1) The developer of an object
  * (2) The user of an object (3rd party)
  * The implementer and the user need only implement a common structure i.e a contract using interfaces so that they can stay decoupled with a clear API. This is the purpose of an interface. It does not matter which class was used to create an object i.e implementation does not matter (clean code)

#### Interfaces as function types

Apart from objects, we can also define *contracts for functions* using interfaces. Sometimes it is helpful to know the structure of functions too especially anonymous functions (ex: callbacks)

In this case, the interface can be used as a ***type annotation*** for a function

The interface itself must contain one function signature (use `:` and not an arrow function) within the object syntax like below:

```typescript
interface binaryNumericOperator {
  (n1: number, n2: number): number; // Use `:` and not an arrow function
}

const add: binaryNumericOperator = (n1, n2) => n1 + n2
console.log(add(1, 2)); // 3
```

#### Interfaces do not get compiled into Javascript

Interfaces are purely for compilation. Violations are caught during compilation. But, the code does not need to be there as a data structure in generated Javascript. It is removed before generation

## Advanced types

### Intersection type

Use the `&` operator to combine two types. 

```typescript
type employee = {
  name: string;
}

type admin = {
  isAdmin: boolean
}

type adminEmployee = employee & admin // It is both an admin and an employee

function createAdmin(name: string): adminEmployee {
  return {
    name,
    isAdmin: true
  }
}

console.log(createAdmin('Pushkar'));
```

```typescript
type StrNum = string | number
type NumBool = number | boolean

type intersection = StrNum & NumBool // TYPE: number

type union = StrNum | NumBool // TYPE: string | number | boolean
```

The other type is **Union `|`** which is *this or that*

### Type guards

It is a construct used to know which type we are actually getting before an operation can be carried out. This is useful when we need to make sure we don't carry out an erroneous operation i.e where the operands are not of the type we want them to be!

#### `typeof`

This is one type guard that exists in vanilla JS itself

```typescript
type StrNum = string | number

function addNums(n1: StrNum, n2: StrNum) {
  if (typeof n1 === "string" || typeof n2 === "string") { // TYPE GUARD
    return 'Can only add numbers'
  }
  return n1 + n2
}
```

#### `in`

This is another construct that checks for existence of a property in an object. Available in regular JS itself and can be used inside an `if` block

```typescript
type employee = {
  name: string;
}

type admin = {
  isAdmin: boolean;
  privileges: string[]
}

type unknownEmployee = employee | admin

function printPrivileges(emp: unknownEmployee) {
  if ("privileges" in emp) {
    console.log('Privileges:', emp.privileges);
  }
  return 'None'
}

console.log(printPrivileges({ name: 'Pushkar' })); // "None"
```

#### `instanceof`

This is an operator that tells us if something is an instance of a class

```typescript
class Car {
  drive() {
    console.log('driving...');
  }
}

class Truck extends Car {
  loadCargo() {
    console.log('loading cargo...');
  }
}

type Vehicle = Car | Truck

function performAllVehicleActions(v: Vehicle) {
  if (v instanceof Car) {
    v.drive()
  }
  if (v instanceof Truck) {
    v.loadCargo()
  }
}

performAllVehicleActions(new Truck())

/*
driving...
loading cargo...
*/
```

You cannot use `instanceof` on interfaces because it does not exist for them

#### Discrimated unions

It is a very useful pattern when dealing with interfaces and objects. 

1. We cannot use `instanceof` because interfaces do not have them
2. We cannot use typeof because the interface is not a primitive data type
3. We can use `in` but if there are too many differing properties between interfaces, it leads to a lot of checks

***Solution***: Keep one property inside the interface that uniquely describes it and use that in a switch case to discriminate and perform separate actions accordingly

```typescript
interface Bird {
  type: 'bird'; // A literal type to identify interface uniquely
  flyingSpeed: number
}

interface Horse {
  type: 'horse'; // A literal type to identify interface uniquely
  runningSpeed: number // It cannot fly!
}

type Animal = Bird | Horse

function moveAnimal(a: Animal) {
  let speed
  switch (a.type) {
    case 'bird':
      speed = a.flyingSpeed
      break;
    case 'horse':
      speed = a.runningSpeed
      break;
  }
}
```

### Type casting

When TS is not sure about a type, we can assure TS by specifying a type. This is helpful in cases where we fetch DOM elements but TS cannot determine its exact type

Use angle brackets **`<>`** or the **`as`** keyword to typecast. The most common use case is to transform `HTMLElement` to a more specific type of element like `HTMLInputElement`

Sometimes we need to account for possible `null` values (Ex: Such as a non-existent DOM element). In order to assure TS that the value will not be null, we can use **`!`** operator before typecasting it

```typescript
const $username = document.getElementById('username')
$username.value // ERROR!
// Object is possibly null (&) 
// Property does not exist on value type HTMLElement
```

```typescript
// One way to typecast:
const $username = <HTMLInputElement>document.getElementById('username')!
$username.value
```

In react, the above way of typecasting will conflict with JSX syntax. Therefore use an alternate syntax:

```typescript
// React (JSX) friendly typecast:
const $username = document.getElementById('username')! as HTMLInputElement
$username.value
```

When we want to typecast *on the fly*:

```typescript
const $username = document.getElementById('username')

if ($username) { // Alternative to null override (!)
  // Typecast can only be done after assuring TS of a non-null value
  ($username as HTMLInputElement).value
}
```

```typescript
// Other examples:
value as string
value as (string | number)
values as { name: string, age: number }
```

### Property index

When declaring interfaces, we might want to be more generic in defining the properties and the types. For this we can use the bracket notation `[]` to define a property type and follow it up with a value type

This is useful when we know the type of property we can expect but not the exact names. For example, anyone of the fields (email, password, username) might be incorrectly entered and we need to show an error message with the field that was incorrect. But, we don't know till the error occurs as to which of the fields had an error

```typescript
interface ErrorContainer {
  [prop: string]: string
}
// Because we used a property index,
// we cannot have something other than the type of the property 
// For example, we cannot have `id: number`
// but we can have `id: string` (matches property index type)
// This is a restriction!

const errorBag: ErrorContainer = {
  email: 'Email is wrong',
  password: 'Password is wrong',
  username: 'Username is wrong'
}
```

### Function overloads

Whenever we want to be *more specific about the return types* of a function based on input parameters, we can add additional signatures for a function just above its definition

Assume that you have an add function and you want to concatenate two strings and split it later. TS will throw an error when you use `split()` because it is not sure whether the returned type is a string or a number. The following example presents this problem:

```typescript
type NumStr = number | string

function add(n1: NumStr, n2: NumStr) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return `${n1}${n2}`
  }
  return n1 + n2
}

const concatedNames = add('Pushkar', 'DK')
concatedNames.split('') // ERROR! 
// The split() method is only available on strings
// But TS knows that the return type of add()
// can be either a string or a number - hence throws an error!
```

We can fix this with function overloading. That is, specify that if it is a string return only a string! We can also cover the other cases. Shown below:

```typescript
type NumStr = number | string

// Function overloading with a more signature above definition
// There can be multiple overloads above the definition
function add(n1: string, n2: string): string;
function add(n1: number, n2: string): string;
function add(n1: string, n2: number): string;
function add(n1: number, n2: number): number;
function add(n1: NumStr, n2: NumStr) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return `${n1}${n2}`
  }
  return n1 + n2
}

const concatedNames = add('Pushkar', 'DK')
concatedNames.split('') // Works!
```

### Optional chaining

We can use optional chaining to fetch object properties (esp. nested) that may or may not exist. It will return `undefined` if it cannot fetch it but there is no runtime error

```typescript
const response = {
  userId: 10,
  meta: {
    description: {
      name: 'Pushkar',
      age: 27
    }
  }
}

response?.meta?.description?.name // "Pushkar"

// What if the response does not contain height
// Since response comes at runtime, TS cannot know for sure
// but optional chaining helps with it:
response?.meta?.description?.height // undefined (BUT no error!)
```

TS has optional chaining since v3.7 and JS has it in ES2020+.

### Nullish coalescing

When we use `||` operator in JS, we skip the falsy values and choose a default

```typescript
'' || 'default' // default
0 || 'default' // default
false || 'default' // default
undefined || 'default' // default
null || 'default' // default
```

This is fine but what if we wanted to keep the empty string or a 0 value? For this, TS (and newer standards of JS) provides an alternate operator **`??`** that ***only skips `null` and `undefined`***

```typescript
'' ?? 'default' // ''
0 ?? 'default' // 0
false ?? 'default' // false
undefined ?? 'default' // default
null ?? 'default' // default
```

## Generic types

Generic types provides flexible and reusable code. They help with *additional type infromation* you can use when you have a complex class or a function

We can build generic functions and classes. They also have some constraints

Usually, *generics are attached to another type and mentioned within angled brackets **`<>`***

```typescript
const arr: string[] = ['Hi', 'Hello', 'bye'] // STRING type attached to array type
```

The above snippet can be written as a generic as shown below:

```typescript
const arr: Array<string> = ['Hi', 'Hello', 'bye']
```

We can have combined types too:

```typescript
const arr: Array<string | number> = ['Hi', 1, 'Hello', 2, 'bye']
```

Another example where it is useful is in **promises**. More often than not, TS does not know the type of the resolution of a promise. It falls back to type `any`. We can change this by adding a generic type to the promise resolution data so that TS can identify it and provide autocompletion and typechecks

```typescript
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Resolved string')
  }, 1000)
})

promise.then(data => {
  data.split() // Works!
})
```

### Generic functions

```typescript
function mergeObj(o1: object, o2: object) {
  return Object.assign(o1, o2)
}

const merged = mergeObj({
  name: 'Pushkar'
}, {
  age: 27
})

merged.name // ERROR! 
// Because TS inferred return type to be an object
// But, object type is very generic (useless)
// it does not recognise properties
```

The above piece does not provide the type of a merged object like we expected. Therefore, we can customize our functions by providing generics so that we may deal with different types of data & expect a more customized return type.

```typescript
// Using generic types to get an intersection of types for return:
function mergeObj<T, U>(o1: T, o2: U) {
  return Object.assign(o1, o2)
} // RETURN TYPE: T & U

const merged = mergeObj({
  name: 'Pushkar'
}, {
  age: 27
})

merged.name // NO ERROR!
```

#### Generic types can be extended from other types

```typescript
function mergeObj<T extends object, U extends object>(o1: T, o2: U) {
  return Object.assign(o1, o2)
} // RETURN TYPE: T & U

```

Multiple extensions are also possible:

```typescript
function add<T extends string | number, U extends string | number>(a: T, b: U) {}
```

Extending generic types from existing ones allows us to ***add constraints on the generic types***

An example of using an interface to add a constraint *(Constraint: Must have a length property)*:

```typescript
// The problem with the below snippet is that it restricts to strings & arrays;
function countAndDescribe(n: string | any[]) {
  return "Length is:" + n.length
}

// The fix (with interface and extending a generic type):
interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy>(n: T) {
  return "Length is:" + n.length
}
```

#### The `keyof` operator for generic types

This operator is used to assure TS that the generic type is a property of an object. TS then knows that it has to expect a property of an object (tighter control):

```typescript
// The problem:
function displayPropValue<T extends object, U>(o: T, p: U) {
  console.log(o[p]); // ERROR! TS cannot guarantee that p is a key of object o  
}

// The solution:
function displayPropValue<T extends object, U extends keyof T>(o: T, p: U) {
  console.log(o[p]); // No error
}

displayPropValue({ name: 'Push' }, 'name') // No error
displayPropValue({ name: 'DK' }, 'age') // TS catches errors if property is not passed
```

### Generic classes

We can use generic types to create a class that is flexible. Imagine a storage class that can store different types of data. The type of the data can be resolved based on usage!

```typescript
// Contrived example:
class DataStorage<T> {
  private items: T[] = [];

  setItem(item: T) {
    this.items.push(item)
  }

  removeItem(item: T) {
    this.items.splice(this.items.indexOf(item), 1)
  }

  getItems() {
    return [...this.items]
  }
}

const textStorage = new DataStorage<string>()
textStorage.setItem('item')
textStorage.getItems()
textStorage.removeItem('item')

const numberStorage = new DataStorage<number>()
numberStorage.setItem(100)
numberStorage.getItems()
numberStorage.removeItem(100)
```

Therefore, *functions and classes can be constructed from generic types*

###Generic utility types

1. **`Partial`** is a type of generic that allows us to partially build objects. The object type itself might contain more properties but it takes times to build it! Once we have build it completely we can typecast to the full time in the end

   ```typescript
   interface User {
     name: string;
     age: number,
     id: number
   }
   
   function createUser(name: string, age: number, curId: number) {
     let user: Partial<User> = {}
     // Sometimes, you might need to build an object gradually
     user.name = name
     user.age = age
     user.id = curId + 1
     return user as User // Finally, typecast it back
   }
   
   createUser('Pushkar', 27, 122)
   ```

2. **`Readonly`** is another type of generic that ensures the value creates is read only i.e initialised once without reassignment! Basically, it creates a readonly tuple (It is similar to access modifier `readonly` in classes but with an attached generic type)

   ```typescript
   const admins: Readonly<string[]> = ['Ram', 'Laxman']
   
   admins.push('Balaram') // Error! (as expected)
   ```

Generic types are *more powerful* than unions. Unions need more code to define and less flexible.

## Decorators

It is an experimental feature. Currently, a part of the ES7 spec and not widely supported yet in vanilla JS.

Decorators are used for **meta-programming** (Extra functionality behind the scenes)

It needs to be enabled by enabling the following in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */
  }
}
```

Decorators perform pre & post processing on a ***function invocation or a class creation***. It also provides us valuable information about our code itself! We can carry out additional tasks whenever a function runs or a class is defined!

*Syntax*: Use **`@`** and decorator function name on top of a class or a function

### Class decorators

These decorators are functions that execute **when a class is defined** *(Note: They do not execute when an object is instantiated)*. They receive the **constructor** function of the class as a parameter

```typescript
function Logger(constructor: Function) { // Convention for decorators: capitalized!
  console.log('Logging...');
}

@Logger
class Person {
  constructor(private name: string) {}

  speak() {
    console.log(`${this.name} speaking`);
  }
}

const pushkar = new Person('Pushkar')
pushkar.speak()

/* Output:
Logging...
Pushkar speaking
*/
```

#### Multiple decorators

Multiple decorators can be defined one above the other on top of a class or a function. They are executed in the **bottom-to-top** order (but, they are registered in top-to-bottom order):

```typescript
function Logger(constructor: Function) {
  console.log('Logging...');
}

function Analytics(constructor: Function) {
  console.log('Sending analytics...');
}

@Logger
@Analytics
class Person {
  constructor(private name: string) {}

  speak() {
    console.log(`${this.name} speaking`);
  }
}

const pushkar = new Person('Pushkar')
pushkar.speak()

/* Output:
Logging...
Sending analytics...
Pushkar speaking
*/
```

#### Decorator factories

We can have a ***higher-order function*** that returns a decorator function based on properties (customisable). Therefore, it acts as a factory that selects which decorator to deliver. It is a commonly used pattern since it gives us more flexibility.

**Note:** Decorators are registered first, in top-to-bottom fashion but they are executed for a class definition in a bottom-to-top order

```typescript
function Logger(name: string) {
  console.log('Logger factory');
  return (constructor: Function) => {
    console.log(`${name} | Logging...`);
  }
}

function Analytics(name: string) {
  console.log('Analytics factory');
  return (constructor: Function) => { // Not using param? Replace with `_` to ignore errors
    console.log(`${name} | Sending analytics...`);
  }
}


@Logger('User')
@Analytics('User')
class Person {
  constructor(private name: string) {}

  speak() {
    console.log(`${this.name} speaking`);
  }
}

const pushkar = new Person('Pushkar')
pushkar.speak()

/* Output:
Logger factory
Analytics factory
User | Sending analytics...
User | Logging...
Pushkar speaking
*/
```

#### Property decorators

They are defined for instance or static properties. 

* If instance, the target is the prototype object
* If static, the target is a constructor function

```typescript
function Log(target: any, propertyName: string | Symbol) {
  console.log(target, propertyName);
}

class Person {
  @Log
  private name: string

  constructor(name: string) {
    this.name = name
  }
}

/* Output:
{constructor: ƒ} "name"
*/
```

#### Accessor decorators

These are for accessors i.e `get` & `set` methods. It has a third parameter: *Property descriptor* of the accessor method

```typescript
function Log(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log(target, propertyName, descriptor);
}

class Person {
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  get name() {
    return this._name
  }

  @Log
  set name(value: string) {
    this._name = value
  }
}

/* Output:
{constructor: ƒ} "name" {enumerable: false, configurable: true, get: ƒ, set: ƒ}
*/
```

#### Method decorators

Class methods can also have decorators. The parameters are similar to accessor decorators

```typescript
function Log(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log(target, propertyName, descriptor);
}
class Person {
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  @Log
  printName() {
    console.log(this._name);
  }
}

/* Output:
{constructor: ƒ, printName: ƒ} "printName" {writable: true, enumerable: false, configurable: true, value: ƒ}
*/
```

#### Parameter decorators

Not only class methods, but even their parameters can be decorated. Place the decorator syntax just before the parameter in the argument list.

The arguments of the parameter decorator are similar to method ones except that instead of a property descriptor, we get the *position* of the parameter in the arguments list

```typescript
function Log(target: any, propertyName: string | Symbol, position: number) {
  console.log(target, propertyName, position);
}
class Person {
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  printNameWithMessage(@Log message: string) {
    console.log(`${this._name}: ${message}`);
  }
}

/* Output:
{constructor: ƒ, printNameWithMessage: ƒ} "printNameWithMessage" 0
*/
```

**Note:** Decorators execute during definitions (not during method runs or instantiations i.e *not at runtime*). However, we can *return* values from it depending on the kind of decorator it is in order to provide runtime functionality.

#### Enhancing class constructors using decorators

Class decorators can return a new constructor function that executes after the actual constructor function when an object is instantiated. Therefore, it changes the class to execute the original constructor function as well as the newly returned one

It uses syntactic sugar to make it look like the original constructor is being extended by the returned constructor (similar to a class)

```typescript
function OutputFieldsToContainer(originalConstructor: Function) {
  return class extends originalConstructor { // ERROR!
    // Error because we cannot extend a "Function" or "any" type (originalConstructor)
  }
}

// Solution: Define a generic type for the constructor function
// Allow it to take any args of any type (customisation is up to you)
// Let it return the type that matches the structure of the objects of the class
```

The fix (Generic type for constructor):

```typescript
<T extends { new (...args: any[]): { name: string } }>
// This is how you define a constructor function as a type
// i.e Syntax is as folows:
// (1) Object with the (2) new keyword and a 
// (3) function signature with (4) return type
```

Full solution:

```typescript
function OutputFieldsToContainer<T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
  console.log('Decorator');
  
  return class extends originalConstructor {
    constructor(...args: any[]) { // (1) Not using params? Prefix with `_` to avoid TS errors!
      super(...args) // (2) We must call this so that original constructor is called!
      const $container = document.getElementById('name')!
      $container.innerHTML = this.name // (3) `this` will refer to original class in this case
    }
  }
}

@OutputFieldsToContainer
class Person {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

const pushkar = new Person('pushkar')

/* Console output: Decorator */
/* HTML (#name div) output: pushkar */
```

#### Enhancing methods & accessors using decorators

A modified property descriptor can be returned so that the method or accessor method can be modified. A useful example of this is when you "auto-bind" the `this` keyword to the class while invoking the method!

```typescript
function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  // `_` prefixed parameters are ignored by TS compiler during "unused" check
  const originalMethod = descriptor.value // (1) The method itself is available here
  return {
    configurable: true,
    enumerable: false,
    get() { // (2) This method gets invoked before any method or property access
      // (3) The `this` is the class (or prototype?) inside the get() descriptor
      return originalMethod.bind(this)
    }
  }
}

class Person {
  constructor(public name: string) {}

  @Autobind
  printName() {
    console.log(this.name);
  }
}

const pushkar = new Person('pushkar')
const $button = document.getElementById('button')!

$button.addEventListener('click', pushkar.printName) 
// Without Autobinding (or binding manually to the class),
// `undefined` would have been printed on button click
// Now, it prints "pushkar"
```

#### Validating data using decorators

`[TO BE DONE]`

**Note:** Instead of writing our own, we can use easily available 3rd party decorators. **`typestack/class-validator`** is a popular open source decorator library that helps us validates classes & its fields

This approach might be better than writing your own validator decorators for **production code**

##Namespaces

Using namespaces code syntax, we can "group code".

Per-file or bundled compilation is possible (less imports to manage)

**Namespaces are similar to ES6 imports and exports**. Both provide similar functionality.

We can wrap all the pieces of code that need to be grouped together into a `namespace`:

```tsx
namespace DragableInterfaces {
  // All TS code under "DragableInterfaces" namespace should go here!
  interface dragable {
    dragStarted(event: DragEvent): void;
    dragEnded(event: DragEvent): void;
  }
  // ...
  // ...
}
```

We can expose parts of the interface outside of it by using the `exports` keyword

```tsx
namespace DragableInterfaces {
  // All TS code under "DragableInterfaces" namespace should go here!
  export interface dragable {
    dragStarted(event: DragEvent): void;
    dragEnded(event: DragEvent): void;
  }
  // ...
  // ...
}
```

Use the `export` keyword (just like in ES6 modules) in order to expose a method or property from a namepsace (While keeping the rest of it inaccessible from the outside world)

### Requiring a namespace

We cannot use elements of a namspace without first requiring a reference to it first.

```ts
/// <reference path="./path/to/file/containing/a/namspace/definition">
```

The prefix `///` is mandatory. It tells TS that you are importing a reference to a namespace

Namespaces are fine but not perfect. We still need to manually add all dependencies which is tedious!

## Modules

Instead of namepaces, we can use the regular **ES6 modules** (i.e `import` and `export ` syntax) and it works just fine (given that we use transpilers like babel and bundlers like webpack to take care of the resulting JS)

**Note:** `outFile` config in `.tsconfig` is not supported with ES modules so you need to comment that out!

***USE ES MODULES OVER NAMESPACES (RECOMMENDED)***

## Webpack with Typescript

We require **`typescript`** & **`ts-loader`** npm packages

Additionally, `webpack`, `webpack-cli` and `webpack-dev-server` are also needed for webpack itself

We don't need a `rootDir` config in TS since webpack takes care of source files to compile

Remove extensions `.js` and `.ts` from imports since webpack will automatically search for the files wihout their extensions

Webpack config:

1. Mark entry point to be your first entry file (Ex: `./src/app.ts`)
2. Output must contain a filename for the bundle and a file path (output directory)
3. Use `ts-loader` to add a loader to `.ts` files to process them! (Inside `module.rules`)
4. Use `resolve` to tell webpack to look out for both extensions, `.ts` and `.js`
5. *Optional*: set `sourceMap` in tsconfig to `true` so as to debug `.ts` files when app runs
   1. Can also set `devtool` property in webpack for type of source mapping
6. Create a build script like `"build": "webpack",` in package.json (`npm run build`)

```js
// webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
```

```json
{
  "name": "understanding-typescript",
  "version": "1.0.0",
  "description": "Understanding TypeScript Course Setup",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server",
    "build": "webpack"
  }
}
```

Webpack dev server will serve files from memory instead of the file system `dist` folder. For everything to run correctly in dev server, set a `publicPath` to `dist` (i.e your output folder) for everything to run correctly!

```js
// Package.json:
{
  "scripts": {
    "start": "webpack-dev-server",
  }
}
```

```js
// webpack.config.js:
const path = require('path')

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
  },
  //...
}
```

## Typescript and 3rd party libraries

Not all 3rd party libraries are built using typescript!

When you import these libs into your typescript project, TS will throw errors. And, if `noEmitOnError` is `true`, it won't even compile the code.

```ts
// app.ts
import _ from 'lodash' // TS ERROR!! Could not find a declaration file for module 'lodash'

console.log(_.shuffle([1, 2, 3]))
```

What can we do? We can **import types for a library if they are made available**

If you are using a 3rd party library that does not have types defined, you can:

1. Install the types for it (Any popular 3rd party library will have types)
2. The naming convention for the package's type is **`@types/<package>`**
3. You only need to install it as a dev dependency (since it is only for TS which compiles the code)
4. *Automatic*: You don't have to import the types package into your project (just installation is enough for TS to search for it)

About `@types`:

1. The @types packages contain no logic. Only signatures for their APIs which act like instructions to TS
2. They are having the **`.d.ts`** extension which tells TS that they are "declaration" files
3. The benefits includes autocompletion in vscode, errors on type mismatch, etc.

```shell
npm i -D @types/lodash
```

```ts
// app.ts
import _ from 'lodash' // NO ERROR (TYPE WAS READ FROM `@types/lodash`)

console.log(_.shuffle([1, 2, 3]))
```

You can find the type libraries for most popular libraries at this repo called [definitely typed](https://github.com/DefinitelyTyped/DefinitelyTyped)

### Use `declare` as a last resort

When we have some values outside of the TS world and it's not a library either then its usage inside your TS project will make TS throw an error. TS simply does not know what it is and if it exists

This can happen when we are using some global variables that are defined elsewhere (like on the window object) but TS has no way of knowing it. Because it is not a library, we cannot include the types for it

In such a scenario, we can use `declare` followed by the type for that variable before its usage.

```html
<!-- SOME HTML -->
<script>
var GLOBAL = 'GLOBAL'
</script>
```

```ts
// app.ts:
console.log(GLOBAL); // ERROR! TS DOES NOT KNOW ABOUT "GLOBAL" AND ITS TYPE
```

The fix with `declare`:

```ts
// app.ts
declare var GLOBAL: any
console.log(GLOBAL); // NO ERROR!
```

Use `declare` sparingly! It is better to use it as a *last-resort measure* (when you cannot have a declaration file or convert the code into TS)

## Typescript with React

- A functional component is a function that receives props & returns JSX. Its type in TS is **`React.FC`**
- A class component is a class that has a render method returning JSX. Its type in TS is **`React.ClassicComponent`**. You don't have to specify this type for a class though

**Note:** We can have *interfaces* for our props (and state) and supply them as generics to our components!

We can rename our component file extensions to **`.ts`** or **`.tsx`**

```tsx
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">Example</div>
  );
};

export default App;
```

```tsx
//  CLASS COMPONENT EXAMPLE:
import React from 'react';

class Comp extends React.Component<Props, State> {
  render() {
    return (
    <div className="App">Example</div>
  	);
  }
} 
```

### Types for props

We need to install **`@types/react` & `@types/react-dom`** for the types

If you use props, you must tell TS about the types of props being used. The approach is to 

*1. Create an interface for the props* and 

*2. Add that as a generic type to the component*

```tsx
interface TodoListProps { // You can also use a "type" instead of an interface
  items: {id: string, text: string}[];
};

const TodoList: React.FC<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};
```

```tsx
//  CLASS COMPONENT EXAMPLE:
import React from 'react';

interface Props { /* ... */ }
interface State { /* ... */ }

class Comp extends React.Component<Props, State> {
  /* ... */
}
```

### Types for events

1. Event handlers of React elements receive the `event` argument which has a type `event: React.FormEvent`
2. DOM elements can be types that they represent (i.e DOM element is what is present in` event.target`). Ex: `HTMLElement`, `HTMLDivElement`, `HTMLInputElement`, `HTMLVideoElement`, etc

### Types for hooks

Hooks are functions too and they usually take in a generic type. 

We can define the generic types inside angled brackets. Here is an example:

```tsx
const myRef = useRef<HTMLInputElement>(null)
```

An example with `useState`:

```tsx
const myRef = useState<{id: string, name: string}[]>([])
```

**Tip:** Hover over the hook functions in VSCode to understand the types of those functions and what arguments they need!

For the complete guide & cheatsheet for using TS with React, refer to **[this repo](https://github.com/typescript-cheatsheets/react)**

Add support for a 3rd part library by searching for its `@types/<libraryname>` package (if it is available)

## Typescript with Node & Express

**Does TS run on Node by default?**

*Yes and No!*

- If the file is `.ts` but contains only JavaScript code, node can execute it 
- If the file is `.ts` but containsTypeScript code, node *cannot* execute it!

**Logic?** Node does not care about the extension of the file (i.e `.ts` or `.js` does not matter). It only cares if the file can be interepreted as Javascript (i.e NodeJS) code!

```ts
// app.ts:
console.log('Hi'); // RUNS with `node app.ts`
```

```ts
// app.ts:
function add(a: number, b: number) { return a + b }
console.log(add(4, 7)); 
/* ERROR!! Does not run with `node app.ts` (X) */
```

### `ts-node` package

This package can be downloaded and installed globally. Use it similar to the way in which you use node (Ex: `ts-node app.ts`) and it will do the compilation of TS to JS behind the scenes and execute the resultant JS code in node

- This is good for local development purposes
- However, when you need production code on a server to execute, having to use this package to compile the files everytime and run the JS on node is an additional overhead and an added dependency (*Not recommended for production environments like servers*)

### TS for production Node project

**Step 1:**

Change **`"moduleResolution"`** to **`"node"`** in `.tsconfig`

**Step 2:**

Install **`@types/node`** as a dev dependency to work with all the types that we need in Node (Ex: `require` needs this package for TS to not throw an error)

**Step 3:**

If using `express` to build a Node server, install **`@types/express`** 

*Note*: Once we install the above types, we can use ES6 import over Node' commonjs imports! (Ex: `import express from 'express`). TS compiler converts it into commonjs (i.e `require` & `module.exports` statements)

**Step 4:**

Create a script that runs the TS compiler by taking source TS files and generating output JS files, in a different (distribution/build) folder (Ex: from `src` to `dist`)

**Step 5:**

Create a script that starts a server (or a development server) by running the generated javascript file from the distribution folder (Ex: `nodemon dist/app.js` and **not** `nodemon src/app.ts`!)

**That's it!**... also check out `nestjs` which helps us write server side code which embraces TS...

**Note**: Types for express middleware

1. Error object: `Error`
2. Request object: `express.Request`
3. Response: ``express.Response`
4. Next callback: ``express.NextFunction`

```ts
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  /* ... */
  next()
})
```

---
