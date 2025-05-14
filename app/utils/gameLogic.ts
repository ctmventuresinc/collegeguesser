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
  consecutiveCorrect: number;
  difficulty: number;
  showInstructions: boolean;
}

export class GameManager {
  private howardStudents: Student[];
  private hamptonStudents: Student[];
  private gameState: GameState;
  private readonly MAX_DIFFICULTY = 3;
  private previousStudents: Student[] = [];
  private readonly MAX_PREVIOUS_STUDENTS = 10;

  constructor() {
    this.howardStudents = getStudentsBySchool(School.HOWARD);
    this.hamptonStudents = getStudentsBySchool(School.HAMPTON);
    this.gameState = {
      currentStudent: null,
      score: 0,
      totalPlayed: 0,
      consecutiveCorrect: 0,
      difficulty: 1,
      showInstructions: true,
    };
  }

  public startNewRound(): Student {
    // Bias the selection based on difficulty level
    let randomSchool: School;
    let selectedStudent: Student;

    // Keep track of shown students to avoid repetition
    const addToPreviousStudents = (student: Student) => {
      this.previousStudents.unshift(student);
      if (this.previousStudents.length > this.MAX_PREVIOUS_STUDENTS) {
        this.previousStudents.pop();
      }
    };

    if (this.gameState.difficulty === 1) {
      // Difficulty 1: 50/50 chance
      randomSchool = Math.random() < 0.5 ? School.HOWARD : School.HAMPTON;
      const studentsFromSchool =
        randomSchool === School.HOWARD
          ? this.howardStudents
          : this.hamptonStudents;

      // Random selection for level 1
      const randomIndex = Math.floor(Math.random() * studentsFromSchool.length);
      selectedStudent = studentsFromSchool[randomIndex];
    } else if (this.gameState.difficulty === 2) {
      // Difficulty 2: Select students that look more like they could be from either school
      // Implementation: Mix more from both schools but favor the opposite of recent correct answers
      const lastCorrectWasHoward =
        this.gameState.currentStudent?.school === School.HOWARD;

      // Slightly bias toward the school that wasn't just shown
      const howardBias = lastCorrectWasHoward ? 0.4 : 0.6;
      randomSchool =
        Math.random() < howardBias ? School.HOWARD : School.HAMPTON;

      const studentsFromSchool =
        randomSchool === School.HOWARD
          ? this.howardStudents
          : this.hamptonStudents;

      // Pick a random student from that school
      const randomIndex = Math.floor(Math.random() * studentsFromSchool.length);
      selectedStudent = studentsFromSchool[randomIndex];
    } else {
      // Difficulty 3: Most challenging - try to be deceptive
      // Implementation: Intentionally select students that might be confusing

      // Select a school first
      randomSchool = Math.random() < 0.5 ? School.HOWARD : School.HAMPTON;

      // Get opposite school for comparison
      const oppositeSchool =
        randomSchool === School.HOWARD ? School.HAMPTON : School.HOWARD;

      // Get all students from both schools
      const allStudents = [...this.howardStudents, ...this.hamptonStudents];

      // Avoid recently shown students
      const availableStudents = allStudents.filter(
        (student) =>
          !this.previousStudents.some(
            (prev) => prev.imageUrl === student.imageUrl
          )
      );

      // Select a student potentially more difficult to identify
      // In a real game, we would have more metadata about students to make better selections
      // For now, we'll just use a random selection with bias toward recent wrong answers

      if (Math.random() < 0.7) {
        // 70% chance to pick from the school that the player has been getting wrong
        const schoolToSelect = randomSchool;
        const studentsFromSchool =
          schoolToSelect === School.HOWARD
            ? this.howardStudents
            : this.hamptonStudents;

        const filteredStudents = studentsFromSchool.filter(
          (student) =>
            !this.previousStudents.some(
              (prev) => prev.imageUrl === student.imageUrl
            )
        );

        const randomIndex = Math.floor(
          Math.random() * (filteredStudents.length || studentsFromSchool.length)
        );

        selectedStudent = filteredStudents.length
          ? filteredStudents[randomIndex]
          : studentsFromSchool[randomIndex % studentsFromSchool.length];
      } else {
        // 30% chance to pick randomly from all available students
        const randomIndex = Math.floor(
          Math.random() * (availableStudents.length || allStudents.length)
        );

        selectedStudent = availableStudents.length
          ? availableStudents[randomIndex]
          : allStudents[randomIndex % allStudents.length];
      }
    }

    // Add to previous students for tracking
    addToPreviousStudents(selectedStudent);

    // Update game state
    this.gameState.currentStudent = selectedStudent;
    return selectedStudent;
  }

  public checkAnswer(selectedSchool: School): boolean {
    if (!this.gameState.currentStudent) {
      throw new Error("No active round in progress");
    }

    const isCorrect = this.gameState.currentStudent.school === selectedSchool;

    this.gameState.totalPlayed++;

    if (isCorrect) {
      this.gameState.score++;
      this.gameState.consecutiveCorrect++;

      // Increase difficulty when player gets 5 in a row
      if (
        this.gameState.consecutiveCorrect >= 5 &&
        this.gameState.difficulty < this.MAX_DIFFICULTY
      ) {
        this.gameState.difficulty++;
        this.gameState.consecutiveCorrect = 0; // Reset consecutive count after difficulty increase
      }
    } else {
      // Reset consecutive correct count on wrong answer
      this.gameState.consecutiveCorrect = 0;
    }

    return isCorrect;
  }

  public getGameState(): GameState {
    return { ...this.gameState };
  }

  public dismissInstructions(): void {
    this.gameState.showInstructions = false;
  }
}
