// Typescript types
// ================

// Types:
// 1. any
// 2. unknown
// 3. boolean
// 4. number
// 5. bigint
// 6. string
// 7. symbol
// 8. Types for objects
//     8.1 object (empty literal)
//     8.2 object shapes
//     8.3 Object `{}`
// 9. arrays
// 10. tuples
// 11. null, undefined, void, & never
// 12. enum

// BONUS:
// a. Type aliases
// b. Unions and intersections
// c. `readonly` type prefix
// d. Type completion

// ----------------

// 1. any (godfather of type)

{
  let a: any = 100
  let b = ['danger']
  let c = a + b

  function foo(bar) { // ⛔ Error: bar has implicit type "any"
    bar.baz
  }
}

// TS can infer something as "any" when it can't infer a proper type

// Function parameters when not given given a type are inferred as any
// TS throws an error when this happens!

// Prevent implicit anys with "noImplicitAny" rule 🆕 in config
// or by having "strict" in config (it includes many rules including the above)

// ----------------

// 2. unknown

{
  let a: unknown = 5
  let b = a === 123 // (a) (☑) Can compare unknown values 
  let c = a + 10 // (b) ⛔ Error: Cannot use unknown values until they are "refined"
  // Refinement: Use `typeof` or `instanceof` 🆕
  if (typeof a === 'number') {
    let d = a + 10
  }
}

// Unlike "any", an "unknown" type is never inferred by TS (always explicit)

// ----------------

// 3. boolean

{
  let a = true // (a) TS infers the type to be a boolean
  const b = true // (b) TS infers the specific value i.e always true 
  // Since `const` cannot change
  // Known as "type literal"
  
  let c: boolean = false // (c) Explicitly tell TS the type
  let d: true = true // (d) Explicitly tell TS the specific value (type literal)
}

// ----------------

// 4. number

{
  let a = 100 // (a) TS infers the type to be a number
  const b = 5.5 // (b) TS infers the specific value i.e always 5.5 

  let c: number = 150 // (c) Explicitly tell TS the type
  let d: 113.4 = 113.4 // (d) Explicitly tell TS the specific value (type literal)

  // Can use `_` as numeric separators for big numbers (in both type and value) 🆕
  const oneMillion: 1_000_000 = 1_000_000 // same as 1000000
}

// ----------------

// 5. bigint

// Similar to `number` type but the numbers use a suffix of `n` 🆕
// Follow the same 4 ways of defining the type (2 inferred, 2 explicit)
// For example: let bigNum = 1012120n
// Not all targets support bigints (Only available in ES2020+)

// ----------------

// 6. string

{
  let a = "Hello there" // (a) TS infers the type to be a string
  const b = "Mister" // (b) TS infers the specific value i.e always "Mister" 
  // Since `const` cannot change
  // Known as "type literal"
  
  let c: string = "good evening" // (c) Explicitly tell TS the type
  let d: "Baby" = "Baby" // (d) Explicitly tell TS the specific value (type literal)
}

// ----------------

// 7. symbol

// Same as JS symbols (new in ES2015)
// However, we can define a unique symbol in addition to normal symbols 
// It is similar to a type literal in numbers, booleans, etc (Being more specific)

{
  let a = Symbol('a') // (a) TS infers the type to be a symbol
  const b = Symbol('b') // (b) TS infers the type to be a unique symbol 
  // If you use const, you are always creating a unique symbol!
  // Since `const` cannot change -> It always produces a unique symbol

  let c: symbol = Symbol('c') // (c) Explicitly tell TS the type
  const d: unique symbol = Symbol('d') // (d) Explicitly tell TS the specific value 
  // Has to be a const!

  // Think of unique symbols as "type literals" 🆕 (a narrower symbol)
  // 1. We can compare two symbols (even if they are never equal)
  let e = a === a
  // 2. But, we can never compare two unique symbols!
  let f = b === d // (⛔ Error! No overlap)
}

