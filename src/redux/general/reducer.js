/* eslint-disable no-param-reassign */
import produce from "immer";
import * as actions from "./actions";

const initialState = {
  isOnline: true,
  snackbars: {},
  actionSheet: null
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actions.CONNECTION_CHANGED:
        draft.isOnline = action.payload.online;
        break;
      case actions.SHOW_SNACKBAR: {
        draft.snackbars[action.payload.snackbarType] = {
          isVisible: true,
          componentProps: action.payload.componentProps
        };
        break;
      }
      case actions.HIDE_SNACKBAR: {
        const { snackbarType } = action.payload;
        draft.snackbars[snackbarType].isVisible = false;
        break;
      }
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
