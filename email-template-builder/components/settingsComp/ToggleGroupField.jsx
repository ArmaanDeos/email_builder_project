import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ToggleGroupField = ({
  label,
  value,
  handleOuterStyleChanges,
  handleStyleChanges,
  options,
}) => {
  // A combined function to handle both style changes
  const handleToggleChange = (newValue) => {
    // Call the style handler if available
    if (handleStyleChanges) {
      handleStyleChanges(newValue);
    }

    // Call the outer style handler if available
    if (handleOuterStyleChanges) {
      handleOuterStyleChanges(newValue);
    }
  };

  return (
    <div className="">
      <label>{label}</label>
      <ToggleGroup
        type="single"
        defaultValue={value}
        onValueChange={handleToggleChange}
      >
        {options.map((option, index) => (
          <ToggleGroupItem key={index} value={option?.value} className="w-full">
            <option.icon />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupField;
