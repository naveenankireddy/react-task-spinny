// Create Redux action creators that return an action
export const setLoading = (loading) => ({
  type: "SET_LOADING",
  payload: loading,
});

export const getItemsSuccess = (items) => ({
  type: "GET_ITEMS_SUCCESS",
  payload: items,
});

export const getItemsFailure = () => ({
  type: "GET_ITEMS_FAILURE",
});
export const getItemsPages = () => ({
  type: "GET_ITEMS_PAGES",
});
export const loas = (searchTerm) => ({
  type: "LOAD_SEARCH_ITEMS",
  payload: searchTerm,
});

// Combine all of them except  in an asynchronous thunk
export const fetchItems = () => {
  return async (dispatch) => {
    dispatch(setLoading());

    try {
      const response = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=<query>&limit=24&page=1`
      );
      const data = await response.json();
      dispatch(getItemsSuccess(data.results));
    } catch (error) {
      dispatch(getItemsFailure());
    }
  };
};

export function fetchMoreData(page_number) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=<query>&limit=24&page=${page_number}`
      );
      const { results } = await response.json();
      dispatch({ type: "LOAD_MORE_ITEMS", payload: results });
    } catch (error) {
      dispatch(getItemsFailure());
    }
  };
}

export function search(searchWord) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=${searchWord}`
      );
      const { results } = await response.json();
      await dispatch({ type: "LOAD_SEARCH_ITEMS", payload: results });
      console.log({ results });
    } catch (error) {
      dispatch(getItemsFailure());
    }
  };
}
