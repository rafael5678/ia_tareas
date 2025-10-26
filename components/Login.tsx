"use client";

import { useState } from "react";
import { Shield, User, LogIn, Sparkles, Lock, Users } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
  const [loginType, setLoginType] = useState<'admin' | 'user' | null>(null);
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const { login, loginAsUser } = useAuthStore();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(adminName, adminPassword);
    if (success) {
      setError("");
    } else {
      setError("Credenciales incorrectas");
      // Limpiar después de 3 segundos
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsUser(userName || undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Side - Welcome */}
        <div className="flex flex-col justify-center space-y-6 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  IA Task Manager
                </h1>
                <p className="text-gray-600 mt-1">Tu asistente inteligente</p>
              </div>
            </div>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">IA Real Potente</h3>
                  <p className="text-sm text-gray-600">Respuestas inteligentes con Groq</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📸</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Análisis de Imágenes</h3>
                  <p className="text-sm text-gray-600">Sube fotos y la IA las analiza</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎤</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Entrada de Voz</h3>
                  <p className="text-sm text-gray-600">Habla y la IA te escribe</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Text-to-Speech</h3>
                  <p className="text-sm text-gray-600">Escucha las respuestas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Options */}
        <div className="flex flex-col justify-center animate-fade-in animation-delay-200">
          {!loginType ? (
            // Selección de tipo
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cómo deseas ingresar?</h2>
              
              {/* Admin Option */}
              <button
                onClick={() => setLoginType('admin')}
                className="w-full bg-white rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-purple-300 hover:shadow-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      Administrador
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Acceso completo con panel de control
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Lock className="w-4 h-4 text-purple-500" />
                      <span className="text-xs text-purple-600 font-medium">Requiere contraseña</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* User Option */}
              <button
                onClick={() => setLoginType('user')}
                className="w-full bg-white rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-blue-300 hover:shadow-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      Usuario
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Acceso rápido a todas las funcionalidades
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-blue-600 font-medium">Acceso inmediato</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ) : loginType === 'admin' ? (
            // Admin Login Form
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <button
                onClick={() => {
                  setLoginType(null);
                  setError("");
                }}
                className="text-sm text-gray-600 hover:text-gray-800 mb-6"
              >
                ← Volver
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Acceso de Administrador</h3>
                  <p className="text-sm text-gray-600">Ingresa tus credenciales</p>
                </div>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usuario
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Ingresar como Admin
                </button>
              </form>

              <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                <p className="text-xs text-purple-700 text-center">
                  💡 Como admin podrás ver estadísticas y usuarios conectados
                </p>
              </div>
            </div>
          ) : (
            // User Login Form
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <button
                onClick={() => {
                  setLoginType(null);
                  setError("");
                }}
                className="text-sm text-gray-600 hover:text-gray-800 mb-6"
              >
                ← Volver
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Acceso de Usuario</h3>
                  <p className="text-sm text-gray-600">Ingresa tu nombre (opcional)</p>
                </div>
              </div>

              <form onSubmit={handleUserLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre (Opcional)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Si no ingresas nombre, se generará uno automáticamente
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Ingresar
                </button>
              </form>

              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-blue-700 text-center">
                  ✨ Acceso rápido a todas las funciones de IA
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

