import React from 'react'
import ProductSlider from './ProductSlider'

const floralItems = [
    {
        id: 1,
        title: "JARS OF TABLE FLOWERS (X5)",
        image: "/assets/navigating-park/pick-floristy-elements/pick-one.png",
        cost: "£200 (Deliverable), £500 (Install)",
        capacity: "2 days turnaround", 
    },
    {
        id: 2,
        title: "FLOWER BUCKS (X6)",
        image: "/assets/navigating-park/pick-floristy-elements/pick-two.png",
        cost: "£100 (Deliverable), £450 (Install)",
        capacity: "2 days turnaround", 
    },
    {
        id: 3,
        title: "FLORAL ARCH",
        image: "/assets/navigating-park/pick-floristy-elements/pick-three.png",
        cost: "£900 (Deliverable), £450 (Install)",
        capacity: "2 days turnaround", 
    },
    {
        id: 4,
        title: "HANGING STRANDS (X20)",
        image: "/assets/navigating-park/pick-floristy-elements/pick-four.png",
        cost: "£100 (Deliverable), £450 (Install)",
        capacity: "2 days turnaround", 
    },
    {
        id: 5,
        title: "JARS OF TABLE FLOWERS (X5)",
        image: "/assets/navigating-park/pick-floristy-elements/pick-one.png",
        cost: "£200 (Deliverable), £500 (Install)",
        capacity: "2 days turnaround", 
    },
    {
        id: 6,
        title: "FLOWER BUCKS (X6)",
        image: "/assets/navigating-park/pick-floristy-elements/pick-two.png",
        cost: "£100 (Deliverable), £450 (Install)",
        capacity: "2 days turnaround", 
    },
];

const PickFloristyElements = () => {
    return (
        <>
            <ProductSlider data={floralItems} heading={'PICK FLORISTRY ELEMENTS'} />
        </>
    )
}

export default PickFloristyElements
