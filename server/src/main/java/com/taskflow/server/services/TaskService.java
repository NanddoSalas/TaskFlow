package com.taskflow.server.services;

import com.taskflow.server.dtos.TaskDTO;
import com.taskflow.server.entities.Task;
import com.taskflow.server.forms.CreateTaskForm;
import com.taskflow.server.forms.PatchTaskForm;
import com.taskflow.server.repositories.BoardRepository;
import com.taskflow.server.repositories.GroupRepository;
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
    private final GroupRepository groupRepository;

    public List<TaskDTO> retrieveTasks(int userId, int boardId) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));

        return taskRepository.findAllByBoardIdOrderByPositionAsc(boardId).stream().map(Task::toDTO).toList();
    }

    public TaskDTO createTask(int userId, int boardId, int groupId, CreateTaskForm form) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));
        groupRepository.findByIdAndBoardId(groupId, boardId).orElseThrow(() -> new Exception("Group doesn't exist"));

        Task task = new Task();

        task.setTitle(form.getTitle());
        task.setDescription(form.getDescription());
        task.setBoardId(boardId);
        task.setGroupId(groupId);

        Optional<Task> taskOptional = taskRepository.findFirstByOrderByPositionDesc();

        if (taskOptional.isPresent()) {
            long newPosition = taskOptional.get().getPosition() + 10000;
            task.setPosition(newPosition);
        } else {
            task.setPosition(0);
        }

        return taskRepository.save(task).toDTO();
    }

    public TaskDTO updateTask(int userId, int boardId, int groupId, int taskId, PatchTaskForm form) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));
        groupRepository.findByIdAndBoardId(groupId, boardId).orElseThrow(() -> new Exception("Group doesn't exist"));
        Task task = taskRepository.findByIdAndBoardIdAndGroupId(taskId, boardId, groupId)
                .orElseThrow(() -> new Exception("Task doesn't exist"));

        if (form.getTitle() != null) {
            task.setTitle(form.getTitle());
        }

        if (form.getDescription() != null) {
            task.setDescription(form.getDescription());
        }

        if (form.getPosition() != null) {
            task.setPosition(form.getPosition());
        }

        if (form.getGroupId() != null) {
            groupRepository.findByIdAndBoardId(form.getGroupId(), boardId)
                    .orElseThrow(() -> new Exception("Group doesn't exist"));
            task.setGroupId(form.getGroupId());
        }

        return taskRepository.save(task).toDTO();
    }

    @Transactional
    public void deleteTask(int userId, int boardId, int groupId, int taskId) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));

        taskRepository.deleteByIdAndBoardIdAndGroupId(taskId, boardId, groupId);
    }
}
