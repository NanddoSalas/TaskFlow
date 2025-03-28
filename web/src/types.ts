export interface User {
  name: string;
  email: string;
  picture: string;
}

export interface Board {
  id: number;
  name: string;
  creationDate: string;
}

export interface Group {
  id: number;
  name: string;
  creationDate: string;
  position: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  position: number;
  groupId: number;
}

export interface GroupPayload {
  boardId: number;
  groupId: number;
  index: number;
}

export interface TaskPayload {
  groupId: number;
  taskId: number;
  index: number;
}
