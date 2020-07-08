// CLASSES AND INHERITANCE

// Enhances classes provided in regular JS 

// -----------------------

// 1. A simple class:

// Similar to JS classes but with type annotations
{
  class Position {
    constructor(a: number, b: object) {}
    someMethod(f: number) {}
  }  

  // JS provides us with the `extend` keyword for inheritance
  // and TS includes it as well:
  class CenterPosition extends Position {
    constructor() {
      // Just like in regular JS, we can invoke parent constructor with super()!
      super(5, {}) 
      // Just like in regular JS, we can invoke parent's method with super.<parentMethod>!
      super.someMethod(1)
    }
  }

  // Note: We cannot have multiple inheritance. That is,
  // in neither JS nor TS
  class A {}
  class B {}
  class X extends A, B {} // ❌ Error! Can only extend a single class
}

// -----------------------

// 2. Access modifiers:

// There are 3 access modifiers: 🆕
// - `public` (default): Accessible from instances of this class, its subclasses, and outside it
// - `private`: Accessible from instances of this class only
// - `protected`: Accessible instances of this class and its subclasses only
// All three require assignment to create a this.<property> in the class based on the type

// (a) We can assign access modifier in a constructor parameter
{
  class Position {
    constructor(private file: string, private rank: number) {
      // This creates this.file = file & this.rank = rank automatically
    }
  }
}

// (b) We can assign access modifier in a class declaration (outside the constructor)
// However, we need to assign it in our constructor using `this`
// else, there is no initializer and it will throw an error❗
{
  class Position {
    protected file: string
    protected rank: number // ❌ Not initiliazed in constructor - will throw error!
    constructor(fileAndRank: { file: string, rank: number }) {
      this.file = fileAndRank.file // ✅
    }
  }
}

// NOTE: In order to have definite assignments for class properties,
// opt-in for `strictNullCheck` and `strictPropertyInitialization` in tsconfig.json 🆕
// If you are already using `strict` , they are included in it

// (c) Bonus: Investigating `private`:
{
  type Color = 'violet' | 'indigo' | 'blue' | 'green' | 'yellow' | 'orange' | 'red'
  
  class PaintBox {
    private selectedColor: Color
    constructor(color: Color) {
      this.selectedColor = color
    }

    paint() {
      this.selectedColor // ✅ Can access private property inside the class (i.e class methods)
    }

    private internalMethod() {}
  }

  const myPaintBox = new PaintBox('violet')
  myPaintBox.selectedColor // ❌ Cannot access private property outside the class
  myPaintBox.internalMethod() // ❌ Cannot access private method outside the class

  // Sub-Class:
  class DeluxePaintBox extends PaintBox {
    constructor(color: Color) {
      super(color)
      super.selectedColor // ❌ Cannot access parent's private property in a sub-class
      super.internalMethod() // ❌ Cannot access parent's private method in a sub-class
    }
  }
}

// (d) Bonus: Investigating `protected`:
{
  type Color = 'violet' | 'indigo' | 'blue' | 'green' | 'yellow' | 'orange' | 'red'
  
  class PaintBox {
    protected selectedColor: Color
    constructor(color: Color) {
      this.selectedColor = color
    }

    paint() {
      this.selectedColor // ✅ Can access protected property inside the class (i.e class methods)
    }

    protected internalMethod() {}
  }

  const myPaintBox = new PaintBox('violet')
  myPaintBox.selectedColor // ❌ Cannot access protected property outside the class
  myPaintBox.internalMethod() // ❌ Cannot access protected property method outside the class

  // Sub-Class:
  class DeluxePaintBox extends PaintBox {
    constructor(color: Color) {
      super(color)
      super.selectedColor // ✅ Can access parent's protected property in a sub-class
      super.internalMethod() // ✅ Can access parent's protected property in a sub-class
    }
  }
}

// -----------------------

// 3. Readonly class properties

// Similar to Arrays and Tuples,
// We can have `readonly` properties for a class
// i.e Once initialized to a value, it can be written anymore

