import BoxReveal from "../ui/box-reveal";
import Projects from "../ui/projects";

const Section4 = () => {
  return (
    <div className="py-12 w-[80%] mx-auto bg-white h-screen overflow-hidden flex flex-col justify-center items-center">
      <div className="flex justify-center font-bold">
        <BoxReveal>
          <h1 className="text-4xl text-center text-[#1B2978] bg-white p-2 rounded mb-10">
            Testimonals
          </h1>
        </BoxReveal>
      </div>
      <div className=" rounded-xl border-2 shadow-2xl shadow-[#FF007A]">
        <Projects />
      </div>
    </div>
  );
};

export default Section4;
