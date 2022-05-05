// 1: We no longer import flats from our file but will fetch them from the github url
// import flats from "../flats";

// 9: GOOD PRACTICE: before, the action types were just string.
// when using string, for action, we can have an error when mistyping an action
// in the reducer.
// To prevent it from happening, we export a constant SET_FLATS in which we store a string.
// We will use the constant and no longer the string.
// => See reducers/flats_reducer.js
// Same thing for the function selectFlat(flat)
export const SET_FLATS = 'SET_FLATS';
export const SELECT_FLAT = 'SELECT_FLAT';


export function setFlats() {
  // TODO: call an API, fetch a JSON
  // We do the API calls here, not in the react components directly.

  // 2: We fetche the url which is a .json file.
  // 3: I return the setFlats payload in the .then
  // I do it here because I need to wait for the answer to come back to have the payload.
  // 4: But doesn't work because right now it returns a promise.
  // 5: We need a way to tell redux that if we see a promise (when using fetch()), we have to solve it and take
  // and send it in the callback.
  // 6: SOLUTION: We need a custom middleware.
  // See index.jsx (5)
  return fetch('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json')
    .then(response => response.json())
    .then((data) => {
      return {
        type: SET_FLATS,
        payload: data
      };
    });

    // Also possible to write it this way
  // const promise = fetch('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json')
  //   .then(response => response.json())
  //   .then(();

  //   return {
  //     type: 'SET_FLATS',
  //     payload: promise
  //   };

}

// 7: We now have logger displayed this way:
// action undefined @ 22:53:16.095
// prev state {flats: Array(0), selectedFlat: null}
// action     Promise {<pending>}
// next state {flats: Array(0), selectedFlat: null}
// FOLLOWING JUST LATER - we got the following logger
// action SET_FLATS @ 22:53:16.745
// prev state {flats: Array(0), selectedFlat: null}
// action     {type: 'SET_FLATS', payload: Array(6)}
// next state {flats: Array(6), selectedFlat: null}

// 8: It means that our action first saw the action, saw the Promise,
// travelled through the middleware, it updates the action on the fly,
// by resolving the promise, getting the data from AJAX request, and
// then pushing that to the reducer.

// In other words, This middleware receives the promise, resolves it and
// dispatches the plain action to all of the reducers
// That way we only handle data in our code and not promises(painful)


// Our setFlats function before.
// export function setFlats() {
//   return {
//     type: "SET_FLATS",
//     payload: flats
//   };
// };

export function selectFlat(flat) {
  return {
    type: SELECT_FLAT,
    payload: flat
  };
}
