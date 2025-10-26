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
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} isAdmin={currentUser.type === 'admin'} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {activeView === "dashboard" && "Dashboard"}
                {activeView === "tasks" && "Gestión de Tareas"}
                {activeView === "ai" && "Asistente IA"}
                {activeView === "admin" && "Panel de Administrador"}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {activeView === "dashboard" && "Visualiza tus métricas y estadísticas"}
                {activeView === "tasks" && "Organiza y gestiona tus tareas"}
                {activeView === "ai" && "Obtén sugerencias inteligentes con IA"}
                {activeView === "admin" && "Gestiona usuarios y estadísticas del sistema"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* User Badge */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                currentUser.type === 'admin' 
                  ? 'bg-purple-100' 
                  : 'bg-blue-100'
              }`}>
                {currentUser.type === 'admin' ? (
                  <Shield className="w-4 h-4 text-purple-600" />
                ) : (
                  <User className="w-4 h-4 text-blue-600" />
                )}
                <span className={`text-sm font-medium ${
                  currentUser.type === 'admin' ? 'text-purple-700' : 'text-blue-700'
                }`}>
                  {currentUser.name}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Salir</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {activeView === "dashboard" && <Dashboard />}
            {activeView === "tasks" && <TaskManager />}
            {activeView === "ai" && <AIAssistantUniversal />}
            {activeView === "admin" && currentUser.type === 'admin' && <AdminPanel />}
          </div>
        </div>
      </main>

      {/* Real-Time Collaboration Panel */}
      {activeView !== "admin" && <RealTimeCollaboration />}
    </div>
  );
}

