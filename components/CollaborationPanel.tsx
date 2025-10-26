"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Users, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function CollaborationPanel() {
  const { users, collaborationEvents } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-white border-l border-gray-200 transition-all duration-300 ${
        isOpen ? "w-80" : "w-0"
      } overflow-hidden`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-full bg-white border border-gray-200 rounded-l-lg p-2 hover:bg-gray-50 transition-colors"
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
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Colaboración</h3>
        </div>

        {/* Online Users */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-600 mb-3">En Línea ({users.filter(u => u.status === "online").length})</h4>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                    {user.avatar}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "busy"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <h4 className="text-sm font-semibold text-gray-600 mb-3">Actividad Reciente</h4>
          <div className="flex-1 overflow-y-auto space-y-3">
            {collaborationEvents.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No hay actividad reciente</p>
              </div>
            ) : (
              collaborationEvents.slice(-10).reverse().map((event) => (
                <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">
                        {event.userName.charAt(0).toUpperCase()}
                      </span>
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

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <Users className="w-5 h-5" />
            Invitar Colaborador
          </button>
        </div>
      </div>
    </div>
  );
}


