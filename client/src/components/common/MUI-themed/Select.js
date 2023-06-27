import "./MUI-themed.css";

const Select = ({ label, options, val, setVal, required, className }) => {
  return (
    <div className={"input-group " + className}>
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="."
        required={required}
      >
        {options}
      </select>
      <label>{label}</label>
    </div>
  );
};

Select.defaultProps = {
  type: "text",
  required: false,
  className: "",
};

export default Select;
