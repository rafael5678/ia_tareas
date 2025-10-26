"use client";

import { useStore } from "@/store/useStore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, CheckCircle2, Clock, AlertCircle, Target, Zap } from "lucide-react";

export default function Dashboard() {
  const { tasks } = useStore();

  // Calculate analytics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
  const todoTasks = tasks.filter(t => t.status === "todo").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Weekly activity data
  const weeklyActivity = [
    { day: "Lun", tasks: 8 },
    { day: "Mar", tasks: 12 },
    { day: "Mié", tasks: 10 },
    { day: "Jue", tasks: 15 },
    { day: "Vie", tasks: 13 },
    { day: "Sáb", tasks: 6 },
    { day: "Dom", tasks: 4 },
  ];

  // Tasks by priority
  const priorityData = [
    { name: "Urgente", value: tasks.filter(t => t.priority === "urgent").length, color: "#ef4444" },
    { name: "Alta", value: tasks.filter(t => t.priority === "high").length, color: "#f59e0b" },
    { name: "Media", value: tasks.filter(t => t.priority === "medium").length, color: "#3b82f6" },
    { name: "Baja", value: tasks.filter(t => t.priority === "low").length, color: "#10b981" },
  ];

  // Productivity trend
  const productivityTrend = [
    { week: "Sem 1", score: 75 },
    { week: "Sem 2", score: 82 },
    { week: "Sem 3", score: 88 },
    { week: "Sem 4", score: 91 },
  ];

  const stats = [
    {
      title: "Total de Tareas",
      value: totalTasks,
      icon: Target,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Completadas",
      value: completedTasks,
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "En Progreso",
      value: inProgressTasks,
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Tasa de Éxito",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
            <div className={`mt-4 h-2 bg-gradient-to-r ${stat.color} rounded-full`}></div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">Actividad Semanal</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="tasks" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks by Priority */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-800">Tareas por Prioridad</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Productivity Trend */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-800">Tendencia de Productividad</h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={productivityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#888" />
            <YAxis stroke="#888" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tareas Recientes</h3>
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-500"
                      : task.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.tags.join(", ")}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  task.priority === "urgent"
                    ? "bg-red-100 text-red-700"
                    : task.priority === "high"
                    ? "bg-orange-100 text-orange-700"
                    : task.priority === "medium"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


