

const Section2 = () => {

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)]">
      <div className="container mx-auto px-4 py-16 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">
            BUT HOW WILL THIS<br />WORK?
          </h1>
          <p className="text-[20px] mt-5 font-semibold text-white max-w-2xl mx-auto">
            This not only provides a baseline understanding of costs but also <br />
            allows you to connect directly with suppliers that match your <br /> budget.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white"></div>
          <div className="space-y-32 relative">
            <div className="timeline-item flex items-center justify-center relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-5">
                <img src="/assets/section-two-ball.png" className="w-24 h-20" alt="Bubble" />
              </div>
              <div className="w-1/2 pl-16 ml-auto">
                <p className="text-[20px] font-semibold text-white">
                  Our website functions as a shopping list for ballpark costs, allowing you to effortlessly "add to project" everything from venues and trade booths to floral arches. Plus, our one-of-a-kind AI can generate baseline cost estimates for your own drawings.
                </p>
              </div>
            </div>
            <div className="timeline-item flex items-center justify-center relative">
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <img src="/assets/section-two-ball.png" className="w-24 h-20" alt="Bubble" />
              </div>
              <div className="w-1/2 pl-16 ml-auto">
                <p className="text-[20px] mt-5 font-semibold text-white">
                  Once you have this ballpark cost for your event, you can use it as a foundation to refine your design, incorporating bespoke finishes while keeping your baseline budget in mind.
                </p>
              </div>
            </div>
            <div className="timeline-item flex items-center justify-center relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-5">
                <img src="/assets/section-two-ball.png" className="w-24 h-20" alt="Bubble" />
              </div>
              <div className="w-1/2 pl-16 ml-auto">
                <p className="text-[20px] mt-5 font-semibold text-white">
                  Once you've completed this step, go to your Ballpark Quote and click "Email Suppliers." This will send a blanket email from you to all the suppliers you've added to your project, including details of what you're interested in. They will then respond, allowing you to update them with any bespoke changes you've made so they can quickly provide a revised quote—ready for you to book and move forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;