import {Action, Reducer} from './createStore';

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 * 
 * @template TState Combined state object type.
 * @template TAction Action object type.
 * 
 * @param reducers An object whose values correspond to different reducer
 *  functions that need to be combined into one. One handy way to obtain it
 *  is to use ES6 `import * as reducers` syntax. The reducers may never
 *  return undefined for any action. Instead, they should return their
 *  initial state if the state passed to them was undefined, and the current
 *  state for any unrecognized action.
 * 
 * @returns A reducer function that invokes every reducer inside the passed
 *  object, and builds a state object with the same shape.
 */
function combineReducers<TState, TAction extends Action>(
	reducers: ReducersMapObject<TState, TAction>,
): Reducer<TState, TAction>
{
	const reducerKeys = Object.keys( reducers ) as Array<keyof TState>;
	
	return <TThisAction extends TAction>(
		state: TState = {} as TState,
		action: TThisAction,
	): TState =>
	{
		let stateChanged: boolean = false;
		const nextState = {} as TState;
		
		for ( const key of reducerKeys )
		{
			const previousStateForKey = state[key];
			const nextStateForKey = reducers[key](
				previousStateForKey,
				action,
			);
			
			nextState[key] = nextStateForKey;
			stateChanged = (
				stateChanged
				|| ( nextStateForKey !== previousStateForKey )
			);
		}
		
		return ( stateChanged ? nextState : state );
	};
}

/**
 * Object whose values correspond to different reducer functions.
 */
export type ReducersMapObject<TState, TAction extends Action> =
{
	[K in keyof TState]: Reducer<any, TAction>;
};

/**
 * Module.
 */
export {
	combineReducers as default,
	// ReducersMapObject,
};
