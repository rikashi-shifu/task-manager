package com.taskmanager.repository;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
    List<Task> findByUserIdAndStatus(Long userId, Task.TaskStatus status);
    List<Task> findByUserIdAndCategory(Long userId, TaskCategory category);
    List<Task> findByUserIdAndTitleContainingIgnoreCase(Long userId, String title);
}
