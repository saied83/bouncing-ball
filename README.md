# Ball Bouncing App

![Ball Bouncing](https://ball-bouncing-saied83.netlify.app/preview.png)

This project is a simple ball movement simulation built using **React** and **TypeScript**. The ball moves based on user interaction and is affected by friction. It can bounce off the edges of the screen and eventually come to a stop. Clicking on the canvas launches the ball in a specific direction.

## Features

- Click to launch the ball in a given direction.
- Ball slows down due to friction.
- Bounces off the screen edges.
- Stops when speed drops below a threshold.
- Click to restart the ball from the last stopped position.

## 🚀 Live Demo

[Ball Bouncing App](https://ball-bouncing-saied83.netlify.app)

## 🛠 Tech Stack

- **React** - Component-based UI
- **Vite** - Fast build tool
- **TypeScript (TSX)** - Static typing
- **TailwindCSS** - Utility-first CSS framework
- **PNPM** - Efficient package management
- **Netlify** - Deployment platform

## 📦 Installation & Setup

# Ball Movement Simulation

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ball-simulation.git
   cd ball-simulation
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## How It Works

- The `useState` and `useEffect` hooks manage the ball's position, velocity, and speed.
- The ball moves every 16ms (~60 FPS) using `setInterval`.
- Friction is applied to gradually slow the ball down.
- The ball bounces when it hits the screen edges.
- Clicking on the canvas launches or resets the ball.

## Code Overview

- `ballPos`: Tracks the ball's x and y position.
- `ballVelocity`: Controls movement speed and direction.
- `friction`: Reduces speed over time.
- `launchBall(event)`: Handles launching the ball.
- `moveBall()`: Updates position and applies physics.

## Future Improvements

- Add different friction levels.
- Introduce obstacles or targets.
- Improve visuals with animations and better graphics.

---

Made with ❤️ by [Your Name](https://github.com/saied83)
