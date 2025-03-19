import { useEffect, useLayoutEffect, useRef } from "react";
import Particles from "../ui/particles";
import gsap from "gsap";

export default function Section1() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.to(["#title-1", "#title-2", "#title-3"], {
        opacity: 0,
        y: "-=30",
        delay: 0.3,
        stagger: 0.5,
      })
        .to("#intro-slider", {
          opacity: 0,
          zIndex: 0,
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const line = gsap.timeline({ repeat: -1 });
    line.fromTo(
      "#svg-line",
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        duration: 2,
        ease: "power1.inOut",
        repeatDelay: 1,
      }
    );

    return () => {
      line.kill();
    };
  }, []);

  return (
    <div className="flex justify-end relative items-end h-auto md:h-[100vh] bg-[#00083C] overflow-hidden w-full">
      <Particles
        className="absolute inset-0 h-fit z-30"
        quantity={100}
        ease={100}
        color={"#ffffff"}
        refresh
      />
      <div className="absolute 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-screen w-full hero_animation 1100px:left-8 1500px:left-14"></div>

      <div className="flex flex-col justify-end relative items-end h-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div className="flex flex-col justify-end items-start text-white space-y-6">
            <h1 className="text-[20px] md:text-[24px] text-white capitalize w-full">
              Did you enter the creative industry to spend your time crunching
              numbers and sending out one thousand emails?
            </h1>
            <h1 className="text-[20px] md:text-[24px] text-white capitalize w-full">
              Neither did we.
            </h1>
            <h1 className="text-[20px] md:text-[24px] text-white capitalize w-full">
              Welcome to the first-ever hybrid AI platform that makes creating a
              ballpark estimate for an event as effortless as writing a shopping
              list.
            </h1>
          </div>

          {/* Intro Slider */}
          <div className="relative w-full h-auto md:h-screen overflow-hidden">
            <div
              id="intro-slider"
              className="h-auto md:h-screen p-10 font-spaceGrotesk w-full flex flex-col items-center gap-10 tracking-tight"
            >
              <div className="absolute top-0 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-screen w-full 1100px:left-8 1500px:left-14"></div>

              {/* SVG Animation */}
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 1000 1000"
                style={{
                  background: "new 0 0 1000 1000",
                  zIndex: "20",
                }}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    id="svg-line"
                    style={{
                      fill: "none",
                      stroke: "#ffffff",
                      strokeWidth: "2px",
                      strokeMiterlimit: 10,
                      strokeDasharray: "1000",
                      strokeDashoffset: "1000",
                    }}
                    d="M438,828.5L21.3,411.8c0,0,136-343.8,476.7-349.4
                s480.7,344.9,480.7,344.9L557.9,828.5c0,0,35.8,57.1-11.1,93.3c-22.9,17.6-54,20.7-80.2,8.5C439.9,917.9,414.1,890.2,438,828.5z"
                  />
                  <path
                    style={{
                      fill: "none",
                      strokeWidth: "2px",
                      stroke: "#ffffff",
                      strokeMiterlimit: 10,
                      transition: "stroke-width 0.3s ease",
                    }}
                    className="hover-path"
                    d="M253.1,506.6l203.3-205.5c0,0,40.5,29.4,79.8,0l207.6,207.7
                c0,0-30,43.6-0.9,88L536.6,806.7c0,0-23-25.3-75.8,0L253.1,588.6C253.1,588.6,283.9,557.9,253.1,506.6z"
                  />
                  <style>
                    {`
                .hover-path:hover {
                  stroke-width: 1px; 
                }
              `}
                  </style>
                </g>
              </svg>

              {/* Ball Park Text */}
              <p className="text-white z-20 uppercase tracking-widest absolute font-Roboto md:text-sm text-[10px] top-[53%] animate-bounce">
                Ball Park
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
