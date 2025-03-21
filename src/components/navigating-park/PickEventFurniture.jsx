import React from 'react'
import ProductSlider from './ProductSlider'

const hireItems = [
    {
        id: 1,
        title: "BLACK LEATHER BARSTOOL",
        image: "/assets/navigating-park/pick-event-furniture/pick-one.png",
        cost: "£30/day",
        capacity: 400, 
    },
    {
        id: 2,
        title: "WOODEN STOOL",
        image: "/assets/navigating-park/pick-event-furniture/pick-two.png",
        cost: "£25/day",
        capacity: 400, 
    },
    {
        id: 3,
        title: "WI-ITE PLASTIC CHAIR",
        image: "/assets/navigating-park/pick-event-furniture/pick-three.png",
        cost: "£15/day",
        capacity: 250, 
    },
    {
        id: 4,
        title: "EXALTY",
        image: "/assets/navigating-park/pick-event-furniture/pick-four.png",
        cost: "£10/day",
        capacity: 400, 
    },
    {
        id: 5,
        title: "BLACK LEATHER BARSTOOL",
        image: "/assets/navigating-park/pick-event-furniture/pick-five.png",
        cost: "£30/day",
        capacity: 400, 
    },
    {
        id: 6,
        title: "WOODEN STOOL",
        image: "/assets/navigating-park/pick-event-furniture/pick-six.png",
        cost: "£25/day",
        capacity: 400, 
    },
];

const PickEventFurniture = () => {
    return (
        <>
            <ProductSlider data={hireItems} heading={'PICK EVENT FURNITURE'} />
        </>
    )
}

export default PickEventFurniture
