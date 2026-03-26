"use client";

import React, { useState, useEffect } from "react";
import Box from "./Box";
import { Info, MousePointerClick, ArrowRight, ArrowDown, Lock } from "lucide-react";

// Mini Grid component for demonstrating the rules
const DemoGrid = ({ values, activeIndex, highlightIndices }: { values: number[], activeIndex?: number, highlightIndices?: number[] }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            {values.map((val, idx) => {
                const isHighlight = highlightIndices?.includes(idx);
                const isClicked = activeIndex === idx;
                
                return (
                    <div key={idx} className="relative">
                        <div className={`transform transition-all duration-300 ${isHighlight ? 'scale-105' : 'scale-100'}`}>
                           <Box value={val} onClick={() => {}} />
                        </div>
                        {isClicked && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none animate-bounce">
                                <MousePointerClick className="w-8 h-8 text-black opacity-70" />
                            </div>
                        )}
                        {isHighlight && !isClicked && val >= 15 && (
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                <Lock className="w-8 h-8 text-white opacity-80" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default function Rules() {
    // Animation states
    const [step1State, setStep1State] = useState([0, 0, 0]);
    const [step1Active, setStep1Active] = useState(-1);

    const [step2State, setStep2State] = useState([2, 0, 0]);
    const [step2Active, setStep2Active] = useState(-1);
    const [step2Highlight, setStep2Highlight] = useState<number[]>([]);

    const [step3State, setStep3State] = useState([4, 0, 0, 0]);
    const [step3Active, setStep3Active] = useState(-1);
    const [step3Highlight, setStep3Highlight] = useState<number[]>([]);
    
    const [step4State, setStep4State] = useState([14, 0]);
    const [step4Active, setStep4Active] = useState(-1);
    const [step4Highlight, setStep4Highlight] = useState<number[]>([]);

    // Rule 1 Animation (Click to increment)
    useEffect(() => {
        const interval = setInterval(() => {
            setStep1Active(1);
            setTimeout(() => {
                setStep1State(prev => {
                    const next = [...prev];
                    next[1] = (next[1] + 1) % 4;
                    return next;
                });
                setStep1Active(-1);
            }, 300);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    // Rule 2 Animation (Divisible by 3 -> Right neighbor decrements)
    useEffect(() => {
        const interval = setInterval(() => {
            setStep2State([2, 2, 0]);
            setStep2Active(-1);
            setStep2Highlight([]);
            
            setTimeout(() => {
                setStep2Active(0); // Click first box
                setTimeout(() => {
                    setStep2State([3, 2, 0]); // Turns 3
                    setStep2Active(-1);
                    setStep2Highlight([0]);
                    
                    setTimeout(() => {
                        setStep2State([3, 1, 0]); // Right neighbor decrements
                        setStep2Highlight([0, 1]);
                    }, 400);
                }, 300);
            }, 500);
            
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Rule 3 Animation (Divisible by 5 -> Bottom neighbor increments by 2)
    useEffect(() => {
        const interval = setInterval(() => {
            setStep3State([4, 0, 0, 0]); // 2x2 grid, top left is index 0
            setStep3Active(-1);
            setStep3Highlight([]);
            
            setTimeout(() => {
                setStep3Active(0); // Click first box
                setTimeout(() => {
                    setStep3State([5, 0, 0, 0]); // Turns 5
                    setStep3Active(-1);
                    setStep3Highlight([0]);
                    
                    setTimeout(() => {
                        setStep3State([5, 0, 2, 0]); // Bottom neighbor (index 2) increments by 2
                        setStep3Highlight([0, 2]);
                    }, 400);
                }, 300);
            }, 500);
            
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Rule 4 Animation (Locking >= 15)
    useEffect(() => {
        const interval = setInterval(() => {
            setStep4State([14, 0]);
            setStep4Active(-1);
            setStep4Highlight([]);
            
            setTimeout(() => {
                setStep4Active(0); // Click box
                setTimeout(() => {
                    setStep4State([15, 0]); // Reaches 15 -> LOCKED
                    setStep4Active(-1);
                    setStep4Highlight([0]);
                    
                    setTimeout(() => {
                        // Attempt to click locked box
                        setStep4Active(0);
                        setTimeout(() => {
                            setStep4Active(-1); // Nothing happens
                        }, 300);
                    }, 1000);
                }, 300);
            }, 500);
            
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto mt-16 p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-8 text-gray-800">
                <Info className="w-8 h-8 text-blue-600" />
                How to Play
            </h2>

            <div className="space-y-12">
                {/* Rule 1 */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-6 rounded-2xl">
                    <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                            Interaction
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every box starts at zero. Clicking a box increments its value by exactly <strong>1</strong>. 
                            Depending on the new value, ripple effects might occur!
                        </p>
                    </div>
                    <div className="w-full md:w-auto shrink-0 flex justify-center [transform:scale(0.6)] origin-center">
                        <DemoGrid values={step1State} activeIndex={step1Active} />
                    </div>
                </div>

                {/* Rule 2 */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-6 rounded-2xl">
                    <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                            Rule A: The "Three" Ripple
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            When a box's new value becomes <strong>divisible by 3</strong> (e.g., 3, 6, 9), it triggers a ripple! <span className="inline-flex items-center text-red-500 font-medium whitespace-nowrap"><ArrowRight className="w-4 h-4 mx-1"/> its Right Neighbor decrements by 1</span>.
                            <br/><span className="text-sm italic text-gray-500 mt-2 block">* This doesn't happen if the box is in the last column.</span>
                        </p>
                    </div>
                    <div className="w-full md:w-auto shrink-0 flex justify-center [transform:scale(0.6)] origin-center">
                        <DemoGrid values={step2State} activeIndex={step2Active} highlightIndices={step2Highlight} />
                    </div>
                </div>

                {/* Rule 3 */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-6 rounded-2xl">
                    <div className="flex-1 space-y-3">
                         <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                            Rule B: The "Five" Ripple
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            When a box's new value becomes <strong>divisible by 5</strong> (e.g., 5, 10), it triggers another ripple! <span className="inline-flex items-center text-emerald-600 font-medium whitespace-nowrap"><ArrowDown className="w-4 h-4 mx-1"/> its Bottom Neighbor increments by 2</span>.
                            <br/><span className="text-sm italic text-gray-500 mt-2 block">* This doesn't happen if the box is in the bottom row.</span>
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 [transform:scale(0.6)] origin-center shrink-0 w-max mx-auto md:mx-0">
                        {step3State.map((val, idx) => {
                             const isHighlight = step3Highlight.includes(idx);
                             const isClicked = step3Active === idx;
                             return (
                                 <div key={idx} className="relative">
                                     <div className={`transform transition-all duration-300 ${isHighlight ? 'scale-105' : 'scale-100'}`}>
                                        <Box value={val} onClick={() => {}} />
                                     </div>
                                      {isClicked && (
                                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none animate-bounce">
                                             <MousePointerClick className="w-8 h-8 text-black opacity-70" />
                                         </div>
                                     )}
                                 </div>
                             );
                        })}
                    </div>
                </div>

                {/* Rule 4 */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-6 rounded-2xl">
                     <div className="flex-1 space-y-3">
                         <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                            The Locking Mechanism
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            If any box reaches a value of <strong>15 or higher</strong>, it becomes permanently <strong className="text-red-500">LOCKED</strong>.
                            A locked box turns red, can no longer be clicked, and completely ignores any incoming ripple effects from its neighbors.
                        </p>
                    </div>
                    <div className="w-full md:w-auto shrink-0 flex justify-center [transform:scale(0.6)] origin-center">
                        <DemoGrid values={step4State} activeIndex={step4Active} highlightIndices={step4Highlight} />
                    </div>
                </div>
            </div>
        </div>
    );
}
