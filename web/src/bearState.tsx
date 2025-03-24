import { create } from 'zustand';
import { Board, Group, Task, User } from './types';

export interface State {
  idToken: string | null;
  user: User | null;
  selectedBoard: number | null;
  boardIds: number[] | null;
  boards: {
    [boardId: number]: {
      board: Board;
      groupIds: number[] | null;
    };
  };
  groups: {
    [groupId: number]: {
      group: Group;
      taskIds: number[] | null;
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
  setGroupsAndTasks: (boardId: number, groups: Group[], tasks: Task[]) => void;

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
  idToken: null,
  user: null,
  selectedBoard: null,
  boardIds: null,
  boards: {},
  groups: {},
  tasks: {},

  login: (idToken: string, user: User) => set({ idToken, user }),
  logout: () => set({ idToken: null, user: null }),
  selectBoard: (index: number | null) => set({ selectedBoard: index }),

  setBoards: (boards: Board[]) => {
    const boardIds: number[] = [];
    const boardsObj: {
      [boardId: number]: {
        board: Board;
        groupIds: number[] | null;
      };
    } = {};

    boards.forEach((board) => {
      boardIds.push(board.id);
      boardsObj[board.id] = {
        board: board,
        groupIds: null,
      };
    });

    set(() => ({ boardIds, boards: boardsObj }));
  },
  setGroupsAndTasks: (boardId: number, groups: Group[], tasks: Task[]) => {
    const groupIds: number[] = [];
    const groupsObj: {
      [groupId: number]: {
        group: Group;
        taskIds: number[] | null;
      };
    } = {};
    const tasksObj: {
      [taskId: number]: Task;
    } = {};

    groups.forEach((group) => {
      groupIds.push(group.id);
      groupsObj[group.id] = {
        group: group,
        taskIds: null,
      };
    });

    tasks.forEach((task) => {
      if (groupsObj[task.groupId].taskIds === null) {
        groupsObj[task.groupId].taskIds = [task.id];
      } else {
        groupsObj[task.groupId].taskIds!.push(task.id);
      }

      tasksObj[task.id] = task;
    });

    set((state) => {
      if (state.boards[boardId].groupIds !== null) return state;

      const newState = { ...state };

      newState.boards[boardId].groupIds = groupIds;
      newState.groups = { ...newState.groups, ...groupsObj };
      newState.tasks = { ...newState.tasks, ...tasksObj };

      return newState;
    });
  },

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
