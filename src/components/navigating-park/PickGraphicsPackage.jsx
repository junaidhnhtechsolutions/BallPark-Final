import React from 'react'
import ProductSlider from './ProductSlider'

const printItems = [
    {
        id: 1,
        title: "A3 MAGAZINE PRINT",
        image: "",
        cost: "£5400",
        capacity: "Magazine print x 100, 150 pages",
    },
    {
        id: 2,
        title: "HIGH QUALITY FRAMED A1 PRINT",
        image: "",
        cost: "£90",
        capacity: "Printed 5mm Foamex tagna",
    },
    {
        id: 3,
        title: "PRINTED FOAMEX",
        image: "",
        cost: "£250",
        capacity: "50 printed menus A5 on nice card",
    },
    {
        id: 4,
        title: "PRINTED FLYERS",
        image: "",
        cost: "£400",
        capacity: "Gloss flyer x 500",
    },
    {
        id: 5,
        title: "A3 MAGAZINE PRINT",
        image: "",
        cost: "£5400",
        capacity: "Magazine print x 100, 150 pages",
    },
    {
        id: 6,
        title: "HIGH QUALITY FRAMED A1 PRINT",
        image: "",
        cost: "£90",
        capacity: "Printed 5mm Foamex tagna",
    },
];

const PickGraphicsPackage = () => {
    return (
        <>
            <ProductSlider data={printItems} heading={'PICK GRAPHICS PACKAGE'} />
        </>
    )
}

export default PickGraphicsPackage
