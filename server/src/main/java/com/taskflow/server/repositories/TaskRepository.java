package com.taskflow.server.repositories;

import com.taskflow.server.entities.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends CrudRepository<Task, Integer> {

    List<Task> findAllByBoardIdOrderByPositionAsc(int boardId);

    Optional<Task> findByIdAndBoardIdAndGroupId(int taskId, int boardId, int groupId);

    Optional<Task> findFirstByOrderByPositionDesc();

    void deleteByIdAndBoardIdAndGroupId(int taskId, int boardId, int groupId);

}
