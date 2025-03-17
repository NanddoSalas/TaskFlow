package com.taskflow.server.repositories;

import com.taskflow.server.entities.Board;
import org.springframework.data.repository.CrudRepository;

public interface BoardRepository extends CrudRepository<Board, Integer> {
}
