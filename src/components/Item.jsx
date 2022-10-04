import React from "react";

function Item({ item, onRemoveItem }) {
  // function handleRemoveItem() {
  //   onRemoveItem(item);
  // }
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}/</a>
      </span>
      <span>author:{item.author}/</span>
      <span>number of comment:{item.num_comments}/</span>
      <span>ponits:{item.points}</span>
      <span>
        <button onClick={() => onRemoveItem(item)}>Delete</button>
      </span>
    </li>
  );
}

export default Item;
