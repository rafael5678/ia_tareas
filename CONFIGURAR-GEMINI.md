# 🌟 Configurar Google Gemini (Análisis de Imágenes)

## ¿Por qué Gemini?

**Gemini es GRATIS** y tiene capacidades de visión para analizar imágenes. Lo usamos para:
- 📸 **Analizar imágenes** con problemas de matemáticas, física, etc.
- 📝 **Resolver ejercicios** de fotos de libros o pizarras
- 🔍 **Detectar texto** en imágenes y responder preguntas

---

## 🚀 Configuración en 3 minutos

### 1️⃣ Obtén tu API Key GRATIS

1. Ve a: **https://aistudio.google.com/app/apikey**
2. Inicia sesión con tu cuenta de Google (Gmail)
3. Click en **"Create API Key"** o **"Obtener API Key"**
4. Copia la key que te den (algo como `AIzaSy...`)

### 2️⃣ Agrégala a tu proyecto

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Busca la línea que dice `GEMINI_API_KEY=tu_key_de_gemini_aqui`
3. Reemplázala con tu key:

```bash
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

4. **Guarda el archivo**

### 3️⃣ Reinicia el servidor

```bash
npm run dev:all
```

---

## ✅ ¡Listo! Prueba el análisis de imágenes

1. Ve a **Asistente IA**
2. Click en el botón **📷** (imagen)
3. Sube una foto con ejercicios de matemáticas
4. Escribe: "Resuelve estos problemas"
5. ¡La IA analizará la imagen y resolverá los ejercicios! 🎉

---

## 🎓 Ejemplos de uso

### Matemáticas
- Sube foto de ecuaciones → "Resuelve paso a paso"
- Foto de gráficas → "Analiza esta función"

### Física
- Diagrama de fuerzas → "Explica las fuerzas"
- Circuito eléctrico → "Calcula la resistencia total"

### Idiomas
- Texto en inglés → "Traduce al español"
- Ejercicio de gramática → "Corrige los errores"

---

## 💡 Notas importantes

- **Es 100% GRATIS** (límite generoso de Google)
- **No necesitas tarjeta de crédito**
- **Funciona con imágenes en cualquier idioma**
- Las imágenes se procesan en la nube de Google (seguro y privado)

---

## 🤝 Combinación perfecta

Tu app ahora usa:
- **Groq** → Texto ultrarrápido ⚡
- **Gemini** → Análisis de imágenes 📸

¡Lo mejor de ambos mundos, 100% GRATIS!

---

## ⚠️ Troubleshooting

### Error: "GEMINI_API_KEY no configurada"
✅ Asegúrate de haber guardado el archivo `.env.local`
✅ Reinicia el servidor (`Ctrl+C` → `npm run dev:all`)

### Error: "Invalid API key"
✅ Verifica que copiaste la key completa
✅ No debe tener espacios al inicio o final
✅ Debe empezar con `AIzaSy...`

---

¿Problemas? Verifica que tu key esté bien configurada en `.env.local` 🔑

