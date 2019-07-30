/* eslint-disable no-param-reassign */
import produce from "immer";
import * as actions from "./actions";

const initialState = {
  isOnline: true,
  actionSheet: null
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actions.CONNECTION_CHANGED:
        draft.isOnline = action.payload.online;
        break;
      case actions.OPEN_ACTION_SHEET:
        draft.actionSheet = action.payload.data;
        break;

      case actions.CLOSE_ACTION_SHEET:
        draft.actionSheet = null;
        break;

      default:
    }
  });

export default reducer;
