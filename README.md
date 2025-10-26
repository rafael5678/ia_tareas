# 🎓 TaskAI Pro - Asistente Inteligente para Tareas Universitarias

Una aplicación web completa con **Inteligencia Artificial** para ayudar a estudiantes universitarios con sus tareas, ejercicios y estudios.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Características Principales

### 🤖 Asistente IA Universal
- **Análisis de texto** con Groq (ultrarrápido y gratuito)
- **Análisis de imágenes** con Google Gemini Vision
- Resuelve problemas de:
  - 🔢 Matemáticas (álgebra, geometría, estadística)
  - 📐 Cálculo (derivadas, integrales, límites)
  - 📚 Inglés (traducciones, gramática, vocabulario)
  - 💻 Programación (JavaScript, Python, algoritmos)
  - 🧪 Física y Química
  - Y más...

### 🎤 Control por Voz
- **Text-to-Speech**: Escucha las respuestas de la IA
- **Speech-to-Text**: Dicta tus preguntas con el micrófono

### 📸 Análisis de Imágenes
- Sube fotos de ejercicios, diagramas o textos
- La IA analiza y resuelve problemas automáticamente
- Soporta ecuaciones escritas a mano

### 💾 Historial de Conversaciones
- Guarda tus conversaciones con la IA
- Organiza por temas o materias
- Recupera respuestas anteriores fácilmente

### 👥 Sistema de Usuarios
- **Modo Administrador**: Panel con estadísticas de uso
- **Modo Usuario**: Acceso rápido sin contraseña
- Seguimiento de sesiones en tiempo real

### 📊 Gestión de Tareas
- Crea, edita y organiza tus tareas
- Marca prioridades y plazos
- Vista de dashboard con estadísticas

### 🌐 Colaboración en Tiempo Real
- Ve usuarios conectados en vivo
- WebSocket para actualizaciones instantáneas

---

## 🚀 Instalación Rápida

### Requisitos Previos
- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **npm** o **yarn**

### 1. Clonar el repositorio
```bash
git clone https://github.com/rafael5678/ia_tareas.git
cd ia_tareas
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar las API Keys (GRATIS)

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# GROQ API - Para respuestas de texto ultrarrápidas (GRATIS)
# Obtén tu key en: https://console.groq.com/
GROQ_API_KEY=tu_key_de_groq_aqui

# GEMINI API - Para análisis de imágenes (GRATIS)
# Obtén tu key en: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=tu_key_de_gemini_aqui
```

**Importante**: Ambas APIs son **100% GRATUITAS** y no requieren tarjeta de crédito.

### 4. Iniciar el servidor
```bash
npm run dev:all
```

Abre tu navegador en: **http://localhost:3002**

---

## 🔑 Obtener las API Keys (2 minutos)

