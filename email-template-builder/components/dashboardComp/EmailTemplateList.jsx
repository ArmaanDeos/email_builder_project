import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const EmailTemplateList = () => {
  const [emailList, setEmailList] = useState([]);

  return (
    <div className="">
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>
      {emailList?.length === 0 && (
        <div className="flex justify-center items-center flex-col mt-7 gap-5">
          <Image
            src={"/email.png"}
            alt="email"
            width={250}
            height={250}
            className=""
          />
          <Button>
            <PlusIcon /> Create New Template
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
