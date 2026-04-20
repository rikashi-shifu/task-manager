package com.taskmanager.entity;

public enum TaskCategory {
    WORK("Work"),
    PERSONAL("Personal"),
    SHOPPING("Shopping"),
    HEALTH("Health"),
    FINANCE("Finance"),
    LEARNING("Learning"),
    HOME("Home"),
    ENTERTAINMENT("Entertainment");

    private final String displayName;

    TaskCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static TaskCategory fromString(String value) {
        for (TaskCategory category : TaskCategory.values()) {
            if (category.displayName.equalsIgnoreCase(value)) {
                return category;
            }
        }
        throw new IllegalArgumentException("Unknown category: " + value);
    }
}
