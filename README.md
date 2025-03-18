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
| owner_id      | Integer   | User who owns the board |
| creation_date | Timestamp | Creation date           |

### 4.3 Task Table

| Field         | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| id            | Integer   | Unique identifier                      |
| title         | String    | Task title                             |
| description   | Text      | Task details                           |
| priority      | Enum      | Task priority (High, Medium, Low)      |
| status        | Enum      | Task status (To Do, In Progress, Done) |
| board_id      | Integer   | Associated board                       |
| creation_date | Timestamp | Creation date                          |

## 5. API Design

### 5.1 User Authentication

Google takes care of this but it's necessary to send the ID Token (JWT) provided by Google on every api request.

### 5.2 Board Endpoints

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | /boards      | Get all user boards |
| POST   | /boards      | Create a new board  |
| DELETE | /boards/{id} | Delete a board      |

### 5.3 Task Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | /boards/{id}/tasks | Get tasks for board |
| POST   | /boards/{id}/tasks | Create a new task   |
| PUT    | /tasks/{id}        | Update task status  |
| DELETE | /tasks/{id}        | Delete task         |
