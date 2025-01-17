import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {Dot} from "lucide-react"
// import TextRevealByWord from "../ui/text-reveal";
// import BoxReveal from "../ui/box-reveal";
import { Link } from "react-router-dom";
// import BlinkingDot from "../ui/blinking-dot";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const svgLineRef = useRef(null);
  const gifRef = useRef(null);
  const audioRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/assets/break.mp3");
    gsap.fromTo(
      svgLineRef.current,
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        duration: 2,
        scrollTrigger: {
          trigger: svgLineRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );
    const ballTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#ball", // Target the ball image
        start: "top center", // Start when the top of the ball reaches the center of the viewport
        end: `+=1500vh`, // Duration of the pinned animation
        pin: true, // Pin the ball
        scrub: 1, // Smooth animation based on scroll
      },
    });

    ballTimeline
      .from("#ball", { filter: "blur(22px)", x: "600px" })
      .to("#ball", {
        filter: "blur(0px)",
        x: "-500px",
        rotation: -180, // Move to the left
        duration: 1, // Smooth duration
        ease: "power1.inOut",
        onComplete: () => {
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 3000);
          // Show the GIF

          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        },
        // Smooth easing
      })
      .to("#ball", {
        filter: "blur(20px)",
        x: "-100px",
        rotation: 180,
        duration: 2,
        ease: "power1.inOut",
      });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full py-12 h-full relative bg-[#081546]">
      <div className="vertical-line-container hidden md:block">
        <div className="vertical-line"></div>
        <div className="shining-line"></div>
      </div>
      <div className="w-full">
        <img
          src="/assets/ball.svg"
          className="absolute hidden md:block md:w-28 h-28 blur-3xl left-[50%]"
          id="ball"
          alt="Ball Image"
        />
      </div>
      <div className="w-[80%] mx-auto max-w-screen-2xl relative">
        <img
          id="glass-video"
          ref={gifRef}
          src={visible ? "/assets/broken.gif" : ""}
          className="fixed  h-screen  top-0"
          style={{ visibility: "hidden" }}
        />
        <audio src="/assets/break.mp3" autoPlay={false} ref={audioRef} />
      </div>

      <div className="relative">
        <div className=" mx-auto max-w-screen-2xl ">
          <div className="h-[10%]   z-40 top-0 px-2 uppercase mx-auto text-4xl py-8 font-normal  flex text-white  justify-center items-center ">
            <h1 className="md:text-5xl md:leading-[76px] text-center flex justify-center text-white items-center uppercase w-[50%] mx-auto">
              Plan Your Event <br /> Budget in Minutes
            </h1>
          </div>
          <div className="flex w-[60%] mx-auto text-white  ">
            <div className="md:md:w-[70%]"></div>
            <div className="md:md:w-[45%]">
              <h1 className="text-[15px] font-semibold my-4 text-white  tracking-widest uppercase flex items-center gap-4">
                {" "}
                <div className="bg-white animate-ping drop-shadow-2xl shadow-green-700 h-1 w-1 rounded-full"></div>
                What makes an event budget?
              </h1>{" "}
              <p className="text-[15px] tracking-tight ps-4 mb-8">
                Venue + Hire furniture + Staff + AV + Event Shell + Bespoke
                features = Ballpark cost.
              </p>
            </div>
          </div>
          <div className="flex w-[60%] mx-auto text-white  ">
            <div className="md:w-[70%]"></div>
            <div className="md:w-[45%]">
              <h1 className="text-[15px] font-semibold my-4  text-white  tracking-widest uppercase flex items-center gap-4">
                {" "}
                <div className="bg-white animate-ping drop-shadow-2xl  h-1 w-1 rounded-full"></div>
                What if budgeting could take just 5 minutes?
              </h1>{" "}
              <p className="text-[15px] tracking-tight ps-4 mb-8">
                Say goodbye to endless emails and numerous open tabs. And say
                hello to the future of budgeting.
              </p>
            </div>
          </div>
          <div className="flex w-[60%] mx-auto text-white  ">
            <div className="md:w-[70%]"></div>
            <div className="md:w-[45%]">
              <h1 className="text-[15px] font-semibold my-4 text-white  tracking-widest uppercase flex items-center gap-4">
                {" "}
                <div className="bg-white animate-ping drop-shadow-2xl shadow-green-700 h-1 w-1 rounded-full"></div>
                How It Works:
              </h1>{" "}
              <p className="text-[15px] tracking-tight ps-4 mb-8">
                We are partnering with hire companies, venues, staff providers,
                and AV specialists across the UK. They upload their pictures and
                prices directly to our platform, so you can browse, compare, and
                build the bones of your event without any hassle.
              </p>
            </div>
          </div>
          <div className="flex w-[60%] mx-auto text-white  ">
            <div className="md:w-[70%]"></div>
            <div className="md:w-[45%]">
              <h1 className="text-[15px] font-semibold my-4 text-white  tracking-widest uppercase flex items-center gap-4">
                {" "}
                <div className="bg-white animate-ping drop-shadow-2xl shadow-green-700 h-1 w-1 rounded-full"></div>
                What is an event shell?
              </h1>{" "}
              <p className="text-[15px] tracking-tight ps-4 mb-8">
                An event shell is something that could be used and rebranded
                throughout many events. This can include anything from a stall
                to a DJ booth. We have drawings and their sizes with their raw
                material cost. Some even come with their own technical drawings
                and suggested manufacturers.
              </p>
            </div>
          </div>
          <div className="flex w-[60%] mx-auto text-white  ">
            <div className="md:w-[70%]"></div>
            <div className="md:w-[45%]">
              <h1 className="text-[15px] font-semibold my-4 text-white  tracking-widest uppercase flex items-center gap-4">
                {" "}
                <div className="bg-white animate-ping drop-shadow-2xl shadow-green-700 h-1 w-1 rounded-full"></div>
                But we know every event is unique. What if we need something
                bespoke built?
              </h1>{" "}
              <p className="text-[15px] tracking-tight ps-4 mb-8">
                That’s why we’ve developed something groundbreaking: the world’s
                first AI that calculates costs from images.
              </p>
              <p className="text-[15px] tracking-tight ps-4 mb-8">
                Have a hand-drawn sketch or a rough idea? No problem. Just
                annotate your design, and our AI will:
              </p>
              <ul className="list-disc">
                <li className="ml-8">
                  <p className="text-[12px] font-semibold my-4 tracking-widest uppercase flex items-center gap-4 ">
                    Calculate material costs, even for bespoke items.
                  </p>
                </li>
                <li className="ml-8">
                  <p className="text-[12px] font-semibold my-4 tracking-widest uppercase flex items-center gap-4 ">
                    Account for substructures, so you don’t need professional
                    technical drawings.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-[60%] mx-auto text-white  ">
            <div className="md:w-[70%]"></div>
            <div className="md:w-[45%]">
              <h1 className="text-[15px] font-semibold my-4 text-white  tracking-widest uppercase flex items-center gap-4">
                {" "}
                <div className="bg-white animate-ping drop-shadow-2xl shadow-green-700 h-1 w-1 rounded-full"></div>
                Lastly:
              </h1>{" "}
              <p className="text-[15px] tracking-tight ps-4 mb-8">
                Now you’ve costed for everything. What’s next? We have a built
                in invoicing system. You can simply use the drop downs to
                calculate the birds eye view cost. You then can either ‘save as
                PDF’ or ‘Email suppliers’
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center">
              {" "}
              <h1 className="text-center w-[60%] mx-auto md:text-4xl font-bold my-4 text-white p-2 rounded uppercase">
                No more smoke and mirrors. Lets get onto the enjoyable stuff
              </h1>
              <Link
                to={"https://ball-park-beta.vercel.app/login"}
                // className="text-white  font-semibold bg-[#1B2978] p-2 px-6 text-lg rounded-sm hover:bg-[#1b2978c4] hover:text-white"
                className="bg-white text-black rounded-md p-3 px-6 flex justify-center items-center hover:bg-black hover:text-white transition-all"
              >
                Let's Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
