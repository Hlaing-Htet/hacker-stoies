import React from "react";
import InputWithLabel from "./InputWithLabel";
// import styles from "./SearchForm.module.css";
import appStyles from "../App.module.css";
import styled from "styled-components";
export function SeachForm({ handleSearchSubmit, query, handleSearchInput }) {
  return (
    <StyledForm onSubmit={handleSearchSubmit}>
      <InputWithLabel
        id="search"
        value={query}
        onChange={handleSearchInput}
        isFocus={true}
      >
        Search
      </InputWithLabel>
      <button className={appStyles.button} type="submit" disabled={!query}>
        Search
      </button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
`;
