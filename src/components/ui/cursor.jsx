import gsap from "gsap";
import  { useEffect } from "react";

const Cursor = () => {
  useEffect(() => {
    gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    const targets = gsap.utils.toArray(".ball");
    window.addEventListener("mousemove", (e) => {
      gsap.to(targets, {
        duration: 2.5, // Animation duration for smoother movement
        x: e.clientX + 20, // Ball position based on mouse position
        y: e.clientY + 20, // Ball position based on mouse position
        scale: (i) => 1 - i * 0.3, // Scale decrease with index
        rotation: (i) => (i + 1) * 10, // Rotation based on index
        ease: "back.out", // Easing for smoother movement
        overwrite: "auto",
        stagger: 0.02, // Stagger animation for a dynamic effect
        boxShadow: "0 0 20px #ffffff", // Glowing effect for fire
        backgroundColor: () => `#ffffff`, // Random fiery color
      });
    });

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("mousemove", () => {});
    };
  }, []);
  return (
    <div>
      {" "}
      <div className="ball z-[9999999999999999] bg-white w-6 h-6 fixed top-0 left-0 rounded-full"></div>
      <div className="ball z-[9999999999999999] bg-white w-6 h-6 fixed top-0 left-0 rounded-full"></div>
      <div className="ball z-[9999999999999999] bg-white w-6 h-6 fixed top-0 left-0 rounded-full"></div>
      <div className="ball z-[9999999999999999] bg-white w-6 h-6 fixed top-0 left-0 rounded-full"></div>
      <div className="ball z-[9999999999999999] bg-white w-6 h-6 fixed top-0 left-0 rounded-full"></div>
    </div>
  );
};

export default Cursor;
