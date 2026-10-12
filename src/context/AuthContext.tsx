import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AdmissionApplication, TestResult } from '../types';
import { DEMO_USERS, INITIAL_ADMISSIONS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  usersList: User[];
  login: (email: string) => { success: boolean; message?: string };
  register: (data: { name: string; email: string; role: UserRole; phone?: string; courseId?: string }) => { success: boolean; message?: string };
  logout: () => void;
  switchUser: (userId: string) => void;
  admissions: AdmissionApplication[];
  submitAdmission: (application: Omit<AdmissionApplication, 'id' | 'status' | 'appliedDate'>) => AdmissionApplication;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status']) => void;
  testResults: TestResult[];
  saveTestResult: (result: Omit<TestResult, 'id' | 'submittedAt'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'bscc_auth_user';
const STORAGE_KEY_USERS_LIST = 'bscc_users_list';
const STORAGE_KEY_ADMISSIONS = 'bscc_admissions_list';
const STORAGE_KEY_TEST_RESULTS = 'bscc_test_results';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usersList, setUsersList] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USERS_LIST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse users list from storage', e);
      }
    }
    return DEMO_USERS;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user from storage', e);
      }
    }
    // Default to student demo user to give instant authenticated preview
    return DEMO_USERS[2]; // Anjali Kumari Shah (Student)
  });

  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ADMISSIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse admissions from storage', e);
      }
    }
    return INITIAL_ADMISSIONS;
  });

  const [testResults, setTestResults] = useState<TestResult[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TEST_RESULTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse test results from storage', e);
      }
    }
    return [
      {
        id: 'res-01',
        studentId: 'user-student-1',
        studentName: 'Anjali Kumari Shah',
        testId: 'mock-cee-ioe-01',
        testTitle: 'CEE Medical Diagnostic Mock Test 03',
        score: 36,
        maxScore: 40,
        percentile: 98.4,
        submittedAt: '2026-10-01 10:45 AM',
      },
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS_LIST, JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ADMISSIONS, JSON.stringify(admissions));
  }, [admissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TEST_RESULTS, JSON.stringify(testResults));
  }, [testResults]);

  const login = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = usersList.find((u) => u.email.toLowerCase() === cleanEmail);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'No account found with this email address. Please register or select a demo profile.' };
  };

  const register = (data: { name: string; email: string; role: UserRole; phone?: string; courseId?: string }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    const exists = usersList.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      role: data.role,
      phone: data.phone || '98XXXXXXXX',
      rollNumber: data.role === 'student' ? `BSCC-${Date.now().toString().slice(-4)}` : undefined,
      batch: data.role === 'student' ? '2026 Academic Batch' : undefined,
      enrolledCourseIds: data.courseId ? [data.courseId] : ['course-cee'],
      department: data.role === 'faculty' ? 'Faculty of Science' : undefined,
      designation: data.role === 'faculty' ? 'Lecturer' : data.role === 'admin' ? 'Officer' : 'Student',
      joinDate: new Date().toISOString().split('T')[0],
    };

    setUsersList((prev) => [newUser, ...prev]);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const switchUser = (userId: string) => {
    const found = usersList.find((u) => u.id === userId);
    if (found) {
      setUser(found);
    }
  };

  const submitAdmission = (application: Omit<AdmissionApplication, 'id' | 'status' | 'appliedDate'>) => {
    const id = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: AdmissionApplication = {
      ...application,
      id,
      status: 'Under Review',
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setAdmissions((prev) => [newApp, ...prev]);
    return newApp;
  };

  const updateAdmissionStatus = (id: string, status: AdmissionApplication['status']) => {
    setAdmissions((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const saveTestResult = (result: Omit<TestResult, 'id' | 'submittedAt'>) => {
    const newResult: TestResult = {
      ...result,
      id: `res-${Date.now()}`,
      submittedAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setTestResults((prev) => [newResult, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        usersList,
        login,
        register,
        logout,
        switchUser,
        admissions,
        submitAdmission,
        updateAdmissionStatus,
        testResults,
        saveTestResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
