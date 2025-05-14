import React, { useEffect, useState } from "react";

interface InstructionsOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const InstructionsOverlay: React.FC<InstructionsOverlayProps> = ({
  isVisible,
  onClose,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      // Auto dismiss after 10 seconds
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 500); // Call onClose after fade-out animation completes
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <>
      {isVisible && (
        <div className={`chat-overlay ${show ? "visible" : "hidden"}`}>
          <div className="overlay-content">
            <h2 className="title">HOW TO PLAY</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-text">
                  Guess if the student went to Howard or Hampton
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-text">Get 5 right in a row</div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-text">
                  Difficulty goes up with each round
                </div>
              </div>
            </div>
          </div>
          <div className="footer-button-container">
            <button
              className="lets-go-button"
              onClick={() => {
                setShow(false);
                setTimeout(onClose, 500);
              }}
            >
              LET&apos;S GO
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .chat-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.92);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .chat-overlay.visible {
          opacity: 1;
        }

        .chat-overlay.hidden {
          opacity: 0;
        }

        .overlay-content {
          color: white;
          text-align: center;
          width: 90%;
          max-width: 500px;
          padding: 2.5rem;
          background-color: rgba(30, 30, 30, 0.8);
          border-radius: 16px;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 100px; /* Make more room for the larger button */
        }

        .title {
          font-size: 2.8rem;
          font-weight: bold;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #f8f8f8;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          align-items: flex-start;
        }

        .step {
          display: flex;
          align-items: center;
          text-align: left;
          width: 100%;
        }

        .step-number {
          background-color: #4169e1;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.5rem;
          margin-right: 1.5rem;
          box-shadow: 0 0 15px rgba(65, 105, 225, 0.7);
          flex-shrink: 0;
        }

        .step-text {
          font-size: 1.8rem;
          font-weight: 500;
          color: #f0f0f0;
        }

        .footer-button-container {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem;
          display: flex;
          justify-content: center;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
        }

        .lets-go-button {
          background-color: #4169e1;
          color: white;
          border: none;
          border-radius: 35px;
          padding: 1.5rem 5rem;
          font-size: 1.8rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(65, 105, 225, 0.6);
          transition: all 0.2s ease;
          min-width: 280px;
        }

        .lets-go-button:hover {
          background-color: #5379f1;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(65, 105, 225, 0.7);
        }

        .lets-go-button:active {
          transform: translateY(1px);
          box-shadow: 0 2px 8px rgba(65, 105, 225, 0.4);
        }
      `}</style>
    </>
  );
};

export default InstructionsOverlay;
