import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 px-10 shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={180} height={140} />
      <div className="">
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
