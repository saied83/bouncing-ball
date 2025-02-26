import { useState, useEffect, useRef } from "react";

const App = () => {
  const [ballLaunched, setBallLaunched] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [ballPos, setBallPos] = useState({
    x: window.innerWidth / 2 - 22,
    y: window.innerHeight / 2 - 22,
  });
  const [ballVelocity, setBallVelocity] = useState({ vx: 0, vy: 0 });
  const [friction, setFriction] = useState(0.005);
  const [isBallStopped, setIsBallStopped] = useState(false);
  const [initialPos, setInitialPos] = useState({
    x: window.innerWidth / 2 - 22,
    y: window.innerHeight / 2 - 22,
  });
  const ballRef = useRef(null);
  useEffect(() => {
    // ts error eraser
    console.log(speed);
    setFriction(0.005);
  }, []);

  const initialSpeed = 30;
  const minSpeed = 0.5;
  const ballWidth = 44;
  const borderWidth = 20;

  const moveBall = () => {
    if (!ballLaunched || isBallStopped) return;

    const newPos = { ...ballPos };
    const newVelocity = { ...ballVelocity };

    // Apply friction to velocity
    newVelocity.vx *= 1 - friction;
    newVelocity.vy *= 1 - friction;

    // Update ball position based on velocity
    newPos.x += newVelocity.vx;
    newPos.y += newVelocity.vy;

    // Bounce off the canvas boundaries
    const maxX = window.innerWidth - ballWidth - borderWidth * 2;
    const maxY = window.innerHeight - ballWidth - borderWidth * 2;

    if (newPos.x <= borderWidth || newPos.x >= maxX) {
      newVelocity.vx *= -1;
      newPos.x = Math.max(borderWidth, Math.min(newPos.x, maxX));
    }
    if (newPos.y <= borderWidth || newPos.y >= maxY) {
      newVelocity.vy *= -1;
      newPos.y = Math.max(borderWidth, Math.min(newPos.y, maxY));
    }

    // Check if the ball has stopped
    const currentSpeed = Math.sqrt(newVelocity.vx ** 2 + newVelocity.vy ** 2);
    if (currentSpeed < minSpeed) {
      setIsBallStopped(true);
      setInitialPos(newPos);
      newVelocity.vx = 0;
      newVelocity.vy = 0;
    }

    // Update state
    setBallPos(newPos);
    setBallVelocity(newVelocity);
    setSpeed(currentSpeed);
  };

  const launchBall = (e: any) => {
    if (isBallStopped) {
      // Restart the ball from the last position where it stopped
      setBallPos(initialPos);
      setBallVelocity({ vx: 0, vy: 0 });
      setIsBallStopped(false);
      setSpeed(0);
    }

    const { offsetX, offsetY } = e.nativeEvent;
    const dx = offsetX - (ballPos.x + ballWidth / 2);
    const dy = offsetY - (ballPos.y + ballWidth / 2);
    const angle = Math.atan2(dy, dx);
    const velocity = initialSpeed;

    // Set ball velocity based on angle
    setBallVelocity({
      vx: velocity * Math.cos(angle),
      vy: velocity * Math.sin(angle),
    });

    setBallLaunched(true);
  };

  useEffect(() => {
    const interval = setInterval(moveBall, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, [ballPos, ballVelocity, ballLaunched]);

  return (
    <div id="canvas" onClick={launchBall}>
      <div
        id="ball"
        ref={ballRef}
        style={{
          position: "absolute",
          top: `${ballPos.y}px`,
          left: `${ballPos.x}px`,
          width: "44px",
          height: "44px",
          boxShadow: "inset 0px 0px 14px 0px rgba(0, 0, 0, 0.5)",
          backgroundSize: "46px 46px",
        }}
      ></div>
      {!ballLaunched && !isBallStopped && (
        <div id="instructions">Click to launch the ball!</div>
      )}
      {isBallStopped && (
        <div id="instructions">
          Ball stopped. Click to restart from last position!
        </div>
      )}
    </div>
  );
};

export default App;
