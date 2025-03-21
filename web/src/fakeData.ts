import { State } from './bearState';

export const fakeData: State = {
  idToken: 'fake-id-token-12345',
  user: {
    id: 1,
    name: 'Fernando Salas',
    email: 'luis.nando.salas28@gmail.com',
    picture:
      'https://lh3.googleusercontent.com/a/ACg8ocKqOmCod6kfT2qGynvcGVOhFtcJ-wEbJBPPkRrtQGBlOOBxxTs=s96-c',
    creationDate: '2025-03-21T10:00:00Z',
  },
  selectedBoard: null,
  boardIds: [1, 2, 3, 4],
  boards: {
    1: {
      board: {
        id: 1,
        name: 'Project Alpha',
        creationDate: '2025-03-20T12:00:00Z',
      },
      groupIds: [101, 102, 103, 104],
    },
    2: {
      board: {
        id: 2,
        name: 'Project Beta',
        creationDate: '2025-03-18T09:00:00Z',
      },
      groupIds: [105, 106, 107],
    },
    3: {
      board: {
        id: 3,
        name: 'Project Gamma',
        creationDate: '2025-03-15T14:00:00Z',
      },
      groupIds: [108, 109],
    },
    4: {
      board: {
        id: 4,
        name: 'Project Delta',
        creationDate: '2025-03-10T11:00:00Z',
      },
      groupIds: [],
    },
  },
  groups: {
    101: {
      group: {
        id: 101,
        name: 'Backlog',
        creationDate: '2025-03-20T12:00:00Z',
        position: BigInt(0),
      },
      taskIds: [201, 202],
    },
    102: {
      group: {
        id: 102,
        name: 'To Do',
        creationDate: '2025-03-20T12:10:00Z',
        position: BigInt(10000),
      },
      taskIds: [203, 204],
    },
    103: {
      group: {
        id: 103,
        name: 'In Progress',
        creationDate: '2025-03-20T12:20:00Z',
        position: BigInt(20000),
      },
      taskIds: [205, 206],
    },
    104: {
      group: {
        id: 104,
        name: 'Done',
        creationDate: '2025-03-20T12:30:00Z',
        position: BigInt(30000),
      },
      taskIds: [207],
    },
    105: {
      group: {
        id: 105,
        name: 'Backlog',
        creationDate: '2025-03-18T09:00:00Z',
        position: BigInt(0),
      },
      taskIds: [],
    },
    106: {
      group: {
        id: 106,
        name: 'To Do',
        creationDate: '2025-03-18T09:10:00Z',
        position: BigInt(10000),
      },
      taskIds: [],
    },
    107: {
      group: {
        id: 107,
        name: 'In Progress',
        creationDate: '2025-03-18T09:20:00Z',
        position: BigInt(20000),
      },
      taskIds: [],
    },
    108: {
      group: {
        id: 108,
        name: 'Backlog',
        creationDate: '2025-03-15T14:00:00Z',
        position: BigInt(0),
      },
      taskIds: [],
    },
    109: {
      group: {
        id: 109,
        name: 'To Do',
        creationDate: '2025-03-15T14:10:00Z',
        position: BigInt(10000),
      },
      taskIds: [],
    },
  },
  tasks: {
    201: {
      id: 201,
      title: 'Define project scope',
      description: 'Outline project goals and deliverables.',
      creationDate: '2025-03-20T12:05:00Z',
      position: BigInt(0),
    },
    202: {
      id: 202,
      title: 'Gather requirements',
      description: 'Collect input from stakeholders.',
      creationDate: '2025-03-20T12:10:00Z',
      position: BigInt(10000),
    },
    203: {
      id: 203,
      title: 'Set up repository',
      description: 'Initialize Git repository and CI/CD.',
      creationDate: '2025-03-20T12:15:00Z',
      position: BigInt(0),
    },
    204: {
      id: 204,
      title: 'Design database schema',
      description: 'Create ER diagrams and plan database tables.',
      creationDate: '2025-03-20T12:20:00Z',
      position: BigInt(10000),
    },
    205: {
      id: 205,
      title: 'Implement authentication',
      description: 'Secure the API with JWT authentication.',
      creationDate: '2025-03-20T12:25:00Z',
      position: BigInt(0),
    },
    206: {
      id: 206,
      title: 'Build API endpoints',
      description: 'Develop RESTful endpoints for user management.',
      creationDate: '2025-03-20T12:30:00Z',
      position: BigInt(10000),
    },
    207: {
      id: 207,
      title: 'Deploy to production',
      description: 'Launch the project on cloud hosting.',
      creationDate: '2025-03-20T12:35:00Z',
      position: BigInt(0),
    },
  },
};
