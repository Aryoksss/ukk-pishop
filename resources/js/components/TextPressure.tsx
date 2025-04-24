import { useEffect, useRef, useState } from 'react';

interface TextPressureProps {
    text: string;
    fontFamily?: string;
    fontUrl?: string;
    textColor?: string;
    hoverColor?: string;
    activeColor?: string;
    minFontSize?: number;
    maxFontSize?: number;
    weight?: boolean;
    italic?: boolean;
    className?: string;
}

export default function TextPressure({
    text,
    fontFamily = 'serif',
    fontUrl,
    textColor = '#000000',
    hoverColor = '#333333',
    activeColor = '#666666',
    minFontSize = 16,
    maxFontSize = 24,
    weight = true,
    italic = true,
    className = '',
}: TextPressureProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (fontUrl) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontUrl;
            document.head.appendChild(link);

            return () => {
                document.head.removeChild(link);
            };
        }
    }, [fontUrl]);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setIsActive(false);
    };

    const handleMouseDown = () => {
        setIsActive(true);
    };

    const handleMouseUp = () => {
        setIsActive(false);
    };

    const fontStyle = italic ? 'italic' : 'normal';
    const fontWeight = weight ? 'bold' : 'normal';
    const currentFontSize = isActive ? maxFontSize : isHovering ? (minFontSize + maxFontSize) / 2 : minFontSize;
    const currentColor = isActive ? activeColor : isHovering ? hoverColor : textColor;

    return (
        <div
            ref={containerRef}
            className={`text-pressure-container ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'inline-block',
            }}
        >
            <h1
                className="text-pressure-text"
                style={{
                    fontFamily,
                    fontSize: `${currentFontSize}px`,
                    color: currentColor,
                    fontStyle,
                    fontWeight,
                    transition: 'all 0.3s ease',
                    margin: 0,
                    padding: 0,
                }}
            >
                {text}
            </h1>
        </div>
    );
}
