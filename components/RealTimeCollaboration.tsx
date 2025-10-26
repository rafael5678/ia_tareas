"use client";

import { useState, useEffect } from "react";
import { Users, ChevronLeft, ChevronRight, Clock, Wifi } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { initSocket, getSocket } from "@/lib/socket";

interface OnlineUser {
  socketId: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "busy";
  connectedAt: Date;
}

interface CollabEvent {
  id: string;
  userId: string;
  userName: string;
  action: string;
  taskId?: string;
  timestamp: Date;
}

export default function RealTimeCollaboration() {
  const [isOpen, setIsOpen] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [events, setEvents] = useState<CollabEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Visitante",
    email: "user@example.com",
    avatar: "👨‍💻",
    status: "online" as const,
  });

  // Generar usuario aleatorio solo en el cliente
  useEffect(() => {
    setCurrentUser({
      name: "Visitante " + Math.floor(Math.random() * 1000),
      email: "user@example.com",
      avatar: ["👨‍💻", "👩‍💻", "👨‍🎓", "👩‍🎓", "🧑‍💼"][Math.floor(Math.random() * 5)],
      status: "online" as const,
    });
  }, []);

  useEffect(() => {
    const socket = initSocket();
    let hasJoined = false;

    socket.on('connect', () => {
      setIsConnected(true);
      // Unirse con información del usuario
      if (!hasJoined) {
        socket.emit('user:join', currentUser);
        hasJoined = true;
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Actualización de usuarios
    socket.on('users:update', (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    // Nuevos eventos de colaboración
    socket.on('collaboration:event', (event: CollabEvent) => {
      setEvents((prev) => [event, ...prev].slice(0, 50)); // Mantener últimos 50
    });

    // Enviar info del usuario cuando esté lista
    if (currentUser.name !== "Visitante") {
      socket.emit('user:join', currentUser);
    }

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('users:update');
      socket.off('collaboration:event');
    };
  }, [currentUser]);

  return (
    <div
      className={`bg-white border-l border-gray-200 transition-all duration-300 ${
        isOpen ? "w-80" : "w-0"
      } overflow-hidden relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-full bg-white border border-gray-200 rounded-l-lg p-2 hover:bg-gray-50 transition-colors z-10 shadow-md"
      >
        {isOpen ? (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Content */}
      <div className="h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">Colaboración</h3>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className={`w-4 h-4 ${isConnected ? 'text-green-500 animate-pulse' : 'text-red-500'}`} />
            <span className="text-xs text-gray-500">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>

        {/* Current User */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
              {currentUser.avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-800">Tú</p>
              <p className="text-xs text-gray-600">{currentUser.name}</p>
            </div>
            <div className="ml-auto">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Online Users */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
            En Línea Ahora
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              {onlineUsers.length}
            </span>
          </h4>
          {onlineUsers.length === 0 ? (
            <div className="text-center py-4 text-gray-400 text-sm">
              {isConnected ? "Esperando otros usuarios..." : "Conectando..."}
            </div>
          ) : (
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {onlineUsers.map((user) => (
                <div
                  key={user.socketId}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                      {user.avatar}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        user.status === "online" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {formatDistanceToNow(new Date(user.connectedAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <h4 className="text-sm font-semibold text-gray-600 mb-3">Actividad en Tiempo Real</h4>
          <div className="flex-1 overflow-y-auto space-y-3">
            {events.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No hay actividad reciente</p>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="p-3 bg-gray-50 rounded-lg animate-fade-in">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                      {event.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">{event.userName}</span>{" "}
                        {event.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(event.timestamp), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{onlineUsers.length}</p>
              <p className="text-xs text-gray-600">Online</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">{events.length}</p>
              <p className="text-xs text-gray-600">Eventos</p>
            </div>
          </div>
          
          <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold">
            <Users className="w-5 h-5" />
            Compartir Sesión
          </button>
        </div>
      </div>
    </div>
  );
}


