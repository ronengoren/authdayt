export const OPEN_ACTION_SHEET = "OPEN_ACTION_SHEET";
export const CLOSE_ACTION_SHEET = "CLOSE_ACTION_SHEET";

export const CONNECTION_CHANGED = "CONNECTION_CHANGED";

export const openActionSheet = data => ({
  type: OPEN_ACTION_SHEET,
  payload: {
    data
  }
});

export const closeActionSheet = () => ({
  type: CLOSE_ACTION_SHEET
});

export const setConnection = ({ online }) => ({
  type: CONNECTION_CHANGED,
  payload: {
    online
  }
});