{
  type Color = 'violet' | 'indigo' | 'blue' | 'green' | 'yellow' | 'orange' | 'red'
  
  class PaintBox {
    readonly selectedColor: Color
    constructor(color: Color) {
      this.selectedColor = color
    }

    paint() {
      this.selectedColor = 'blue'
    }
  }

  const myPaintBox = new PaintBox('violet')
  myPaintBox.selectedColor = 'indigo' // ❌ Cannot set a readonly property outside the class either!
}

// -----------------------

// 4. Abstract classes

// When we don't want to instantiate a class directly but through extension,
// we can mark it as `abstract` so that the inheriting classes have the concrete
// implementations.

// Why?
// Sometimes it does not make sense to instantiate a base class. TS can help enforce this.
// Ex: A chess Piece as a class makes sense but a Piece has to be more specific like,
// a queen, or a king, and so on.
// Abstract help enforce a particular structure to the inheriting classes (So that
// downstream errors are mitigated or caught at compile time)

// Abstract classes can:
// a. Have abstract methods that the inheriter is forced to implement
// b. Have normal methods that the inheriter can make use of (or override)

{
  // An abstract class:
  abstract class Piece {
    private position: { file: string, rank: number}
    constructor() {
      this.position = { file: '', rank: -Infinity }
    }
    moveTo(file: string, rank: number) {
      this.position = { file, rank }
    }
    // An abstract method contains only the "call signature":
    // Also, abstract methods can only appear inside an abstract class.
    abstract canMoveTo(file: string, rank: number): boolean
  }

  const piece = new Piece() // ❌ Error! Cannot instantiate an abstract class directly

  class Queen extends Piece {
    constructor() {
      super()
    }

    // We have to implement abstract method in inheriting class
    canMoveTo(file: string, rank: number) {
      // ... check ...
      return true
    }

    // We need not implement `moveTo`,
    // but we can still go ahead and override the base class implementation
    // moveTo(file: string, rank: number) {} // will not throw an error
  }

  const queen = new Queen() // ✅ Can instantiate a non-abstract class
}

// -----------------------

// 5. Interface (Implementations)

// Interfaces (`interface`) are a convenient way to 
// add a type-level constraint to our classes (i.e make sure it is 
// implemented as closely as possible to the defined interface)

// A class uses the `implements` 🆕 keyword instead of `extends`
// to implement an interface.
// Interface contains signatures similar to a type alias

// It is a familiar way to implement common design patterns
// Ex: factory, adapter, strategy, and so on

// Interfaces help us catch errors faster during a violation inside a class!

// (a) An example of using interfaces:
{
  interface Animal {
    readonly name: string
    eat(food: string): void
    sleep(hours: number): void
  }

  class Cat implements Animal {
    constructor(readonly name: string) {}
    eat(food: string) {
      console.log(`Ate ${food}`);
    }
    sleep(hours: number) {
      console.log(`sleeping for ${hours} hours`);
    }
  }

  const felix = new Cat('Felix')
  felix.eat('cat food')
  felix.sleep(6)
}

// (d) An example of implementing interfaces (,):
{
  interface Animal {
    readonly name: string
    eat(food: string): void
    sleep(hours: number): void
  }

  interface Feline {
    meow(): void
  }

  class Cat implements Animal, Feline {
    constructor(readonly name: string) {}
    eat(food: string) {
      console.log(`Ate ${food}`);
    }
    sleep(hours: number) {
      console.log(`sleeping for ${hours} hours`);
    }
    meow() {
      console.log('Meow');
    }
  }

  const felix = new Cat('Felix')
  felix.eat('cat food')
  felix.sleep(6)
  felix.meow()
}

// NOTE (1): `interface` versus `type` alias:
// 1. We can only use a type in a class but the type alias itself does not define a class
// Interface helps define a class, its properties and methods
// For example, we can mark `readonly` class properties in an interface.
// 2. A type alias cannot have declaration merging (only interface, enum, and namespace can!)

