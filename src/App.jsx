import { useEffect, useState } from "react";
import InputWithLabel from "./components/InputWithLabel";
import List from "./components/List";

import "./App.css";

function App() {
  const initialStories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: "JavaScript",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Hla Clark",
      num_comments: 2,
      points: 5,
      objectID: 2,
    },
  ];
  const [query, setQuery] = useStorageState("search", "");
  function handleChange(e) {
    setQuery(e.target.value);
  }
  const [stories, setStories] = useState(initialStories);

  function handleRemoveStory(item) {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID
    );
    setStories(newStories);
  }
  //custom hook
  // usestorageState

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(query.toLowerCase());
  });

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
      <List stories={searchedStories} onRemoveItem={handleRemoveStory} />
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
