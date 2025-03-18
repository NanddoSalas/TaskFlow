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

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime creationDate;

    public BoardDTO toDTO() {
        BoardDTO boardDTO = new BoardDTO();

        boardDTO.setId(id);
        boardDTO.setName(name);
        boardDTO.setCreationDate(creationDate);

        return boardDTO;
    }
}
