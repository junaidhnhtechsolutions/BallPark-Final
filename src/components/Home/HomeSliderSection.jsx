import VenueSlider from "./slider/venueSlider";

export default function HomeSliderSection() {
    const venueSlides = [
        {
            image: "/assets/slider/abc-1.jpg",
        },
        {
            image: "/assets/slider/abc-2.jpg",
        },
        {
            image: "/assets/slider/abc-3.jpg",
        },
        {
            image: "/assets/slider/abc-4.jpg",
        },
        {
            image: "/assets/slider/abc-5.jpg",
        },
        {
            image: "/assets/slider/abc-6.jpg",
        },
        {
            image: "/assets/slider/abc-7.jpg",
        },
        {
            image: "/assets/slider/abc-8.jpg",
        },
    ];

    return (
        <main>
            <VenueSlider slides={venueSlides} />
        </main>
    );
}
