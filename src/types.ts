export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  defaultCode: string;
  solutionCode: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "4 giờ"
  objectives: {
    knowledge: string[];
    skills: string[];
    autonomy: string[];
  };
  intro: string;
  exercises: Exercise[];
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessons: Lesson[];
  hasCodePlayground?: boolean;
}

export interface StudentProgress {
  completedLessons: string[]; // List of completed lesson IDs
  completedExercises: string[]; // List of completed exercise IDs
  savedCode: { [exerciseId: string]: string }; // Custom code saved by the student
}
