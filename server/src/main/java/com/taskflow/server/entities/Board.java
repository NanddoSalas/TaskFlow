package com.taskflow.server.entities;

import com.taskflow.server.dtos.BoardDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "boards")
@Data
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false, insertable = false, updatable = false)
    private User owner;

    @Column(name = "owner_id", nullable = false)
    private int ownerId;

    public BoardDTO toDTO() {
        BoardDTO boardDTO = new BoardDTO();

        boardDTO.setId(id);
        boardDTO.setName(name);
        boardDTO.setCreationDate(creationDate);

        return boardDTO;
    }
}
