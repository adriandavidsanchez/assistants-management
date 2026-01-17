# Asistentes IA - Funnelhot

Sistema de gestión de asistentes de IA para automatizar interacciones con leads.

## Tecnologías Utilizadas

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Zustand** - Manejo de estado global
- **React Query (TanStack Query)** - Gestión de datos asíncrónos
- **React Hook Form + Zod** - Validación de formularios
- **Tailwind CSS** - Estilos
- **Sonner** - Notificaciones toast
- **Lucide React** - Iconos

## Requisitos Previos

- Node.js 18+ instalado
- npm, yarn, pnpm o bun

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone [URL-del-repositorio]
cd funnelhot-assistants
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

### 4. Abrir en el navegador

```
http://localhost:3000
```

## Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── assistant/[id]/          # Página de entrenamiento
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página principal (listado)
├── components/
│   └── assistants/              # Componentes de asistentes
│       ├── assistant-list.tsx
│       ├── assistant-modal.tsx
│       ├── assistant-form.tsx
│       ├── assistant-form-step1.tsx
│       ├── assistant-form-step2.tsx
│       └── chat-simulator.tsx
├── hooks/                       # Custom hooks
│   ├── use-assistants.ts
│   └── use-assistant-mutations.ts
├── services/                    # Servicios (mock APIs)
│   └── assistant.service.ts
├── store/                       # Zustand store
│   └── assistant.store.ts
├── types/                       # Tipos y schemas
│   ├── assistant.ts
│   └── assistant.schema.ts
└── constants/                   # Constantes
    └── chat-responses.ts
```

## Funcionalidades Implementadas

### Página Principal

- Listado de asistentes en formato de tarjetas
- Estados de carga mientras se obtienen los datos
- Estado vacío cuando no hay asistentes
- Botón para crear nuevos asistentes
- Acciones rápidas: Editar, Eliminar, Entrenar

### Modal de Creación/Edición (2 Pasos)

**Paso 1: Datos Básicos**
- Nombre del asistente (mínimo 3 caracteres)
- Idioma (Español, Inglés, Portugués)
- Tono (Formal, Casual, Profesional, Amigable)
- Validación en tiempo real

**Paso 2: Configuración de Respuestas**
- Porcentajes de longitud de respuestas (suma debe ser 100%)
- Indicador visual del total
- Checkbox para habilitar audio
- Navegación entre pasos con validación

### Página de Entrenamiento

- Información del asistente seleccionado
- Área de texto para instrucciones/prompts (rules)
- Guardado con feedback visual
- Chat simulado con:
  - Interfaz de mensajes
  - Respuestas aleatorias con delay (1-2 segundos)
  - Indicador "escribiendo..."
  - Opción para reiniciar conversación

### Funcionalidad de Eliminación

- Confirmación antes de eliminar
- Actualización inmediata del listado
- Manejo de errores (10% de probabilidad simulada)
- Mensajes de éxito/error

## Decisiones Técnicas

### Gestión de Estado

**Zustand**
- Manejo del estado global de la aplicación
- Lista de asistentes en memoria
- Control del modal (abierto/cerrado, modo creación/edición)
- Historial de chat por asistente
- Simple, ligero y fácil de usar

**React Query**
- Queries para obtener asistentes (con delay simulado)
- Mutations para crear, editar y eliminar
- Invalidación automática de queries después de mutaciones
- Manejo de estados de carga y error
- Cache inteligente

### Formularios y Validación

**React Hook Form + Zod**
- Validación robusta con schemas tipados
- Validación en tiempo real
- Manejo eficiente de formularios de múltiples pasos
- Mensajes de error claros

### Diseño

**Decisiones de UI/UX:**
- Paleta de colores azul/gris profesional y accesible
- Espaciado generoso para facilitar la lectura
- Feedback visual en todas las interacciones
- Estados hover/focus/disabled bien definidos
- Animaciones sutiles (loading spinners, transiciones)
- Responsive design (mobile y desktop)
- Iconos de Lucide para mejorar la comprensión

**Componentes reutilizables:**
- Separación de formularios por pasos
- Chat simulator independiente
- Modal genérico para crear/editar

### Servicios Mock

Implementé funciones que simulan una API real:
- Delays de 400ms para simular latencia de red
- Error aleatorio en eliminación (10% probabilidad)
- Datos en memoria (se resetean al refrescar)
- IDs únicos con `crypto.randomUUID()`

## Lo Que Prioricé

**Implementado al 100%:**
-  Todas las funcionalidades requeridas
-  Validaciones robustas
-  Estados de carga y error
-  Responsive design
-  Código limpio y organizado
-  Comentarios donde es necesario

**Extras que agregué:**
-  Indicador visual de progreso en el modal de 2 pasos
-  Contador de caracteres en las instrucciones de entrenamiento
-  Animación de "escribiendo..." en el chat
-  Badges visuales para idioma, tono y audio
-  Estados vacíos con llamados a la acción

## Tiempo de Dedicación

**Tiempo total aproximado: 8-9 horas**

Desglose:
- Setup inicial y configuración: 30 min
- Implementación de la estructura base: 1 hora
- Zustand store + React Query: 1.5 horas
- Formularios con validación: 2 horas
- UI/UX y estilos: 2 horas
- Chat simulator: 1 hora
- Testing y pulido de detalles: 1 hora
- README y documentación: 1 hora

## Cómo Probar

### Crear un asistente:
1. Click en "Crear Asistente"
2. Completar paso 1 (datos básicos)
3. Completar paso 2 (configuración de respuestas - la suma debe ser 100%)
4. Guardar

### Editar un asistente:
1. Click en "Editar" en cualquier tarjeta
2. Modificar campos
3. Guardar cambios

### Entrenar un asistente:
1. Click en "Entrenar"
2. Agregar instrucciones en el área de texto
3. Guardar entrenamiento
4. Probar el chat simulado

### Eliminar un asistente:
1. Click en "Eliminar"
2. Confirmar en el modal
3. Nota: Hay 10% de probabilidad de error simulado

## Notas Importantes

 Los datos NO persisten al refrescar la página (es intencional para la prueba)
 Los datos iniciales se cargan automáticamente al iniciar
 Las respuestas del chat son simuladas y aleatorias
 El proyecto está configurado para producción (`npm run build`)

## Decisiones de Arquitectura

### ¿Por qué Zustand sobre Context API?
- Menos boilerplate
- Mejor performance (no re-renderiza todo el árbol)
- Sintaxis más simple
- Ideal para estado global de aplicación

### ¿Por qué React Query?
- Manejo automático de cache
- Estados de carga/error out of the box
- Invalidación y refetch inteligentes
- Optimistic updates fáciles de implementar

### ¿Por qué separar el formulario en 2 componentes?
- Mejor organización del código
- Más fácil de mantener
- Reutilizable si se necesita

## Mejoras Futuras

Si tuviera más tiempo, agregaría:
- [ ] Persistencia con localStorage o base de datos
- [ ] Búsqueda y filtros en el listado
- [ ] Paginación si hay muchos asistentes
- [ ] Tests unitarios y de integración
- [ ] Modo oscuro
- [ ] Exportar/importar configuraciones
- [ ] Chat con IA real (OpenAI, Claude, etc.)

---

**Desarrollado por:** Adrian David Sanchez Calambas 
**Fecha:** Enero 2026  
**Prueba técnica para:** Funnelhot LLC