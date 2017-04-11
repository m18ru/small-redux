# small-redux

Minimum Redux implementation (less than 0.5 KiB min+gzip).

Includes only `createStore` and `combineReducers`, implementation is similar to
Dan Abramov's Redux video course
([notes](https://github.com/tayiorbeii/egghead.io_redux_course_notes))
with some changes form original [Redux project](https://github.com/reactjs/redux).

Written in TypeScript, types are also included.

## Installation

For bundlers and other NPM-based environments:

```
npm install --save-dev small-redux
```

## Usage

### UMD

UMD is default for this package, so just use something like:

```js
import {createStore} from 'small-redux';
// or
const {createStore} = require( 'small-redux' );

const store = createStore( reducer );
```

For using directly in browser (import with `<script>` tag in HTML-file):

* [Development version](https://unpkg.com/small-redux/es5/index.js)
* [Production version](https://unpkg.com/small-redux/es5/redux.min.js)

You can use AMD or `Redux` global variable.

### ES2015 module systems

Package contain `module` property for use with ES2015 module bundlers
(like Rollup and Webpack 2).

### ES2015 code base

If you don't want to use transplitted to ES5 code, you can use included
ES2015 version.

You can directly import this version:

```js
import {createStore} from 'small-redux/es2015';
```

Or specify alias in Webpack config:

```js
{
	// …
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			"small-redux": 'small-redux/es2015',
		},
	},
};
```

## Module interface

* `createStore` — creates a Redux store that holds the state tree.
* `Action` — action object base interface.
* `Reducer` — reducing function type.
* `Dispatch` — dispatching function type.
* `Listener` — type of a listener function used by `Store.subscribe()`.
* `Unsubscribe` — type of a function to remove listener.
* `Store` — interface of created store object.
* `combineReducers` — Turns an object whose values are different reducer functions, into a single reducer function.
* `ReducersMapObject` — type of object for `combineReducers`.

## Example

```ts
import {Action, createStore} from 'small-redux';

interface State
{
	test: string;
}

const initialState: State = {
	test: 'Hello',
};

function reducer(
	state: State = initialState,
	action: Action,
): State
{
	switch ( action.type )
	{
		case 'TEST':
			return {
				...state,
				test: 'Test',
			};
		
		default:
			return state;
	}
}

const store = createStore( reducer );
const dispatch = store.dispatch;
const subscribe = store.subscribe;
const getState = store.getState;

subscribe(
	() => console.log( getState() ),
);
dispatch( {type: 'TEST'} );
```
