"use client";
import { userContext } from "@/app/provider";
import Header from "@/components/common/Header";
import EmailTemplateList from "@/components/dashboardComp/EmailTemplateList";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Dashboard = () => {
  const { userDetail, setUserDetail } = userContext();

  return (
    <div className="">
      <Header />
      <div className="p-10 md:px-28 lg:px-40 xl:px-50 mt-16">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl">Hello , {userDetail?.name}</h2>
          <Button>
            <PlusIcon /> Create New Template
          </Button>
        </div>
        <EmailTemplateList />
      </div>
    </div>
  );
};

export default Dashboard;
