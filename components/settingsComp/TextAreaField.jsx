import { Textarea } from "../ui/textarea";

const TextAreaField = ({
  label,
  value,
  handleInputChange,
  style,
  outerStyle,
}) => {
  return (
    <div className="" style={outerStyle}>
      <label>{label}</label>
      <Textarea
        style={style}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default TextAreaField;
