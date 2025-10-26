"use client";

import { LayoutDashboard, ListTodo, Sparkles, Settings, Users, Shield } from "lucide-react";

interface SidebarProps {
  activeView: "dashboard" | "tasks" | "ai" | "admin";
  setActiveView: (view: "dashboard" | "tasks" | "ai" | "admin") => void;
  isAdmin?: boolean;
}

export default function Sidebar({ activeView, setActiveView, isAdmin = false }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "tasks", icon: ListTodo, label: "Tareas" },
    { id: "ai", icon: Sparkles, label: "Asistente IA" },
    ...(isAdmin ? [{ id: "admin", icon: Shield, label: "Panel Admin" }] : []),
  ];

  return (
    <aside className="w-72 bg-white/90 backdrop-blur-md border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">TaskAI Pro</h2>
            <p className="text-xs text-gray-500">Gestión Inteligente</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === item.id
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            JR
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">Juan Rafael</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <Settings className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </aside>
  );
}


