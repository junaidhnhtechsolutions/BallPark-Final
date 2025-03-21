import React from 'react'
import ProductSlider from './ProductSlider'

const brandedLayouts = [
    {
        id: 1,
        title: "BRANDED PYRAMID",
        image: "/assets/navigating-park/pick-event-element/pick-one.png", 
        cost: "£10,000",
        capacity: "6m x 1m",
    },
    {
        id: 2,
        title: "BRANDED DO BOOTH",
        image: "/assets/navigating-park/pick-event-element/pick-two.png", 
        cost: "£8,500",
        capacity: "3m x 1m",
    },
    {
        id: 3,
        title: "BRANDED PODIUM",
        image: "/assets/navigating-park/pick-event-element/pick-three.png", 
        cost: "£8,000",
        capacity: "6m x 1m",
    },
    {
        id: 4,
        title: "BRANDED STEP AND REPEAT",
        image: "/assets/navigating-park/pick-event-element/pick-four.png", 
        cost: "£4,000",
        capacity: "6m x 1m",
    },
    {
        id: 5,
        title: "BRANDED DO BOOTH",
        image: "/assets/navigating-park/pick-event-element/pick-two.png", 
        cost: "£8,500",
        capacity: "3m x 1m",
    },
    {
        id: 6,
        title: "BRANDED PODIUM",
        image: "/assets/navigating-park/pick-event-element/pick-three.png", 
        cost: "£8,000",
        capacity: "6m x 1m",
    },
];

const PickEventElement = () => {
    return (
        <>
            <ProductSlider data={brandedLayouts} heading={'PICK EVENT ELEMENTS'} />
        </>
    )
}

export default PickEventElement
