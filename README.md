# TaskFlow - A Task Management App

## 1. Overview

**TaskFlow** is a lightweight task management web application that allows users to create, organize, and track tasks in an intuitive kanban-style interface.

## 2. Problem Statement and Motivation

People need a simple, intuitive, and fast way to manage personal tasks without the complexity of enterprise tools like Jira or Trello, so TaskFlow provide users with an easy-to-use task board where they can add, edit, move, and delete tasks.

todo: write motivation

## 3. System Architecture

- **Frontend**: Single Page Application built with React and TypeScript
- **Backend**: API Rest built with Java and Spring Boot
- **Database**: PostgreSQL
- **Authentication**: Google as an Authentication Provider

## 4. Data Model

### 4.1 User Table

| Field         | Type      | Description                |
| ------------- | --------- | -------------------------- |
| id            | Integer   | Unique identifier          |
| name          | String    | User name                  |
| email         | String    | User email                 |
| picture       | String    | User profile picture (url) |
| google_id     | String    | Google unique identifier   |
| creation_date | Timestamp | Creation date              |

### 4.2 Board Table

| Field         | Type      | Description             |
| ------------- | --------- | ----------------------- |
| id            | Integer   | Unique identifier       |
| name          | String    | Board name              |
| creation_date | Timestamp | Creation date           |
| owner         | User      | User who owns the board |

### 4.3 Columns Table

| Field         | Type      | Description           |
| ------------- | --------- | --------------------- |
| id            | Integer   | Unique identifier     |
| name          | String    | Column name           |
| creation_date | Timestamp | Creation date         |
| position      | Long      | Position in the board |
| board         | Board     | Associated board      |

### 4.4 Task Table

| Field         | Type      | Description            |
| ------------- | --------- | ---------------------- |
| id            | Integer   | Unique identifier      |
| title         | String    | Task title             |
| description   | Text      | Task details           |
| creation_date | Timestamp | Creation date          |
| position      | Long      | Position in the column |
| board         | Board     | Associated board       |
| column        | Column    | Associated column      |

## 5. API Design

### 5.1 User Authentication

Google takes care of this but it's necessary to send the ID Token (JWT) provided by Google on every api request.

### 5.2 Board Endpoints

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | /boards           | Get all user boards   |
| POST   | /boards           | Create a new board    |
| PATCH  | /boards/{boardId} | Update a board (name) |
| DELETE | /boards/{boardId} | Delete a board        |

### 5.3 Column Endpoints

| Method | Endpoint                             | Description                      |
| ------ | ------------------------------------ | -------------------------------- |
| GET    | /boards/{boardId}/columns            | Get all columns from a boards    |
| POST   | /boards/{boardId}/columns            | Create a new column              |
| PATCH  | /boards/{boardId}/columns/{columnId} | Update a column (name, position) |
| DELETE | /boards/{boardId}/columns/{columnId} | Delete a column                  |

### 5.4 Task Endpoints

| Method | Endpoint                                            | Description                                          |
| ------ | --------------------------------------------------- | ---------------------------------------------------- |
| GET    | /boards/{boardId}/tasks                             | Get all tasks from a board                           |
| POST   | /boards/{boardId}/columns/{columnId}/tasks          | Create a new task                                    |
| PATCH  | /boards/{boardId}/columns/{columnId}/tasks/{taskId} | Update a task (title, description, position, column) |
| DELETE | /boards/{boardId}/columns/{columnId}/tasks/{taskId} | Delete a task                                        |
