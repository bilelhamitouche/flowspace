export interface Task {
  id: string;
  title: string;
  description: string;
  position: number;
  dueDate: Date;
  listId: string;
  createdBy: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskData {
  title: string;
  description: string;
  position: number;
  dueDate: Date;
  listId: string;
  assignedTo: string;
}
