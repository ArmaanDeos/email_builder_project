import { Input } from "../ui/input";

const ColorPickerFill = ({
  label,
  value,
  handleOuterStyleChanges,
  handleStyleChanges,
}) => {
  // A combined function that checks which handler to use
  const handleChange = (e) => {
    const color = e.target.value;
    // Call either handleStyleChanges or handleOuterStyleChanges based on some condition
    if (handleStyleChanges) {
      handleStyleChanges(color);
    }
    if (handleOuterStyleChanges) {
      handleOuterStyleChanges(color);
    }
  };

  return (
    <div className="grid">
      <label>{label}</label>
      <Input type="color" value={value} onChange={handleChange} />
    </div>
  );
};

export default ColorPickerFill;
