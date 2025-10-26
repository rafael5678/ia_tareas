export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed" | "archived";
  priority: "low" | "medium" | "high" | "urgent";
  tags: string[];
  assignedTo: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  aiSuggestions?: string[];
  subtasks?: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "offline" | "busy";
}

export interface Analytics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  completionRate: number;
  productivityScore: number;
  weeklyActivity: {
    day: string;
    tasks: number;
  }[];
  tasksByPriority: {
    priority: string;
    count: number;
  }[];
}

export interface AIResponse {
  suggestion: string;
  confidence: number;
  relatedTasks?: string[];
}

export interface CollaborationEvent {
  id: string;
  userId: string;
  userName: string;
  action: string;
  taskId?: string;
  timestamp: Date;
}


