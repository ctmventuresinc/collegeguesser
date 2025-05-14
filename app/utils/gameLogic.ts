import {
  Student,
  getAllStudents,
  getStudentsBySchool,
  School,
} from "../data/students";

export interface GameState {
  currentStudent: Student | null;
  score: number;
  totalPlayed: number;
}

export class GameManager {
  private howardStudents: Student[];
  private hamptonStudents: Student[];
  private gameState: GameState;

  constructor() {
    this.howardStudents = getStudentsBySchool(School.HOWARD);
    this.hamptonStudents = getStudentsBySchool(School.HAMPTON);
    this.gameState = {
      currentStudent: null,
      score: 0,
      totalPlayed: 0,
    };
  }

  public startNewRound(): Student {
    // First randomly select a school (50/50 chance)
    const randomSchool = Math.random() < 0.5 ? School.HOWARD : School.HAMPTON;

    // Then randomly select a student from that school
    const studentsFromSchool =
      randomSchool === School.HOWARD
        ? this.howardStudents
        : this.hamptonStudents;
    const randomIndex = Math.floor(Math.random() * studentsFromSchool.length);

    this.gameState.currentStudent = studentsFromSchool[randomIndex];
    return this.gameState.currentStudent;
  }

  public checkAnswer(selectedSchool: School): boolean {
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
