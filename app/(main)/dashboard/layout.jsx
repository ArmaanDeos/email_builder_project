import Header from "@/components/common/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
