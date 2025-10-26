"use client";

import { useState } from "react";
import { LogOut, Shield, User } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import TaskManager from "@/components/TaskManager";
import AIAssistantUniversal from "@/components/AIAssistantUniversal";
import RealTimeCollaboration from "@/components/RealTimeCollaboration";
import Login from "@/components/Login";
import AdminPanel from "@/components/AdminPanel";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  const [activeView, setActiveView] = useState<"dashboard" | "tasks" | "ai" | "admin">("dashboard");
  const { isAuthenticated, currentUser, logout } = useAuthStore();

  const handleLogout = () => {
    if (confirm('¿Estás seguro que deseas salir?')) {
      logout();
    }
  };

  // Si no está autenticado, mostrar login
  if (!isAuthenticated || !currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} isAdmin={currentUser.type === 'admin'} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col w-full">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                {activeView === "dashboard" && "Dashboard"}
                {activeView === "tasks" && "Gestión de Tareas"}
                {activeView === "ai" && "Asistente IA"}
                {activeView === "admin" && "Panel Admin"}
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm mt-0.5 md:mt-1 line-clamp-1">
                {activeView === "dashboard" && "Visualiza tus métricas"}
                {activeView === "tasks" && "Organiza tus tareas"}
                {activeView === "ai" && "Asistente inteligente"}
                {activeView === "admin" && "Gestiona usuarios"}
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
              {/* User Badge */}
              <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-full ${
                currentUser.type === 'admin' 
                  ? 'bg-purple-100' 
                  : 'bg-blue-100'
              }`}>
                {currentUser.type === 'admin' ? (
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                ) : (
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                )}
                <span className={`text-xs sm:text-sm font-medium hidden sm:inline ${
                  currentUser.type === 'admin' ? 'text-purple-700' : 'text-blue-700'
                }`}>
                  {currentUser.name}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 md:py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeView === "dashboard" && <Dashboard />}
            {activeView === "tasks" && <TaskManager />}
            {activeView === "ai" && <AIAssistantUniversal />}
            {activeView === "admin" && currentUser.type === 'admin' && <AdminPanel />}
          </div>
        </div>
      </main>

      {/* Real-Time Collaboration Panel - Hidden on mobile */}
      {activeView !== "admin" && (
        <div className="hidden xl:block">
          <RealTimeCollaboration />
        </div>
      )}
    </div>
  );
}

