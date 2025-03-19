package com.taskflow.server.forms;

import jakarta.validation.constraints.Size;

public class PatchBoardForm {

    @Size(min = 1, max = 255)
    private String name;

}
