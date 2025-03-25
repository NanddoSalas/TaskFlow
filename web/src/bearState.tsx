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

  addBoard: (board: Board, selectBoard?: boolean) => void;
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

  logout: () =>
    set({
      idToken: null,
      user: null,
      selectedBoard: null,
      boardIds: null,
      boards: {},
      groups: {},
      tasks: {},
    }),

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

  addBoard: (board: Board, selectBoard) => {
    set((state) => {
      const newState = { ...state };

      newState.selectedBoard =
        selectBoard === true ? board.id : newState.selectedBoard;

      newState.boardIds = [...(newState.boardIds || []), board.id];
      newState.boards[board.id] = {
        board: board,
        groupIds: [],
      };

      return newState;
    });
  },

  addGroup: (boardId: number, group: Group) => {
    set((state) => {
      const newState = { ...state };

      newState.boards[boardId].groupIds = [
        ...(newState.boards[boardId].groupIds || []),
        group.id,
      ];
      newState.groups[group.id] = {
        group: group,
        taskIds: [],
      };

      return newState;
    });
  },

  addTask: (groupId: number, task: Task) => {
    set((state) => {
      const groups = { ...state.groups };
      const tasks = { ...state.tasks };

      groups[groupId] = { ...groups[groupId] };
      groups[groupId].taskIds = [...groups[groupId].taskIds!, task.id];

      tasks[task.id] = { ...task };

      return { groups, tasks };
    });
  },

  updateBoard: (boardId: number, name: string) => {
    set((state) => {
      const boards = { ...state.boards };

      boards[boardId] = { ...boards[boardId] };
      boards[boardId].board = { ...boards[boardId].board, name };

      return { boards };
    });
  },

  updateGroup: (groupId: number, name: string) => {
    set((state) => {
      const groups = { ...state.groups };

      groups[groupId] = { ...groups[groupId] };
      groups[groupId].group = { ...groups[groupId].group, name };

      return { groups };
    });
  },

  updateTask: (taskId: number, title: string, description: string) => {
    set((state) => {
      const tasks = { ...state.tasks };

      tasks[taskId] = { ...tasks[taskId], title, description };

      return { tasks };
    });
  },

  updateGroupPosition: (groupId: number, position: bigint) => {},
  updateTaskPosition: (taskId: number, position: bigint, groupId: number) => {},

  deleteBoard: (boardId: number) => {
    // warning: should also delete all groups and tasks from boardId
    set((state) => {
      const boardIds = state.boardIds!.filter((id) => id !== boardId);
      const boards = { ...state.boards };

      delete boards[boardId];

      return {
        boardIds,
        boards,
        selectedBoard:
          state.selectedBoard === boardId ? null : state.selectedBoard,
      };
    });
  },

  deleteGroup: (boardId: number, groupId: number) => {
    // warning: should also delete all tasks from groupId
    set((state) => {
      const boards = { ...state.boards };
      const groups = { ...state.groups };

      boards[boardId] = { ...boards[boardId] };
      boards[boardId].groupIds = boards[boardId].groupIds!.filter(
        (id) => id !== groupId,
      );

      delete groups[groupId];

      return { boards, groups };
    });
  },

  deleteTask: (groupId: number, taskId: number) => {
    set((state) => {
      const groups = { ...state.groups };
      const tasks = { ...state.tasks };

      groups[groupId] = { ...groups[groupId] };
      groups[groupId].taskIds = groups[groupId].taskIds!.filter(
        (id) => id !== taskId,
      );

      delete tasks[taskId];

      return { groups, tasks };
    });
  },
}));
