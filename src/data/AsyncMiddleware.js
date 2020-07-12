/**
 * Checks to see whether an action’s payload is a Promise, which it does
 * by looking for function or objects that have a then function.
 *
 * @param payload Possible Promise
 * @returns {boolean|boolean} True if is a Promise, false otherwise.
 */
const isPromise = (payload) =>
    (typeof (payload) === "object" || typeof (payload) === "function")
        && typeof (payload.then) === "function";

/**
 * HTTP requests sent by JavaScript code are performed asynchronously.
 * This doesn’t fit well with the default behavior of the Redux data
 * store, which responds to changes only when an action is processed
 * by a reducer.
 *
 * Redux data stores can be extended to support asynchronous operations
 * using a middleware function, which inspects the actions that are sent
 * to the data store and alters them before they are processed.
 *
 * The asyncAction function will be used as the data store middleware, and
 * it calls then on the Promise to wait for it to be resolved, at which
 * point it uses the result to replace the payload and passes it on, using
 * the next function, which continues the normal path through the data store.
 *
 * Actions whose payloads are not a Promise are passed on immediately.
 */
export const asyncActions = () => (next) => (action) => {
    if (isPromise(action.payload)) {
        action.payload.then(result => next({...action, payload: result}));
    } else {
        next(action);
    }
}