import { Slider } from "../ui/slider";

const SliderField = ({ label, value, handleStyleChanges, type = "px" }) => {
  const formattedValue = (value_) => {
    return Number(value_.toString().replace(type, ""));
  };

  return (
    <div className="">
      <label>
        {label} ({value})
      </label>
      <Slider
        defaultValue={[formattedValue(value)]}
        max={100}
        step={1}
        onValueChange={(value) => handleStyleChanges(value + type)}
      />
    </div>
  );
};

export default SliderField;
