package com.taskflow.server.forms;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PatchBoardForm {

    @Size(min = 1, max = 255)
    private String name;

}
