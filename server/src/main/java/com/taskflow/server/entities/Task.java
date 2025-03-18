package com.taskflow.server.entities;

import com.taskflow.server.dtos.TaskDTO;
import com.taskflow.server.enums.TaskPriority;
import com.taskflow.server.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskPriority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime creationDate;

    public TaskDTO toDTO() {
        TaskDTO taskDTO = new TaskDTO();

        taskDTO.setId(id);
        taskDTO.setTitle(title);
        taskDTO.setDescription(description);
        taskDTO.setPriority(priority);
        taskDTO.setStatus(status);
        taskDTO.setCreationDate(creationDate);

        return taskDTO;
    }

}

