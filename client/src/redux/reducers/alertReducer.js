import { SET_ALERT, REMOVE_ALERT } from '../types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, setAlert, alertId } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, setAlert];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== alertId);
    default:
      return state;
  }
}