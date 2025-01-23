import Layout from "@/Data/Layout";
import ElementLayoutCard from "../common/ElementLayoutCard";
import ElementList from "@/Data/ElementList";

const ElementSidebar = ({ layout }) => {
  return (
    <div className="p-5 h-screen shadwo-sm">
      <h2 className="font-bold text-lg">Layouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {Layout.map((layout, index) => (
          <ElementLayoutCard layout={layout} key={index} />
        ))}
      </div>

      <h2 className="font-bold text-lg mt-5">Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {ElementList.map((element, index) => (
          <ElementLayoutCard layout={element} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ElementSidebar;
