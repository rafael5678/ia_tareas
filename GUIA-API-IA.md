# 🤖 Guía de Integración de IA Real

## 🎯 3 Opciones de IA Disponibles

Tu app ahora soporta **3 proveedores de IA diferentes**. Puedes elegir el que prefieras:

---

## 🚀 Opción 1: Groq (RECOMENDADA) ⭐

**Por qué Groq:**
- ✅ **100% GRATIS**
- ✅ **Súper rápida** (la más rápida del mercado)
- ✅ Sin tarjeta de crédito requerida
- ✅ Excelente calidad de respuestas
- ✅ Modelo Mixtral 8x7B muy potente

### Cómo obtener tu API Key de Groq:

1. **Ve a:** https://console.groq.com/

2. **Regístrate gratis:**
   - Click en "Sign Up"
   - Usa tu email o cuenta de Google
   - Sin necesidad de tarjeta de crédito

3. **Obtén tu API Key:**
   - Una vez dentro, ve a "API Keys"
   - Click en "Create API Key"
   - Copia la key que te dan

4. **Configura en tu proyecto:**
   ```bash
   # Crea archivo .env.local (si no existe)
   echo "GROQ_API_KEY=tu_key_aqui" > .env.local
   ```

5. **¡Listo!** Reinicia el servidor:
   ```bash
   npm run dev:all
   ```

**Límites Gratuitos:**
- 30 consultas por minuto
- 14,400 consultas por día
- Suficiente para uso normal

---

## 🌟 Opción 2: Google Gemini (También Gratis)

**Por qué Gemini:**
- ✅ **100% GRATIS**
- ✅ De Google, muy potente
- ✅ Sin tarjeta de crédito
- ✅ Buena para razonamiento complejo

### Cómo obtener tu API Key de Gemini:

1. **Ve a:** https://makersuite.google.com/app/apikey

2. **Inicia sesión con tu cuenta de Google**

3. **Crea una API Key:**
   - Click en "Get API Key"
   - Click en "Create API Key"
   - Copia la key

4. **Configura en tu proyecto:**
   ```bash
   # Agrega a .env.local
   GEMINI_API_KEY=tu_key_aqui
   ```

5. **Reinicia el servidor**

**Límites Gratuitos:**
- 60 consultas por minuto
- Muy generoso para proyectos personales

---

## 🧠 Opción 3: OpenAI GPT-4 (De Pago)

**Por qué OpenAI:**
- ✅ **La mejor calidad** de respuestas
- ✅ GPT-4 más avanzado
- ✅ Mejores explicaciones educativas
- ❌ Requiere pago (~$0.01 por pregunta)

### Cómo obtener tu API Key de OpenAI:

1. **Ve a:** https://platform.openai.com/api-keys

2. **Crea una cuenta:**
   - Regístrate con email
   - Verifica tu cuenta

3. **Agrega método de pago:**
   - Ve a "Billing"
   - Agrega tarjeta de crédito
   - Recarga $5 mínimo

4. **Crea API Key:**
   - Ve a "API Keys"
   - Click en "Create new secret key"
   - Copia la key

5. **Configura:**
   ```bash
   OPENAI_API_KEY=sk-tu_key_aqui
   ```

**Costos aproximados:**
- GPT-4 Turbo: $0.01 por 1000 tokens (~1 pregunta)
- GPT-3.5 Turbo: $0.0005 por 1000 tokens (20x más barato)

---

## 📋 Configuración Completa

### 1. Crea el archivo `.env.local` en la raíz del proyecto:

```bash
# Opción A: Solo Groq (RECOMENDADO)
GROQ_API_KEY=gsk_tu_key_aqui

# Opción B: Groq + Gemini (Redundancia)
GROQ_API_KEY=gsk_tu_key_aqui
GEMINI_API_KEY=tu_gemini_key_aqui

# Opción C: Todas (para elegir en tiempo real)
GROQ_API_KEY=gsk_tu_key_aqui
GEMINI_API_KEY=tu_gemini_key_aqui
OPENAI_API_KEY=sk-tu_openai_key_aqui
```

### 2. Reinicia los servidores:

```bash
# Detén el servidor actual (Ctrl+C)

# Reinicia
npm run dev:all
```

### 3. Prueba la IA:

1. Abre http://localhost:3002
2. Ve a "Asistente IA"
3. **Verás un selector arriba a la derecha** para elegir el proveedor
4. Pregunta algo: "¿Cómo derivo x³?"
5. ¡La IA real responderá!

---

## 🎯 Comparación de Proveedores

