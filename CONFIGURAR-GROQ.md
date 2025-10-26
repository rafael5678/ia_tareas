# 🚀 Configurar Groq (IA Gratis) - 2 Minutos

## ⚡ La forma MÁS RÁPIDA de tener IA real

**Groq es 100% GRATIS** y no necesitas tarjeta de crédito.

---

## 📝 Pasos (2 minutos):

### 1. Obtén tu API Key

**Ve a:** https://console.groq.com/

- Click en **"Sign Up"**
- Regístrate con tu email o Google
- Confirma tu email
- Ve a **"API Keys"**
- Click en **"Create API Key"**
- **Copia la key** (empieza con `gsk_`)

---

### 2. Configura en tu Proyecto

**Opción A: Windows (CMD)**
```cmd
echo GROQ_API_KEY=gsk_tu_key_aqui > .env.local
```

**Opción B: Crear archivo manualmente**
1. Crea un archivo llamado `.env.local` en la raíz del proyecto
2. Agrega esta línea:
```
GROQ_API_KEY=gsk_tu_key_aqui
```
3. Reemplaza `gsk_tu_key_aqui` con tu key real

---

### 3. Reinicia el Servidor

```bash
# Detén el servidor (Ctrl+C)

# Reinicia
npm run dev:all
```

---

### 4. ¡Prueba!

1. Abre http://localhost:3002
2. Ve a **"Asistente IA"**
3. Asegúrate que esté seleccionado **"🚀 Groq (Gratis)"** arriba
4. Pregunta algo: **"¿Cómo derivo x³?"**
5. ¡Respuesta súper detallada de IA real! 🎉

---

## ✅ Verificar que Funciona

### Prueba estas preguntas:

**Matemáticas:**
```
¿Cómo resuelvo 2x + 5 = 13?
```

**Inglés:**
```
Traduce "I love programming" al español y explica el contexto
```

**Cálculo:**
```
Calcula la derivada de x² + 3x + 5
```

**Programación:**
```
Explícame qué es una función recursiva con un ejemplo en JavaScript
```

Si las respuestas son **detalladas y específicas**, ¡está funcionando! ✅

---

## 🔍 Solución de Problemas

### ❌ "API key no configurada"

**Solución:**
```bash
# Verifica que el archivo existe
dir .env.local

# Debe mostrar el archivo. Si no existe, créalo:
echo GROQ_API_KEY=tu_key > .env.local
```

### ❌ "Invalid API key"

**Causas comunes:**
- La key tiene espacios (quítalos)
- No copiaste la key completa
- La key no empieza con `gsk_`

**Solución:**
1. Ve de nuevo a https://console.groq.com/
2. Crea una nueva API key
3. Cópiala completa
4. Actualiza `.env.local`
5. Reinicia: `npm run dev:all`

### ❌ "Rate limit exceeded"

**Causa:** Has hecho demasiadas preguntas muy rápido

**Solución:**
- Espera 1 minuto
- Groq da 30 consultas por minuto (¡muy generoso!)

### ❌ El input no se ve (texto blanco)

**Ya está arreglado!** El texto ahora es negro y se ve perfectamente.

---

## 💡 Tips Pro

### 1. Cambia de Proveedor
Si Groq falla, usa el dropdown para cambiar a:
- 🌟 Gemini (también gratis)
- 💻 Local (sin API, respuestas básicas)

### 2. Sin Configurar API
Si no configuras nada, la app funciona igual con respuestas locales. Pero con Groq es **100x mejor**.

### 3. Ver Logs
Si algo falla, abre la consola del navegador (F12) para ver el error específico.

---

## 📊 Límites de Groq (Gratis)

| Límite | Valor |
|--------|-------|
| Consultas por minuto | 30 |
| Consultas por día | 14,400 |
| Costo | $0 (GRATIS) |
| Tarjeta requerida | NO |

**¡Suficiente para uso normal y desarrollo!**

---

## 🎯 Resumen Visual

```
1. Ve a: https://console.groq.com/
   ↓
2. Regístrate (solo email)
   ↓
3. Crea API Key
   ↓
4. Copia la key (empieza con gsk_)
   ↓
5. Crea .env.local con: GROQ_API_KEY=tu_key
   ↓
6. Reinicia: npm run dev:all
   ↓
7. ¡Prueba preguntas! 🎉
```

---

## 🔥 Resultado Esperado

### ANTES (sin configurar):
```
User: "¿Cómo derivo x³?"
IA: "Regla básica: d/dx(xⁿ) = n·xⁿ⁻¹
     Por lo tanto: d/dx(x³) = 3x²"
```

### DESPUÉS (con Groq):
```
User: "¿Cómo derivo x³?"
IA: "Para derivar x³, usamos la regla de potencias 
     del cálculo diferencial.

     📐 Regla: d/dx(xⁿ) = n·xⁿ⁻¹

     Paso a paso:
     1. Identificamos n = 3
     2. Bajamos el exponente: 3·x
     3. Restamos 1 al exponente: x³⁻¹ = x²
     
     ✅ Resultado: d/dx(x³) = 3x²

     💡 Ejemplo práctico:
     Si f(x) = x³, entonces f'(x) = 3x²
     
     Para x = 2: f'(2) = 3(2)² = 12
     Esto significa que en x=2, la función crece 
     a razón de 12 unidades por unidad.

     ¿Quieres que te explique derivadas más complejas 
     o necesitas practicar con más ejemplos?"
```

**¡Mucho más detallado y educativo!** 🎓

---

## ⏱️ Tiempo Total: 2 minutos

1. Registro en Groq: **1 minuto**
2. Configurar .env.local: **30 segundos**
3. Reiniciar servidor: **30 segundos**

**¡Y tendrás IA real GRATIS!** 🚀

---

## 🎉 ¡Disfruta tu IA!

Con Groq configurada, tu app será **100x más útil** para:
- Estudiantes haciendo tareas
- Programadores aprendiendo
- Equipos colaborando
- Profesores enseñando

**¡Todo gratis y sin límites molestos!** 🔥


