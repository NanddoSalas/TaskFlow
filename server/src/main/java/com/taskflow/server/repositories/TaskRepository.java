package com.taskflow.server.repositories;

import com.taskflow.server.entities.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends CrudRepository<Task, Integer> {

    public List<Task> findAllByBoardId(int boardId);
    public Optional<Task> findTaskByIdAndBoardId(int taskId, int boardId);
    public void deleteByIdAndBoardId(int taskId, int boardId);

}
