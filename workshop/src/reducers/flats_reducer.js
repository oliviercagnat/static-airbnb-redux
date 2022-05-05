// 1: We import here the SET_FLATS
import { SET_FLATS } from '../actions';

export default function (state, action) {
  if (state === undefined) {
    return [];
  }
  switch (action.type) {
    case SET_FLATS:
      return action.payload;
    default:
      return state;
  }
}
