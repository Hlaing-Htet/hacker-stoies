// import { useEffect, useRef } from "react";
import styles from "./SearchForm.module.css";
function InputWithLabel({ id, value, onChange, children, isFocus = false }) {
  // const inputRef = useRef();
  // useEffect(() => {
  //   if (isFocus && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [isFocus]);
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}:
      </label>
      <input
        type="text"
        id={id}
        // ref={inputRef}
        onChange={onChange}
        value={value}
        autoFocus={isFocus}
        className={styles.input}
      />
    </>
  );
}

// class InputWithLabel extends React.Component{

// }

export default InputWithLabel;
