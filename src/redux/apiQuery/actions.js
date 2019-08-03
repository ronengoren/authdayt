import { ErrorsLogger } from "src/infra/reporting";
import { shuffleArray } from "src/redux/utils/common";
import { handleNormalizedData } from "src/redux/normalizer";

export const API_QUERY_REQUEST = "API_QUERY_REQUEST";
export const API_QUERY_SUCCESS = "API_QUERY_SUCCESS";
export const API_QUERY_FAILURE = "API_QUERY_FAILURE";
export const API_QUERY_DATA_PATCH = "API_QUERY_DATA_PATCH";

const defaultOptions = {
  resetData: true
};

export const apiQuery = ({
  normalizedSchema,
  reducerStatePath,
  query,
  options = {}
}) => async (dispatch, getState, { apiQueries }) => {
  const fullOptions = { ...defaultOptions, ...options };
  const { domain, key, params } = query;
  const request = apiQueries[domain][key];

  dispatch({
    type: API_QUERY_REQUEST,
    payload: { reducerStatePath, query, options: fullOptions }
  });

  try {
    const res = await request(params);
    let { data } = res.data;

    if (fullOptions.responseMutator) {
      data = fullOptions.responseMutator(data);
    }

    if (!fullOptions.intersect && fullOptions.shuffle) {
      data = shuffleArray(data);
    }

    const dataToUpdate = handleNormalizedData({
      data,
      normalizedSchema,
      dispatch
    });

    await dispatch({
      type: API_QUERY_SUCCESS,
      payload: {
        reducerStatePath,
        query,
        data: dataToUpdate,
        totalCount: res.data.totalCount,
        options: fullOptions
      }
    });

    return res;
  } catch (err) {
    dispatch({
      type: API_QUERY_FAILURE,
      payload: { reducerStatePath, query, err }
    });
    ErrorsLogger.apiQueryError(query, err.toString(), err.response);
    throw err;
  }
};
