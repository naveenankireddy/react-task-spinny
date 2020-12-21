import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../styles/items.css";

import { fetchItems, fetchMoreData, search } from "../actions/itemsActions";
import { Item } from "../components/Item";
import ReactLoader from "../components/ReactLoader";

const ItemsPage = ({
  dispatch,
  loading,
  items,
  hasErrors,
  page_number,
  searchedItems,
}) => {
  useEffect(() => {
    dispatch(fetchItems(page_number));
  }, [page_number]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchWord, setSearchword] = useState("");
  // Show loading, error, or success state
  const renderItems = () => {
    if (loading) return <ReactLoader />;
    if (hasErrors) return <p className="Loader">Unable to display items.</p>;
    if (!searchWord && searchWord.length === 0) {
      return items.map((item) => <Item key={item.id} item={item} />);
    } else {
      return searchedItems && searchedItems.length > 0 ? (
        searchedItems.map((item) => <Item key={item.id} item={item} />)
      ) : (
        <h2>sorry no results found</h2>
      );
    }
  };

  const handleClick = (pageNum) => {
    setPageNumber(pageNum + 1);
    dispatch(fetchMoreData(pageNum + 1));
  };

  const handleSearch = (searchWord) => {
    dispatch(search(searchWord));
  };
  return (
    <>
      <div className="search-bar">
        <input
          onChange={(e) => setSearchword(e.target.value)}
          type="text"
          value={searchWord}
          placeholder="search for cards"
        ></input>
        <button onClick={() => handleSearch(searchWord)}>Go</button>
      </div>
      <div class="flex">{renderItems()}</div>
      <div>
        {!searchWord && searchWord.length === 0 ? (
          <p
            className="load-items"
            onClick={pageNumber < 17 ? () => handleClick(pageNumber) : null}
          >
            {pageNumber < 17 ? "load more..." : "No More Data"}
          </p>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.items.loading,
  items: state.items.items,
  hasErrors: state.items.hasErrors,
  limit: state.items.limit,
  page_number: state.items.page_number,
  searchedItems: state.items.searchedItems,
});

export default connect(mapStateToProps)(ItemsPage);
