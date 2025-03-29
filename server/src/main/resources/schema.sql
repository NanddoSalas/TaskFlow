CREATE OR REPLACE PROCEDURE populate_new_user(new_user_id INTEGER) LANGUAGE plpgsql AS $$
DECLARE board1_id INTEGER;

board2_id INTEGER;

board3_id INTEGER;

group1_id INTEGER;

group2_id INTEGER;

group3_id INTEGER;

group4_id INTEGER;

group5_id INTEGER;

group6_id INTEGER;

group7_id INTEGER;

group8_id INTEGER;

BEGIN -- Insert first board
INSERT INTO boards (creation_date, name, owner_id)
VALUES (NOW(), 'Project Alpha', new_user_id)
RETURNING id INTO board1_id;

-- Insert second board
INSERT INTO boards (creation_date, name, owner_id)
VALUES (NOW(), 'Marketing Plan', new_user_id)
RETURNING id INTO board2_id;

-- Insert third board
INSERT INTO boards (creation_date, name, owner_id)
VALUES (NOW(), 'Development Roadmap', new_user_id)
RETURNING id INTO board3_id;

-- Insert groups and capture IDs
INSERT INTO groups (board_id, creation_date, name, position)
VALUES (board1_id, NOW(), 'To Do', 0)
RETURNING id INTO group1_id;

INSERT INTO groups (board_id, creation_date, name, position)
VALUES (board1_id, NOW(), 'In Progress', 10000)
RETURNING id INTO group2_id;

INSERT INTO groups (board_id, creation_date, name, position)
VALUES (board1_id, NOW(), 'Done', 20000)
RETURNING id INTO group3_id;

INSERT INTO groups (board_id, creation_date, name, position)
VALUES (board2_id, NOW(), 'Ideas', 0)
RETURNING id INTO group4_id;

INSERT INTO groups (board_id, creation_date, name, position)
VALUES (board2_id, NOW(), 'Execution', 10000)
RETURNING id INTO group5_id;

INSERT INTO groups (board_id, creation_date, name, position)
VALUES (board3_id, NOW(), 'Planning', 0)
RETURNING id INTO group6_id;

INSERT INTO groups (board_id, creation_date, name, position)
VALUES (board3_id, NOW(), 'Development', 10000)
RETURNING id INTO group7_id;

INSERT INTO groups (board_id, creation_date, name, position)
VALUES (board3_id, NOW(), 'Testing', 20000)
RETURNING id INTO group8_id;

-- Insert tasks
INSERT INTO tasks (
    board_id,
    creation_date,
    description,
    group_id,
    position,
    title
  )
VALUES (
    board1_id,
    NOW(),
    'Define project goals and scope',
    group1_id,
    0,
    'Project Kickoff'
  ),
  (
    board1_id,
    NOW(),
    'Set up development environment',
    group1_id,
    10000,
    'Environment Setup'
  ),
  (
    board1_id,
    NOW(),
    'Design UI Mockups',
    group2_id,
    0,
    'UI Mockups'
  ),
  (
    board1_id,
    NOW(),
    'Develop authentication system',
    group2_id,
    10000,
    'Auth System'
  ),
  (
    board1_id,
    NOW(),
    'Launch MVP',
    group3_id,
    0,
    'Release 1.0'
  ),
  (
    board2_id,
    NOW(),
    'Brainstorm marketing strategies',
    group4_id,
    0,
    'Marketing Ideas'
  ),
  (
    board2_id,
    NOW(),
    'Create ad campaign',
    group5_id,
    0,
    'Google Ads'
  ),
  (
    board3_id,
    NOW(),
    'Plan sprint tasks',
    group6_id,
    0,
    'Sprint Planning'
  ),
  (
    board3_id,
    NOW(),
    'Implement API endpoints',
    group7_id,
    0,
    'API Development'
  ),
  (
    board3_id,
    NOW(),
    'Write unit tests',
    group8_id,
    0,
    'Unit Testing'
  );

END;

$$;