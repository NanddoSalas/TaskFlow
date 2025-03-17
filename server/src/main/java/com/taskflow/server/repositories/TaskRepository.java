package com.taskflow.server.repositories;

import com.taskflow.server.entities.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer> {
}
