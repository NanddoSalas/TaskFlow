import { create } from 'zustand';
import { fakeData } from './fakeData';
import { Board, Group, Task, User } from './types';

export interface State {
  idToken: string | null;
  user: User | null;
  selectedBoard: number | null;
  boardsId: number[] | null;
  boards: {
    [boardId: number]: {
      board: Board;
      groupsId: number[] | null;
    };
  };
  groups: {
    [groupId: number]: {
      group: Group;
      tasksId: number[] | null;
    };
  };
  tasks: {
    [taskId: number]: Task;
  };
}

interface Actions {
  login: (idToken: string, user: User) => void;
  logout: () => void;
  selectBoard: (index: number | null) => void;

  setBoards: (boards: Board[]) => void;
  setGroups: (boardId: number, groups: Group[]) => void;
  setTasks: (groupId: number, tasks: Task[]) => void;

  addBoard: (board: Board) => void;
  addGroup: (boardId: number, group: Group) => void;
  addTask: (groupId: number, task: Task) => void;

  updateBoard: (boardId: number, name: string) => void;
  updateGroup: (groupId: number, name: string) => void;
  updateTask: (taskId: number, title: string, description: string) => void;

  updateGroupPosition: (groupId: number, position: bigint) => void;
  updateTaskPosition: (
    taskId: number,
    position: bigint,
    groupId: number,
  ) => void;

  deleteBoard: (boardId: number) => void;
  deleteGroup: (boardId: number, groupId: number) => void;
  deleteTask: (groupId: number, taskId: number) => void;
}

export const useBearStore = create<State & Actions>()((set) => ({
  // idToken: null,
  // user: null,
  // selectedBoard: null,
  // boardsId: null,
  // boards: {},
  // groups: {},
  // tasks: {},
  ...fakeData,

  login: (idToken: string, user: User) => set({ idToken, user }),
  logout: () => set({ idToken: null, user: null }),
  selectBoard: (index: number | null) => set({ selectedBoard: index }),

  setBoards: (boards: Board[]) => {},
  setGroups: (boardId: number, groups: Group[]) => {},
  setTasks: (groupId: number, tasks: Task[]) => {},

  addBoard: (board: Board) => {},
  addGroup: (boardId: number, group: Group) => {},
  addTask: (groupId: number, task: Task) => {},

  updateBoard: (boardId: number, name: string) => {},
  updateGroup: (groupId: number, name: string) => {},
  updateTask: (taskId: number, title: string, description: string) => {},

  updateGroupPosition: (groupId: number, position: bigint) => {},
  updateTaskPosition: (taskId: number, position: bigint, groupId: number) => {},

  deleteBoard: (boardId: number) => {},
  deleteGroup: (boardId: number, groupId: number) => {},
  deleteTask: (groupId: number, taskId: number) => {},
}));