// ----------------

// 8.1 object

// Use only when you don't care about what the object contains!
// It only tells you it is a javascript object and not null!

{
  let a: object = {
    x: 1
  }
  a.x // ⛔ Error! The type of 'a' is object and it is unaware of property x and its type
}

// 8.2 object shapes

// More useful and popular

{
  // (a) TS infers the type
  let a = {
    name: "Pushkar",
    age: 26
  } // type: { name: string, age: number }

  // (b) Explicitly tell TS what the object's shape is
  let b: {
    x: number,
    y: number
  } = {
    x: 1200.4,
    y: 912.0
  }

  // (c) Optional parameters with `?`:
  let c: {
    point: number,
    name?: string // Will be a string or undefined
  } = {
    point: 100
  }
  // NOTE: We can use "type aliases" to implement DRY with object shapes
  // i.e No duplication

  // (d) "Index signatures" 🆕: Tell TS that the given object contains more keys
  // Define `[key: T]: U` which has a key of type T with a valid type U
  // For objects, T can only be either a string or a number
  let d: {
    name: string,
    description?: string,
    [key: number]: string // The keyword `key` can be any identifier. 
    // Ex: `[records: number]: string` is perfectly valid
  } = {
    name: 'Topological records',
    description: 'Survey of Bengaluru Rural',
    10092: 'Survey spot: Ward #190'
  }

  // (e) Use `readonly` properties (as prefix to key in type declaration)
  // These are properties that cannot be modified after being assigned a value
  let e: {
    readonly country: string
  } = {
    country: 'IN'
  }

  e.country = 'US' // ⛔ Error! Cannot reassign a readonly property

  // (f) NOTE: We can define the types for class properties too!
  // Add it to the constrtuctor function parameters
  // Use `public` as shorthand 🆕
  class Person {
    constructor(public firstName: string, public lastName: string) {
      // `public` is shorthand for this.firstname = firstName
      // Therefore, we don't have to define the above (DRY)
    }
  }
}

// 8.3 Object

// The `Object` type is basically an empty object (`{}`)

{
  let danger: {} // Only declaration
  // danger can be anything now, all kinds of objects
  danger = {}
  danger = { x: 1 }
  danger = []
  danger = () => {}
  danger = 2
  // 😢 NOT what we want! It's best to avoid it
}

// In general, use object shapes (with type aliases to follow DRY)
// Avoid using `object` & `Object` types

// ----------------

// 9. Arrays

{
  let a = [1, 2, 3] // (a) TS infers the type (number)
  let b = ['Hi', 'Hello', 'Bye'] 

  let c = [1, 'c'] // (b) TS infers a mixed type (string | number)
  const d = [2, 'New']

  let e: number[] = [1, 2, 4, 8] // (c) Explicitly tell TS the type (<type>[])
  let f: (string | number)[] = [1, 'x'] // (d) Explicitly tell TS the mixed type ((<type> | <type>)[])

  function foo() {
    var g = [] // (e) TS infers the type to be "any"
    // When we start adding values, TS narrows down the type
    // Once outside the SCOPE of definition, the type becomes fixed! 🆕
    g.push(1)
    g.push('Hello')
    return g
  }

  const fooRes = foo()
  fooRes.push(true) // ⛔ Error! Cannot push boolean onto an array of strings & numbers

  // General rule of thumb: Keep your arrays "HOMOGENOUS"
  // i.e All elements of a single type 
  // Try to design your programs better, don't mix apples and oranges
  // For example, Array.prototype.map() will need a conditional inside the callback
  // in order to treat numbers and strings differently.
}

// ----------------

// 10. Tuples

// Similar to arrays with the following difference:
// 1. They have fixed lengths
// 2. Type of value at every index is known

// NOTE: TS cannot infer tuples, we have to explicitly declare them

