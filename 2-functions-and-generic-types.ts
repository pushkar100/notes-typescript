// FUNCTIONS AND GENERATED TYPES

// --------------------

// 1. Explicitly tell TS the parameter's types

function add(a: number, b: number) {
  return a + b // TS infers the return type
}

add(1, 2)
add(1, '5') // ❌ Error!

// NOTE: An example with destructuring:
// Syntax: <destructured values>: <type of each destructured value>
function displayAgeWithMessage({ age }: { age: number }, message: string) {
  console.log(age, message);
} // Reference the interface AFTER the destructure.

const Person = { name: 'Pushkar', age: 26 }
displayAgeWithMessage(Person, 'If you are in your 20s, you are not too old, chill!')

// Note: When destructuring, there is some duplication or repetition (not DRY)
// However, there is no fix to this yet!
// Refer open issue: https://github.com/Microsoft/TypeScript/issues/29526

// --------------------

// 2. Explicitly tell TS the return type

function subtract(a: number, b: number): number {
  return a - b
}

subtract(3, 2)
subtract('5', 2) // ❌ Error!

// --------------------

// 3. Specify optional parameters using `?`
// Optional parameters must come only after all the required parameters

function exponent(base: number, exponent?: number) {
  if (exponent) {
    return base ** exponent
  } else {
    return base ** 1
  }
}

exponent(4)
exponent(3, 5)

// --------------------

// 4. Default parameters

// We can use the `=` syntax, just like in regular javascript
// When using default parameters, we dont need the optional `?`

function log(message: string, userId = "Not signed in") {
  return `${message} (User: ${userId})`
}

log("Hello")
log("Hi", "Bob")

// --------------------

// 5. Rest parameters

function sum(...numbers: number[]) {
  return numbers.reduce((s, num) => s + num, 0)
}

sum(92, 1, 2, 67, 5)
sum(5, 6, "10") // ❌ Error!

// --------------------

// 6. Specifying the type of `this`

// We can explicitly tell TS that `this` will be of a particular type upfront
// `this` parameter must come first in the arguments list as it is a special keyword

