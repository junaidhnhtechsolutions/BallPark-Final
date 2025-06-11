// import Section3 from "../components/Home/section-3";
// import Section1 from "../components/Home/section-1";
// import NewSectionTwo from "../components/Home/NewSectionTwo";
// import NewSectionThree from "../components/Home/NewSectionThree";
import Herobanner from "../components/Home/hero-banner";
import Section2 from "../components/Home/section-2";
import Template from "../layout/template";
import { useEffect, useState } from "react";
import NewSectionOne from "../components/Home/NewSectionOne";
import NewSectionFour from "../components/Home/NewSectionFour";
import NewSectionFive from "../components/Home/NewSectionFive";
import NewSectionSix from "../components/Home/NewSectionSix";
import HomeSliderSection from "../components/Home/HomeSliderSection";
import ScrollSections from "./ScrollSections";





const Home = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollPosition / maxHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <Template>
      <div className="relative">
        <div className="fixed top-0 left-0 w-full h-1 z-40 bg-gray-300">
          <div
            className="bg-[#FF007A] h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Herobanner />
        <div>
          <NewSectionOne />
        </div>
        <ScrollSections />
        <div>
          <NewSectionFour />
        </div>
        <div>
          <NewSectionFive />
        </div>
        <div>
          <HomeSliderSection />
        </div>
        <div id="about" style={{
          backgroundImage: 'url("/assets/img/banner/rotate-no.jpg")',
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}>
          <Section2 />
          <NewSectionSix />
        </div>
      </div>

    </Template>
  );
};

export default Home;

