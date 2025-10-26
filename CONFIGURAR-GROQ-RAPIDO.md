# ⚡ Configurar Groq en 2 Minutos - ULTRA RÁPIDO

## 🎯 Por qué necesitas esto:

**Sin Groq (ahora):**
```
Tú: "ayudame con ingles"
IA: "¿Qué necesitas específicamente?" ❌
```

**Con Groq (2 minutos):**
```
Tú: "ayudame con ingles"  
IA: "¡Claro! Puedo ayudarte con traducciones, gramática,
     vocabulario, ejercicios... [respuesta súper detallada]" ✅
```

---

## 📝 Paso 1: Obtén tu API Key (1 minuto)

### Abre este link:
```
https://console.groq.com/
```

### Haz esto:
1. Click en **"Sign Up"** (esquina superior derecha)
2. Regístrate con tu **email** o **cuenta de Google**
3. **Confirma tu email** (revisa tu inbox)
4. Ya dentro, ve a **"API Keys"** (menú lateral)
5. Click en **"Create API Key"**
6. Ponle un nombre: `TaskManager`
7. Click en **"Submit"**
8. **COPIA LA KEY** (empieza con `gsk_...`)

**⚠️ IMPORTANTE:** Copia la key AHORA, solo se muestra una vez.

---

## 💾 Paso 2: Guarda la Key (30 segundos)

### Opción A: Crear archivo manualmente (MÁS FÁCIL)

1. Abre **Notepad** (Bloc de notas)
2. Escribe EXACTAMENTE esto (reemplaza con TU key):
```
GROQ_API_KEY=gsk_aqui_pega_tu_key_que_copiaste
```
3. Click en **"Archivo" → "Guardar como"**
4. **Nombre:** `.env.local` (con el punto al inicio)
5. **Tipo:** Todos los archivos (*.*) 
6. **Ubicación:** La carpeta raíz de tu proyecto (donde está package.json)
7. Click en **"Guardar"**

### Opción B: Con comando (Terminal)
```bash
echo GROQ_API_KEY=gsk_tu_key > .env.local
```

---

## 🔄 Paso 3: Reinicia (30 segundos)

```bash
# En la terminal donde corre el proyecto:
# Presiona Ctrl+C para detener

# Reinicia todo:
npm run dev:all
```

**Espera que veas:**
```
✓ Ready in X.Xs
🚀 Servidor WebSocket corriendo en puerto 3003
```

---

## ✅ Paso 4: ¡PRUEBA!

1. Abre **http://localhost:3002**
2. Ve a **"Asistente IA"** (sidebar izquierdo)
3. Arriba a la derecha debe decir: **"🚀 Groq (Gratis)"**
4. Pregunta algo:

```
"Ayúdame con un ejercicio de inglés. 
Tengo que traducir estas 3 oraciones:
1. Estoy estudiando programación
2. Me gusta aprender cosas nuevas  
3. Trabajo en equipo"
```

**Si funciona, verás una respuesta SÚPER detallada con:**
- Traducción de cada oración
- Explicaciones de gramática
- Variaciones alternativas
- Pronunciación
- Tips adicionales

---

## 🎉 Ejemplo de Diferencia:

### ANTES (sin Groq):
```
User: "ayudame con ingles es para tarea"
IA: "¿Qué tema específico necesitas?" 
```
😐 No muy útil

### DESPUÉS (con Groq):
```
User: "ayudame con ingles es para tarea"  
IA: "¡Claro! Estoy aquí para ayudarte con tu tarea de inglés.
     
     Puedo ayudarte con:
     
     📝 Traducciones (español ↔ inglés)
        Ejemplo: "Traduce: 'Buenos días'"
        
     📖 Gramática y tiempos verbales
        Ejemplo: "Explícame el present perfect"
        
     ✍️ Corrección de textos
        Ejemplo: "Revisa este párrafo..."
        
     💬 Ejercicios de conversación
        Ejemplo: "¿Cómo pido comida en un restaurante?"
     
     ¿Qué tipo de ejercicio de inglés necesitas hacer?
     Compárteme los detalles específicos y te ayudo
     paso a paso! 😊"
```
🔥 ¡MUCHO MEJOR!

---

## 🔍 Verificar que Funciona

### Check 1: Archivo creado
```bash
# En la terminal:
dir .env.local

# Debe mostrar el archivo
```

### Check 2: Contenido correcto
```bash
# Abre .env.local en Notepad
# Debe tener:
GROQ_API_KEY=gsk_tu_key_real
```

### Check 3: Servidor reiniciado
- Debe mostrar "Ready" sin errores
- No debe decir "API key no configurada"

### Check 4: Respuestas mejoradas
- Pregunta algo simple
- La respuesta debe ser MUCHO más detallada

---

## 🚨 Problemas Comunes

### ❌ "API key no configurada"

**Causa:** El archivo `.env.local` no existe o está mal ubicado

**Solución:**
```bash
# Verifica que estás en la carpeta correcta:
pwd  # o en Windows: cd

# Debe mostrar la carpeta de tu proyecto
# Crea el archivo ahí:
echo GROQ_API_KEY=tu_key > .env.local
```

### ❌ "Invalid API key"

**Causa:** La key está mal copiada

**Solución:**
1. Ve a https://console.groq.com/
2. Borra la key antigua
3. Crea una nueva
4. Cópiala COMPLETA (incluye el `gsk_` al inicio)
5. Actualiza `.env.local`
6. Reinicia: `npm run dev:all`

### ❌ Sigue dando respuestas simples

**Causa:** No reiniciaste el servidor

**Solución:**
```bash
# Ctrl+C para detener
# Luego:
npm run dev:all
```

### ❌ "Module not found" o errores raros

**Causa:** Dependencias faltantes

**Solución:**
```bash
npm install
npm run dev:all
```

---

## 💡 Tips Extra

### 1. Verifica que Groq esté seleccionado
En el chat, arriba a la derecha debe decir:
```
🚀 Groq (Gratis)
```

Si dice otra cosa, cámbialo al dropdown.

### 2. Prueba con preguntas complejas
```
"Explícame la diferencia entre 'used to' y 
'would' en inglés con ejemplos"
```

Con Groq, tendrás una respuesta de párrafos con ejemplos.

### 3. Usa el chat como un tutor
Pregunta todo lo que necesites, Groq es gratis y sin límites molestos.

---

## ⏱️ Tiempo Total: 2 minutos

```
✓ Registro en Groq: 1 min
✓ Crear .env.local: 30 seg
✓ Reiniciar: 30 seg
─────────────────────────
  Total: 2 minutos
```

---

## 🎯 Resultado Final

### Antes:
- IA da respuestas genéricas ❌
- Tienes que ser muy específico ❌
- No muy útil para tareas ❌

### Después:
- IA entiende contexto ✅
- Respuestas super detalladas ✅
- Perfecto para tareas universitarias ✅
- GRATIS para siempre ✅

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Lee la sección de "Problemas Comunes" arriba
2. Verifica que copiaste la key completa
3. Asegúrate de reiniciar el servidor
4. Abre la consola del navegador (F12) para ver errores

---

**¡AHORA SÍ, EMPIEZA A USAR TU IA REAL! 🚀**

```bash
npm run dev:all
```

**Pregunta cualquier cosa y sorpréndete con las respuestas.** 🔥


