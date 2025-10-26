# 🏗️ Arquitectura del Proyecto - AI Task Manager Pro

## 📂 Estructura de Carpetas

```
ai-task-manager/
│
├── 📁 app/                          # Next.js App Router
│   ├── layout.tsx                   # Layout principal de la app
│   ├── page.tsx                     # Página principal/home
│   └── globals.css                  # Estilos globales + Tailwind
│
├── 📁 components/                   # Componentes React
│   ├── Sidebar.tsx                  # Barra lateral de navegación
│   ├── Dashboard.tsx                # Vista de analytics y métricas
│   ├── TaskManager.tsx              # CRUD de tareas
│   ├── AIAssistant.tsx              # Chat con IA
│   └── CollaborationPanel.tsx       # Panel de colaboración
│
├── 📁 store/                        # Estado global
│   └── useStore.ts                  # Zustand store
│
├── 📁 types/                        # TypeScript types
│   └── index.ts                     # Interfaces y tipos
│
├── 📁 public/                       # Archivos estáticos
│   └── (imágenes, iconos, etc.)
│
├── 📄 package.json                  # Dependencias del proyecto
├── 📄 tsconfig.json                 # Configuración TypeScript
├── 📄 tailwind.config.ts            # Configuración Tailwind CSS
├── 📄 postcss.config.mjs            # Configuración PostCSS
├── 📄 next.config.mjs               # Configuración Next.js
├── 📄 next-env.d.ts                 # Types de Next.js
│
├── 📖 README.md                     # Documentación principal
├── 📖 INSTALACION.md                # Guía de instalación
├── 📖 TUTORIAL.md                   # Tutorial completo
├── 📖 FEATURES.md                   # Características detalladas
├── 📖 ARQUITECTURA.md               # Este archivo
│
├── 📄 .gitignore                    # Archivos ignorados por Git
└── 📄 env.example.txt               # Variables de entorno ejemplo
```

---

## 🎨 Flujo de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                         app/layout.tsx                          │
│                    (Layout Global HTML)                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         app/page.tsx                            │
│                   (Página Principal)                            │
│                                                                 │
│  ┌──────────────┐  ┌─────────────────────┐  ┌──────────────┐  │
│  │   Sidebar    │  │   Main Content      │  │ Collaboration│  │
│  │              │  │                     │  │    Panel     │  │
│  │  - Dashboard │  │  [activeView]:      │  │              │  │
│  │  - Tasks     │  │  • Dashboard        │  │  - Users     │  │
│  │  - AI        │  │  • TaskManager      │  │  - Activity  │  │
│  │              │  │  • AIAssistant      │  │              │  │
│  └──────────────┘  └─────────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos (Zustand Store)

```
┌──────────────────────────────────────────────────────────┐
│                    useStore (Zustand)                    │
│                                                          │
│  State:                                                  │
│  ├── tasks: Task[]                                       │
│  ├── users: User[]                                       │
│  └── collaborationEvents: CollaborationEvent[]          │
│                                                          │
│  Actions:                                                │
│  ├── addTask(task)                                       │
│  ├── updateTask(id, updates)                            │
│  └── deleteTask(id)                                      │
└──────────────────────────────────────────────────────────┘
                           │
                           │ (suscribe)
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Dashboard   │  │ TaskManager  │  │Collaboration │
│              │  │              │  │    Panel     │
│  • Lee tasks │  │  • CRUD      │  │  • Users     │
│  • Calcula   │  │  • Filtros   │  │  • Events    │
│    analytics │  │  • Búsqueda  │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🧩 Componentes Detallados

### 1️⃣ Sidebar.tsx
```
Responsabilidad: Navegación principal
Props:
  - activeView: string
  - setActiveView: function

Layout:
  ┌─────────────┐
  │   Logo      │
  ├─────────────┤
  │ Dashboard   │ ← Button
  │ Tareas      │ ← Button
  │ IA          │ ← Button
  ├─────────────┤
  │   User      │
  └─────────────┘

Tecnologías:
  - Flexbox (flex-col)
  - Lucide Icons
  - Tailwind Gradients
