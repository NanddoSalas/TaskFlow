package com.taskflow.server.forms;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateTaskForm {

    @NotBlank
    @Size(min = 1, max = 255)
    private String title;

    @NotNull
    private String description;

}
