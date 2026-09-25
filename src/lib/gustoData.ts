import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export interface Employee {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contractor';
  compensation: number;
  status: 'active' | 'onboarding' | 'leave' | 'inactive';
  source?: string;
  createdAt: string;
}

export interface PayrollRun {
  id: string;
  userId: string;
  title: string;
  period: string;
  payday: string;
  submitBy: string;
  totalAmount: number;
  employeesCount: number;
  status: 'draft' | 'pending' | 'processed' | 'completed';
  directDepositDate: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CompanyBenefit {
  id: string;
  userId: string;
  title: string;
  category: string;
  provider: string;
  enrolledCount: number;
  monthlyContribution: number;
  status: string;
  createdAt: string;
}

export interface AiTaskRecord {
  id: string;
  userId: string;
  type: string;
  prompt: string;
  modelUsed: string;
  result: string;
  mediaUrl?: string;
  createdAt: string;
}

// Initial seed employees if user has none yet
export const defaultEmployees: Omit<Employee, 'userId'>[] = [
  {
    id: 'emp-1',
    name: 'Jessica Miller',
    email: 'jessica.m@acmecompany.com',
    phone: '+1 (555) 234-5678',
    role: 'Head of Operations',
    department: 'Management',
    type: 'full-time',
    compensation: 8500,
    status: 'active',
    source: 'Gusto Core',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'emp-2',
    name: 'David Zhao',
    email: 'david.z@acmecompany.com',
    phone: '+1 (555) 345-6789',
    role: 'Lead Full-Stack Engineer',
    department: 'Engineering',
    type: 'full-time',
    compensation: 9800,
    status: 'active',
    source: 'Gusto Core',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'emp-3',
    name: 'Elena Rostova',
    email: 'elena.r@acmecompany.com',
    phone: '+1 (555) 456-7890',
    role: 'Senior Product Designer',
    department: 'Design',
    type: 'full-time',
    compensation: 7800,
    status: 'active',
    source: 'Gusto Core',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'emp-4',
    name: 'Marcus Bell',
    email: 'marcus.b@acmecompany.com',
    phone: '+1 (555) 567-8901',
    role: 'Growth Marketing Lead',
    department: 'Marketing',
    type: 'contractor',
    compensation: 4200,
    status: 'active',
    source: 'Gusto Core',
    createdAt: new Date().toISOString(),
  },
];

// Fetch employees
export async function getEmployees(userId: string): Promise<Employee[]> {
  const path = `users/${userId}/employees`;
  try {
    const colRef = collection(db, 'users', userId, 'employees');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      // Seed default employees on first run
      const seeded: Employee[] = [];
      for (const emp of defaultEmployees) {
        const newEmp = { ...emp, userId };
        await setDoc(doc(db, 'users', userId, 'employees', emp.id), newEmp);
        seeded.push(newEmp);
      }
      return seeded;
    }
    return snapshot.docs.map((d) => d.data() as Employee);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Add/Import employee
export async function saveEmployee(userId: string, employee: Omit<Employee, 'userId'>): Promise<void> {
  const path = `users/${userId}/employees/${employee.id}`;
  try {
    const docRef = doc(db, 'users', userId, 'employees', employee.id);
    await setDoc(docRef, { ...employee, userId });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Delete employee
export async function deleteEmployee(userId: string, employeeId: string): Promise<void> {
  const path = `users/${userId}/employees/${employeeId}`;
  try {
    const docRef = doc(db, 'users', userId, 'employees', employeeId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Fetch Payroll runs
export async function getPayrolls(userId: string): Promise<PayrollRun[]> {
  const path = `users/${userId}/payrolls`;
  try {
    const colRef = collection(db, 'users', userId, 'payrolls');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      // Initial Spring Bonus 2027 run shown in screenshot
      const initialPayroll: PayrollRun = {
        id: 'spring-bonus-2027',
        userId,
        title: 'Spring bonus 2027',
        period: 'Q2 Special Bonus Run',
        payday: 'Jul 16, 2027',
        submitBy: 'Jul 15, 2027',
        totalAmount: 28684.58,
        employeesCount: 5,
        status: 'pending',
        directDepositDate: 'May 15, 2027',
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', userId, 'payrolls', initialPayroll.id), initialPayroll);
      return [initialPayroll];
    }
    return snapshot.docs.map((d) => d.data() as PayrollRun);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Submit or update a Payroll run
export async function submitPayrollRun(userId: string, payroll: PayrollRun): Promise<void> {
  const path = `users/${userId}/payrolls/${payroll.id}`;
  try {
    const docRef = doc(db, 'users', userId, 'payrolls', payroll.id);
    await setDoc(docRef, {
      ...payroll,
      status: 'completed',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Save AI Task
export async function saveAiTaskRecord(userId: string, task: Omit<AiTaskRecord, 'userId'>): Promise<void> {
  const path = `users/${userId}/ai_tasks/${task.id}`;
  try {
    const docRef = doc(db, 'users', userId, 'ai_tasks', task.id);
    await setDoc(docRef, { ...task, userId });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
