import VenueSlider from "./slider/venueSlider"

export default function HomeSliderSection() {

    const venueSlides = [
        {
            id: 1,
            title: "PICK A VENUE",
            description: "If you're still searching for a venue, you can browse our curated list, each with a clearly listed hire fee per day. Once you've found the perfect venue, simply click ‘Add to Project’ to include it in your ballpark cost",
            image: "/assets/section-slider-one.jpg",
        },
        {
            id: 2,
            title: "PICK A VENUE",
            description: "If you're still searching for a venue, you can browse our curated list, each with a clearly listed hire fee per day. Once you've found the perfect venue, simply click ‘Add to Project’ to include it in your ballpark cost",
            image: "/assets/section-slider-one.jpg",
        },
        {
            id: 3,
            title: "PICK A VENUE",
            description: "If you're still searching for a venue, you can browse our curated list, each with a clearly listed hire fee per day. Once you've found the perfect venue, simply click ‘Add to Project’ to include it in your ballpark cost",
            image: "/assets/section-slider-one.jpg",
        },
        {
            id: 4,
            title: "PICK A VENUE",
            description: "If you're still searching for a venue, you can browse our curated list, each with a clearly listed hire fee per day. Once you've found the perfect venue, simply click ‘Add to Project’ to include it in your ballpark cost",
            image: "/assets/section-slider-one.jpg",
        },
    ]

    return (
        <main>
            <VenueSlider
                slides={venueSlides}
            />
        </main>
    )
}

