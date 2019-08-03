import { apiCommand } from "src/redux/apiCommands/actions";
import { updateFriendshipStatus } from "src/redux/feed/actions";
import { analytics, Logger } from "src/infra/reporting";
import { friendshipStatusType } from "src/vars/enums";

export const UPDATE_FRIEND_STATUS = "UPDATE_FRIEND_STATUS";
export const UPDATE_FRIEND_REQUESTS = "UPDATE_FRIEND_REQUESTS";
export const REMOVE_FROM_FRIEND_REQUESTS = "REMOVE_FROM_FRIEND_REQUESTS";
export const REMOVE_FROM_RECOMMENDED_FRIENDS =
  "REMOVE_FROM_RECOMMENDED_FRIENDS";

export const updateFriendRequests = (friendRequests = 0) => ({
  type: UPDATE_FRIEND_REQUESTS,
  payload: {
    friendRequests
  }
});

export const approveFriendRequest = ({
  userId,
  name,
  postId
}) => async dispatch => {
  dispatch({
    type: UPDATE_FRIEND_STATUS,
    payload: { userId, friendshipStatus: friendshipStatusType.FRIENDS }
  });
  dispatch({ type: REMOVE_FROM_FRIEND_REQUESTS, payload: { userId } });
  if (postId) {
    dispatch(
      updateFriendshipStatus({
        postId,
        friendshipStatus: friendshipStatusType.FRIENDS
      })
    );
  }
  try {
    await dispatch(apiCommand("friendships.approve", { toId: userId }));
    analytics.actionEvents
      .friendRequestResponse({
        requestorId: userId,
        requestorName: name,
        isApproved: true
      })
      .dispatch();
  } catch (err) {
    Logger.error({
      errType: "optimisticRendering",
      action: "approveFriendRequest",
      err
    });
  }
};

export const declineFriendRequest = ({
  userId,
  name,
  postId
}) => async dispatch => {
  dispatch({
    type: UPDATE_FRIEND_STATUS,
    payload: { userId, friendshipStatus: friendshipStatusType.NOT_FRIENDS }
  });
  dispatch({ type: REMOVE_FROM_FRIEND_REQUESTS, payload: { userId } });
  if (postId) {
    dispatch(
      updateFriendshipStatus({
        postId,
        friendshipStatus: friendshipStatusType.NOT_FRIENDS
      })
    );
  }
  try {
    await dispatch(apiCommand("friendships.unfriend", { toId: userId }));
    analytics.actionEvents
      .friendRequestResponse({
        requestorId: userId,
        requestorName: name,
        isApproved: false
      })
      .dispatch();
  } catch (err) {
    Logger.error({
      errType: "optimisticRendering",
      action: "declineFriendRequest",
      err
    });
  }
};

export const inviteFriendRequest = ({ userId, postId }) => async dispatch => {
  dispatch({
    type: UPDATE_FRIEND_STATUS,
    payload: { userId, friendshipStatus: friendshipStatusType.REQUEST_SENT }
  });
  dispatch({ type: REMOVE_FROM_RECOMMENDED_FRIENDS, payload: { userId } });
  if (postId) {
    dispatch(
      updateFriendshipStatus({
        postId,
        friendshipStatus: friendshipStatusType.REQUEST_SENT
      })
    );
  }
  try {
    await dispatch(apiCommand("friendships.invite", { toIds: [userId] }));
  } catch (err) {
    Logger.error({
      errType: "optimisticRendering",
      action: "inviteFriendRequest",
      err
    });
  }
};
