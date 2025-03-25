package com.taskflow.server.repositories;

import com.taskflow.server.entities.Board;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends CrudRepository<Board, Integer> {

    List<Board> findAllByOwnerIdOrderByIdAsc(int ownerId);

    Optional<Board> findByIdAndOwnerId(int boardId, int ownerId);

}
