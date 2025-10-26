import { create } from 'zustand';
import { Task, User, CollaborationEvent } from '@/types';

interface AppState {
  tasks: Task[];
  users: User[];
  collaborationEvents: CollaborationEvent[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addCollaborationEvent: (event: CollaborationEvent) => void;
}

export const useStore = create<AppState>((set) => ({
  tasks: [
    {
      id: '1',
      title: 'Diseñar nueva interfaz de usuario',
      description: 'Crear mockups y prototipos para la nueva versión',
      status: 'in-progress',
      priority: 'high',
      tags: ['diseño', 'ui/ux'],
      assignedTo: ['user1'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      dueDate: new Date('2024-02-01'),
      aiSuggestions: ['Considera usar un sistema de diseño moderno', 'Prioriza la accesibilidad'],
    },
    {
      id: '2',
      title: 'Implementar autenticación',
      description: 'Configurar sistema de login y registro de usuarios',
      status: 'todo',
      priority: 'urgent',
      tags: ['backend', 'seguridad'],
      assignedTo: ['user2'],
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date(),
      dueDate: new Date('2024-01-25'),
      aiSuggestions: ['Usa OAuth 2.0', 'Implementa 2FA para mayor seguridad'],
    },
    {
      id: '3',
      title: 'Optimizar base de datos',
      description: 'Mejorar queries y añadir índices',
      status: 'completed',
      priority: 'medium',
      tags: ['backend', 'performance'],
      assignedTo: ['user1', 'user2'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
      dueDate: new Date('2024-01-20'),
    },
    {
      id: '4',
      title: 'Crear documentación técnica',
      description: 'Documentar APIs y componentes',
      status: 'todo',
      priority: 'low',
      tags: ['documentación'],
      assignedTo: [],
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date(),
    },
    {
      id: '5',
      title: 'Testing end-to-end',
      description: 'Implementar tests automatizados',
      status: 'in-progress',
      priority: 'high',
      tags: ['testing', 'qa'],
      assignedTo: ['user2'],
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date(),
      dueDate: new Date('2024-01-30'),
    },
  ],
  users: [
    {
      id: 'user1',
      name: 'María García',
      email: 'maria@example.com',
      avatar: '👩‍💻',
      status: 'online',
    },
    {
      id: 'user2',
      name: 'Carlos López',
      email: 'carlos@example.com',
      avatar: '👨‍💼',
      status: 'online',
    },
    {
      id: 'user3',
      name: 'Ana Martínez',
      email: 'ana@example.com',
      avatar: '👩‍🎨',
      status: 'busy',
    },
  ],
  collaborationEvents: [],
  
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
      collaborationEvents: [
        ...state.collaborationEvents,
        {
          id: Date.now().toString(),
          userId: 'current-user',
          userName: 'Tú',
          action: `creó la tarea "${task.title}"`,
          taskId: task.id,
          timestamp: new Date(),
        },
      ],
    })),
  
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
      ),
      collaborationEvents: [
        ...state.collaborationEvents,
        {
          id: Date.now().toString(),
          userId: 'current-user',
          userName: 'Tú',
          action: `actualizó una tarea`,
          taskId: id,
          timestamp: new Date(),
        },
      ],
    })),
  
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      collaborationEvents: [
        ...state.collaborationEvents,
        {
          id: Date.now().toString(),
          userId: 'current-user',
          userName: 'Tú',
          action: `eliminó una tarea`,
          timestamp: new Date(),
        },
      ],
    })),
  
  addCollaborationEvent: (event) =>
    set((state) => ({
      collaborationEvents: [...state.collaborationEvents, event],
    })),
}));


