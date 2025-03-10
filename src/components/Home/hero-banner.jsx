import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { setShowIntro } from "../../redux/loaderSlice";
// import Particles from "../../components/ui/particles";
// import { AuroraBackground } from "../../components/ui/aurora-background";
// import { Vortex } from "../../components/ui/vortex";

export default function Herobanner() {
  const comp = useRef(null);
  const dispatch = useDispatch();
  const { showIntro } = useSelector((state) => state.loader);
  const [gifShow, setGifShow] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [imageSrc, setImageSrc] = useState("/assets/banner3.jpg");

  useLayoutEffect(() => {
    if (!startAnimation) return;
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
  }, [startAnimation]);

  useEffect(() => {
    if (!showIntro) return;

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
  }, [showIntro]);

  const handleEnterClick = () => {
    setStartAnimation(true);
    dispatch(setShowIntro(false));
    setGifShow(true);
  };


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setImageSrc("/assets/mobile.jpg");
      } else {
        setImageSrc("/assets/banner3.jpg");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
      <div className="relative" ref={comp}>
        {showIntro && (
          <div
            id="intro-slider"
            className="fixed h-screen p-10 bg-gradient-to-r from-[#ff007a] to-[#00083C] top-0 left-0 z-50 font-spaceGrotesk w-full flex flex-col justify-center items-center gap-10 tracking-tight"
          >
            <div className="absolute top-0 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-screen w-full hero_animation 1100px:left-8 1500px:left-14"></div>
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
                cursor: "pointer",
                zIndex: "50",
              }}
              xmlSpace="preserve"
              onClick={handleEnterClick}
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
            <p
              onClick={handleEnterClick}
              className="text-white z-50 cursor-pointer uppercase tracking-widest absolute font-Roboto 
              md:text-sm text-[10px] md:top-[53%] top-[51%] animate-bounce"
            >
              Click to enter
            </p>
          </div>
        )}

        <div className="relative h-screen w-full text-white">
          <img
            src={imageSrc}
            className="absolute top-0 left-0 w-full h-screen object-fill md:object-cover -z-10"
          />

          <div className="relative h-screen flex justify-center items-center">
            <div className="relative max-w-screen-2xl md:w-[30%] 2xl:w-[20%] mx-auto flex flex-col items-center justify-center h-screen z-30 pointer-events-auto">
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
