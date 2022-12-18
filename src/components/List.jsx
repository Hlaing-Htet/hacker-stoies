import React from "react";
import Item from "./Item";
function List({ stories, onRemoveItem }) {
  return (
    <ol style={{ padding: "1em", margin: 0 }}>
      {stories.map((item) => {
        return (
          <Item item={item} key={item.created_at} onRemoveItem={onRemoveItem} />
        );
      })}
    </ol>
  );
}

export default List;

// class List extends React.Component {
//   render() {
//     return (
//       <ol style={{ padding: "1em", margin: 0 }}>
//         {stories.map((item) => {
//           return (
//             <Item
//               item={item}
//               key={item.created_at}
//               onRemoveItem={onRemoveItem}
//             />
//           );
//         })}
//       </ol>
//     );
//   }
// }
