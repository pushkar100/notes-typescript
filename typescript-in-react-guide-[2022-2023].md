# TypeScript with React

[Course Link](https://www.youtube.com/watch?v=FJDVKeh7RJI&ab_channel=freeCodeCamp.org)

[React & TypeScript cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## Setting up React with TypeScript

[Official docs on how to set up React with TS](https://www.typescriptlang.org/docs/handbook/react.html)

[Adding TypeScript to React](https://create-react-app.dev/docs/adding-typescript/)

**Creating a new project:** 
**`npx create-react-app my-app --template typescript`**
This will create a project where all the source files are in TS (`.tsx` to indicate support for JSX)

**Adding TypeScript to an existing React project:**
To add TypeScript to an existing Create React App project, first install it:
```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

### Functional component type

Use `React.FC`

```ts
import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      Hello world!
    </div>
  );
}
```

Note that TypeScript can also infer this in most cases (i.e you can omit `React.FC` from the syntax)


### useState type

When using `useState`, we have to specify the type of the value in angled brackets (The initial value and destructured value must match in type). TS can infer the type based on the initial value as well.

```ts
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  
  return (
    <div>
      Hello world!
    </div>
  );
}
```

#### Type of the setter method

What is the type of the setter (or dispatcher method) that `useState` provides? For example, in `const [todo, setTodo] = useState<string>('');`, what is the type of `setTodo`?

In VSCode, we can hover over the `setTodo` variable in order to read the type. In this case, it is:
```ts
const setTodo: React.Dispatch<React.SetStateAction<string>>
```

### Defining types for component props

Use `interface` (You can also use a `type`) to define the object structure for the props object passed to a component.

```ts
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({ todo, setTodo }: Props) => {
  return (
    <div>InputField</div>
  )
}
```

#### Alternate way of declaring the prop type

Using `React.FC<proptype>` syntax:
```ts
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: React.FC<Props> = ({ todo, setTodo }) => {
  return (
    <div>InputField</div>
  )
}
```

### Exporting and importing types

We can use the `export` keyword for exporting types. Ex: An interface.
To import it in a file, we can use the ESModules style `import { <type> } from 'path/to/file'`

```ts
// ./models/todo.ts
export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}
```
```ts
// ./app.tsx
import React, { useState } from 'react';
import InputField from './components/InputField';
import { Todo } from './models/todo';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([])
  ...
```

### Types for event objects

When dealing with event handlers such as onClick, onChange, and so on, we need to define the types for the event objects.

React provides us with event object types that we can use for type annotation.

[React event types in TS - cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)

Example:
```ts
const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // ... do something ... 
}
```

### Defining types for a ref value

refs are mutable values that we can store as a state in React. These are generally used to save references to a DOM element that the component renders.

We can use angle brackets `<>` during the `useRef` function invocation to determine the type of ref value it is supposed to hold!

For example, an input element will hold `HTMLInputElement` type. This type can be found out by hovering over the element in VSCode.

```ts
const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={handleAdd}>
      <input 
        ref={inputRef}
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />
      <button type='submit'>Submit TODO</button>
    </form>
  )
}
```

### Types for a useReducer

* Use a union (`|`) type for the actions.
* Create a type for the state (Note: We can use `typeof <initialState>` as well)
* We don't need angled brackets to define a type during the `useReducer()` invocation unlike `useState`

```ts
import { useReducer } from "react";

const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
    </>
  );
}
```
