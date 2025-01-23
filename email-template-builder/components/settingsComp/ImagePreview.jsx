import { Input } from "../ui/input";

const ImagePreview = ({ label, value, handleInputChange }) => {
  return (
    <div className="">
      <label>{label}</label>
      <img
        src={value}
        alt="image"
        className="w-full h-[150px] object-cover border rounded-xl"
      />
      <Input
        className="mt-2"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default ImagePreview;
