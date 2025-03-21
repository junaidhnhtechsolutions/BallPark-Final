import React from 'react'
import ProductSlider from './ProductSlider'


const venues = [
    {
        id: 1,
        title: "EXAMPLE VENUE 1",
        location: "LONDON",
        image: "/assets/navigating-park/pick-vanue/venue-one.png",
        cost: "£7500/Day",
        capacity: 550,
    },
    {
        id: 2,
        title: "EXAMPLE VENUE 2",
        location: "LONDON",
        image: "/assets/navigating-park/pick-vanue/venue-two.png",
        cost: "£6500/Day",
        capacity: 450,
    },
    {
        id: 3,
        title: "EXAMPLE VENUE 3",
        location: "LONDON",
        image: "/assets/navigating-park/pick-vanue/venue-three.png",
        cost: "£400/Day",
        capacity: 500,
    },
    {
        id: 4,
        title: "EXAMPLE VENUE 4",
        location: "LONDON",
        image: "/assets/navigating-park/pick-vanue/venue-four.png",
        cost: "£1200/Day",
        capacity: 500,
    },
    {
        id: 5,
        title: "EXAMPLE VENUE 5",
        location: "LONDON",
        image: "/assets/navigating-park/pick-vanue/venue-five.png",
        cost: "£800/Day",
        capacity: 1200,
    },
    {
        id: 6,
        title: "EXAMPLE VENUE 6",
        location: "LONDON",
        image: "/assets/navigating-park/pick-vanue/venue-six.png",
        cost: "£950/Day",
        capacity: 350,
    },
]


function PickAVanue() {
    return (
        <>
            <ProductSlider data={venues} heading={'PICK A VENUE'} />
        </>
    )
}


export default PickAVanue

