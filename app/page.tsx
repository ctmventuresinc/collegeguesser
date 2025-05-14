"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { GameManager, GameState } from "./utils/gameLogic";
import { Student, School } from "./data/students";
import InstructionsOverlay from "./components/InstructionsOverlay";
import LevelUpNotification from "./components/LevelUpNotification";

export default function Home() {
  const [gameManager] = useState<GameManager>(() => new GameManager());
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentStudent: null,
    score: 0,
    totalPlayed: 0,
    consecutiveCorrect: 0,
    difficulty: 1,
    showInstructions: true,
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [previousDifficulty, setPreviousDifficulty] = useState(1);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

  useEffect(() => {
    // Start first round on component mount
    const student = gameManager.startNewRound();
    setCurrentStudent(student);
    setGameState(gameManager.getGameState());
    setPreviousDifficulty(gameManager.getGameState().difficulty);
  }, [gameManager]);

  // Check if difficulty has increased
  useEffect(() => {
    if (gameState.difficulty > previousDifficulty) {
      // Show level up notification
      setShowLevelUp(true);
      setPreviousDifficulty(gameState.difficulty);
    }
  }, [gameState.difficulty, previousDifficulty]);

  // Update progress bar width based on photo card width
  useEffect(() => {
    const updateWidth = () => {
      if (photoCardRef.current) {
        setProgressBarWidth(photoCardRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [currentStudent]);

  const handleInstructionsDismiss = () => {
    gameManager.dismissInstructions();
    setShowInstructions(false);
    setGameState(gameManager.getGameState());
  };

  const handleLevelUpDismiss = () => {
    setShowLevelUp(false);
  };

  const handleSchoolSelection = (selectedSchool: School) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const isCorrect = gameManager.checkAnswer(selectedSchool);

    // Show feedback
    setFeedback(isCorrect ? "Correct!" : "Wrong!");

    // Update game state
    setGameState(gameManager.getGameState());

    // Wait and start new round
    setTimeout(() => {
      const nextStudent = gameManager.startNewRound();
      setCurrentStudent(nextStudent);
      setFeedback(null);
      setIsAnimating(false);
    }, 1000);
  };

  // Create segment markers for the progress bar
  const renderSegmentMarkers = () => {
    const markers = [];
    for (let i = 1; i <= 5; i++) {
      markers.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${i * 20}%`,
            top: "0",
            height: "100%",
            width: "4px",
            backgroundColor:
              i <= gameState.consecutiveCorrect ? "#333" : "#ddd",
            zIndex: 2,
          }}
        />
      );
    }
    return markers;
  };

  // Calculate progress percentage based on consecutive correct answers
  const getStreakProgressWidth = () => {
    return `${gameState.consecutiveCorrect * 20}%`;
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
        color: "#000",
        overflow: "hidden",
        padding: "50px 0 200px 0",
      }}
    >
      {/* Instructions Overlay */}
      <InstructionsOverlay
        isVisible={showInstructions}
        onClose={handleInstructionsDismiss}
      />

      {/* Level Up Notification */}
      <LevelUpNotification
        show={showLevelUp}
        level={gameState.difficulty}
        onDismiss={handleLevelUpDismiss}
      />

      {/* Element 1: Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0",
        }}
      >
        <h1
          style={{
            fontSize: "54px",
            fontWeight: 700,
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
            margin: 0,
            color: "#000",
            letterSpacing: "-1px",
            display: "inline-block",
            cursor: "pointer",
          }}
        >
          WhichHU.com
        </h1>

        {/* Progress Bar Section - Below title */}
        <div
          style={{
            width: "80%",
            maxWidth: "500px",
            marginTop: "20px",
            marginBottom: "15px",
            position: "relative",
            padding: "5px 0",
          }}
        >
          {/* Main Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "35px",
              backgroundColor: "#e0e0e0",
              borderRadius: "17px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Level Indicator (centered in progress bar) */}
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
                zIndex: 3,
                position: "relative",
                textShadow: "0px 0px 3px rgba(255,255,255,0.8)",
              }}
            >
              Level {gameState.difficulty}
            </div>

            {/* Streak Progress Fill */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
                width: getStreakProgressWidth(),
                backgroundColor: "#4285F4",
                borderRadius: "17px 0 0 17px",
                transition: "width 0.3s ease-in-out",
                zIndex: 0,
              }}
            />

            {/* Segment Markers */}
            {renderSegmentMarkers()}
          </div>
        </div>
      </div>

      {/* Element 2: Student Photo - Will fill available space */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px 0",
        }}
      >
        {currentStudent && (
          <div
            style={{
              position: "relative",
              width: "auto",
              height: "100%",
              maxWidth: "calc(100vw - 90px)",
              maxHeight: "90%",
              aspectRatio: "200/259",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
              overflow: "hidden",
            }}
          >
            <Image
              src={currentStudent.imageUrl}
              alt="Student"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 30%",
              }}
              width={200}
              height={259}
              priority
            />
            {feedback && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    feedback === "Correct!"
                      ? "rgba(0, 128, 0, 0.5)"
                      : "rgba(255, 0, 0, 0.5)",
                  color: "white",
                  fontSize: "min(48px, 8vh)",
                  fontWeight: "bold",
                  zIndex: 10,
                }}
              >
                {feedback}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Element 3: Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          width: "100%",
          padding: "10px 20px 0 20px",
          backgroundColor: "transparent",
        }}
      >
        <button
          onClick={() => handleSchoolSelection(School.HOWARD)}
          disabled={isAnimating}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "min(20px, 3vh)",
            width: "40%",
            height: "min(80px, 10vh)",
            fontSize: "clamp(12px, 6vw, 32px)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#8B0000",
            border: "none",
            borderRadius: "12px",
            cursor: isAnimating ? "default" : "pointer",
            opacity: isAnimating ? 0.7 : 1,
            minWidth: 0,
            textAlign: "center",
          }}
        >
          HOWARD
        </button>
        <button
          onClick={() => handleSchoolSelection(School.HAMPTON)}
          disabled={isAnimating}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "min(20px, 3vh)",
            width: "40%",
            height: "min(80px, 10vh)",
            fontSize: "clamp(12px, 6vw, 32px)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#00008B",
            border: "none",
            borderRadius: "12px",
            cursor: isAnimating ? "default" : "pointer",
            opacity: isAnimating ? 0.7 : 1,
            minWidth: 0,
            textAlign: "center",
          }}
        >
          HAMPTON
        </button>
      </div>
    </div>
  );
}
