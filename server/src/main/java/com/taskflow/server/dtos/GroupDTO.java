package com.taskflow.server.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GroupDTO {

    private int id;
    private String name;
    private LocalDateTime creationDate;
    private Long position;

}
