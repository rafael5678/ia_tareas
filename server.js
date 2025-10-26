// Servidor WebSocket para usuarios en tiempo real
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3002", "http://localhost:3000", "https://*.vercel.app"],
    methods: ["GET", "POST"]
  }
});

// Store de usuarios conectados
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('✅ Usuario conectado:', socket.id);

  // Usuario se une con su información
  socket.on('user:join', (userData) => {
    connectedUsers.set(socket.id, {
      ...userData,
      socketId: socket.id,
      connectedAt: new Date(),
    });

    // Notificar a todos los usuarios
    io.emit('users:update', Array.from(connectedUsers.values()));
    
    // Notificar evento de colaboración
    io.emit('collaboration:event', {
      id: Date.now().toString(),
      userId: socket.id,
      userName: userData.name,
      action: 'se unió a la sesión',
      timestamp: new Date(),
    });

    console.log(`👤 ${userData.name} se unió. Total usuarios: ${connectedUsers.size}`);
  });

  // Usuario actualiza su estado
  socket.on('user:status', (status) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.status = status;
      connectedUsers.set(socket.id, user);
      io.emit('users:update', Array.from(connectedUsers.values()));
    }
  });

  // Tarea creada
  socket.on('task:created', (data) => {
    io.emit('collaboration:event', {
      id: Date.now().toString(),
      userId: socket.id,
      userName: data.userName,
      action: `creó la tarea "${data.taskTitle}"`,
      taskId: data.taskId,
      timestamp: new Date(),
    });
  });

  // Tarea actualizada
  socket.on('task:updated', (data) => {
    io.emit('collaboration:event', {
      id: Date.now().toString(),
      userId: socket.id,
      userName: data.userName,
      action: `actualizó una tarea`,
      taskId: data.taskId,
      timestamp: new Date(),
    });
  });

  // Tarea completada
  socket.on('task:completed', (data) => {
    io.emit('collaboration:event', {
      id: Date.now().toString(),
      userId: socket.id,
      userName: data.userName,
      action: `completó la tarea "${data.taskTitle}"`,
      taskId: data.taskId,
      timestamp: new Date(),
    });
  });

  // Tarea eliminada
  socket.on('task:deleted', (data) => {
    io.emit('collaboration:event', {
      id: Date.now().toString(),
      userId: socket.id,
      userName: data.userName,
      action: `eliminó una tarea`,
      timestamp: new Date(),
    });
  });

  // Usuario se desconecta
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`👋 ${user.name} se desconectó. Total usuarios: ${connectedUsers.size - 1}`);
      
      // Notificar evento de desconexión
      io.emit('collaboration:event', {
        id: Date.now().toString(),
        userId: socket.id,
        userName: user.name,
        action: 'salió de la sesión',
        timestamp: new Date(),
      });
    }

    connectedUsers.delete(socket.id);
    io.emit('users:update', Array.from(connectedUsers.values()));
  });
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    users: connectedUsers.size,
    uptime: process.uptime(),
  });
});

const PORT = process.env.PORT || 3003;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor WebSocket corriendo en puerto ${PORT}`);
  console.log(`📡 Esperando conexiones...`);
});


