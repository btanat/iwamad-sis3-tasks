// Shared task state for the whole app (the Week 4 Context pattern).
// A provider holds the tasks; any screen reads them with useTasks().
import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialTasks, type Task } from '../data/tasks';

type TasksContextValue = {
  tasks: Task[];
  addTask: (title: string, notes: string) => void;
  deleteTask: (id: number) => void;
  toggleDone: (id: number) => void;
  getTask: (id: number) => Task | undefined;
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function addTask(title: string, notes: string) {
    setTasks((prev) => {
      const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      return [...prev, { id: nextId, title, notes, done: false }];
    });
  }

  function deleteTask(id: number) {
    // Change state with filter — never push or splice.
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleDone(id: number) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function getTask(id: number) {
    return tasks.find((t) => t.id === id);
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleDone, getTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used inside a TasksProvider');
  }
  return ctx;
}