// NOTE (2): `interface` versus `abstract` classes: 
// We can implement multiple interface but extend only single classes (abstract or otherwise)
// ---
// 1. Interfaces can model a shape (classes, objects, arrays, functions, etc)
// 2. Interfaces do not emit javascript code (No `interface` present in runtime code)
// 3. Interface has only abstract methods (following from point 3). Nothing is concrete! 
// i.e No default implementations that can be used directly or can be overridden
// 4. Interfaces cannot have visibility modifiers (No private, protected, public)
// ---
// 1. Abstract classes can only model a class
// 2. Abstract classes can contain constructors and provide default implementations
// 3. Abstract classes add runtime code (An abstract class in present in generated JS)
// 4. Abstract classes can have a mixture of concrete methods and abstract methods
// 5. Abstract classes can have visibility modifiers (private, protected, public)
// ---
// Q: When do we use abstract classes? 
// A: When we have an implementation that is shared among multiple classes
// Q: When do we use interfaces?
// A: When you need a lightweight way to say that "this class is a T" 
// or "this class is a T and a U"


// Example of an interface with an object not a class:
{
  interface Person {
    name: string,
    age: number
  }

  let pushkar: Person = { // Usage is similar to a type annotation
    name: 'Pushkar DK',
    age: 26
  }
}

// -----------------------

// 6. Declaration merging with interfaces

// Declarations can be merged with multiple `enum` declarations
// They can also be merged with `interface` declaration (& also `namespace` declarations)

// Interfaces defined with the same name are merged automatically by TS
// NOTE: The two interfaces cannot conflict. In this case, TS throws a compile time error
{
  interface Person {
    firstName: string
  }

  interface Person {
    lastName: string
  }

  let a: Person = {
    firstName: 'A',
    lastName: 'B'
  } // implements the merged interface (else, Error!)
}

// -----------------------

// 7. Structural typing of classes

// TS compares classes by their structure and not their name
// i.e If two classes (or objects) have the same structure (same properties and methods)
// TS will still allow them to be used interchangeably
{
  class Zebra {
    trot() {}
  }

  class Horse {
    trot() {}
  }

  function trotAround(animal: Zebra) {
    animal.trot()
  }

  let zebra = new Zebra()
  let horse = new Zebra()

  trotAround(zebra) // ✅ Allowed since the param is fo type Zebra
  trotAround(horse) // ✅ Still allowed since param,though of type zebra, is checked for existence of `trot` prop
}

// -----------------------

// 8. Defining a call signature for the `constructor()` method

// We use a "contstructor signature" allows TS to define how a type can be instantiated.
// We use the `new` 🆕 prefix in the method call signature for the same
// Interfaces can use this signature to enforce constructor types
{
  type ClassConstructor = new(...args: any[]) => {}
}

// A more common implementation and usage:
{
  // 1. Have the interface X
  interface ClockInterface {
    tick(): void
  }

  // 2. Have constructor signature Y interface that returns another interface, X
  interface ClockConstructor {
    new(msecs: number): ClockInterface // 🎵 Constructor will return the class name in signature
  }

  // NOTE:WE CAN DIRECTLY WRITE A CLASS THAT IMPLEMENTS THE INTERFACE BUT
  // IN SUCH A SCENARIO, THE CONSTRUCTOR INTERFACE IS NOT USED.
  class Clock implements ClockInterface {
    constructor(msecs: number) {}
    tick() {}
  }

  // THEREFORE, IMPLEMENTATION OF A CLASS THAT ADHERES TO 
  // THE CONSTRUCTOR SIGNATURE ALSO CHANGES:
  // 3. Write a function that takes Y as input and returns a class that implements X.
  // In this way, the constructor implements interface Y and 
  // the class itself implements interface X
  function newClockCreator(construct: ClockConstructor, msecs: number): ClockInterface {
    return new construct(msecs)
  }
  
  // Finally instantiate the class in the following way:
  const myClock: ClockInterface = newClockCreator(Clock, 5000)
}

// -----------------------

