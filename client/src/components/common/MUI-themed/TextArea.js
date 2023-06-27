import { useRef, useEffect } from "react";
import "./MUI-themed.css";

const TextArea = ({ label, rows, val, setVal, required, className }) => {
  const materialInput = useRef(null);
  const materialLabel = useRef(null);

  useEffect(() => {
    materialLabel.current.addEventListener("click", () => {
      materialInput.current.focus();
    });
  }, []);

  return (
    <div className={"input-group " + className}>
      <textarea
        rows={rows}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="."
        required={required}
        ref={materialInput}
      />
      <label ref={materialLabel}>{label}</label>
    </div>
  );
};

TextArea.defaultProps = {
  rows: 4,
  required: false,
  className: "",
};

export default TextArea;
