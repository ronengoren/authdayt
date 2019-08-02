// import GooglePlacesService from '/infra/google/googlePlacesService';
// import searchService from 'src/infra/search/searchService';

// export const SEARCH_ADDRESS_START = 'SEARCH_ADDRESS_START';
// export const SEARCH_ADDRESS = 'SEARCH_ADDRESS';
// export const CLEAR_SEARCH_ADDRESS = 'CLEAR_SEARCH_ADDRESS';
// export const INIT_SEARCH_ADDRESS = 'INIT_SEARCH_ADDRESS';

// export const searchAddress = ({ isNeighborhoods = false, query, country, coordinates, types, prefix, destinationTagName }) => async (dispatch) => {
//   let results;
//   dispatch({ type: SEARCH_ADDRESS_START, payload: { query } });

//   // Currently googlePlacesAPI doesn't allow to filter results according to neighborhoods, so we store them in Algolia
//   if (isNeighborhoods) {
//     results = await searchService.searchNeighborhoods(query, destinationTagName);

//     // Normalize the results to match the results from googlePlaces
//     if (results) {
//       results = results.hits.map((result) => ({ name: result.name, description: result.fullname, id: result.objectID }));
//     }
//   } else {
//     results = await GooglePlacesService.search({ input: query, country, coordinates, types, prefix });
//   }

//   dispatch({
//     type: SEARCH_ADDRESS,
//     payload: {
//       results,
//       query
//     }
//   });
// };

// export const initSearchAddress = (payload) => ({
//   type: INIT_SEARCH_ADDRESS,
//   payload
// });

// export const clearSearchAddress = () => ({ type: CLEAR_SEARCH_ADDRESS });
