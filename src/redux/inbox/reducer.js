// /* eslint-disable no-param-reassign */
// import produce from 'immer';
// import { LOGOUT_SUCCESS } from '/redux/auth/actions';
// import * as actions from './actions';

// const initialState = {
//   unreadChats: 0,
//   client: null,
//   chatStatus: {}
// };

// const reducer = (state = initialState, action) =>
//   produce(state, (draft) => {
//     switch (action.type) {
//       case actions.SET_CLIENT:
//         draft.client = action.payload.client;
//         break;
//       case actions.UPDATE_CHAT_STATUS:
//         draft.chatStatus = { ...state.chatStatus, ...action.payload.data };
//         break;
//       case actions.UPDATE_UNREAD_CHATS:
//         draft.unreadChats = action.payload.unreadChats;
//         break;
//       case LOGOUT_SUCCESS:
//         draft.chatStatus = {};
//         draft.unreadChats = 0;
//         break;
//       default:
//     }
//   });

// export default reducer;
