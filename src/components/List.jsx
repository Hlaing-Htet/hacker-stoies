import React from "react";
import Item from "./Item";
function List({ stories, onRemoveItem }) {
  return (
    <ul>
      {stories.map((item) => {
        return (
          <Item item={item} key={item.author} onRemoveItem={onRemoveItem} />
        );
      })}
    </ul>
  );
}

export default List;
