"use client";

import React, { useEffect, useState } from "react";

interface BoxProps {
    value: number;
    onClick: () => void;
}

const Box: React.FC<BoxProps> = ({ value, onClick }) => {
    const isLocked = value >= 15;
    const isEven = value % 2 === 0;
    const [animate, setAnimate] = useState(false);

    // Trigger pop animation on value change
    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 200);
        return () => clearTimeout(timer);
    }, [value]);

    const baseClasses =
        "w-40 h-40 flex items-center justify-center text-4xl font-bold rounded-[8px] shadow-[4px_4px_0px_black] transition-all duration-200 select-none";

    const colorClasses = isLocked
        ? "bg-[#f44336] text-white cursor-not-allowed"
        : isEven
            ? "bg-[#e0e0e0] text-gray-900 cursor-pointer"
            : "bg-[#1a237e] text-white cursor-pointer";

    // Hover and Active states only for unlocked boxes
    const interactionClasses = !isLocked
        ? "hover:-translate-y-[2px] active:scale-95 active:transition-transform active:duration-100 ease-out"
        : "";

    const animationClass = animate ? "animate-[pop_0.2s_ease-in-out]" : "";

    return (
        <div
            onClick={!isLocked ? onClick : undefined}
            className={`${baseClasses} ${colorClasses} ${interactionClasses} ${animationClass}`}
        >
            {value}
        </div>
    );
};

export default Box;
