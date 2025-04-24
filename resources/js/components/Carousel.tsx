import React, { useCallback, useEffect, useState } from 'react';

const Carousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [direction, setDirection] = useState(0); // 0 for initial, -1 for left, 1 for right

    const slides = [
        {
            title: 'Akko V3 Creamy Yellow Pro',
            subtitle: 'Switch Linear',
            buttonText: 'Buy Now',
            bgColor: 'bg-yellow-200',
            image: '/images/switch.png', // You'll need to add this image to your public folder
        },
        {
            title: 'PRESSPLAY ICARUS V2 ULTRALIGHT',
            subtitle: 'Take Flight',
            buttonText: 'Buy Now',
            bgColor: 'bg-purple-200',
            image: '/images/mouse.png', // You'll need to add this image to your public folder
        },
        // Add more slides as needed
    ];

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    // Auto-loop slides
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (!isHovering) {
            intervalId = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [nextSlide, isHovering]);

    // Animation class based on direction
    const getAnimationClass = (index: number) => {
        if (index === currentSlide) {
            return direction > 0 ? 'animate-slide-in-right' : direction < 0 ? 'animate-slide-in-left' : 'animate-fade-in';
        }
        return 'hidden';
    };

    // Function to split the title by words for a custom layout
    const formatTitleForDisplay = (title: string) => {
        const words = title.split('  ');
        return (
            <div className="flex flex-col">
                {words.map((word, i) => (
                    <span key={i} className="block font-serif leading-[0.95]">
                        {word}
                    </span>
                ))}
            </div>
        );
    };

    useEffect(() => {
        // Add animation keyframes when component mounts
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideInLeft {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .animate-slide-in-right {
                animation: slideInRight 0.5s ease-out forwards;
            }
            
            .animate-slide-in-left {
                animation: slideInLeft 0.5s ease-out forwards;
            }
            
            .animate-fade-in {
                animation: fadeIn 0.5s ease-out forwards;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="relative overflow-hidden rounded-xl">
                {slides.map((slide, index) => (
                    <div key={index} className={`${currentSlide === index ? getAnimationClass(index) : 'hidden'} ${slide.bgColor} rounded-xl`}>
                        <div className="px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
                            <div className="flex max-h-[400px] flex-col items-start justify-between sm:max-h-[450px] md:max-h-[500px] md:flex-row md:items-center">
                                <div className="mb-8 max-w-md md:mb-0 md:pr-8">
                                    <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
                                        {formatTitleForDisplay(slide.title)}
                                    </h1>
                                    <p className="mt-4 text-base font-medium text-black sm:text-lg">{slide.subtitle}</p>
                                    <button className="mt-6 inline-flex items-center rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800">
                                        {slide.buttonText}
                                        <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex h-full items-center justify-center">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="h-auto max-h-[200px] w-48 object-contain sm:max-h-[250px] sm:w-64 md:max-h-[600px] md:w-72 lg:w-80"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Buttons - Only visible on hover */}
                <button
                    onClick={prevSlide}
                    className={`absolute top-1/2 left-1 z-10 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-opacity duration-300 sm:left-2 sm:p-3.5 ${
                        isHovering ? 'opacity-100' : 'opacity-0'
                    } hover:opacity-100`}
                    title="Previous slide"
                >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className={`absolute top-1/2 right-1 z-10 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-opacity duration-300 sm:right-2 sm:p-3.5 ${
                        isHovering ? 'opacity-100' : 'opacity-0'
                    } hover:opacity-100`}
                    title="Next slide"
                >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > currentSlide ? 1 : -1);
                                setCurrentSlide(i);
                            }}
                            className={`h-2 w-2 rounded-full transition-all ${i === currentSlide ? 'w-4 bg-black' : 'bg-gray-400'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
