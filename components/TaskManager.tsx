"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Plus, Search, Filter, Calendar, User, Tag, Trash2, Edit, CheckCircle2 } from "lucide-react";
import { Task } from "@/types";

export default function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusColors = {
    todo: "bg-gray-100 text-gray-700 border-gray-300",
    "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-300",
    completed: "bg-green-100 text-green-700 border-green-300",
    archived: "bg-purple-100 text-purple-700 border-purple-300",
  };

  const priorityColors = {
    low: "bg-blue-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    urgent: "bg-red-500",
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "Nueva Tarea",
      description: "",
      status: "todo",
      priority: "medium",
      tags: [],
      assignedTo: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addTask(newTask);
    setEditingTask(newTask);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Todas</option>
              <option value="todo">Por Hacer</option>
              <option value="in-progress">En Progreso</option>
              <option value="completed">Completadas</option>
            </select>

            <button
              onClick={handleAddTask}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Nueva Tarea
            </button>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            {/* Priority Bar */}
            <div className={`w-full h-1 ${priorityColors[task.priority]} rounded-full mb-4`}></div>

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800 flex-1">{task.title}</h3>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${statusColors[task.status]}`}
              >
                {task.status === "todo" && "Por Hacer"}
                {task.status === "in-progress" && "En Progreso"}
                {task.status === "completed" && "Completada"}
                {task.status === "archived" && "Archivada"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {task.description || "Sin descripción"}
            </p>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                {new Date(task.dueDate).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            )}

            {/* AI Suggestions */}
            {task.aiSuggestions && task.aiSuggestions.length > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-purple-700 mb-1">💡 Sugerencia IA:</p>
                <p className="text-xs text-purple-600">{task.aiSuggestions[0]}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => updateTask(task.id, { 
                  status: task.status === "completed" ? "todo" : "completed" 
                })}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {task.status === "completed" ? "Reabrir" : "Completar"}
                </span>
              </button>
              <button
                onClick={() => setEditingTask(task)}
                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron tareas</h3>
          <p className="text-gray-600">Intenta con otros términos de búsqueda o crea una nueva tarea</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Tarea</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    value={editingTask.status}
                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="todo">Por Hacer</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="completed">Completada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  updateTask(editingTask.id, editingTask);
                  setEditingTask(null);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


