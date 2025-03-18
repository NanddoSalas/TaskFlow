package com.taskflow.server.forms;

import com.taskflow.server.entities.Task;
import com.taskflow.server.enums.TaskPriority;
import com.taskflow.server.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TaskForm {

    @NotBlank
    @Size(min = 1, max = 255)
    private String title;

    @NotNull
    private String description;

    @NotNull
    @Pattern(regexp = "LOW|MEDIUM|HIGH", message = "Invalid value. Must match one of: LOW|MEDIUM|HIGH")
    private TaskPriority priority;

    @NotNull
    @Pattern(regexp = "TO_DO|IN_PROGRESS|DONE", message = "Invalid value. Must match one of: TO_DO IN_PROGRESS DONE")
    private TaskStatus status;

    public Task getTask() {
        Task task = new Task();

        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setStatus(status);

        return task;
    }

}
