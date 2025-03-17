package com.taskflow.server.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

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

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime creationDate;

}

enum TaskPriority {
    LOW,
    MEDIUM,
    HIGH
}

enum TaskStatus {
    TO_DO,
    IN_PROGRESS,
    DONE
}