package com.taskmanager.dto;

import com.taskmanager.entity.Task.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {
    private String title;
    private String description;
    private TaskStatus status;
    private String category;
    private Long dueDate;
}