### Groq API (Texto)
1. Ve a [console.groq.com](https://console.groq.com/)
2. Regístrate con Google/GitHub
3. Click en "Create API Key"
4. Copia y pega en `.env.local`

### Google Gemini API (Imágenes)
1. Ve a [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Inicia sesión con Gmail
3. Click en "Create API Key"
4. Copia y pega en `.env.local`

---

## 📖 Guías de Uso

### Para Estudiantes

#### Resolver problemas de matemáticas con imagen:
1. Ve a **Asistente IA**
2. Click en el botón **📷**
3. Sube una foto de tu ejercicio
4. Escribe: *"Resuelve estos problemas paso a paso"*
5. ¡La IA te dará la solución completa!

#### Ayuda con inglés:
```
Usuario: "Traduce al inglés: 'Estoy estudiando para mi examen'"
IA: "I am studying for my exam" + explicación gramatical
```

#### Ayuda con programación:
```
Usuario: "Explícame qué hace este código: [pega código]"
IA: Explicación línea por línea + optimizaciones
```

### Para Administradores

**Contraseña de admin**: `rafael`

1. Inicia sesión como Admin
2. Ve a **Panel Admin**
3. Ve estadísticas de:
   - Total de accesos
   - Usuarios activos
   - Duración de sesiones
   - Actividad reciente

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React con SSR
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos modernos
- **Lucide Icons** - Iconografía

### Backend
- **Next.js API Routes** - Endpoints serverless
- **Socket.io** - WebSocket en tiempo real
- **Node.js** - Servidor

### Inteligencia Artificial
- **Groq Cloud** - Llama 3.3 70B (texto ultrarrápido)
- **Google Gemini** - Gemini 1.5 Flash (visión + texto)

### Estado y Storage
- **Zustand** - Gestión de estado global
- **LocalStorage** - Persistencia del lado del cliente

---

## 📁 Estructura del Proyecto

```
ia_tareas/
├── app/                      # Next.js 14 App Router
│   ├── page.tsx             # Página principal
│   ├── api/
│   │   └── ai/
│   │       └── route.ts     # Endpoint de IA
│   ├── globals.css          # Estilos globales
│   └── layout.tsx           # Layout principal
├── components/              # Componentes React
│   ├── AIAssistantUniversal.tsx  # Asistente IA
│   ├── Dashboard.tsx        # Dashboard de estadísticas
│   ├── TaskManager.tsx      # Gestor de tareas
│   ├── Login.tsx           # Sistema de login
│   ├── AdminPanel.tsx      # Panel de administrador
│   ├── Sidebar.tsx         # Barra lateral
│   └── RealTimeCollaboration.tsx  # Colaboración en vivo
├── store/                   # Zustand stores
│   ├── useStore.ts         # Store de tareas
│   └── useAuthStore.ts     # Store de autenticación
├── server.js               # Servidor WebSocket
├── .env.local              # Variables de entorno (no subir a git)
├── package.json            # Dependencias
└── README.md              # Este archivo
```

---

## 🎯 Casos de Uso

### Matemáticas
✅ Resolver ecuaciones de segundo grado  
✅ Simplificar expresiones algebraicas  
✅ Calcular límites y derivadas  
✅ Análisis de funciones

### Física
✅ Problemas de cinemática  
✅ Análisis de circuitos eléctricos  
✅ Leyes de Newton  
✅ Termodinámica

### Programación
✅ Debugging de código  
✅ Explicación de algoritmos  
✅ Optimización de rendimiento  
✅ Diseño de estructuras de datos

### Idiomas
✅ Traducciones contextuales  
✅ Corrección gramatical  
✅ Práctica de conversación  
✅ Vocabulario académico

---

## 🔒 Seguridad

- ✅ Las API keys están en `.env.local` (no se suben a GitHub)
- ✅ Autenticación de usuarios (admin/usuario)
- ✅ Validación de entrada en todos los endpoints
- ✅ HTTPS en producción (recomendado)

---

## 🚀 Despliegue en Producción

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Agrega las variables de entorno:
   - `GROQ_API_KEY`
   - `GEMINI_API_KEY`
5. Deploy automático

### Variables de Entorno en Vercel
```
GROQ_API_KEY=gsk_...
GEMINI_API_KEY=AIzaSy...
```

---

## 🐛 Solución de Problemas

### Error: "concurrently no se reconoce"
```bash
npm install
```

### Error: "EADDRINUSE: address already in use"
```bash
# Windows
taskkill /F /PID <PID>

# Linux/Mac
kill -9 <PID>
```

### Error: "Groq API error: Unauthorized"
- Verifica que tu `GROQ_API_KEY` esté correcta en `.env.local`
- Reinicia el servidor: `Ctrl+C` → `npm run dev:all`

### Error: "Gemini API error: Not Found"
- Verifica que tu `GEMINI_API_KEY` esté correcta
- Asegúrate de que no tenga espacios al inicio/final

---

## 📚 Documentación Adicional

- [CONFIGURAR-GROQ.md](./CONFIGURAR-GROQ.md) - Setup de Groq API
- [CONFIGURAR-GEMINI.md](./CONFIGURAR-GEMINI.md) - Setup de Gemini API
- [ANALISIS-IMAGENES-FUNCIONANDO.md](./ANALISIS-IMAGENES-FUNCIONANDO.md) - Arquitectura de visión
- [SISTEMA-AUTENTICACION.md](./SISTEMA-AUTENTICACION.md) - Sistema de usuarios

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📝 Roadmap

### Próximas Funcionalidades
- [ ] 📊 Generación de gráficos y diagramas
- [ ] 📄 Exportar conversaciones a PDF
- [ ] 🌙 Modo oscuro
- [ ] 📸 Captura de pantalla integrada
- [ ] 🌍 Soporte multiidioma (inglés, portugués)
- [ ] 📱 App móvil (React Native)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Rafael**
- GitHub: [@rafael5678](https://github.com/rafael5678)
- Proyecto: [ia_tareas](https://github.com/rafael5678/ia_tareas)

---

## 🌟 ¡Apóyanos!

Si este proyecto te ayudó con tus estudios, dale una ⭐️ en GitHub!

---

## 📞 Soporte

¿Necesitas ayuda? Abre un [Issue](https://github.com/rafael5678/ia_tareas/issues) en GitHub.

---

**Hecho con ❤️ para estudiantes universitarios**
