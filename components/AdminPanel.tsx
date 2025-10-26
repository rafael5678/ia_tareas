"use client";

import { Shield, Users, Activity, Clock, TrendingUp, UserCheck, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function AdminPanel() {
  const { userLogs, currentUser } = useAuthStore();

  // Estadísticas
  const totalUsers = userLogs.length;
  const activeUsers = userLogs.filter(log => !log.logoutTime).length;
  const adminLogins = userLogs.filter(log => log.type === 'admin').length;
  const userLogins = userLogs.filter(log => log.type === 'user').length;

  // Usuarios únicos por nombre
  const uniqueUsers = new Set(userLogs.map(log => log.name)).size;

  // Tiempo promedio de sesión
  const completedSessions = userLogs.filter(log => log.logoutTime);
  const avgSessionTime = completedSessions.length > 0
    ? completedSessions.reduce((acc, log) => {
        const duration = (log.logoutTime! - log.loginTime) / 1000 / 60; // minutos
        return acc + duration;
      }, 0) / completedSessions.length
    : 0;

  // Últimos 10 accesos
  const recentLogs = [...userLogs].sort((a, b) => b.loginTime - a.loginTime).slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Panel de Administrador
                </h1>
                <p className="text-gray-600 mt-1">Bienvenido, {currentUser?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">Admin Activo</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Usuarios */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{totalUsers}</h3>
            <p className="text-sm text-gray-600 mt-1">Total de Accesos</p>
            <p className="text-xs text-gray-500 mt-2">{uniqueUsers} usuarios únicos</p>
          </div>

          {/* Usuarios Activos */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{activeUsers}</h3>
            <p className="text-sm text-gray-600 mt-1">Activos Ahora</p>
            <p className="text-xs text-gray-500 mt-2">Sesiones sin cerrar</p>
          </div>

          {/* Logins de Admin */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{adminLogins}</h3>
            <p className="text-sm text-gray-600 mt-1">Accesos Admin</p>
            <p className="text-xs text-gray-500 mt-2">Administradores</p>
          </div>

          {/* Tiempo Promedio */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{avgSessionTime.toFixed(1)}m</h3>
            <p className="text-sm text-gray-600 mt-1">Sesión Promedio</p>
            <p className="text-xs text-gray-500 mt-2">{completedSessions.length} sesiones completadas</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Actividad Reciente</h2>
              <p className="text-sm text-gray-600">Últimos 10 accesos al sistema</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Usuario</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tipo</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Ingreso</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Duración</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => {
                  const duration = log.logoutTime
                    ? ((log.logoutTime - log.loginTime) / 1000 / 60).toFixed(0) + 'm'
                    : 'Activo';
                  
                  return (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            log.type === 'admin' 
                              ? 'bg-gradient-to-br from-purple-500 to-indigo-600' 
                              : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                          }`}>
                            {log.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{log.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.type === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {log.type === 'admin' ? 'Admin' : 'Usuario'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatDistanceToNow(new Date(log.loginTime), { addSuffix: true, locale: es })}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {duration}
                      </td>
                      <td className="py-4 px-4">
                        {log.logoutTime ? (
                          <span className="flex items-center gap-2 text-sm text-gray-500">
                            <LogOut className="w-4 h-4" />
                            Desconectado
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-sm text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            En línea
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {recentLogs.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay actividad registrada aún</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

