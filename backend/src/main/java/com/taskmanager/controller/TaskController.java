package com.taskmanager.controller;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.TaskResponse;
import com.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(Authentication authentication, @RequestBody TaskRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        TaskResponse response = taskService.createTask(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(Authentication authentication,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        Long userId = (Long) authentication.getPrincipal();
        List<TaskResponse> tasks;

        if (search != null && !search.isEmpty()) {
            tasks = taskService.searchTasksByTitle(userId, search);
        } else if (status != null && !status.isEmpty()) {
            tasks = taskService.getUserTasksByStatus(userId, status);
        } else if (category != null && !category.isEmpty()) {
            tasks = taskService.getUserTasksByCategory(userId, category);
        } else {
            tasks = taskService.getUserTasks(userId);
        }

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTask(Authentication authentication, @PathVariable Long id) {
        Long userId = (Long) authentication.getPrincipal();
        TaskResponse response = taskService.getTask(userId, id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(Authentication authentication, @PathVariable Long id,
            @RequestBody TaskRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        TaskResponse response = taskService.updateTask(userId, id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(Authentication authentication, @PathVariable Long id) {
        Long userId = (Long) authentication.getPrincipal();
        taskService.deleteTask(userId, id);
        return ResponseEntity.noContent().build();
    }
}
