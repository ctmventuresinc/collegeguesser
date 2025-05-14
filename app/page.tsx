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
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "2vh 5vw 80px 5vw",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
        color: "#000",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "2vh",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "min(48px, 8vh)",
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
            fontSize: "min(24px, 4vh)",
            fontFamily: "sans-serif",
            marginTop: "1vh",
            color: "#000",
          }}
        >
          Score: {gameState.score}/{gameState.totalPlayed}
        </div>
      </div>

      {currentStudent && (
        <div
          style={{
            position: "relative",
            width: "auto",
            height: "calc(100vh - 200px)",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "60vh",
            margin: "10px auto",
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
              objectPosition: "center",
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
          maxWidth: "600px",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "15px 20px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          zIndex: 100,
        }}
      >
        <button
          onClick={() => handleSchoolSelection("Howard")}
          disabled={isAnimating}
          style={{
            padding: "min(20px, 3vh)",
            width: "50%",
            fontSize: "min(28px, 5vh)",
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
            width: "50%",
            fontSize: "min(28px, 5vh)",
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
