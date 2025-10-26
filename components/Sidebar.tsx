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
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 safe-bottom">
        <div className="flex items-center justify-around py-2 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[70px] ${
                activeView === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-white/90 backdrop-blur-md border-r border-gray-200 flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-4 xl:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-800 truncate">TaskAI Pro</h2>
              <p className="text-xs text-gray-500 truncate">Gestión Inteligente</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 xl:p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 xl:px-4 py-2.5 xl:py-3 rounded-xl transition-all ${
                activeView === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-3 xl:p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2 xl:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              JR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs xl:text-sm font-semibold text-gray-800 truncate">Juan Rafael</p>
              <p className="text-[10px] xl:text-xs text-gray-500 truncate">Admin</p>
            </div>
            <Settings className="w-4 h-4 xl:w-5 xl:h-5 text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}


