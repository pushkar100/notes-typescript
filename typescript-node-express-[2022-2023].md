# NodeJS with TypeScript

NodeJS applications can be developed using TypeScript instead of JavaScript for the same benefits it provides in frontend application code.

## Setup

1. Init your project: **`npm init -y`**
2. Install TypeScript: **`npm i -D typescript`** (It is only required as a development dependency). This library provides us with the `tsc` command.
3. Initialize the config file: **`tsc --init`** creates a `.tsconfig.json` file
4. Config file must have two options set:
	* `"module":  "commonjs"` which sets the generated JS code to use the commonJS module exports and imports since that is what NodeJS understands
	* `"target":  "esnext"` makes the latest ECMAScript features available to us. We can see which node versions support which features [here](https://node.green/)
5. Write your `.ts` files and run `tsc` in the CLI to compile it and generate the corresponding `.js` files
6. In order to fetch types for a library that has no files by default, we can  npm install the type package for it that is available publicly! Search for such packages here, in [definitely type website](https://www.typescriptlang.org/dt/search?search=node). General naming pattern is `@types/<pkgname>`
	* For node, this would be `npm i -D @types/node`
7. Create an NPM script to watch for `.ts` file changes and recompile automatically:
	* `tsc --watch`
8. Use a watcher to restart the server once the files (i.e generated JS files in this case), change:
	* We can use `nodemon` or `ts-node-dev`. BUT,
	* `pm2` is a better way: It is a standard tool to manage node servers (& even clusters of NodeJS servers)
		* We can use `pm2-dev` for creating and managing a [dev server](https://pm2.keymetrics.io/docs/usage/pm2-development/)
		* Ex: `pm2-dev start my-app.js`
		* Install `pm2`: **`npm i -D pm2`**
		* Run `pm2-dev <generated-main-file>`. Ex: `pm2-dev app.js`
		* You can add it to your scripts:
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "pm2-dev app.js",
  "tsc:watch": "tsc --watch"
},
```

Example server module:
```ts
import http from 'http'; // No error since @types/node was installed

// @types/node provides intellisense (autocomplete)
// for the HTTP object methods & properties.

http
  .createServer((request, response) => {
    response.end('Hello bro!')
  })
  .listen(3001, () => {
    console.log('Server started: Listening on port 3001...');
  });
```

**Note**: You need to use ESModule imports & exports (not commonJS) while working with TypeScript (this includes importing and exporting types). In the generated build, however, we can select which module type is to be chosen.

## TypeScript with Express

* Install express: **`npm i express`**
* Install types for both **`node`** and **`express`**:
	* `npm i -D @types/node @types/express`
	* The package name can be found at [definitely type website](https://www.typescriptlang.org/dt/search?search=express)

The 3 type imports you will need from `express`:
1. `Express`: Type of the express application
2. `Request`: Type of the request object
3. `Response`: Type of the response object

```ts
import express, { Express, Request, Response } from 'express';
const port = 8000;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from NODE + EXPRESS + TS');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

**Note**: We don't need any of the type annotations in this example since TS is smart enough to infer them all once it understands the express is being imported (with the `import` keyword)

### Useful packages for server development

* Nodemon for running a development node server (`nodemon`)
* Rimraf for cleaning the node_modules folder before each build (`rimraf`)

We can add these as development dependencies.

Example scripts:
```json
"scripts": {
    "build": "rimraf dist && tsc",
    "prestart": "npm run build",
    "start": "node dist/app.js",
    "predev": "npm run build",
    "dev": "tsc -w & nodemon dist/app.js"
},
```
**Note**: 
* `prestart` runs before the `start` script whenever you run the `start` script. (Actually, it is true for any `pre<name>` script i.e it runs before the `<name>` script)
* `&` is a unix specific command to run scripts concurrently or in parallel. To make it work on other systems, use a package called `concurrently`:
	* `"dev": "concurrently \"tsc -w\" \"nodemon dist/app.js\""`
