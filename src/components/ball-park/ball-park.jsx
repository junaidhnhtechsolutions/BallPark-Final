import Particles from "../ui/particles";

const BallPark = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#00083c] via-[#00083c] relative overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={100}
        color={"#ffffff"}
        refresh
      />
      <div className="text-center overflow-hidden  text-xl max-w-screen-2xl mx-auto w-[80%] flex flex-col justify-center items-center h-screen">
        <div className="bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 text-white p-4 rounded-md">
          <h1 className="text-6xl mb-4">
            About Ballpark <span className="text-[#E84A9B]">2.0</span>{" "}
          </h1>
          <p className="mb-4">This is where things get really interesting.</p>
          <p className="mb-4">
            Have you ever been out for a walk, spotted something inspiring, and
            thought, “I wonder how much it would cost to make that?” or “Could I
            create something like that?”
          </p>
          <p className="mb-4">
            Well, now you can. We’ve just launched our app, which lets you snap
            a photo of any object, measures its size, and attempts to identify
            the material.
          </p>
          <p className="mb-4">
            It then finds the closest matches and connects you to the materials
            you'll need to make it yourself.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BallPark;
