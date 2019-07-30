// import { apiQuery } from '/redux/apiQuery/actions';
// import { apiCommand } from '/redux/apiCommands/actions';
// import { analytics } from '/infra/reporting';
// import { entityTypes } from '/vars/enums';

// export const LIST_CREATE = 'LIST_CREATE';
// export const LIST_DELETE = 'LIST_DELETE';
// export const LIST_UPDATE = 'LIST_UPDATE';

// export const LIST_LOADED = 'LIST_LOADED';
// export const LIST_ITEM_LOADED = 'LIST_ITEM_LOADED';

// export const LIST_ITEM_VOTE = 'LIST_ITEM_VOTE';
// export const LIST_ITEM_UNVOTE = 'LIST_ITEM_UNVOTE';

// export const LIST_ADDED_ITEM = 'LIST_ADDED_ITEM';
// export const LIST_ITEM_EDIT = 'LIST_ITEM_EDIT';
// export const LIST_ITEM_DELETE = 'LIST_ITEM_DELETE';

// export const MARK_USED_LIST_ITEM_CTA = 'MARK_USED_LIST_ITEM_CTA';

// const getItemForSubmit = ({
//   listId,
//   listItemId,
//   title,
//   description,
//   mediaUrl,
//   scrapedUrlId,
//   pageId,
//   isAddressGooglePlaceId,
//   googlePlaceId,
//   publisherId,
//   publisherType,
//   isUserMedia,
//   tags,
//   phoneNumber
// }) => {
//   // In case the user chose an item from google places / our pages, and didn't changed it's default image, we shouldn't sent the image to BE
//   if ((pageId || googlePlaceId || scrapedUrlId) && !isUserMedia) {
//     return { listId, listItemId, title, description, scrapedUrlId, pageId, isAddressGooglePlaceId, googlePlaceId, publisherId, publisherType, tags, phoneNumber };
//   }
//   return { listId, listItemId, title, description, mediaUrl, scrapedUrlId, pageId, isAddressGooglePlaceId, googlePlaceId, publisherId, publisherType, tags, phoneNumber };
// };

// export const createList = ({ list, screenName }) => async (dispatch) => {
//   try {
//     const itemsForSubmit = list.items && list.items.map(getItemForSubmit);

//     const res = await dispatch(apiCommand('lists.create', { ...list, items: itemsForSubmit }));
//     const listResponse = res.data.data;
//     dispatch({ type: LIST_CREATE, payload: listResponse });

//     analytics.actionEvents
//       .postCreation({
//         success: true,
//         postId: listResponse.id,
//         postType: entityTypes.LIST,
//         postCreatorId: listResponse.creator.id,
//         postCreatorName: listResponse.creator.name,
//         contextId: list.contextId,
//         contextType: list.contextType,
//         numberOfChars: list.description.length,
//         creatorEntityType: listResponse.creator.type,
//         screenName,
//         entityId: listResponse.id
//       })
//       .dispatch();

//     return listResponse;
//   } catch (err) {
//     analytics.actionEvents
//       .postCreation({
//         success: false,
//         failureReason: err.toString()
//       })
//       .dispatch();

//     throw err;
//   }
// };

// export const updateList = ({ listId, delta }) => async (dispatch) => {
//   await dispatch(apiCommand('lists.edit', { listId, ...delta }));
//   dispatch({ type: LIST_UPDATE, payload: { listId, delta } });
// };

// export const getList = ({ listId, location, sortBy }) => async (dispatch) => {
//   const res = await dispatch(apiQuery({ query: { domain: 'lists', key: 'getList', params: { listId, location, sortBy } } }));
//   const {
//     data: { data: list }
//   } = res;
//   const payload = {
//     ...list,
//     items: {
//       page: 1,
//       isFetchingTop: false,
//       data: list.items,
//       hasMore: list.items.length < list.totalItems
//     }
//   };
//   dispatch({ type: LIST_LOADED, payload });
//   return list;
// };

// export const deleteList = ({ listId }) => async (dispatch) => {
//   await dispatch(apiCommand('lists.delete', { listId }));
//   const payload = {
//     listId
//   };
//   dispatch({ type: LIST_DELETE, payload });
// };