// 9. Generic Types with Classes (Polymorphism)

// Just like Generic types in functions and object shapes,
// we can have generic types in classes too!

// Ways to do it:
// (a) Scope a generic type to the whole class
// (b) Scope a generic type to an interface
// (c) Scope a generic type to a specific method (Note:
// the methods also have generics scoped to the whole class)

// Example of scoping to the whole class 
// Gets bound when the class is instantiated!
{
  class Map<K, V> {
    constructor(initialKey: K, initialValue: V) {}
    get(key: K): V { return /* Something of the type V */ }
    set(key: K): void {}
  }

  const map = new Map<string, number>('x', 5) // Bound here!
}

// Example of scoping & binding to an interface:
// Gets bound when the class implements it!
{
  interface MyMap<K, V> {
    get(key: K): V
    set(key: K, value: V): void
  }

  class Map implements MyMap<string, any> { // Bound here!
    constructor() {}
    get(k: string): any {}
    set(K: string, v: any) {}
  }
}

// Example of methods having a separate generic type:
{
  class MyMap<K, V> {
    constructor(initialKey: K, initialValue: V) {}
    get(key: K): V { return /* Something of the type V */ }
    set(key: K): void {}
    merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
      // NOTE: the method also has access to the class scoped generics
      return /* Something satisfying MyMap<K | K1, V | V1> */
    }
  }
}

// -----------------------

// 10. Mixins

// Mixins are a way to solve the restriction on "Multiple Inheritance" in JS as well as TS.
// We can make a class implement two requirements: "Role oriented programming"
// Instead of an "is-a" relationship, we use Mixins when there is one or more "has-a" relationship
// Ex: Class Animal (entity 1) has-a type of sound (entity 2)

// By CONVENTION, mixins:
// (a) Can provide instance properties (state)
// (b) Can provide concrete methods only (NO abstract methods)
// (c) Can have constructors. The constructors are invoked according
// to the order in which the mixins are mixed in :D

// An example of a debuggable class (mixin is the debugger)
{
  // 1. Create a class:
  // class User {
  //   constructor(private id: number, private name: string) {}
  // }

  // 2. Write a function that takes in a class with:
  // (a) A constructor signature
  // (b) Mehthods we want to enforce class to contain (via generic types)
  type ClassConstructor<T> = new(...args: any[]) => T
  // Make sure that the class input has methods we want it to:
  type ShapeWithDebugMethod = { getDebugValue(): object }
  function withDebug<C extends ClassConstructor<ShapeWithDebugMethod>>(Class: C) {
    // Return a class that extends input class
    return class extends Class {
      debug() {
        const name = Class.constructor.name
        const value = this.getDebugValue()
        return `Name: ${name} | Value: ${JSON.stringify(value)}`
      }
    }
  }

  // 3. We need to actually have the original class implement `getDebugValue`:
  class User {
    constructor(private id: number, private name: string) {}
    getDebugValue() {
      return {
        id: this.id,
        name: this.name
      }
    }
  }

  // 4. Finally instantiate class with mixin
  const DebuggableUser = withDebug(User)
  const debuggableUser = new DebuggableUser(23, 'Pushkar')
  debuggableUser.debug() // ✅ Accessing the mixin's function!
}

// NOTE: mixins help encapsulate behaviours and make them reusable.

// -----------------------

// 11. Decorators (experimental)

// Decorators are experimental in TS
// To turn them on use `experimentalDecorators: true` in tsconfig.json 🆕

// What are they? 
// Decorators are used for META-PROGRAMMING
// With the introduction of Classes in TypeScript and ES6, 
// there now exist certain scenarios that require additional features to support 
// annotating or modifying classes and class members. Decorators provide a way to 
// add both annotations and a meta-programming syntax for class declarations and members. 
// Decorators are a stage 2 proposal for JavaScript and are available as an 
// experimental feature of TypeScript.

// A Decorator is a special kind of declaration that can be attached to a 
// (a) class declaration (b) method (c) accessor (d) property or (e) parameter