| Característica | Groq | Gemini | OpenAI |
|----------------|------|--------|---------|
| **Precio** | Gratis | Gratis | $0.01/pregunta |
| **Velocidad** | ⚡⚡⚡⚡⚡ | ⚡⚡⚡ | ⚡⚡⚡⚡ |
| **Calidad** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Límites** | 30/min | 60/min | Pay-as-go |
| **Tarjeta** | No | No | Sí |
| **Registro** | Email | Google | Email + Pago |

---

## 🧪 Testing

### Test de Groq:
```bash
# Verifica que la API funciona
curl -X POST http://localhost:3002/api/ai \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola", "provider":"groq"}'
```

### Health Check:
```bash
# Ver qué APIs están configuradas
curl http://localhost:3002/api/ai
```

Respuesta esperada:
```json
{
  "status": "OK",
  "providers": {
    "openai": false,
    "groq": true,
    "gemini": false
  }
}
```

---

## 🔄 Cambiar entre IAs

En la interfaz de usuario:
1. Arriba a la derecha del chat
2. Dropdown con opciones:
   - 🚀 Groq (Gratis)
   - 🌟 Google Gemini (Gratis)
   - 🧠 OpenAI GPT-4
   - 💻 Local (Sin API)

**Cambia en tiempo real** sin recargar la página.

---

## 💡 Recomendaciones

### Para Empezar:
```bash
# Solo usa Groq
GROQ_API_KEY=tu_key
```
- Gratis
- Rápida
- Excelente calidad

### Para Producción con Usuarios:
```bash
# Groq como principal + Gemini como backup
GROQ_API_KEY=tu_key
GEMINI_API_KEY=tu_key
```
- Si Groq falla, usa Gemini automáticamente

### Para Máxima Calidad:
```bash
# OpenAI GPT-4
OPENAI_API_KEY=sk-tu_key
```
- Mejor para explicaciones complejas
- Ideal si tienes presupuesto

---

## 🚨 Troubleshooting

### Error: "API key no configurada"
```bash
# Verifica que el archivo .env.local existe
ls -la .env.local

# Verifica el contenido
cat .env.local

# Reinicia el servidor
npm run dev:all
```

### Error: "Invalid API key"
- Verifica que copiaste la key completa
- Groq keys empiezan con `gsk_`
- OpenAI keys empiezan con `sk-`
- No debe tener espacios

### Error: "Rate limit exceeded"
- Espera 1 minuto
- O cambia de proveedor en el dropdown

### La IA no responde
1. Abre consola del navegador (F12)
2. Ve a "Network"
3. Busca la llamada a `/api/ai`
4. Ve el error específico

---

## 📊 Monitoreo de Uso

### Groq:
- Dashboard: https://console.groq.com/
- Ve tus consultas en tiempo real

### Gemini:
- Dashboard: https://makersuite.google.com/
- Estadísticas de uso

### OpenAI:
- Dashboard: https://platform.openai.com/usage
- Ve cuánto has gastado

---

## 🎁 Bonus: Fallback Automático

Si no configuras ninguna API key:
- La app **sigue funcionando**
- Usa respuestas locales inteligentes
- No necesitas configurar nada
- Perfecto para desarrollo

Cuando agregues una API key:
- La app **detecta automáticamente**
- Empieza a usar IA real
- Sin cambios de código
- Plug and play

---

## 🚀 Siguiente Nivel

### Para escalar a muchos usuarios:

1. **Implementa caché:**
   ```typescript
   // Guarda respuestas comunes
   const cache = new Map();
   ```

2. **Rate limiting por usuario:**
   ```typescript
   // Limita consultas por IP
   ```

3. **Mezcla proveedores:**
   ```typescript
   // 70% Groq, 30% Gemini
   ```

---

## 📝 Resumen

### Quick Start con Groq (2 minutos):

```bash
# 1. Obtén API key en https://console.groq.com/

# 2. Crea .env.local
echo "GROQ_API_KEY=tu_key" > .env.local

# 3. Reinicia
npm run dev:all

# 4. ¡Prueba!
# http://localhost:3002 → Asistente IA
```

**¡ESO ES TODO!** Ahora tienes IA real en tu app 🎉

---

## 🎯 Mi Recomendación

**Para ti:** Usa **Groq**
- Gratis
- Rápida
- Sin configuración compleja
- Excelente para lo que necesitas

**Configúrala así:**
```bash
# .env.local
GROQ_API_KEY=tu_key_de_groq
```

**Y ya!** Tu IA será 100x mejor que las respuestas locales. 🔥

---

¿Necesitas ayuda? Revisa los ejemplos o pregunta! 💬


