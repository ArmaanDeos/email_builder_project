import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col justify-center items-center mt-24">
      <h2 className="font-extrabold text-4xl text-center">
        Design Dynamic Emails with Ease ✨ | AI-Powered Drag-and-Drop
        <span className="text-primary">Email Template🚀</span>
      </h2>
      <p className="text-center mt-4">
        Transform the way you create email templates with our AI-powered email
        template builder. Effortlessly design dynamic, responsive, and visually
        stunning emails using an intuitive drag-and-drop interface.
      </p>
      <div className="flex gap-5 mt-6">
        <Button variant="outline">Try Demo</Button>
        <Button>Get Started</Button>
      </div>

      <Image
        className="mt-12 rounded-xl"
        src={"/landing.png"}
        alt="landing"
        width={1000}
        height={800}
      />
    </div>
  );
};

export default Hero;
