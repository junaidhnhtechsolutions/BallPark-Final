import Template from "../layout/template";
import BallPark from "../components/ball-park/ball-park";

const Ball = () => {
  return (
    <div className="md:h-screen h-auto overflow-auto example ">
      <Template>
        <div className="">
          <BallPark />
        </div>
      </Template>
    </div>
  );
};

export default Ball;
