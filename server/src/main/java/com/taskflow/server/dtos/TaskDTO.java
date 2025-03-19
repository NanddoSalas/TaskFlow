package com.taskflow.server.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDTO {

    private int id;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private Long position;
    private int groupId;

}
