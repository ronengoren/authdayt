/* eslint-disable no-param-reassign */
import produce from "immer";
import { get, isNil } from "src/infra/utils";
import * as profileActions from "src/redux/profile/actions";
import * as actions from "./actions";

const initialState = {
  user: null,
  newUser: false,
  communities: [],
  waitingList: false, // Currently if you go to waiting list you can still register to other communities
  featureFlags: {},
  permissions: {},
  hiddenPinnedItems: [],
  hiddenPosts: {},
  appTotals: null
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actions.SET_USER:
        draft.user = { ...action.payload }; // NO IDEA WHY - but don't change that - because that masses up the connect updates on components
        break;

      case actions.SET_COMMUNITY:
        draft.user.community = action.payload.community;
        break;

      case actions.LOAD_FEATURE_FLAGS:
        draft.featureFlags = action.payload || {};
        break;

      case actions.SET_TOKEN:
        draft.user = { token: action.payload.token };
        break;

      case actions.RESET_USER:
        draft = initialState;
        break;

      case actions.TURN_ON_NEW_USER_WELCOME:
        draft.newUser = true;
        break;

      case actions.TURN_OFF_NEW_USER_WELCOME:
        draft.newUser = false;
        break;

      case actions.EDIT_IMAGES:
        draft.user.media = action.payload.media;
        break;

      case actions.LOADED_COMMUNITIES:
        draft.communities = action.payload.communities.map(
          (community, idx) => ({ ...community, idx })
        );
        break;

      case actions.ADDED_TO_WAITING_LIST:
        draft.waitingList = true;
        break;

      case actions.CHANGE_FEATURE_FLAG: {
        const { flag, flagState } = action.payload;
        draft.featureFlags[flag] = flagState;
        break;
      }

      case actions.UPDATE_PERMISSION: {
        const { permission, permissionState } = action.payload;
        draft.permissions[permission] = permissionState;
        break;
      }

      case actions.SET_HIDDEN_PINNED_ITEMS:
        draft.hiddenPinnedItems = action.payload.hiddenPinnedItems;
        break;

      case actions.SET_HIDDEN_POSTS:
        draft.hiddenPosts = action.payload.hiddenPosts;
        break;

      case actions.UPDATE_APP_TOTALS:
        draft.appTotals = action.payload;
        break;

      case actions.UPDATE_USER_LANGUAGE:
        draft.user.settings.language = action.payload;
        break;

      case actions.UPDATE_USER_DESTINATION_NEIGHBORHOOD:
        draft.user.journey.neighborhood =
          action.payload.destinationNeighborhood;
        break;

      case profileActions.SET_INSTAGRAM_TOKEN: {
        const { token } = action.payload;
        draft.user.instagramToken = token;
        break;
      }

      case profileActions.DELETE_INSTAGRAM_TOKEN: {
        draft.user.instagramToken = null;
        break;
      }

      case profileActions.PROFILE_UPDATE: {
        const journey = get(action.payload, "data.user.journey");
        const settings = get(action.payload, "data.user.settings", null);
        const gender = get(action.payload, "data.gender", null);
        const email = get(action.payload, "data.user.email", null);
        draft.user.journey = journey;
        if (!isNil(gender)) {
          draft.user.gender = gender;
        }
        if (!isNil(email)) {
          draft.user.email = email;
        }
        if (settings) {
          draft.user.settings = settings;
        }
        break;
      }

      default:
    }
  });

export default reducer;
