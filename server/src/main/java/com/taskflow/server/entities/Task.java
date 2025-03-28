package com.taskflow.server.entities;

import com.taskflow.server.dtos.TaskDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    private int position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false, insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @Column(name = "board_id", nullable = false)
    private int boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false, insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Group group;

    @Column(name = "group_id", nullable = false)
    private int groupId;

    public TaskDTO toDTO() {
        TaskDTO taskDTO = new TaskDTO();

        taskDTO.setId(id);
        taskDTO.setTitle(title);
        taskDTO.setDescription(description);
        taskDTO.setCreationDate(creationDate);
        taskDTO.setPosition(position);
        taskDTO.setGroupId(groupId);

        return taskDTO;
    }

}
