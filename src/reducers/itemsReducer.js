export const initialState = {
  limit: 16,
  page_number: 1,
  items: [],
  loading: false,
  hasErrors: false,
  searchedItems: [],
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ITEMS":
      return { ...state, loading: true };
    case "GET_ITEMS_SUCCESS":
      return {
        ...state,
        items: action.payload,
        loading: false,
        hasErrors: false,
      };
    case "GET_ITEMS_FAILURE":
      return { ...state, loading: false, hasErrors: true };
    case "LOAD_MORE_ITEMS":
      const items = state.items.concat(action.payload);
      return { ...state, items, page_number: state.page_number };

    case "LOAD_SEARCH_ITEMS":
      return { ...state, searchedItems: action.payload };
    default:
      return state;
  }
}
