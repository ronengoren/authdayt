import { combineReducers } from "redux";
import apiQuery from "src/redux/apiQuery/reducer";
// // import newsFeed from '/redux/newsFeed/reducer';
import neighborhoodFeed from "src/redux/neighborhoodFeed/reducer";
import communityFeed from "src/redux/communityFeed/reducer";
// import entityFeed from '/redux/entityFeed/reducer';
import profile from "src/redux/profile/reducer";
import friendships from "src/redux/friendships/reducer";
import apiCommands from "src/redux/apiCommands/reducer";
import auth from "src/redux/auth/reducer";
import navState from "src/redux/navigator/reducer";
import uploads from "src/redux/uploads/reducer";
// import postPage from '/redux/postPage/reducer';
import infiniteScroll from "src/redux/InfiniteScroll/reducer";
// import pages from '/redux/pages/reducer';
// import results from '/redux/results/reducer';
import groups from "src/redux/groups/reducer";
import notifications from "src/redux/notifications/reducer";
// import inbox from '/redux/inbox/reducer';
// import urlScraping from '/redux/urlScraping/reducer';
import search from "src/redux/search/reducer";
import searchAddress from "src/redux/searchAddress/reducer";
import events from "src/redux/events/reducer";
// import mentions from '/redux/mentions/reducer';
import users from "src/redux/users/reducer";
// import suggestedItems from '/redux/suggestedItems/reducer';
// import lists from '/redux/lists/reducer';
import general from "src/redux/general/reducer";
// import comments from '/redux/comments/reducer';
// import themes from '/redux/themes/reducer';
// import neighborhoods from '/redux/neighborhoods/reducer';
// import posts from '/redux/posts/reducer';
// import scheduledPosts from '/redux/scheduledPosts/reducer';
// import personalizedFeed from '/redux/personalizedFeed/reducer';
import { LOGOUT_SUCCESS } from "src/redux/auth/actions";

const reduceReducers = (...reducers) => (previous, action) =>
  reducers.reduce(
    (currentState, currentReducer) => currentReducer(currentState, action),
    previous
  );

const configureReducer = () => {
  const appReducer = reduceReducers(
    combineReducers({
      apiCommands,
      auth,
      // comments,
      communityFeed,
      // entityFeed,
      events,
      friendships,
      groups,
      // inbox,
      general,
      // lists,
      // mentions,
      navState,
      // neighborhoods,
      neighborhoodFeed,
      // newsFeed,
      notifications,
      // pages,
      // personalizedFeed,
      // posts,
      // postPage,
      profile,
      // results,
      search,
      searchAddress,
      // suggestedItems,
      // themes,
      uploads,
      // urlScraping,
      users
      // scheduledPosts
    }),
    apiQuery,
    infiniteScroll
  );

  const reducer = (state, action) =>
    appReducer(action.type === LOGOUT_SUCCESS ? undefined : state, action);

  return reducer;
};

export default configureReducer;