function format(this: Date) {
  return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`
}

format() // ❌ Error! format() was not called with `this` being a Date
format.call(new Date) // Works ☑

// Note:

// (a) Use `no-invalid-this` as a your TSLint rule 🆕 (tslint.json) to prevent usage of `this` 
// inside normal functions but allow it for methods & properties inside class.
// `this` changes based on how the function is invoked. Therefore, this rule helps avoid it

// (b) call(), apply(), and bind() can be use in an unsafe manner too!
// To prevent unsafe usage, use `strictBindCallApply` in your tsconfig.json 🆕
// If you are using `strict` already then this rule is included within it

// (c) To ensure that `this` is always annotated in a function parameter,
// use the `noImplicitThis`  🆕 rule (It does not enforce it for classes and objects, however)
// If you are using `strict` already then this rule is included within it

// --------------------

// 7. Explicitly specifying return type of Generator functions 

// Generator functions return an `IterableIterator` which is implicitly
// inferred by TS but we can also specify it ourselves

// We need to tell the type returned by the IterableIterator<<type>>
// This is the advantage of specifying it explicitly.

function* fibonacciGenerator(): IterableIterator<number> {
  let a = 0
  let b = 1
  while(true) {
    yield a;
    [a, b] = [a, a + b]
  }
}

let fibNums = fibonacciGenerator()
fibNums.next() // 0
fibNums.next() // 1
fibNums.next() // 1
fibNums.next() // 2

// Note: 
// If you are compiling TS to a level below ES2015 (i.e ES6)
// We need to polyfill for iterators i.e custom iterators
// TS will add them. Remember, however, these are extremely bulky
// Custom iterators can take a few kilobytes of data

// --------------------

// 8. Call signatures

// We can define a type signature (also known as call signature)
// We use it when we want to define a function completely!
// They contain only `type-level` code 🆕
// i.e Only info such as param type and return types, optional params,
// but NOT default values (since it is a default value)

// When are they useful?
// When we want to pass around functions and return them (first class object)
// For example, we pass a callback but want to control the parameters to
// that callback and what it returns

// (a) Call signature for function expressions
// General usage: We define it as a type and use the type 
// Syntax is similar to an arrow function `() => return`
type Log = (message: string, userId: number | string) => void

const logger: Log = (message, userId) => { // Params do not need types again (DRY!)
  console.log(`${message} by ${userId}`)
}

const anotherLogger: Log = function(message, userId = 'Guest User') {
  console.log(`${message} by ${userId}`)
} // Default values are not type-level info, hence appears in implementation code

// Inline call signature works too! (Don't always need a `type`)
const someFunc: (someParam: any) => void = (someParam) => {
  console.log(`some param: ${someParam}`);
}

// (b) Call signature for function declarations
// Currently, you have to use the same form used to declare param and return types
// No call signature outside of the function itself!
function subFunc(a: number, b: number): number { // Normal syntax
  return a - b
}

// (c) Call signatures can also contain function properties:
// Functions are object and can have properties
// These can be included in the function's call signature
type WarnUser = {
  (warning: string): void,
  wasCalled: boolean
} // This is the long-hand form of call signatures

const warn: WarnUser = (warning) => {
  if (warn.wasCalled) {
    return
  }

  warn.wasCalled = true
  alert(warning)
}
warn.wasCalled = false

// --------------------

// 9. Contextual typing:

// We can use call signatures for callback functions 
// inside the function that receives it. When we do this,
// we don't need to have a signature to a callback
// every time one is passed to the function

// It involves NOT writing type info for:
// (1) INLINED functions, that are
// (2) Defined in the parent function (that uses it as a callback)

function times(cb: (index: number) => void, count: number) {
  let i = count
  while(i > 0) {
    i -= 1
    cb(i)
  }
}

times(n => { console.log(n) }, 5); // We NEVER specified type info to the callback
// This only works because the callback is INLINE

// It will throw an error if callback is NOT inline:
const printIndex = n => { console.log(n) } // ❌ Error!
times(printIndex, 5); // ❌ Error!

// --------------------

// 10. Overloading function types:

// We can have MULTIPLE call signatures for a function.
// This is helpful because we can implement versatile functions
// i.e functions that have flexibility in what they take in and return

// NOTE: Even with multiple call signatures
// we have to IMPLEMENT it (the function) in such a way that it MATCHES ONLY ONE OF THEM!

// Syntax:
// Use the long-hand form of call signatures
type Travel = {
  (from: string, to: string, date: Date): void // Option 1: From and To on a date
  (from: string, to: string): void // Option 2: From and To but date not specified
}

const ReserveTickets: Travel = (from, to, date) => {
  // Do something
} // ❌ Error! Function's parameters do not conform to any 
// one of the call signatures!

// Correct ☑: We tweak our params types to conform to one of the Travel type
const ReserveTickets2: Travel = (from: string, to: string, date?: Date) => {
  // Do something
}

// NOTE: 
// Keep the implemented types as specific as possible!
// If we do not do so, we need to PROVE to TS that we are passing what is intended
// Ex: If we pass a date, we need to prove it is a date (i.e DUCK TYPING / STRUCTURAL TYPING)
const ticketReserver: Travel = (from: any, to: any, date?: any) => {
  date.getMonth() // ❌ Error!

  // Duck typing (Correct ☑):
  if (date && date.getMonth) {
    date.getMonth()
  }
}
// With more specific implementation types, we don't require duck typing (cleaner code!)

// Overloading declared functions:
// The syntax is slightly different.
// Place the signatures immediately above the function declaration
function createElement(tag: 'a'): HTMLAnchorElement
function createElement(tag: 'canvas'): HTMLCanvasElement
function createElement(tag: 'table'): HTMLTableElement
function createElement(tag: string): HTMLElement {
  return document.createElement(tag)
}

// --------------------

// 11. Polymorphism with "Generic Types" 🆕

// Everything so far has been a Concrete Type
// What if we don't want to restrict the types our function deals with?
// In the sense, what if we 'don't know the exact type before hand?'

const filter = (array: number[], filterTest: (item: number) => boolean): number[] => {
  let result = []
  for(let i = 0; i < array.length; i++) {
    let item = array[i]
    if (filterTest(item)) {
      result.push(item)
    }
  }
  return result
}

// In the above snippet, `filter` is taking a number[] and a function,
// taking a number and returning a boolean, and returning a number[]
// That is its signature.

// What if we wanted to filter out numbers, strings, objects, and other data types?
// Solution 1: Add an overloaded call signature for the filterTest call expression
type FilterTest = {
  (array: number[], filterTest: (n: number) => boolean): number[]
  (array: string[], filterTest: (n: string) => boolean): string[]
  (array: object[], filterTest: (n: object) => boolean): object[] // this only accepts {} 
  // and not the shape
}
// It is very tedious to write all the types
// and we might still miss out on many more types
// Our code is not general and reusable!

// ✅ Solution 2: Use GENERIC TYPES (Recommended)
// Generic types are "Placeholder Types" that enforce a type-level constraint 
// in MULTIPLE PLACES (Also called "Polymorphic type parameter")
type Filter = {
  <T>(array: T[], filterTest: (item: T) => boolean): T[]
}
// NOTE: 
// 1. Angle brackets (<>) is how a generic type is defined
// 2. Where you place a generic type defines its scope and when it is bound!
// 3. We can have multiple comma separated generic types within angle brackets. Ex: <T,U>
// 4. T,U etc are conventions. You may use any idenitifier! TS convention uses T, U, ...
// 5. Typescript infers the generic bindings from the types of the arguments we pass it
// For example, if we pass an array of numbers in the above example,
// your code realises that T has to be a number - so it also checks the other occurrences
// of T and makes sure it is the same.

const filterFunc: Filter = (array, filterTest) => {
  let result = []
  for(let i = 0; i < array.length; i++) {
    let item = array[i]
    if (filterTest(item)) {
      result.push(item)
    }
  }
  return result
}

filterFunc([1, 2, 3], (n) => n > 3) // ✅ T will be "number"
filterFunc(["foo", "bar", "woof"], (n) => n.length > 3) // ✅ T will be "string"
filterFunc([{ x: true }, { x: false }, { x: false }], (n) => !!n.x) 
// ✅ T will be "object of shape {x: boolean}"

// --------------------

// 12. Binding of generic types

// When are generic types bound?
// It depends on where it is defined.

// (a) Scoped to individual signatures (Bound during function call)
{
  // Example 1: Type declaration
  type Filter = {
    <T>(array: T[], filterTest: (item: T) => boolean): T[]
  }
  const filter: Filter = (array, filterTest) => {
    // ...
    return [/* ... */]
  }
  // Bound during invocation
  filter([1, 2, 3], (n) => true) // T is bound to a "number"
}
// Shorthand: Inline type annotation
{
  // Example 2:
  const filter: <T>(array: T[], filterTest: (n: T) => boolean) => T[] = (array, filterTest) => {
    // ...
    return [/* ... */]
  }
  // Bound during invocation
  filter([1, 2, 3], (n) => true) // T is bound to a "number"
}

// (b) Scoped to all of the signatures (Bound during declaration of function of that type)
{
  // Example 1: Type declaration
  type Filter<T> = {
    (array: T[], filterTest: (item: T) => boolean): T[]
  }
  // Bound during function declaration:
  let filter: Filter<number> = (array, filterTest) => {
    // ...
    return [/* ... */]
  }
}
// Shorthand: Inline type annotation
{
  // Example 2: Inline
  type Filter<T> = (array: T[], filterTest: (item: T) => boolean) => T[]
  let filter: Filter<string> = (array, filterTest) => {
    // ...
    return [/* ... */]
  }
}

// (c) Scoping a generic type to a function declaration:
{
  function filter<T>(array: T[], filterTest: (item: T) => boolean): T[] {
    // ...
    return [/* ... */]
  }
  // The generic type is bound when you invoke the declared function:
  filter([1, 2, "g"], (n) => true) // T is bound to a string or a number
}

// --------------------

// 13. Explicit annotations for generics

// Instead of <T,U> etc we can give actual types for the generics
// Like: <string, number> and so on.
// It is all or nothing (annotate all generic types or don't annotate)

function map<T, U>(array: T[], mapper: (item: T) => U): U[] {
  // ...
  return [/* ... */]
}

// Explicitly annotate during invocation:
map<number, string>([1, 2, 3], _ => _.toString())

// --------------------

// 14. Generic type aliases

// We can have generic type alias that gets bound when it is implemented elsewhere
type MyEvent<T> = {
  target: T,
  type: string
}

// Using the MyEvent generic type in another type alias:
type TimeEvent<T> = { // T gets bound to TimeEvent<T> because it uses MyEvent<T>!
  event: MyEvent<T>,
  from: Date,
  to: Date
}

// T gets bound to triggerEvent<T> because it uses MyEvent<T>!
function triggerEvent<T>(event: MyEvent<T>): void {
  // ...
}

// --------------------

// 15. Bounded polymorphism

// We can have constraints on generic types
// that limit it to always extend a certain type of value.
// We call this value the "upper bound" 🆕

// (a) We can use the following methods to extend types:
// 1. Use "&" in the type declaration 🆕
// 2. When you reference a type within a type, use bracket notation ([]) 🆕
// 3. Use "extends" keyword when identifying a generic type within <> 🆕
type TreeNode = {
  value: string
}
type LeafNode = TreeNode & {
  isLeaf: true
}
type InnerNode = {
  children: [TreeNode] | [TreeNode, TreeNode]
}
// We can use a generic type that extends the existing types
function mapNode<T extends TreeNode> // T has to be at least a TreeNode
  (node: T, f: (value: string) => string) { 
  // ...
  return {
    ...node,
    value: f(node.value)
  }
}

// (b) We can extend multiple types using the "&" keyword
type HasSides = { numberOfSides: number }
type SidesHaveLength = { sideLength: number }
function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): number {
  return s.numberOfSides * s.sideLength
}

// --------------------

// 16. Generic type defaults

// We can give generic types defaults much like default values to parameters
type ElementEvent<T = HTMLElement> = {
  target: T,
  type: string
}
// OR: with extension
type MyElementEvent<T extends HTMLElement = HTMLElement> = {
  target: T,
  type: string
}

// --------------------

// BONUS: TYPE DRIVEN DEVELOPMENT (TDD)

// A style of programming where you sketch out type signatues first 
// and then fill in the values later

// Why?
// When you apply an expressive type system to a function,
// the function' type signature might end up telling you 
// most of what you need to know about that function

// How?
// When you write a TS program:
// 1. Start by defining the function's type signaturs (i.e lead with the types)
// 2. Make sure everything makes sense at a high level first
// 3. Get into the implementation details in the end (last)
