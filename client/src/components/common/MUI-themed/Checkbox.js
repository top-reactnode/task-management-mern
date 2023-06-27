import React from "react";

const Checkbox = ({ _id, val, setVal, text }) => {
  return (
    <>
      <input
        type="checkbox"
        id={_id}
        name={_id}
        checked={val}
        onChange={(e) => setVal(e.target.checked)}
        className="material-checkbox"
      />
      <label htmlFor={_id}>{text}</label>
    </>
  );
};

export default Checkbox;
