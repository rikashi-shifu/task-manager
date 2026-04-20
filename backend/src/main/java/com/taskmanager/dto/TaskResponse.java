package com.taskmanager.dto;

import com.taskmanager.entity.Task.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private String category;
    private Long createdAt;
    private Long updatedAt;
    private Long dueDate;
}
