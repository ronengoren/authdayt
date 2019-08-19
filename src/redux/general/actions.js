export const OPEN_ACTION_SHEET = "OPEN_ACTION_SHEET";
export const CLOSE_ACTION_SHEET = "CLOSE_ACTION_SHEET";

export const CONNECTION_CHANGED = "CONNECTION_CHANGED";

export const SHOW_SNACKBAR = "SHOW_SNACKBAR";
export const HIDE_SNACKBAR = "HIDE_SNACKBAR";

export const openActionSheet = data => ({
  type: OPEN_ACTION_SHEET,
  payload: {
    data
  }
});

export const closeActionSheet = () => ({
  type: CLOSE_ACTION_SHEET
});

export const setConnection = ({ online }) => dispatch => {
  dispatch({
    type: CONNECTION_CHANGED,
    payload: { online }
  });
};

export const showSnackbar = (
  { snackbarType, ...componentProps },
  options
) => dispatch => {
  dispatch({
    type: SHOW_SNACKBAR,
    payload: {
      snackbarType,
      componentProps
    }
  });

  if (options) {
    const { dismissAfter } = options;
    if (dismissAfter) {
      setTimeout(() => {
        dispatch(hideSnackbar({ snackbarType }));
      }, dismissAfter);
    }
  }
};

export const hideSnackbar = ({ snackbarType }) => ({
  type: HIDE_SNACKBAR,
  payload: {
    snackbarType
  }
});
