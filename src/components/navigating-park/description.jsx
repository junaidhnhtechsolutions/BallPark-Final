import PickAndEventShell from "./PickAndEventShell";
import PickAVanue from "./PickAVanue";
import PickAvPackage from "./PickAvPackage";
import PickEventElement from "./PickEventElement";
import PickEventFurniture from "./PickEventFurniture";
import PickFloristyElements from "./PickFloristyElements";
import PickGraphicsPackage from "./PickGraphicsPackage";

export default function NavDescription() {

  return (
    <>
      <section className="relative min-h-[600px] w-full bg-gradient-to-b from-[#00b4d8] to-[#0096c7] flex items-center justify-center p-8">
        <div className="relative mx-auto flex justify-center">
          <img src="/assets/navigating-park/navigating-park-one.png" className="w-10/12" alt="" />
        </div>
      </section>

      <section className="relative min-h-[600px] w-full bg-gradient-to-b from-[#00b4d8] to-[#0096c7] flex items-center justify-center p-8">
        <div className="relative mx-auto flex justify-center">
          <img src="/assets/navigating-park/navigating-park-two.png" className="w-10/12" alt="" />
        </div>
      </section>

      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <PickAVanue />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <PickAndEventShell />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <PickEventElement />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <PickEventFurniture />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <PickFloristyElements />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <PickAvPackage />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <PickGraphicsPackage />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/cost-drawing.png" alt="" />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/cost-drawing-one.png" alt="" />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/arrow-bottom.png" alt="" />
      </div>
      <div>
        <img className="w-full" src="/assets/navigating-park/the-ball-park.png" alt="" />
      </div>

    </>
  );
}
