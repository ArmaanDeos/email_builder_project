import { Input } from "../ui/input";

const InputFields = ({ label, value, handleInputChange }) => {
  return (
    <div className="">
      <label>{label}</label>
      <Input
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default InputFields;
