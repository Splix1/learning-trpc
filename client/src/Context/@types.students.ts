export interface Student {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  gpa: number;
  campusId?: number;
}

export const initialStudentState = {
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  gpa: 0,
};

export type StudentContextType = {
  students: Student[];
  addStudent: (student: Student) => void;
  removeStudent: (id: number) => void;
};
