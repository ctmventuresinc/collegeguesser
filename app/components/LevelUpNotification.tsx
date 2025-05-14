import React, { useEffect, useState } from "react";

interface LevelUpNotificationProps {
  show: boolean;
  level: number;
  onDismiss: () => void;
}

const LevelUpNotification: React.FC<LevelUpNotificationProps> = ({
  show,
  level,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto dismiss after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 500); // Call onDismiss after fade-out animation completes
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  return (
    <>
      {show && (
        <div
          className={`level-up-notification ${
            isVisible ? "visible" : "hidden"
          }`}
        >
          <h2 className="title">LEVEL UP!</h2>
          <p className="subtitle">Difficulty increased to Level {level}</p>
        </div>
      )}

      <style jsx>{`
        .level-up-notification {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 30px 60px;
          border-radius: 15px;
          z-index: 1000;
          text-align: center;
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.3s ease;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .level-up-notification.visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .level-up-notification.hidden {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9);
        }

        .title {
          margin: 0 0 15px 0;
          font-size: 36px;
          color: #f8f8f8;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .subtitle {
          margin: 0;
          font-size: 24px;
          color: #f0f0f0;
        }
      `}</style>
    </>
  );
};

export default LevelUpNotification;