{
  // (a) Explicitly tell TS that we have a tuple
  let a: [number] = [1] 
  let b: [string, string, number] = ['Pushkar', 'DK', 26] // first name, last name, age

  // (b) Have optional tuple indices with `?`
  let c: [number, number?] = [1, 2]

  // (c) Have rest parameters in tuples (dynamic length)
  // Type of last few elements are known
  let d: [number, boolean, ...string[]] = [1, true, 'a', 'b', 'c']
}

// ----------------

// 11. null, undefined, void, & never

{
  // (a) null: Absence of a value
  function a() {
    return null
  } // function a(): null

  // (b) undefined: Something hasn't been defined yet
  function b() {
    return undefined
  } // function b(): undefined

  // (c) void: Return type of a function that does not return anything
  function c() {
    console.log('do something , do not return anything')
  } // function c(): void

  // (d) never: Function that never returns all (ex: throws exception or loops infinitely)
  function d() {
    throw TypeError('Errored!')
  }
  function e() {
    while(true) {
      console.log('I keep logging forever');
    }
  }

  // NOTE:
  // `unknown` is super type of every other type
  // `never` is the bottom type of every other type

  // NOTE: 
  // In older TSC versions or with `strictNullChecks: false` in config (🆕),
  // you would run into null issues when checking for objects
  // Every type used to be nullable (Therefore, you had to check if it was null first)
  function f(i: string) {}
  f(null) // ⛔ Error!
  // In earlier TS versions, however, this would pass without throwing an error
}

// ----------------

// 12. Enums

// The first type that does not enhance a Javascript built-in type 
// Use the syntax `enum <name> { ... }`
// Two kinds of enums:
// 1. Maps string to number
// 2. Maps string to string

{
  // (a) TS infers a number internally (0, 1, 2, ...) to each enum value
  enum Language {
    English,
    Spanish,
    Hindi,
    Kannada
  }

  // (b) Explicitly tell TS to map to a number:
  enum Languages {
    English = 1,
    Spanish = 9 + 1, // Can even be a computed number (expression)
    Hindi, // Need not specify for all, TS will assign the remaining (11)
    Kannada // 12
  }

  // (c) Explicitly tell TS to map to a string:
  enum Langs {
    English = "English",
    Spanish = "Spanish",
    Hindi = "Hindi", 
    Kannada = "Kannada"
  }

  // (d) Explicitly tell TS to mix strings and numbers:
  enum Lang {
    English = "English",
    Spanish = 1,
    Hindi = "Hindi", 
    Kannada = 2
  }

  // Problems with enums: They are "unsafe" 😟
  // -----------------------------------------

  // 1. We can access enum by number or index: Even if we have only string maps
  enum Color {
    Red = 'red',
    Blue = 'blue'
  }
  let a = Color.Red // ☑
  let b = Color[0] // ❌Error in "strict" config | but otherwise this would pass
  let c = Color[6] // ❌Error in "strict" config | but otherwise this would pass
  // Solution to 1: Use `const enums` ! 🆕
  const enum Col {
    Red,
    Blue
  }
  let d = Col.Red 
  let e = Col.Yellow // ❌Error in all cases!
  let f = Col[0] // ❌Error in all cases!

  // 2. We can split enum declarations! (Specify in multiple place)
  // TS inlines enums (maps the enums to values) at BUILD time!
  // This can cause conflicts in inferred values because
  // TS can infer values for one of those declaration
  enum Country {
    US = 0,
    CA = 1
  }
  enum Country {
    IN = 1, // Value conflicts with CA
    CHN = 2
  }
  let g = Country.CA
  let h = Country.IN
  let i = g === h // Will always be true because of inlining!
  // Solution to 2: Use `preserveConstEnums` in config (🆕)
  // This will inline enum values at RUN time
  // when all the enums are accounted for (no additions, hence no conflicts)

  // 3. We can substitute number values for enums
  function foo(a: Country) {}
  foo(1) // Passing a number in place of an enum is still cool!
  // No solution exists to this problem

  // ----------------------------------------------
  // Therefore, UNTIL TS HAS FIXED ALL ENUM ISSUES:
  // Use plain object mapping (with Object.freeze)
  // or some other methods instead of enums.
}

