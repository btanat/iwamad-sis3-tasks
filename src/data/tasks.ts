// The Task type and the starting tasks. Everything is typed — no `any`.
export type Task = {
  id: number;
  title: string;
  notes: string;
  done: boolean;
};

// At least three tasks of your own, so the list is never empty on first load.
export const initialTasks: Task[] = [
  { id: 1, title: 'Finish IWaMAD SIS 3', notes: 'Build the task manager app', done: false },
  { id: 2, title: 'Study for the Go defense', notes: 'Channels and select', done: true },
  { id: 3, title: 'Service the BMW with Sanya', notes: 'Check the cooling system', done: false },
];