// Syntax:
// `@<expression>` before the object to decorate
{
  type ClassConstructor<T> = new(...args: any[]) => T

  @serializable
  class APIPayload {
    setValue(): void {}
  }

  function serializable(Class: ClassConstructor<APIPayload>) {
    return class extends Class {}
  }
}

// NOTE:
// Since these are experimental features that are not mature,
// it is better to stay away from it.

// -----------------------

// 12. Simulating final classes

// Other programming languages have the capacity to support 'final' classes
// These are classes that cannot be extended further (non-extensible or method being non-overridable)

// Neither JS nor TS provides the final keyword
// However, we can simulate final classes

// Q: How can we simulate final?
// A: By having private constructors. When you have a private constructor,
// (a) you cannot extend (inherit) from that class 
// (b) nor call `new` on it!
{
  class MessageQueue {
    private constructor(private messages: string[]) {}
  }

  class BadQueue extends MessageQueue {} // ❌ Error! Cannot extend
  const messageQ = new MessageQueue(['1', 'a']) // ❌ Error! Cannot new!
}

// CANNOT "new"! 
// This is bad! 
// We want to be able to instantiate the class!

// Q: How do we instantiate it? 
// A: By providing a workaround: A static method that contains the creation logic!
{
  class MessageQueue {
    private constructor(private messages: string[]) {}
    static create(messages: string[]) {
      return new MessageQueue(messages) // Can call a private method (constructor) from inside the class
    }
  }

  class BadQueue extends MessageQueue {} // ❌ Error! Cannot extend
  const messageQ = new MessageQueue(['1', 'a']) // ❌ Error! Cannot new!
  // However, we can instantiate it like: 
  const msgQ = MessageQueue.create(['1', 'a']) // ✅ ALLOWED!
}

// -----------------------

// 13. Factory design pattern

// We use this pattern to create objects of some type (abstract)
// but leave the concrete type to be created as the decision for the factory (a function)
// to take!

// Ex: You want to create a shoe (abstract)
// The factory will receive the type of shoe (input can be a string saying the shoe's name)
// and the factory will select the appropriate class to instantiate (concrete class) & return

{
  // Types (abstract and concrete):
  type Shoe = {
    purpose: string
  }
  class BalletFlat implements Shoe {
    purpose = 'dancing'
  }
  class Boot implements Shoe {
    purpose = 'woodcutting'
  } 
  class Sneaker implements Shoe {
    purpose = 'walking'
  }

  // Create the factory:
  type ShoeType = 'BalletFlat' | 'Boot' | 'Sneaker'
  const ShoeFactory = {
    create(type: ShoeType): Shoe {
      switch(type) {
        case 'BalletFlat': return new BalletFlat()
        case 'Boot': return new Boot()
        case 'Sneaker': return new Sneaker()
      }
    }
  }

  // Use the factory:
  let myBoots = ShoeFactory.create('BalletFlat')
}

// -----------------------

// 14. Builder design pattern

// It is a pattern to separate out the construction of the object
// from the way it is actually implemented

// We implement this pattern by returning `this` in 
// the methods so that they can be chained
{
  class RequestBuilder {
    private url: string | null = null
    private method: 'get' | 'post' | null = null
    
    setUrl(url: string): this {
      this.url = url
      return this
    }
    setMethod(method: 'get' | 'post'): this {
      this.method = method
      return this
    }
  }

  new RequestBuilder()
    .setUrl('https://www.google.com')
    .setMethod('get')
}

// -----------------------

// BONUS:

// Types and values have separate namespaces in TS
// For example, type `a` and value `a` are handled differently

{
  type a = number
  interface b {
    (fn: () => void): void
  }

  let a = 2000
  function b() {}

  if (a + 1 > 3) {} // TS knows that it is the 'value a'
  let x: a = 3 // TS knows that it is the 'type a'

  const doSomething: b = (fn) => { // TS knows it is 'type b'
    fn()
  }
  doSomething(b) // TS knows it is 'value b'
}

// -----------------------
