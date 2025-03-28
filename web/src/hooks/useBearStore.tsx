import { create } from 'zustand';

import { Board, Group, GroupPayload, Task, TaskPayload, User } from '../types';

type DialogAction = 'create' | 'update' | 'delete' | null;
type DialogTarget = 'board' | 'group' | 'task' | null;

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
  dialog: {
    isOpen: boolean;
    action: DialogAction;
    target: DialogTarget;
    boardId: number | null;
    groupId: number | null;
    taskId: number | null;
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

  moveGroupToGroup: (target: GroupPayload, destination: GroupPayload) => number;
  moveTaskToGroup: (target: TaskPayload, destination: GroupPayload) => number;
  moveTaskToTask: (target: TaskPayload, destination: TaskPayload) => number;

  deleteBoard: (boardId: number) => void;
  deleteGroup: (boardId: number, groupId: number) => void;
  deleteTask: (groupId: number, taskId: number) => void;

  openDialog: (
    action: DialogAction,
    target: DialogTarget,
    context: {
      boardId: number | null;
      groupId: number | null;
      taskId: number | null;
    },
  ) => void;
  closeDialog: () => void;
}

export const useBearStore = create<State & Actions>()((set, get) => ({
  idToken: null,
  user: null,
  selectedBoard: null,
  boardIds: null,
  boards: {},
  groups: {},
  tasks: {},
  dialog: {
    isOpen: false,
    action: null,
    target: null,
    boardId: null,
    groupId: null,
    taskId: null,
  },

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
      groups[groupId].taskIds = [...(groups[groupId].taskIds || []), task.id];

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

  moveGroupToGroup: (target: GroupPayload, destination: GroupPayload) => {
    let newPosition: number;
    let newGroupIds: number[];

    const boardId = target.boardId;
    const groupIds = get().boards[boardId].groupIds || [];

    if (destination.index === 0) {
      const firstGroup = get().groups[destination.groupId].group;

      newPosition = firstGroup.position - 10000;

      newGroupIds = groupIds.filter((id) => id !== target.groupId);
      newGroupIds.unshift(target.groupId);
    } else if (destination.index === groupIds.length - 1) {
      const lastGroup = get().groups[groupIds[groupIds.length - 1]].group;

      newPosition = lastGroup.position + 10000;

      newGroupIds = groupIds.filter((id) => id !== target.groupId);
      newGroupIds.push(target.groupId);
    } else {
      const leftGroupId =
        groupIds[
          target.index > destination.index
            ? destination.index - 1
            : destination.index
        ];

      const rightGroupId =
        groupIds[
          target.index > destination.index
            ? destination.index
            : destination.index + 1
        ];

      const leftGroup = get().groups[leftGroupId].group;
      const rightGroup = get().groups[rightGroupId].group;

      console.log(leftGroup.name, rightGroup.name);

      newPosition = (leftGroup.position + rightGroup.position) / 2;
      newGroupIds = groupIds.filter((id) => id !== target.groupId);

      newGroupIds = [
        ...newGroupIds.slice(0, destination.index),
        target.groupId,
        ...newGroupIds.slice(destination.index),
      ];
    }

    set((state) => {
      const groups = { ...state.groups };
      const boards = { ...state.boards };

      groups[target.groupId] = { ...groups[target.groupId] };
      groups[target.groupId].group = {
        ...groups[target.groupId].group,
        position: newPosition,
      };

      boards[boardId] = { ...state.boards[boardId] };
      boards[boardId].groupIds = newGroupIds;

      return { groups, boards };
    });

    return newPosition;
  },

  moveTaskToGroup: (target: TaskPayload, destination: GroupPayload) => {
    let newPosition: number;

    const taskIds = get().groups[destination.groupId].taskIds || [];

    if (taskIds.length === 0) {
      // group is empty
      newPosition = 0;
    } else {
      const lastIndex = taskIds[taskIds.length - 1];
      const lastTask = get().tasks[lastIndex];

      newPosition = lastTask.position + 10000;
    }

    set((state) => {
      const groups = { ...state.groups };
      const tasks = { ...state.tasks };

      // add task (taskId) to new group
      groups[destination.groupId] = { ...groups[destination.groupId] };
      groups[destination.groupId].taskIds = [...taskIds, target.taskId];

      // remove task (taskId) from old group
      groups[target.groupId] = { ...groups[target.groupId] };
      groups[target.groupId].taskIds = [
        ...groups[target.groupId].taskIds!.filter((id) => id !== target.taskId),
      ];

      // update position in position in task
      tasks[target.taskId] = {
        ...tasks[target.taskId],
        position: newPosition,
        groupId: destination.groupId,
      };

      return { groups, tasks };
    });

    return newPosition;
  },

  moveTaskToTask: (target: TaskPayload, destination: TaskPayload) => {
    // todo: implement function
    return 0;
  },

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

  openDialog: (
    action: DialogAction,
    target: DialogTarget,
    context: {
      boardId: number | null;
      groupId: number | null;
      taskId: number | null;
    },
  ) => {
    set(() => ({
      dialog: {
        isOpen: true,
        action,
        target,
        boardId: context.boardId,
        groupId: context.groupId,
        taskId: context.taskId,
      },
    }));
  },

  closeDialog: () => {
    set(() => ({
      dialog: {
        isOpen: false,
        action: null,
        target: null,
        boardId: null,
        groupId: null,
        taskId: null,
      },
    }));
  },
}));
