import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useConvex } from "convex/react";
import { userContext } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

const EmailTemplateList = () => {
  const [emailList, setEmailList] = useState([]);

  const convex = useConvex();
  const { userDetail, setUserDetail } = userContext();

  useEffect(() => {
    userDetail && GetTemplateList();
  }, [userDetail]);

  const GetTemplateList = async () => {
    const result = await convex.query(api.emailTemplates.GetAllUserTemplates, {
      email: userDetail?.email,
    });
    console.log(result);
    setEmailList(result);
  };

  return (
    <div className="">
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>
      {emailList?.length === 0 ? (
        <div className="flex justify-center items-center flex-col mt-7 gap-5">
          <Image src={"/email.png"} alt="email" width={250} height={250} />
          <Link href={"/dashboard/create"}>
            <Button>
              <PlusIcon /> Create New Template
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 ">
          {emailList?.map((email) => (
            <div
              key={email._id}
              className="border border-gray-200 rounded-md p-5 shadow-md"
            >
              <div className="">
                <Image
                  src={"/emailbox.png"}
                  alt="email"
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="">
                <h2>{email?.description}</h2>
              </div>

              <Link href={`/editor/${email._id}`}>
                <Button className="w-full mt-2">ViewEdit</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
