# ⚡ EMPEZAR AHORA - Guía Ultra Rápida

## 🎯 2 Comandos y Listo

```bash
# 1. Instalar
npm install

# 2. Iniciar TODO
npm run dev:all
```

**Abre:** http://localhost:3002

**¡ESO ES TODO! Ya funciona** ✅

---

## 🧪 Qué Probar (1 minuto)

### 1. Múltiples Usuarios
- Abre **3-5 ventanas** (Ctrl+Shift+N)
- Ve el panel derecho: **"5 usuarios en línea"**
- Crea tarea en ventana 1
- Aparece en TODAS instantáneamente

### 2. Asistente IA
- Click en **"Asistente IA"** (sidebar)
- Pregunta: **"¿Cómo derivo x³?"**
- Recibe respuesta inteligente
- Prueba con inglés, matemáticas, programación

### 3. Dashboard
- Ve a **"Dashboard"**
- 3 gráficos interactivos
- Métricas en tiempo real
- Pasa el mouse sobre los gráficos

---

## 🚀 IA Real (Opcional - 2 minutos)

**Para respuestas 100x mejores:**

### Paso 1: API Key Gratis
https://console.groq.com/
- Regístrate (solo email)
- Crea API Key
- Copia la key

### Paso 2: Configurar
```bash
# Crea .env.local
echo GROQ_API_KEY=tu_key > .env.local
```

### Paso 3: Reiniciar
```bash
npm run dev:all
```

**Ver:** `CONFIGURAR-GROQ.md` para más detalles

---

## ✅ Checklist Rápido

```
□ npm install ejecutado
□ npm run dev:all corriendo
□ http://localhost:3002 abierto
□ Probado con múltiples ventanas
□ Probado asistente IA
□ (Opcional) Groq configurado
```

---

## 💡 Comandos Útiles

```bash
# Iniciar todo
npm run dev:all

# Solo frontend
npm run dev

# Solo WebSocket
npm run dev:socket

# Limpiar y reiniciar
rm -rf .next
npm run dev:all
```

---

## 🎯 Próximos Pasos

1. **Personaliza**: Edita colores en `tailwind.config.ts`
2. **Configura IA**: Agrega Groq para mejores respuestas
3. **Deploy**: Sube a Vercel (ver `DEPLOY-INSTRUCCIONES.md`)
4. **Comparte**: Invita usuarios a probar

---

## 📚 Documentación

| Archivo | Para qué |
|---------|----------|
| **CONFIGURAR-GROQ.md** | Setup IA gratis (2 min) |
| **LISTO-PARA-LANZAR.md** | Guía completa |
| **README.md** | Overview general |

---

## 🔥 ¡Eso es Todo!

**Ya tienes:**
- ✅ IA universal funcionando
- ✅ Usuarios en tiempo real
- ✅ Colaboración instantánea
- ✅ Dashboard con analytics
- ✅ Listo para usar

**Comando:** `npm run dev:all`

**¡Disfruta! 🎉**


