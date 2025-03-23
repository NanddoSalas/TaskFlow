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
  position: bigint;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  position: bigint;
  groupId: number;
}