```

### 2️⃣ Dashboard.tsx
```
Responsabilidad: Analytics y métricas
Data Source: useStore()

Secciones:
  1. Stats Cards (Grid 4 cols)
     ├── Total Tasks
     ├── Completed
     ├── In Progress
     └── Success Rate
  
  2. Charts (Grid 2 cols)
     ├── Weekly Activity (Bar Chart)
     └── Priority Distribution (Pie Chart)
  
  3. Productivity Trend (Full width)
     └── Line Chart
  
  4. Recent Tasks (Full width)
     └── List of last 5 tasks

Librerías:
  - Recharts (gráficos)
  - date-fns (fechas)
  - Lucide (iconos)
```

### 3️⃣ TaskManager.tsx
```
Responsabilidad: CRUD de tareas
Data Source: useStore()

Layout:
  ┌─────────────────────────────────┐
  │  Search | Filter | New Task    │
  ├─────────────────────────────────┤
  │  ┌────┐  ┌────┐  ┌────┐        │
  │  │Task│  │Task│  │Task│  Grid  │
  │  └────┘  └────┘  └────┘  3cols │
  └─────────────────────────────────┘

Funcionalidades:
  - Create: Modal de creación
  - Read: Grid de cards
  - Update: Modal de edición
  - Delete: Botón eliminar
  - Search: Input en tiempo real
  - Filter: Dropdown por estado

Estados de Task:
  • todo → in-progress → completed
```

### 4️⃣ AIAssistant.tsx
```
Responsabilidad: Asistente IA
Data Source: useStore() + Local state

Layout:
  ┌────────────┬──────────────┐
  │   Chat     │ Suggestions  │
  │  Messages  │   Sidebar    │
  │            │              │
  │            │  ┌────────┐  │
  │  [Input]   │  │Quick   │  │
  │            │  │Actions │  │
  │            │  └────────┘  │
  └────────────┴──────────────┘

Respuestas IA:
  • Basadas en palabras clave
  • Análisis de tasks
  • Sugerencias contextuales
  • Planes automáticos
```

### 5️⃣ CollaborationPanel.tsx
```
Responsabilidad: Colaboración en tiempo real
Data Source: useStore()

Layout:
  ┌──────────────┐
  │ [Toggle Btn] │
  ├──────────────┤
  │ Users Online │
  │  👤 User 1   │
  │  👤 User 2   │
  ├──────────────┤
  │  Activity    │
  │  • Event 1   │
  │  • Event 2   │
  ├──────────────┤
  │ [Invite Btn] │
  └──────────────┘

Features:
  - Collapsible panel
  - User status indicators
  - Activity feed
  - Relative timestamps
```

---

## 🎨 Sistema de Estilos

### Metodología
```
Tailwind CSS → Utility-First
  ├── JIT Compiler (rápido)
  ├── Purge automático
  └── Custom config
```

### Estructura de Clases

**Layout:**
```css
Container: flex, grid
Spacing: p-6, m-4, gap-6
Sizing: w-full, h-screen
```

**Visual:**
```css
Colors: bg-blue-500, text-gray-800
Borders: border, rounded-xl
Shadows: shadow-lg, shadow-xl
```

**Effects:**
```css
Transitions: transition-all
Transforms: hover:-translate-y-1
Animations: animate-fade-in
```

### Custom Classes (globals.css)
```css
.glass → Glass morphism effect
.glass-dark → Dark glass variant
::-webkit-scrollbar → Custom scrollbar
```

### Responsive Breakpoints
```
Mobile:  default (< 640px)
Tablet:  md: (768px)
Laptop:  lg: (1024px)
Desktop: xl: (1280px)
```

---

## 🔧 Estado y Datos

### Zustand Store Pattern

```typescript
// store/useStore.ts

create<State>((set) => ({
  // Estado inicial
  state: initialValue,
  
  // Acciones
  action: (params) => set((state) => ({
    // Lógica de actualización
    newState: compute(state, params)
  }))
}))
```

### Flujo de Actualización

```
1. User Action (click, input, etc.)
   ↓
