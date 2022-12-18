import { SeachForm } from "./components/SeachForm";
import styled from "styled-components";
import { useEffect, useReducer, useState, useCallback, useRef } from "react";
import axios from "axios";

import List from "./components/List";

// import styles from "./App.module.css";

const ACTIONS = {
  INIT: "STORIES_FETCH_INIT",
  SUCCESS: "STORIES_FETCH_SUCCESS",
  FAILURE: "STORIES_FETCH_FAILURE",
  REMOVE: "REMOVE_STORY",
};
const storiesReducer = (state, action) => {
  // console.log(state, action);

  switch (action.type) {
    case ACTIONS.INIT:
      return {
        ...state,
        isLoading: true,
        // hasError: false,
      };
    case ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.payload,
      };
    case ACTIONS.FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case ACTIONS.REMOVE:
      return {
        ...state,
        data: state.data.filter(
          (story) => story.objectID !== action.payload.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
function App() {
  const [query, setQuery] = useStorageState("search", "");
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    hasError: false,
  });
  const [url, setUrl] = useState(`${API_ENDPOINT}${query}`);
  //* memoized
  //* useCallback
  const fetchStories = useCallback(async () => {
    if (!query) {
      return;
    }
    dispatchStories({
      type: ACTIONS.INIT,
    });
    try {
      const res = await axios.get(url);
      dispatchStories({
        type: ACTIONS.SUCCESS,
        payload: res.data.hits,
      });
    } catch {
      dispatchStories({ type: ACTIONS.FAILURE });
    }
    // .catch(() => );
  }, [url]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);
  const handleRemoveStory = useCallback((item) => {
    dispatchStories({
      type: ACTIONS.REMOVE,
      payload: item,
    });
  }, []);
  function handleSearchInput(e) {
    setQuery(e.target.value);
  }
  function handleSearchSubmit(event) {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${query}`);
  }
  //custom hook
  // usestorageState

  // const searchedStories = stories.data.filter((story) => {
  //   return story.title.toLowerCase().includes(query.toLowerCase());
  // });

  const StyledContainer = styled.div`
    padding: 1em;
    background-color: #eee;
    height: 100vh;
  `;
  const StyledHeadLine = styled.h1`
    font-size: 3rem;
    font-weight: 300;
  `;
  return (
    <StyledContainer>
      <StyledHeadLine>My Hacker News</StyledHeadLine>
      <SeachForm
        handleSearchSubmit={handleSearchSubmit}
        query={query}
        handleSearchInput={handleSearchInput}
      />

      <hr />
      {stories.hasError && <p>Something was worng ...</p>}

      {stories.isLoading ? (
        <p>Loading....</p>
      ) : (
        <List stories={stories.data} onRemoveItem={handleRemoveStory} />
      )}
      {/* <User user={user} /> */}
    </StyledContainer>
  );
}
//** Custom hook */
function useStorageState(key, initialState) {
  const isMounted = useRef(false);
  const [value, setVaue] = useState(localStorage.getItem(key) || initialState);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log("A");
      localStorage.setItem(key, value);
    }
  }, [value]);

  return [value, setVaue];
}
//React controlled components

export default App;
