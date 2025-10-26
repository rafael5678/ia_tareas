# 🛠️ Comandos Útiles - AI Task Manager Pro

## 🚀 Comandos Principales

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Iniciar en puerto diferente
npm run dev -- -p 3001

# Iniciar con turbopack (experimental, más rápido)
npm run dev --turbo
```

### Producción
```bash
# Compilar para producción
npm run build

# Iniciar en modo producción (después de build)
npm run start

# Verificar tamaño del bundle
npm run build && du -sh .next
```

### Calidad de Código
```bash
# Ejecutar linter
npm run lint

# Arreglar problemas automáticamente
npm run lint -- --fix

# Ver todos los archivos con problemas
npm run lint -- --format=compact
```

---

## 📦 Gestión de Dependencias

### Instalación
```bash
# Instalar todas las dependencias
npm install

# Instalar dependencia específica
npm install nombre-paquete

# Instalar como dev dependency
npm install -D nombre-paquete

# Limpiar e reinstalar todo
rm -rf node_modules package-lock.json
npm install
```

### Actualización
```bash
# Ver paquetes desactualizados
npm outdated

# Actualizar paquete específico
npm update nombre-paquete

# Actualizar todos a última versión
npm update

# Actualizar Next.js específicamente
npm install next@latest react@latest react-dom@latest
```

### Auditoría
```bash
# Revisar vulnerabilidades
npm audit

# Arreglar vulnerabilidades automáticamente
npm audit fix

# Arreglar forzando versiones mayores
npm audit fix --force
```

---

## 🧹 Limpieza

### Cache y Build
```bash
# Limpiar build de Next.js
rm -rf .next

# Limpiar node_modules
rm -rf node_modules

# Limpiar todo y reinstalar
rm -rf node_modules .next package-lock.json
npm install

# Limpiar cache de npm
npm cache clean --force
```

### Archivos Temporales
```bash
# Limpiar logs
rm -f npm-debug.log* yarn-debug.log*

# Limpiar archivos de sistema
rm -f .DS_Store
```

---

## 🔍 Debugging

### Inspección
```bash
# Iniciar con inspector de Node.js
NODE_OPTIONS='--inspect' npm run dev

# Ver info de build
npm run build -- --debug

# Analizar bundle
npm install -D @next/bundle-analyzer
```

### Logs
```bash
# Ver logs detallados
npm run dev -- --verbose

# Ver solo errores
npm run dev 2>&1 | grep ERROR
```

---

## 📊 Análisis

### Bundle Size
```bash
# Instalar analizador
npm install -D @next/bundle-analyzer

# Analizar (después de configurar)
ANALYZE=true npm run build
```

### Performance
```bash
# Perfil de build
npm run build -- --profile

# Medir tiempo de compilación
time npm run build
```

---

## 🧪 Testing (Para implementar)

```bash
# Instalar Jest y Testing Library
npm install -D jest @testing-library/react @testing-library/jest-dom

# Ejecutar tests (cuando los configures)
npm test

# Tests en modo watch
npm test -- --watch

# Coverage
npm test -- --coverage
```

---

## 🎨 Tailwind

### Desarrollo
```bash
# Ver clases usadas
grep -r "className=" components/ app/

# Purgar CSS manualmente (Next.js lo hace automático)
npm run build
```

### Personalización
```bash
# Ver config de Tailwind
cat tailwind.config.ts

# Editar config
code tailwind.config.ts
```

---

## 🔧 TypeScript

### Compilación
```bash
# Verificar tipos
npx tsc --noEmit

# Ver errores de TypeScript
npx tsc --noEmit --pretty

# Generar declaration files
npx tsc --declaration
```

### Configuración
```bash
# Ver config de TypeScript
cat tsconfig.json

# Editar config
code tsconfig.json
```

---

## 🚀 Deployment

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy a producción
vercel --prod
```

### Build Local
```bash
# Build optimizado
npm run build

# Probar build localmente
npm run start

# Verificar que funciona
curl http://localhost:3000
```

---

## 🔄 Git

### Básicos
```bash
# Inicializar repo
git init

# Agregar archivos
git add .

# Commit
git commit -m "feat: initial commit"

# Push
git push origin main
```

