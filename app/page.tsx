"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GameManager, GameState } from "./utils/gameLogic";
import { Student } from "./data/students";

export default function Home() {
  const [gameManager] = useState<GameManager>(() => new GameManager());
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentStudent: null,
    score: 0,
    totalPlayed: 0,
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start first round on component mount
    const student = gameManager.startNewRound();
    setCurrentStudent(student);
    setGameState(gameManager.getGameState());
  }, [gameManager]);

  const handleSchoolSelection = (selectedSchool: "Howard" | "Hampton") => {
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
    }, 1500);
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
            fontSize: "min(20px, 3vh)",
            fontFamily: "sans-serif",
            marginTop: "0.5vh",
            color: "#000",
          }}
        >
          Score: {gameState.score}/{gameState.totalPlayed}
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
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor:
                    feedback === "Correct!"
                      ? "rgba(0, 128, 0, 0.8)"
                      : "rgba(255, 0, 0, 0.8)",
                  color: "white",
                  padding: "20px 40px",
                  borderRadius: "8px",
                  fontSize: "min(36px, 6vh)",
                  fontWeight: "bold",
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
          onClick={() => handleSchoolSelection("Howard")}
          disabled={isAnimating}
          style={{
            padding: "min(20px, 3vh)",
            width: "40%",
            height: "min(80px, 10vh)",
            fontSize: "min(24px, 4vh)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#8B0000",
            border: "none",
            borderRadius: "12px",
            cursor: isAnimating ? "default" : "pointer",
            opacity: isAnimating ? 0.7 : 1,
          }}
        >
          Howard
        </button>
        <button
          onClick={() => handleSchoolSelection("Hampton")}
          disabled={isAnimating}
          style={{
            padding: "min(20px, 3vh)",
            width: "40%",
            height: "min(80px, 10vh)",
            fontSize: "min(24px, 4vh)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#00008B",
            border: "none",
            borderRadius: "12px",
            cursor: isAnimating ? "default" : "pointer",
            opacity: isAnimating ? 0.7 : 1,
          }}
        >
          Hampton
        </button>
      </div>
    </div>
  );
}
