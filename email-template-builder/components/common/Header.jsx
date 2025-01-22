"use client";
import Image from "next/image";
import SignInButton from "./SignInButton";
import { userContext } from "@/app/provider";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  const { userDetail, setUserDetail } = userContext();

  return (
    <div className="flex justify-between items-center p-4 px-10 shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={180} height={140} />
      <div className="">
        {userDetail?.email ? (
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
            <Image
              src={userDetail?.picture}
              alt="user"
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
};

export default Header;
