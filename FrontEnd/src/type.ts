export interface StudentItem {
  id: number;
  name: string;
  surname: string;
  studentID: string;
  image: string[];
  department: string;
  advisor: AdviserItem;
}

export interface AdviserItem {
  id: number;
  advisorID: string;
  name: string;
  surname: string;
  position: string;
  image: string[];
  department: string;
  studentList: StudentItem[];
  student: StudentData;
}

export interface StudentData {
  id: number;
  name: string;
  surname: string;
  studentID: string;
  image: string[];
  department: string;
}