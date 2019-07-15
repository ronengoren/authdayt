export const OPEN_ACTION_SHEET = "OPEN_ACTION_SHEET";
export const CLOSE_ACTION_SHEET = "CLOSE_ACTION_SHEET";

export const openActionSheet = data => ({
  type: OPEN_ACTION_SHEET,
  payload: {
    data
  }
});

export const closeActionSheet = () => ({
  type: CLOSE_ACTION_SHEET
});
