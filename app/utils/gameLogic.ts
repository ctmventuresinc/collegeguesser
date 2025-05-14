import { Student, getAllStudents } from "../data/students";

export interface GameState {
  currentStudent: Student | null;
  score: number;
  totalPlayed: number;
}

export class GameManager {
  private students: Student[];
  private gameState: GameState;

  constructor() {
    this.students = getAllStudents();
    this.gameState = {
      currentStudent: null,
      score: 0,
      totalPlayed: 0,
    };
  }

  public startNewRound(): Student {
    const randomIndex = Math.floor(Math.random() * this.students.length);
    this.gameState.currentStudent = this.students[randomIndex];
    return this.gameState.currentStudent;
  }

  public checkAnswer(selectedSchool: "Howard" | "Hampton"): boolean {
    if (!this.gameState.currentStudent) {
      throw new Error("No active round in progress");
    }

    const isCorrect = this.gameState.currentStudent.school === selectedSchool;

    this.gameState.totalPlayed++;
    if (isCorrect) {
      this.gameState.score++;
    }

    return isCorrect;
  }

  public getGameState(): GameState {
    return { ...this.gameState };
  }
}