// ----------------
// BONUS:
// ----------------

// a. Type aliases

// We can have type aliases to prevent duplication of types,
// especially for complex types such as object shapes (REUSE)
// Syntax: `type <identifier> = <type>`

// NOTE: Type aliases are BLOCK SCOPED, just like let & const!
// Just like variable declarations (let/var/const), you cannot declare a type twice!

{
  // Example for primitives
  type Bool = boolean
  type hundred = 100 // Type literal
  
  let a: Bool = true
  let b: hundred = 100
}

{
  // Example for object shapes:
  type Person = {
    firstName: string,
    lastName: string,
    age: number,
    company?: string
  }

  let pushkar: Person = { 
    firstName: "Pushkar", 
    lastName: "DK", 
    age: 26 
  }
  // Reusable:
  // let rahul: Person = { ... }
}

// ----------------

// b. Union & Intersection of types

// Union: Use `|` when you want a type of "either this or that or both"
// This is very popular
// It is NOT exclusive. Something can be a combination of both the types!
{
  let a: number | string = 5
  let b: (string | number)[] = [5, "hey"]

  a = "Hi" // pass ☑
  a = false // ⛔ Error!
  b.push(10) // pass ☑
  b.push(true) // ⛔ Error!
}

{
  type cat = { name: string, meows: boolean }
  type dog = { name: string, barks: boolean }
  type catOrDog = cat | dog

  let b: catOrDog = {
    name: 'Bonkers',
    barks: true
  } // Only a dog
  
  b = {
    name: 'Bonkers',
    meows: true
  } // Only a cat

  b = {
    name: 'Bonkers',
    barks: true,
    meows: false
  } // Both a cat and a dog
}

// Intersection: Use `&` when you want something to be a type of both
// That "this and that"!
// Something should completely satisfy both the types
{
  type cat = { name: string, meows: boolean }
  type dog = { name: string, barks: boolean }
  type catAndDog = cat & dog

  let c: catAndDog = {
    name: 'Bonkers',
    barks: true,
    meows: false
  } // Both a cat and a dog

  // ⛔ Error!: Cannot be only a dog
  c = {
    name: 'Bonkers',
    barks: true
  }

  // ⛔ Error!: Cannot be only a cat
  c = {
    name: 'Bonkers',
    meows: true
  }
}

// ----------------

// c. Readonly properties for arrays and tuples:

// Works only for ARRAYs and TUPLEs
// Values once assigned cannot be modified again.

// Arrays:
// Syntax 1: readonly <type>[]
// Syntax 2: ReadonlyArray<<type>>
// Syntax 3: Readonly<<type>[]>

// Tuples:
// Syntax 1: readonly [type, type, ...]
// Syntax 2: Readonly<[type, type, ...]>

// It adds immutability to the array/tuple.
// That is, only such operations are allowed that 
// do not mutate the original array/tuple.
// For example, push(), splice(), etc are not allowed
// but slice(), concat(), map(), filter(), etc are allowed

{
  // Array examples:
  let a: readonly string[] = ["Hi", "Bro"]
  let b: ReadonlyArray<number> = [10, 20, 30]
  let c: Readonly<number[]> = [10, 20, 30]

  let d: readonly (string | number)[] = [1, 'a', 2, "blah"]
}

{
  // Tuple examples:
  let a: readonly [number, string] = [20, "Message from Bheem"]

}

// Be careful while using readonly arrays and tuples
// Since immutability is certain, it can affect performance
// If you want better implementation of immutability,
// check out libraries such as immutable.js which offer the 
// constraint as well as do it in a performant way

// ----------------
