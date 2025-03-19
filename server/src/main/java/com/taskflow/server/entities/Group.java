package com.taskflow.server.entities;

import com.taskflow.server.dtos.GroupDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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

    @Column(nullable = false)
    private Long position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false, insertable = false, updatable = false)
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
