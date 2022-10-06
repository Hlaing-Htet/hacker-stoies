import { useEffect, useReducer, useState } from "react";
import InputWithLabel from "./components/InputWithLabel";
import List from "./components/List";

import "./App.css";
const storiesReducer = (state, action) => {
  // console.log(state, action);

  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        // hasError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case "REMOVE_STORY":
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
// const getAsyncStories = () => {
//   return new Promise((resolve) =>
//     setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
//   );
// };
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
function App() {
  const [query, setQuery] = useStorageState("search", "");
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    if (!query) {
      return;
    }
    dispatchStories({
      type: "STORIES_FETCH_INIT",
    });

    fetch(`${API_ENDPOINT}${query}`)
      .then((res) => res.json())
      .then((res) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: res.hits,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, [query]);
  function handleRemoveStory(item) {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }
  function handleChange(e) {
    setQuery(e.target.value);
  }

  //custom hook
  // usestorageState

  // const searchedStories = stories.data.filter((story) => {
  //   return story.title.toLowerCase().includes(query.toLowerCase());
  // });

  return (
    <div>
      <h1>My Hacker News</h1>
      <InputWithLabel
        id="search"
        value={query}
        onChange={handleChange}
        isFocus={true}
      >
        Search
      </InputWithLabel>

      <hr />
      {stories.hasError && <p>Something was worng ...</p>}

      {stories.isLoading ? (
        <p>Loading....</p>
      ) : (
        <List stories={stories.data} onRemoveItem={handleRemoveStory} />
      )}
      {/* <User user={user} /> */}
    </div>
  );
}
function useStorageState(key, initialState) {
  const [value, setVaue] = useState(localStorage.getItem(key) || initialState);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setVaue];
  // function handleChange(e) {
  //   setVaue(e.target.value);
  // }
}
//React controlled components

export default App;
