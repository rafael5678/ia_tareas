# 📦 Guía de Instalación - AI Task Manager Pro

## Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** 18.x o superior
- **npm** o **yarn**
- Git (opcional)

## Pasos de Instalación

### 1️⃣ Instalar Dependencias

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Recharts (gráficos)
- Lucide React (iconos)
- Framer Motion (animaciones)
- Y más...

### 2️⃣ Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

### 3️⃣ Abrir en el Navegador

Visita: **http://localhost:3000**

¡Listo! 🎉

## 🎯 Explorar las Funcionalidades

### Dashboard
- Ve al Dashboard para ver todas las métricas y estadísticas
- Gráficos interactivos de actividad semanal
- Distribución de tareas por prioridad
- Tendencias de productividad

### Gestión de Tareas
- Crea, edita y elimina tareas
- Filtra por estado (Todo, En Progreso, Completadas)
- Busca tareas por nombre
- Asigna prioridades y etiquetas
- Marca tareas como completadas

### Asistente IA
- Pregunta sobre optimización de tareas
- Solicita análisis de productividad
- Obtén sugerencias para planificación semanal
- Detecta cuellos de botella en tu flujo de trabajo

### Panel de Colaboración
- Visualiza usuarios en línea
- Ve la actividad reciente del equipo
- Invita colaboradores (próximamente)

## 🎨 Características del UI

- **Diseño Responsive**: Se adapta a móviles, tablets y desktop
- **Grid Layout**: Sistema de rejillas moderno para organización
- **Flexbox**: Componentes flexibles y adaptativos
- **Animaciones Suaves**: Transiciones y efectos visuales
- **Glass Morphism**: Efectos modernos de cristal esmerilado
- **Gradientes Coloridos**: Paleta vibrante y profesional

## 🔧 Scripts Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Compilar para producción
npm run build

# Iniciar en modo producción
npm run start

# Ejecutar linter
npm run lint
```

## 🚀 Próximos Pasos (Opcional)

### Integración con OpenAI (Opcional)
Si quieres usar IA real en lugar de respuestas simuladas:

1. Crea una cuenta en [OpenAI](https://platform.openai.com/)
2. Obtén tu API key
3. Crea un archivo `.env.local` en la raíz:
```
OPENAI_API_KEY=tu_api_key_real
```

### Base de Datos (Futuro)
Para persistencia real de datos, considera:
- Prisma + PostgreSQL
- Supabase
- MongoDB

### Deploy (Futuro)
Opciones de deployment:
- Vercel (recomendado para Next.js)
- Netlify
- Railway
- AWS/Azure/GCP

## ❓ Problemas Comunes

### Error: "Cannot find module"
```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 ocupado
```bash
# Usa otro puerto
npm run dev -- -p 3001
```

### Errores de TypeScript
```bash
# Limpia y reconstruye
rm -rf .next
npm run dev
```

## 💡 Tips

1. **Modo Oscuro**: Próximamente implementado
2. **Atajos de Teclado**: Por implementar
3. **Personalización**: Edita `tailwind.config.ts` para cambiar colores
4. **Iconos**: Explora [Lucide Icons](https://lucide.dev/) para más opciones

## 🎓 Recursos de Aprendizaje

- [Documentación Next.js](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [Zustand Guide](https://docs.pmnd.rs/zustand/)

## 🤝 Contribuir

¿Quieres mejorar el proyecto?
1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas:
1. Revisa esta guía
2. Consulta el README.md
3. Abre un issue en GitHub

---

**¡Disfruta construyendo con AI Task Manager Pro! 🚀**


