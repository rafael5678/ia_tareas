"use client";

import { useState } from "react";
import { Sparkles, Send, Lightbulb, TrendingUp, AlertCircle, Calendar } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function AIAssistant() {
  const { tasks } = useStore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([
    {
      role: "ai",
      content: "¡Hola! Soy tu asistente de IA. Puedo ayudarte a organizar tareas, sugerir prioridades y optimizar tu productividad. ¿En qué puedo ayudarte hoy?",
    },
  ]);

  const aiSuggestions = [
    {
      icon: Lightbulb,
      title: "Optimizar Prioridades",
      description: "Reorganiza tus tareas según urgencia e impacto",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Análisis de Productividad",
      description: "Obtén insights sobre tu rendimiento",
      color: "from-green-400 to-blue-500",
    },
    {
      icon: AlertCircle,
      title: "Detectar Cuellos de Botella",
      description: "Identifica tareas que están bloqueadas",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: Calendar,
      title: "Planificación Semanal",
      description: "Crea un plan optimizado para la semana",
      color: "from-purple-400 to-indigo-500",
    },
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user" as const, content: message }];
    setMessages(newMessages);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages([...newMessages, { role: "ai" as const, content: aiResponse }]);
    }, 1000);

    setMessage("");
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("prioridad") || lowerMessage.includes("urgente")) {
      return "He analizado tus tareas y te recomiendo priorizar:\n\n1. 'Implementar autenticación' - Es urgente y tiene fecha límite próxima\n2. 'Testing end-to-end' - Alta prioridad y necesaria para el lanzamiento\n3. 'Diseñar nueva interfaz' - En progreso, mantén el momentum\n\n¿Quieres que ajuste las prioridades automáticamente?";
    }

    if (lowerMessage.includes("productividad") || lowerMessage.includes("análisis")) {
      return `Basado en tus ${tasks.length} tareas:\n\n✅ Completadas: ${tasks.filter(t => t.status === "completed").length} (Excelente trabajo!)\n⏳ En progreso: ${tasks.filter(t => t.status === "in-progress").length}\n📋 Pendientes: ${tasks.filter(t => t.status === "todo").length}\n\nTu tasa de completación es del ${Math.round((tasks.filter(t => t.status === "completed").length / tasks.length) * 100)}%. ¡Sigue así!`;
    }

    if (lowerMessage.includes("bloqueada") || lowerMessage.includes("cuello")) {
      return "He detectado que 'Implementar autenticación' lleva 5 días en estado 'Por Hacer' sin cambios. Posibles razones:\n\n- Falta de especificaciones claras\n- Dependencias bloqueadas\n- Requiere revisión de seguridad\n\n¿Quieres que sugiera pasos concretos para desbloquearla?";
    }

    if (lowerMessage.includes("plan") || lowerMessage.includes("semana")) {
      return "Aquí está tu plan optimizado para esta semana:\n\n📅 Lunes-Martes: Finalizar autenticación\n📅 Miércoles-Jueves: Testing end-to-end\n📅 Viernes: Revisión y documentación\n\nEsto te permitirá completar 3 tareas de alta prioridad. ¿Te parece bien?";
    }

    return "Interesante pregunta. Basándome en tus tareas actuales y patrones de trabajo, te recomiendo:\n\n1. Dividir tareas grandes en subtareas más pequeñas\n2. Establecer fechas límite claras\n3. Usar etiquetas para mejor organización\n\n¿Hay algo específico en lo que pueda ayudarte?";
  };

  const handleSuggestionClick = (title: string) => {
    setMessage(`Dame sugerencias sobre: ${title}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      {/* Chat Area */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-[calc(100vh-250px)]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Asistente IA</h3>
            <p className="text-sm text-gray-500">Siempre listo para ayudarte</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions Sidebar */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Sugerencias Rápidas</h3>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.title)}
                className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${suggestion.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <suggestion.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {suggestion.title}
                    </p>
                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Stats */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">Estadísticas IA</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Sugerencias dadas</span>
              <span className="font-bold text-xl">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tareas optimizadas</span>
              <span className="font-bold text-xl">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tiempo ahorrado</span>
              <span className="font-bold text-xl">8.5h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


