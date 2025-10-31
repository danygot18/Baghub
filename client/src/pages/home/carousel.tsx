import React, { useState, useEffect } from "react";

interface CarouselProps {
    images: string[];
    autoSlideInterval?: number;
}

const Carousel = ({ images, autoSlideInterval = 3000}: CarouselProps) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [images.length, autoSlideInterval]);

    return (
        <div className="relative w-full max-w-7xl max-h-full h-full mx-auto overflow-hidden rounded-2xl">

            <div
                className="flex transition-transform ease-out duration-700 mb-10"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="w-full h-64 flex-shrink-0 flex items-center justify-center"
                    >
                        <img
                            src={img}
                            alt={`Slide ${i}`}
                            className="w-full h-full object-contain"
                        />

                    </div>

                ))}

            </div>
            <div className="">
                <hr className="" />
            </div>
            <div className="absolute bottom-3 flex justify-center w-full gap-2">

                {images.map((_, i) => (

                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all ${current === i ? "bg-black" : "bg-gray-400/60"
                            }`}
                    />
                ))}
            </div>

        </div>

    );
};

export default Carousel;