// export const getListItem = ({ listItemId }) => async (dispatch) => {
//   const res = await dispatch(apiQuery({ query: { domain: 'lists', key: 'getListItem', params: { listItemId } } }));
//   dispatch({ type: LIST_ITEM_LOADED, payload: res.data.data });
// };

// export const toggleListItemVote = ({ listId, listItemId, voteAction, voter, sortByVotes = true, screenName, listViewType }) => async (dispatch) => {
//   const command = voteAction ? 'lists.vote' : 'lists.unVote';
//   await dispatch(apiCommand(command, { listId, listItemId }));
//   await dispatch({
//     type: voteAction ? LIST_ITEM_VOTE : LIST_ITEM_UNVOTE,
//     payload: {
//       listId,
//       listItemId,
//       voted: voteAction,
//       voter,
//       sortByVotes
//     }
//   });

//   const analyticsAction = voteAction ? analytics.actionEvents.voteAction : analytics.actionEvents.unVoteAction;

//   analyticsAction({
//     actorId: voter.id,
//     actorName: voter.name,
//     screenName,
//     listId,
//     listItemId,
//     listViewType
//   }).dispatch();
// };

// export const addItemToList = ({ data, analyticsData }) => async (dispatch) => {
//   const { listId, title, description, mediaUrl, scrapedUrlId, pageId, isAddressGooglePlaceId, googlePlaceId, publisherId, publisherType, isUserMedia, phoneNumber, tags } = data;
//   const itemForSubmit = getItemForSubmit({
//     listId,
//     title,
//     description,
//     mediaUrl,
//     scrapedUrlId,
//     pageId,
//     isAddressGooglePlaceId,
//     googlePlaceId,
//     publisherId,
//     publisherType,
//     isUserMedia,
//     phoneNumber,
//     tags
//   });

//   const res = await dispatch(apiCommand('lists.addItemToList', { ...itemForSubmit, description }));
//   const newItem = res.data.data;

//   const { isPassive, listName, pageName, creatorName, creatorId } = analyticsData;
//   analytics.actionEvents
//     .listItemCreation({
//       isPassive,
//       listName,
//       listId,
//       pageId,
//       pageName,
//       creatorName,
//       creatorId
//     })
//     .dispatch();

//   dispatch({
//     type: LIST_ADDED_ITEM,
//     payload: {
//       listId,
//       newItem
//     }
//   });

//   return newItem;
// };

// export const editListItem = ({ listId, listItemId, title, description, mediaUrl, scrapedUrlId, pageId, googlePlaceId, publisherId, publisherType, isUserMedia }) => async (
//   dispatch
// ) => {
//   const itemForSubmit = getItemForSubmit({
//     listId,
//     listItemId,
//     title,
//     description,
//     mediaUrl,
//     scrapedUrlId,
//     pageId,
//     googlePlaceId,
//     publisherId,
//     publisherType,
//     isUserMedia
//   });

//   const res = await dispatch(apiCommand('lists.editListItem', { ...itemForSubmit, description }));
//   dispatch({
//     type: LIST_ITEM_EDIT,
//     payload: {
//       listId,
//       listItemId,
//       editedItem: res.data.data
//     }
//   });
// };

// export const deleteListItem = ({ listId, listItemId }) => async (dispatch) => {
//   const res = await dispatch(apiCommand('lists.deleteListItem', { listId, listItemId }));
//   dispatch({
//     type: LIST_ITEM_DELETE,
//     payload: {
//       listId,
//       listItemId,
//       totalVotes: res.data.data.totalVotes
//     }
//   });
// };

// export const getListItemCta = () => (dispatch, getState) => {
//   const { hiddenPosts } = getState().auth;
//   const filterHiddenPosts = (lists) => lists.data.filter((list) => !Object.values(hiddenPosts).includes(list.id));

//   dispatch(
//     apiQuery({
//       reducerStatePath: 'lists.listItemCtaPosts',
//       query: { domain: 'lists', key: 'getPassivePostLists' },
//       options: { responseMutator: filterHiddenPosts }
//     })
//   );
// };

// export const markUsedListItemCta = ({ listId }) => ({
//   type: MARK_USED_LIST_ITEM_CTA,
//   payload: {
//     listId
//   }
// });
