import { Input } from "../ui/input";

const InputStyleField = ({ label, value, handleStyleChanges, type = "px" }) => {
  const formattedValue = (value_) => {
    return Number(value_.toString().replace(type, ""));
  };

  return (
    <div className="">
      <label>{label}</label>
      <div className="flex">
        <Input
          type="text"
          value={formattedValue(value)}
          onChange={(e) => handleStyleChanges(e.target.value + "px")}
        />
        <h2 className="p-1 bg-gray-100 rounded-r-lg -ml-2">{type}</h2>
      </div>
    </div>
  );
};

export default InputStyleField;
