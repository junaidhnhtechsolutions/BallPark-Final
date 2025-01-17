import { cn } from "../../lib/utils";
import TransitionLink from "../TransitionLink";

export default function OffScreen({
  open,
  setOpen,
}) {
  return (
    <div
      className={cn(
        "absolute rounded-md text-black  transition-all transform ease-in-out duration-500 bg-gradient-to-t from-[#DEFBFF] to-[#F0FBFF] top-1 right-10  z-[99999]",
        open ? "w-full md:w-[50%] lg:w-[30%]  " : "w-0 h-0 "
      )}
    >
      <div
        className={cn(
          "hidden transition-all transform ease-in-out duration-700 p-4",
          open && "flex flex-col   items-start "
        )}
      >
        <h4 className="text-6xl mb-5 font-Roboto font-extralight flex flex-col justify-start items-start">
          {" "}
          <h6 className="text-[#1B2978] font-light">Ball</h6>
          <h6
            className={cn(
              "text-[#1B2978] opacity-50 hover:opacity-100 transition-all ease-linear duration-300"
            )}
          >
            Park
          </h6>
        </h4>
        <h4 className="h-8  ">
          <TransitionLink
            label="Navigation Park"
            href="/navigating-park"
            setOpen={setOpen}
            className="transition-all ease-out duration-200 hover:ml-4 p-2 rounded-sm hover:bg-[#1B2978] hover:text-white"
          />
        </h4>
        <h4 className="h-8">
          <TransitionLink
            label="In the ball park 2.0"
            href="/ball-park"
            setOpen={setOpen}
            className="transition-all ease-out duration-200 hover:ml-4 p-2 rounded-sm hover:bg-[#1B2978] hover:text-white"
          />
        </h4>
      </div>
    </div>
  );
}
