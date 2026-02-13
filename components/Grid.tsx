"use client";

import React, { useState } from "react";
import Box from "./Box";

const Grid = () => {
    // Initialize with 0s as per requirement "Every box starts with the number 0"
    const [values, setValues] = useState<number[]>(Array(9).fill(0));

    const handleBoxClick = (index: number) => {
        setValues((prev) => {
            // 1. Check if the clicked box is already locked
            if (prev[index] >= 15) return prev;

            const newValues = [...prev];

            // 2. Increment the clicked box
            newValues[index] += 1;
            const newValue = newValues[index];

            // 3. Ripple Rules

            // Rule A: Divisible by 3 -> Decrement neighbor to the RIGHT
            // Condition: If box's new number is divisible by 3
            // Constraint: specific to column (not last column)
            // Constraint: Neighbor must not be locked
            if (newValue % 3 === 0) {
                const isLastColumn = (index + 1) % 3 === 0;
                if (!isLastColumn) {
                    const rightNeighborIndex = index + 1;
                    if (newValues[rightNeighborIndex] < 15) {
                        newValues[rightNeighborIndex] -= 1;
                    }
                }
            }

            // Rule B: Divisible by 5 -> Increment neighbor BELOW
            // Condition: If box's new number is divisible by 5
            // Constraint: specific to row (not bottom row)
            // Constraint: Neighbor must not be locked
            if (newValue % 5 === 0) {
                const isBottomRow = index >= 6;
                if (!isBottomRow) {
                    const bottomNeighborIndex = index + 3;
                    if (newValues[bottomNeighborIndex] < 15) {
                        newValues[bottomNeighborIndex] += 2;
                    }
                }
            }

            return newValues;
        });
    };

    return (
        <div className="grid grid-cols-3 gap-6 p-6 bg-gray-100 rounded-2xl border border-gray-300 shadow-xl">
            {values.map((val, idx) => (
                <Box
                    key={idx}
                    value={val}
                    onClick={() => handleBoxClick(idx)}
                />
            ))}
        </div>
    );
};

export default Grid;
