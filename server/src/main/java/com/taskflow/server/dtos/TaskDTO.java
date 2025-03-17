package com.taskflow.server.dtos;

import com.taskflow.server.enums.TaskPriority;
import com.taskflow.server.enums.TaskStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDTO {

    private int id;
    private String title;
    private String description;
    private TaskPriority priority;
    private TaskStatus status;
    private LocalDateTime creationDate;

}
