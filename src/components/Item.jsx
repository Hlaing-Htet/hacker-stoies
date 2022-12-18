import React from "react";
import style from "./Item.module.css";
// import appStyles from "../App.module.css";
import { ReactComponent as Cross } from "../assets/cross.svg";
import styled from "styled-components";
function Item({ item, onRemoveItem }) {
  const StyleButton = styled.button`
    background-color: #ff731d;
    color: white;
    padding: 0.5em 1em;
    border: 1px solid white;
    cursor: pointer;
    &:hover {
      background-color: #00731d;
    }
  `;
  const StyleButtonSmall = styled(StyleButton)`
    padding: 0.3em 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return (
    <li className={style.item}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}/</a>
      </span>
      <span style={{ width: "30%" }}>{item.author}</span>
      <span style={{ width: "10%" }}>{item.num_comments}</span>
      <span style={{ width: "10%" }}>{item.points}</span>
      <span style={{ width: "10%" }}>
        <StyleButtonSmall onClick={() => onRemoveItem(item)}>
          <Cross height="16px" width="16px" />
        </StyleButtonSmall>
      </span>
    </li>
  );
}

export default Item;
