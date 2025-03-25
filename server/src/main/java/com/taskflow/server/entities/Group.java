package com.taskflow.server.entities;

import com.taskflow.server.dtos.GroupDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Table(name = "groups")
@Data
@NoArgsConstructor
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false, unique = true)
    private long position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false, insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @Column(name = "board_id", nullable = false)
    private int boardId;

    public GroupDTO toDTO() {
        GroupDTO groupDTO = new GroupDTO();

        groupDTO.setId(id);
        groupDTO.setName(name);
        groupDTO.setCreationDate(creationDate);
        groupDTO.setPosition(position);

        return groupDTO;
    }

}
