import React from 'react'
import ProductSlider from './ProductSlider'

const avSetups = [
    {
        id: 1,
        title: "DJ SET UP",
        image: "/assets/navigating-park/pick-av-package/pick-one.png",
        cost: "£2500 (Install)",
        capacity: "Mic, 3m x 3m screen",
    },
    {
        id: 2,
        title: "PASSENTATION PACKAGE",
        image: "/assets/navigating-park/pick-av-package/pick-two.png",
        cost: "£2500 (Install)",
        capacity: "Mic, 3m x 3m screen",
    },
    {
        id: 3,
        title: "PURPLE AMBIENCE",
        image: "/assets/navigating-park/pick-av-package/pick-three.png",
        cost: "£2500 (Install)",
        capacity: "Mic, 3m x 3m screen",
    },
    {
        id: 4,
        title: "WARM AMBIENCE",
        image: "/assets/navigating-park/pick-av-package/pick-four.png",
        cost: "£2500 (Install)",
        capacity: "Mic, 3m x 3m screen",
    },
    {
        id: 5,
        title: "DJ SET UP",
        image: "/assets/navigating-park/pick-av-package/pick-one.png",
        cost: "£2500 (Install)",
        capacity: "Mic, 3m x 3m screen",
    },
    {
        id: 6,
        title: "PURPLE AMBIENCE",
        image: "/assets/navigating-park/pick-av-package/pick-three.png",
        cost: "£2500 (Install)",
        capacity: "Mic, 3m x 3m screen",
    },
];
const PickAvPackage = () => {
    return (
        <>
            <ProductSlider data={avSetups} heading={'PICK AV PACKAGE'} />
        </>
    )
}

export default PickAvPackage
