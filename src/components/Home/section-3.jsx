// import BoxReveal from "../ui/box-reveal";
import Globe from "../ui/globe";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function Section3() {
  return (
    <div className="bg-[#00083C] relative md:h-screen h-auto  overflow-hidden">
      <div className="absolute  1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] md:h-screen h-auto  w-full hero_animation 1100px:left-8 1500px:left-14"></div>
      <div className=" relative  text-white  w-[80%] mx-auto max-w-screen-2xl ">
        <div className="flex flex-col justify-center md:h-screen h-auto items-center">
          <h1 className="text-4xl text-center flex justify-center  text-white items-center uppercase w-[50%] mx-auto">
            Our Services
          </h1>
          <div className="z-[20] relative md:mt-10 flex items-center md:flex-row flex-col-reverse">
            <div className="md:w-[70%] md:mb-0 mb-5">
              <TextGenerateEffect
                className="text-justify "
                words={
                  "AI-powered architecture merges innovation and efficiency, creating designs that are visually stunning, sustainable, and adaptable. Leveraging advanced algorithms, AI optimizes spatial layout, energy efficiency, and environmental harmony, enabling futuristic structures that meet global needs. The result is architecture that pushes boundaries and redefines the future of design worldwide."
                }
              />
              <TextGenerateEffect
                className="text-justify"
                words={
                  "This AI-built architecture is a paradigm shift, where human creativity and AI synergy deliver designs that are efficient, beautiful, and future-proof."
                }
              />
            </div>
            <div className="md:w-[50%] md:block hidden relative h-[30vh] md:h-[50vh]">
              {/* <div className=""> */}
              <Globe className="w-full -top-[18%] left-[50%] translate-x-[-50%]" />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
