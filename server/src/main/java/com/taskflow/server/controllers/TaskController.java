package com.taskflow.server.controllers;

import com.taskflow.server.dtos.ResponseDTO;
import com.taskflow.server.entities.User;
import com.taskflow.server.forms.TaskForm;
import com.taskflow.server.services.TaskService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boards/{boardId}")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/tasks")
    public ResponseEntity<ResponseDTO> getTasks(@AuthenticationPrincipal User user, @PathVariable int boardId) {
        return ResponseDTO.ok(taskService.getAllTasks(boardId, user.getId()));
    }

    @PostMapping("/tasks")
    public ResponseEntity<ResponseDTO> createTask(@AuthenticationPrincipal User user, @PathVariable int boardId,
            @Valid @RequestBody TaskForm taskForm) {
        return ResponseDTO.ok(taskService.createTask(boardId, taskForm, user.getId()));
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<ResponseDTO> updateTask(@AuthenticationPrincipal User user, @PathVariable int taskId,
            @Valid @RequestBody TaskForm taskForm, @PathVariable int boardId) {
        return ResponseDTO.ok(taskService.updateTask(boardId, taskId, taskForm, user.getId()));
    }

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<ResponseDTO> deleteTask(@AuthenticationPrincipal User user, @PathVariable int taskId,
            @PathVariable int boardId) {
        taskService.deleteTask(boardId, taskId, user.getId());
        return ResponseDTO.ok(null);
    }
}
