"use client";
import { userContext } from "@/app/provider";

import EmailTemplateList from "@/components/dashboardComp/EmailTemplateList";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const { userDetail, setUserDetail } = userContext();

  return (
    <div className="">
      <div className="p-10 md:px-28 lg:px-40 xl:px-50 mt-16">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl">Hello , {userDetail?.name}</h2>
          <Link href="/dashboard/create">
            <Button>
              <PlusIcon /> Create New Template
            </Button>
          </Link>
        </div>

        <EmailTemplateList />
      </div>
    </div>
  );
};

export default Dashboard;