2. Component Handler (onClick, onChange)
   ↓
3. Store Action (addTask, updateTask)
   ↓
4. State Update (inmutable)
   ↓
5. Re-render (solo componentes suscritos)
   ↓
6. UI Update (visual feedback)
```

---

## 🎯 Tipos TypeScript

### Jerarquía de Tipos

```typescript
// types/index.ts

Task
  ├── id: string
  ├── title: string
  ├── description: string
  ├── status: union type
  ├── priority: union type
  ├── tags: string[]
  ├── assignedTo: string[]
  ├── dates: Date objects
  └── aiSuggestions?: string[]

User
  ├── id: string
  ├── name: string
  ├── email: string
  ├── avatar: string
  └── status: union type

Analytics (computed)
  ├── totalTasks: number
  ├── completedTasks: number
  ├── completionRate: number
  └── charts data: arrays

CollaborationEvent
  ├── id: string
  ├── userId: string
  ├── userName: string
  ├── action: string
  └── timestamp: Date
```

---

## 🚀 Performance

### Optimizaciones Implementadas

1. **Code Splitting**
   - Next.js automático por ruta
   - Lazy loading de charts

2. **Client-Side Rendering**
   - "use client" en componentes interactivos
   - Hidratación optimizada

3. **Memoización**
   - React hooks (useMemo, useCallback)
   - Zustand selective subscriptions

4. **CSS Optimization**
   - Tailwind purge
   - Critical CSS inline
   - Minimal runtime

5. **Bundle Size**
   - Tree-shaking
   - ES modules
   - Compression

---

## 🔐 Seguridad

### Implementado

✅ TypeScript (type safety)
✅ Next.js security headers
✅ Client-side validation
✅ XSS protection (React)

### Pendiente (Producción)

⏳ Autenticación (NextAuth)
⏳ API routes protegidas
⏳ Rate limiting
⏳ CSRF protection
⏳ Input sanitization

---

## 📈 Escalabilidad

### Actual (MVP)
```
Users: Individual/Pequeños equipos
Data: Client-side (Zustand)
IA: Respuestas simuladas
Colaboración: Mock data
```

### Futuro (Producción)
```
Users: Multi-tenant
Data: PostgreSQL + Prisma
IA: OpenAI API real
Colaboración: Socket.io
Cache: Redis
CDN: Vercel Edge
```

---

## 🛠️ Stack Tecnológico

```
Frontend:
├── Next.js 14 (App Router)
├── React 18
├── TypeScript 5
├── Tailwind CSS 3
└── Framer Motion

State:
└── Zustand 4

Gráficos:
└── Recharts 2

Utilidades:
├── Lucide Icons
├── date-fns
└── clsx

Build:
├── SWC (Next.js)
├── PostCSS
└── Autoprefixer

Dev:
├── ESLint
└── TypeScript Compiler
```

---

## 🎓 Patrones de Diseño

### Component Patterns

1. **Container/Presentational**
   - Containers: Manejan lógica y estado
   - Presentational: Solo UI

2. **Composition**
   - Componentes pequeños reutilizables
   - Props para personalización

3. **Custom Hooks**
   - useStore: Estado global
   - Futuros: useAuth, useSocket

### State Patterns

1. **Single Source of Truth**
   - Zustand store centralizado
   - Evita prop drilling

2. **Immutable Updates**
   - Spread operators
   - No mutaciones directas

3. **Selective Subscriptions**
   - Solo re-render necesarios
   - Performance optimizada

---

## 📚 Documentación

```
README.md         → Overview del proyecto
INSTALACION.md    → Guía paso a paso
TUTORIAL.md       → Uso detallado
FEATURES.md       → Características técnicas
ARQUITECTURA.md   → Este archivo
```

---

**Esta arquitectura está diseñada para ser:**
- ✅ Escalable
- ✅ Mantenible
- ✅ Type-safe
- ✅ Performante
- ✅ Developer-friendly

¿Preguntas sobre la arquitectura? Consulta el código o abre un issue!


