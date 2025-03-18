package com.taskflow.server.services;

import com.taskflow.server.dtos.TaskDTO;
import com.taskflow.server.entities.Board;
import com.taskflow.server.entities.Task;
import com.taskflow.server.forms.TaskForm;
import com.taskflow.server.repositories.BoardRepository;
import com.taskflow.server.repositories.TaskRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final BoardRepository boardRepository;

    public List<TaskDTO> getAllTasks(int boardId, int userId) {
        Optional<Board> board = boardRepository.findByIdAndOwnerId(boardId, userId);

        if (board.isPresent()) {
            return taskRepository.findAllByBoardId(boardId).stream().map(Task::toDTO).toList();
        } else {
            // exception: board doesn't exist or user is not the owner of the board
            System.out.println("exception: board doesn't exist or user is not the owner of the board");
            return null;
        }
    }

    public TaskDTO createTask(int boardId, TaskForm form, int userId) {
        Optional<Board> board = boardRepository.findByIdAndOwnerId(boardId, userId);

        if (board.isPresent()) {
            Task task = form.getTask();
            task.setBoard(board.get());

            return taskRepository.save(task).toDTO();
        } else {
            // exception: board doesn't exist or user is not the owner of the board
            System.out.println("exception: board doesn't exist or user is not the owner of the board");
            return null;
        }
    }

    public TaskDTO updateTask(int boardId, int taskId, TaskForm form, int userId) {
        Optional<Board> board = boardRepository.findByIdAndOwnerId(boardId, userId);

        if (board.isPresent()) {
            Optional<Task> taskOptional = taskRepository.findTaskByIdAndBoardId(taskId, boardId);

            if (taskOptional.isPresent()) {
                Task task = taskOptional.get();

                task.setTitle(form.getTitle());
                task.setDescription(form.getDescription());
                task.setPriority(form.getPriority());
                task.setStatus(form.getStatus());

                return taskRepository.save(task).toDTO();
            } else {
                // exception: task belongs to a different board
                System.out.println("exception: task belongs to a different board");
                return null;
            }

        } else {
            // exception: board doesn't exist or user is not the owner of the board
            System.out.println("exception: board doesn't exist or user is not the owner of the board");
            return null;
        }
    }

    @Transactional
    public void deleteTask(int boardId, int taskId, int userId) {
        Optional<Board> board = boardRepository.findByIdAndOwnerId(boardId, userId);

        if (board.isPresent()) {
            taskRepository.deleteByIdAndBoardId(taskId, boardId);
        }
    }
}
