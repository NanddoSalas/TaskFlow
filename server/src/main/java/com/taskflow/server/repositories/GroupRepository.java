package com.taskflow.server.repositories;

import com.taskflow.server.entities.Group;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends CrudRepository<Group, Integer> {

    List<Group> findAllByBoardId(int boardId);

    Optional<Group> findByIdAndBoardId(int groupId, int boardId);

    Optional<Group> findFirstByOrderByPositionDesc();

    void deleteByIdAndBoardId(int groupId, int boardId);
}
