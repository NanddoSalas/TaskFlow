package com.taskflow.server.repositories;

import com.taskflow.server.entities.Board;
import com.taskflow.server.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends CrudRepository<Board, Integer> {

    public List<Board> findAllByOwnerId(int ownerId);
    public Optional<Board> findByIdAndOwnerId(int id, int ownerId);
    public void deleteBoardByIdAndOwnerId(int boardId, int ownerId);

}
