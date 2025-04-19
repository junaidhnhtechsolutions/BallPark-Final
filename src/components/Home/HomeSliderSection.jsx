import VenueSlider from "./slider/venueSlider";

export default function HomeSliderSection() {
    const venueSlides = [
        {
            image: "/assets/abc-1.jpg",
        },
        {
            image: "/assets/abc-2.jpg",
        },
        {
            image: "/assets/abc-3.jpg",
        },
        {
            image: "/assets/abc-4.jpg",
        },
        {
            image: "/assets/abc-5.jpg",
        },
        {
            image: "/assets/abc-6.jpg",
        },
    ];

    return (
        <main>
            <VenueSlider slides={venueSlides} />
        </main>
    );
}
