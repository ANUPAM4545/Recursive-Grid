# The Recursive Grid

The Recursive Grid is an interactive frontend application built to demonstrate state management, complex logic propagation, and modern CSS animations using **Next.js** and **Tailwind CSS**.

The project features a 3x3 grid of interactive boxes where user actions trigger recursive ripple effects based on specific mathematical rules.

## 🎮 Game Rules

The grid consists of 9 boxes, indexed 0-8 (left-to-right, top-to-bottom). All boxes start at **0**.

### 1. Interaction
- Clicking a box increments its value by **1** (unless locked).

### 2. Ripple Effects
When a box's value changes, it may trigger changes in its neighbors:

- **Rule A (Divisible by 3)**:
    - If a box's new value is **divisible by 3** (e.g., 3, 6, 9...), its **Right Neighbor** decrements by **1**.
    - *Constraint*: Does not apply if the box is in the last column.
    - *Constraint*: Does not affect locked neighbors.

- **Rule B (Divisible by 5)**:
    - If a box's new value is **divisible by 5** (e.g., 5, 10...), its **Bottom Neighbor** increments by **2**.
    - *Constraint*: Does not apply if the box is in the bottom row.
    - *Constraint*: Does not affect locked neighbors.

### 3. Locking Mechanism
- If any box reaches a value of **15** (or higher), it becomes **LOCKED**.
- **Locked State**:
    - Turns **Red**.
    - Cannot be clicked.
    - Cannot be modified by neighbors.
    - Halts any ripple effects passing through it.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript
- **State Management**: React `useState` (Centralized Logic in `Grid.tsx`)

## 🎨 Visual Design

The UI is designed for clarity and responsiveness:
- **Even Numbers**: Light Gray (`#e0e0e0`)
- **Odd Numbers**: Navy Blue (`#1a237e`)
- **Locked**: Red (`#f44336`)
- **Animations**:
    - Smooth `pop` animation on value update.
    - Hover lift and tap scale-down effects.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `components/Grid.tsx`: Contains the core game logic, ripple rules, and state management.
- `components/Box.tsx`: accessible UI component for individual grid items.
- `app/globals.css`: Global styles and Tailwind v4 configuration.

## ☁️ Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
