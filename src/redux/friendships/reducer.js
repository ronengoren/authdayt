import * as actions from "./actions";

const initialState = {
  friends: {},
  recommended: {},
  requests: {},
  friendRequestsNumber: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequestsNumber: action.payload
          ? action.payload.friendRequests
          : state.requests.totalCount
      };
    case actions.REMOVE_FROM_FRIEND_REQUESTS: {
      const {
        payload: { userId }
      } = action;
      if (state.requests && state.requests.data) {
        return {
          ...state,
          requests: {
            ...state.requests,
            data:
              state.requests.data &&
              state.requests.data.filter(request => request.id !== userId)
          },
          friendRequestsNumber: Math.max(0, state.friendRequestsNumber - 1)
        };
      }
      return state;
    }
    case actions.REMOVE_FROM_RECOMMENDED_FRIENDS:
      return {
        ...state,
        recommended: {
          ...state.recommended,
          data:
            state.recommended.data &&
            state.recommended.data.filter(
              user => user.id !== action.payload.userId
            )
        }
      };
    default:
      return state;
  }
};

export default reducer;
