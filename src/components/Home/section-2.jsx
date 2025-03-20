import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {

  return (
    <div className="w-full py-12 h-full relative bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)]">
      <div className="h-full absolute md:top-[28%] md:left-[48%] flex flex-col items-center">
        <div>
          <img src="/assets/section-two-ball.png" className="w-20 h-full" alt="Bubble" />
        </div>
        <div className="bg-white h-60 w-[2px]" />
        <div>
          <img src="/assets/section-two-ball.png" className="w-20 h-full" alt="Bubble" />
        </div>
        <div className="bg-white h-60 w-[2px]" />
        <div>
          <img src="/assets/section-two-ball.png" className="w-20 h-full" alt="Bubble" />
        </div>
      </div>

      <div className="relative">
        <div className="mx-auto max-w-screen-2xl md:px-40">
          <div className="flex flex-col text-white  justify-center items-center">
            <h1 className="md:text-5xl md:leading-[50px] text-center flex justify-center text-white items-center uppercase md:w-[50%] mx-auto font-bold">
              BUT HOW WILL THIS <br /> WORK?
            </h1>
            <p className="text-sm mt-5 font-semibold text-white max-w-lg text-center">
              This does not only provide a baseline understanding of costs but also allows you to connect directly with suppliers that match your budget.
            </p>
          </div>

          <div className="flex items-end justify-end mt-24 text-white">
            <p className="md:w-[35%] text-sm font-semibold text-white max-w-lg">
              Our website functions as a shopping list for ballpark costs, allowing you to effortlessly "add to project" everything from venues and trade booths to floral arches. Plus, our one-of-a-kind AI can generate baseline cost estimates for your own drawings.
            </p>
          </div>
          <div className="flex items-end justify-end mt-44 text-white">
            <p className="md:w-[35%] text-sm font-semibold text-white max-w-lg">
              Once you have this ballpark cost for your event, you can use it as a foundation to refine your design, incorporating bespoke finishes while keeping your baseline budget in mind.
            </p>
          </div>
          <div className="flex items-end justify-end mt-44 text-white">
            <p className="md:w-[35%] text-sm font-semibold text-white max-w-lg">
              Once you've completed this step, go to your Ballpark Quote and click "Email Suppliers." This will send a blanket email from you to all the suppliers you've added to your project, including details of what you're interested in. They will then respond, allowing you to update them with any bespoke changes you've made so they can quickly provide a revised quote—ready for you to book and move forward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
