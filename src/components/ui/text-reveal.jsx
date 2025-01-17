import {  useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "../../lib/utils";
import BoxReveal from "./box-reveal";

export const TextRevealByWord = ({ text, className, title }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto h-[50%]  my-auto flex flex-col justify-center max-w-4xl items-center  bg-transparent "
        }
      >
        <BoxReveal>
          <h1
            className="text-center text-4xl font-bold  mb-2 text-[#FF007A] 
                               p-2 rounded uppercase"
          >
            {title}
          </h1>
        </BoxReveal>
        <p
          ref={targetRef}
          className={
            "flex flex-wrap  text-sm font-bold text-[#1B2978]  p-4 rounded-md  md:text-3xl  lg:text-xl xl:text-xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {/* <div className="mx-2"> */}
                {word}
                {/* </div> */}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1">
      <span className={"absolute  opacity-30"}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-[#1B2978]"}>
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
