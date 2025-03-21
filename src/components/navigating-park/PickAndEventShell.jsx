import React from 'react'
import ProductSlider from './ProductSlider'

const brandedLayouts = [
    {
        id: 1,
        title: "BRANDED COFFEE SHOP LAYOUT",
        image: "/assets/navigating-park/pick-event-shell/pick-one.png",
        cost: "£10,000",
        capacity: "5m x 3m",
    },
    {
        id: 2,
        title: "BRANDED DJ STAGE LAYOUT",
        image: "/assets/navigating-park/pick-event-shell/pick-two.png",
        cost: "£16,000",
        capacity: "5m x 5m",
    },
    {
        id: 3,
        title: "BRANDED POP UP LAYOUT",
        image: "/assets/navigating-park/pick-event-shell/pick-three.png",
        cost: "£20,000",
        capacity: "5m x 3m",
    },
    {
        id: 4,
        title: "BRANDED POP UP LAYOUT",
        image: "/assets/navigating-park/pick-event-shell/pick-four.png",
        cost: "£15,000",
        capacity: "6m x 3m",
    },
    {
        id: 5,
        title: "BRANDED COFFEE SHOP LAYOUT",
        image: "/assets/navigating-park/pick-event-shell/pick-one.png",
        cost: "£10,000",
        capacity: "5m x 3m",
    },
    {
        id: 6,
        title: "BRANDED DJ STAGE LAYOUT",
        image: "/assets/navigating-park/pick-event-shell/pick-two.png",
        cost: "£16,000",
        capacity: "5m x 5m",
    },
];

const PickAndEventShell = () => {
    return (
        <>
            <ProductSlider data={brandedLayouts} heading={'PICK AN EVENT SHELL'} />
        </>
    )
}

export default PickAndEventShell
