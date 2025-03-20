function NewSectionTwo() {
    return (
        <section className="relative h-screen w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center overflow-hidden">
            <div className="absolute top-[6%] left-[45%]">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
            </div>

            <div className="absolute top-[20%] left-[10%]">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
            </div>

            <div className="absolute top-[20%] right-[16%]">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
            </div>

            <div className="absolute bottom-[15%] left-[30%]">
                <img
                    src="/assets/section-two-ball.png"
                    className="w-20"
                    alt="Bubble"
                />
            </div>

            <div className="flex justify-center z-10">
                <img src="/assets/section-two-text.png" className="w-8/12" alt="" />
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