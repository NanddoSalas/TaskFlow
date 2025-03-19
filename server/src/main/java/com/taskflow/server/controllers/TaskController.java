package com.taskflow.server.controllers;

import com.taskflow.server.dtos.ResponseDTO;
import com.taskflow.server.entities.User;
import com.taskflow.server.forms.CreateTaskForm;
import com.taskflow.server.forms.PatchTaskForm;
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
    public ResponseEntity<ResponseDTO> retrieveTasks(@AuthenticationPrincipal User user, @PathVariable int boardId) throws Exception {
        return ResponseDTO.ok(taskService.retrieveTasks(user.getId(), boardId));
    }

    @PostMapping("/groups/{groupId}/task")
    public ResponseEntity<ResponseDTO> createTask(@AuthenticationPrincipal User user, @PathVariable int boardId,
                                                  @Valid @RequestBody CreateTaskForm form, @PathVariable int groupId) throws Exception {
        return ResponseDTO.ok(taskService.createTask(user.getId(), boardId, groupId, form));
    }

    @PutMapping("/groups/{groupId}/tasks/{taskId}")
    public ResponseEntity<ResponseDTO> updateTask(@AuthenticationPrincipal User user, @PathVariable int taskId,
                                                  @Valid @RequestBody PatchTaskForm form, @PathVariable int boardId, @PathVariable int groupId) throws Exception {
        return ResponseDTO.ok(taskService.updateTask(user.getId(), boardId, groupId, taskId, form));
    }

    @DeleteMapping("/groups/{groupId}/tasks/{taskId}")
    public ResponseEntity<ResponseDTO> deleteTask(@AuthenticationPrincipal User user, @PathVariable int taskId,
                                                  @PathVariable int boardId, @PathVariable int groupId) throws Exception {
        taskService.deleteTask(user.getId(), boardId, groupId, taskId);
        return ResponseDTO.ok(null);
    }
}
