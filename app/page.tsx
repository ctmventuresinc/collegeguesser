"use client";
import { useEffect, useState } from "react";
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
            fontSize: "min(42px, 6vh)",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            margin: 0,
            color: "#000",
          }}
        >
          WhichHU.com
        </h1>
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            fontSize: "min(18px, 2.8vh)",
            fontFamily: "sans-serif",
            marginTop: "0.5vh",
            color: "#000",
          }}
        >
          <div>
            Score: {gameState.score}/{gameState.totalPlayed}
          </div>
          <div>|</div>
          <div>Streak: {gameState.consecutiveCorrect}/5</div>
          <div>|</div>
          <div>Level: {gameState.difficulty}</div>
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
            padding: "min(20px, 3vh)",
            width: "40%",
            height: "min(80px, 10vh)",
            fontSize: "min(32px, 5vh)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#8B0000",
            border: "none",
            borderRadius: "12px",
            cursor: isAnimating ? "default" : "pointer",
            opacity: isAnimating ? 0.7 : 1,
          }}
        >
          HOWARD
        </button>
        <button
          onClick={() => handleSchoolSelection(School.HAMPTON)}
          disabled={isAnimating}
          style={{
            padding: "min(20px, 3vh)",
            width: "40%",
            height: "min(80px, 10vh)",
            fontSize: "min(32px, 5vh)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#00008B",
            border: "none",
            borderRadius: "12px",
            cursor: isAnimating ? "default" : "pointer",
            opacity: isAnimating ? 0.7 : 1,
          }}
        >
          HAMPTON
        </button>
      </div>
    </div>
  );
}