### Branches
```bash
# Crear branch
git checkout -b feature/nueva-funcionalidad

# Cambiar branch
git checkout main

# Merge
git merge feature/nueva-funcionalidad
```

---

## 📱 Responsive Testing

### Navegadores
```bash
# Abrir en Chrome
open -a "Google Chrome" http://localhost:3000

# Abrir en Firefox
open -a Firefox http://localhost:3000

# Abrir en Safari
open -a Safari http://localhost:3000
```

### DevTools
```
Chrome DevTools:
- Toggle Device Toolbar: Cmd+Shift+M (Mac) / Ctrl+Shift+M (Windows)
- Responsive Mode: F12 → Device Toggle
```

---

## 🐛 Troubleshooting

### Problemas Comunes

#### Puerto ocupado
```bash
# Ver qué usa el puerto 3000
lsof -ti:3000

# Matar proceso
kill -9 $(lsof -ti:3000)

# O usar otro puerto
npm run dev -- -p 3001
```

#### Module not found
```bash
# Reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar imports
grep -r "from '@/" app/ components/
```

#### Build failures
```bash
# Limpiar y rebuild
rm -rf .next
npm run build

# Ver error completo
npm run build 2>&1 | tee build.log
```

#### Estilos no aplican
```bash
# Limpiar y reiniciar
rm -rf .next
npm run dev

# Verificar Tailwind
cat tailwind.config.ts
```

---

## 🔍 Búsqueda en Código

### Grep Útiles
```bash
# Buscar componente
grep -r "export default" components/

# Buscar uso de hook
grep -r "useStore" .

# Buscar TODO comments
grep -r "TODO" app/ components/

# Buscar imports
grep -r "import.*from" .
```

### VSCode
```bash
# Abrir proyecto
code .

# Buscar en archivos (Cmd+Shift+F / Ctrl+Shift+F)
# Ir a archivo (Cmd+P / Ctrl+P)
# Ir a símbolo (Cmd+T / Ctrl+T)
```

---

## 📈 Monitoreo

### Desarrollo
```bash
# Ver uso de memoria
node --max-old-space-size=4096 npm run dev

# Monitor de cambios
watch -n 1 'ls -lh .next'
```

### Performance
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

---

## 🔐 Seguridad

### Auditoría
```bash
# Escanear vulnerabilidades
npm audit

# Reporte detallado
npm audit --json > audit.json

# Arreglar automáticamente
npm audit fix
```

### Dependencias
```bash
# Ver árbol de dependencias
npm list

# Ver solo producción
npm list --prod

# Ver específica
npm list next
```

---

## 📦 Package.json Scripts

Los scripts actuales disponibles:
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

### Agregar Custom Scripts
```json
{
  "clean": "rm -rf .next node_modules",
  "fresh": "npm run clean && npm install",
  "type-check": "tsc --noEmit",
  "format": "prettier --write ."
}
```

---

## 🎯 Comandos por Caso de Uso

### Primera vez
```bash
npm install
npm run dev
```

### Desarrollo diario
```bash
npm run dev
# Ctrl+C para detener
```

### Antes de commit
```bash
npm run lint
npm run build
git add .
git commit -m "mensaje"
```

### Deploy
```bash
npm run build
npm run start
# Verificar
vercel --prod
```

### Problemas
```bash
rm -rf node_modules .next
npm install
npm run dev
```

---

## 💡 Tips Pro

### Alias útiles (agregar a .bashrc/.zshrc)
```bash
alias nd="npm run dev"
alias nb="npm run build"
alias ni="npm install"
alias nci="rm -rf node_modules package-lock.json && npm install"
```

### Variables de entorno
```bash
# Crear .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local

# Usar en código
process.env.NEXT_PUBLIC_API_URL
```

---

## 📚 Recursos

### Documentación
```bash
# Next.js
open https://nextjs.org/docs

# Tailwind
open https://tailwindcss.com/docs

# React
open https://react.dev
```

### Ayuda
```bash
# Ver opciones de Next.js
npx next --help

# Ver versión
npx next --version

# Ver info del proyecto
npm list next react typescript
```

---

**Guarda este archivo como referencia rápida! 📌**


