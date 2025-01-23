const ColumnLayout = ({ layout }) => {
  return (
    <div className="">
      <div
        className=""
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: "0",
        }}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className=" flex items-center justify-center border-[2px] border-dashed bg-gray-100 p-4 mb-4"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLayout;
