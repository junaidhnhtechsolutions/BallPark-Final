function NewSectionTwo() {
    return (
        <section className="relative min-h-[600px] w-full bg-gradient-to-b from-[#00b4d8] to-[#0096c7] flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute top-[15%] left-1/2">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
            </div>

            <div className="absolute top-[25%] left-[20%]">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
            </div>

            <div className="absolute top-[25%] right-[20%]">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
            </div>

            <div className="absolute bottom-[30%] left-[35%]">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
            </div>

            <div className="text-center z-10">
                <img src="/assets/section-two-text.png" alt="" />
            </div>

            <div className="absolute bottom-0 left-4">
                <img src="/assets/section-two-men.png" className="w-56" alt="Baseball player silhouette" />
            </div>
            <div className="absolute bottom-44 right-20">
                <p className=" text-white text-xs font-medium">
                    (Annotation - it’s like all <br />
                    these balls to be gently <br />
                    shaking. as you scroll down <br />
                    one by one they explode to <br />
                    look like the next page)
                </p>
            </div>
            <div className="absolute bottom-20 right-80">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
                <div className="absolute top-0 left-16 w-40 h-[2px] bg-white transform -rotate-12"></div>
            </div>
        </section>
    )
}

export default NewSectionTwo