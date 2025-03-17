package com.taskflow.server.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardDTO {

    private int id;
    private String name;
    private LocalDateTime creationDate;

}
