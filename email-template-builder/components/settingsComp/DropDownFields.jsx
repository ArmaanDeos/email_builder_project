import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropDownFields = ({ label, value, options, handleStyleChanges }) => {
  return (
    <div className="">
      <label>{label}</label>
      <Select
        onValueChange={(value) => handleStyleChanges(value)}
        defaultValue={value}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, index) => (
            <SelectItem value={option} key={index}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownFields;
