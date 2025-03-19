package com.taskflow.server.forms;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PatchTaskForm {

    @Size(min = 1, max = 255)
    private String title;

    private String description;

    private Long position;

    private Integer groupId;

}
