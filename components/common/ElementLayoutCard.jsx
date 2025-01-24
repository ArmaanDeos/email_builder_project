const ElementLayoutCard = ({ layout }) => {
  return (
    <div className="flex flex-col justify-center items-center border border-dashed shadow-sm rounded-xl p-3 group hover:shadow-md hover:border-primary cursor-pointer hover:text-primary">
      <layout.icon className="p-2 h-9 w-9 bg-gray-100 group hover:bg-primary hover:text-white rounded-full" />
      <h2 className="text-sm group ">{layout.label}</h2>
    </div>
  );
};

export default ElementLayoutCard;
