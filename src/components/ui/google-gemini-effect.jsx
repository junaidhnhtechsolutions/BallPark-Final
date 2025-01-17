import { cn } from "../../lib/utils";
import { CoolMode } from "./cool-mode";
import { Link } from "react-router-dom";


export const GoogleGeminiEffect = ({
  description,
  className,
}) => {
  return (
    <div className={cn("sticky top-[30%] md:top-6 pb-10 w-full", className)}>
      <p className="text-xs md:text-xl font-normal text-center text-white mt-4 max-w-lg mx-auto">
        {description ||
          `Set builders, creative agencies, and designers alike. Witness the first AI to cost your designs and technical drawings. `}
      </p>
      <div className="w-full h-[130vh] -top-60 md:-top-40  flex items-center justify-center bg-red-transparent absolute ">
        <button
          className="font-bold bg-white rounded-full md:px-4 md:py-2 px-2 py-1 md:mt-24 mt-8 z-30 md:text-base text-black text-xs  w-fit mx-auto "
        >
          <CoolMode>
            <Link to={"https://ball-park-beta.vercel.app/login"}>Join Us</Link>
          </CoolMode>
        </button>
      </div>
    </div>
  );
};
