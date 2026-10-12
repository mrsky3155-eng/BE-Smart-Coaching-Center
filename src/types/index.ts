export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  rollNumber?: string;
  batch?: string;
  enrolledCourseIds?: string[];
  department?: string; // For faculty
  designation?: string;
  joinDate?: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'School Tuition' | 'Loksewa' | 'NEC License';
  badge: string;
  tagline: string;
  description: string;
  duration: string;
  feeNPR: number;
  seatsTotal: number;
  seatsFilled: number;
  schedule: string;
  features: string[];
  syllabusHighlights: string[];
  facultyNames: string[];
  image: string;
}

export interface MockQuestion {
  id: number;
  question: string;
  subject: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface MockTest {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  totalMarks: number;
  negativeMarking: number; // e.g. 0.25
  questions: MockQuestion[];
}

export interface TestResult {
  id: string;
  studentId: string;
  studentName: string;
  testId: string;
  testTitle: string;
  score: number;
  maxScore: number;
  percentile: number;
  submittedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Admission' | 'Exam' | 'Holiday' | 'Result' | 'Administrative';
  content: string;
  isPinned?: boolean;
  refNumber?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  courseCategory: string;
  format: 'PDF' | 'DOCX' | 'ZIP';
  fileSize: string;
  uploadDate: string;
  downloadsCount: number;
}

export interface BatchSchedule {
  id: string;
  courseTitle: string;
  shift: string;
  time: string;
  instructor: string;
  room: string;
  days: string;
  status: 'Open' | 'Filling Fast' | 'Closed';
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  guardianName: string;
  email: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  previousSchool: string;
  gpaOrScore: string;
  shiftPreference: string;
  address: string;
  status: 'Under Review' | 'Approved' | 'Scholarship Awarded' | 'Enrolled';
  appliedDate: string;
  scholarshipEligiblePercent?: number;
}


export interface PublishedGoogleForm {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'Admission' | 'Registration' | 'Feedback' | 'Exam' | 'Scholarship' | 'Other';
  publishedAt: string;
  isPublished: boolean;
}
