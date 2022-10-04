function InputWithLabel({ id, value, onChange, children, isFocus = false }) {
  return (
    <>
      <label htmlFor={id}>{children}:</label>
      <input
        type="text"
        id={id}
        onChange={onChange}
        value={value}
        autoFocus={isFocus}
      />
    </>
  );
}

export default InputWithLabel;
