# Documentación de API - Microservicio de Áreas y Clientes

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura](#arquitectura)
3. [Endpoints Disponibles](#endpoints-disponibles)
4. [DTOs y Estructuras de Datos](#dtos-y-estructuras-de-datos)
5. [Paginación](#paginación)
6. [Manejo de Errores](#manejo-de-errores)
7. [Validaciones](#validaciones)
8. [Caching](#caching)

---

## 🎯 Visión General

Este microservicio gestiona operaciones CRUD para **Zonas de Trabajo** y **Clientes**, implementando una arquitectura limpia con patrones de diseño modernos y optimizaciones de rendimiento.

### Características Principales
- ✅ **Arquitectura Limpia**: Implementación de patrones SOLID
- ✅ **Inyección de Dependencias**: Desacoplamiento mediante contenedor
- ✅ **DTOs Inmutables**: Objetos de transferencia con propiedades readonly
- ✅ **Paginación Eficiente**: Soporte para grandes volúmenes de datos
- ✅ **Consultas Optimizadas**: Selección específica de campos en lugar de SELECT *
- ✅ **Caching Inteligente**: Almacenamiento temporal para datos de referencia
- ✅ **Manejo Centralizado de Errores**: Middleware unificado para gestión de excepciones
- ✅ **Tipado Fuerte**: Consistencia completa entre TypeScript y base de datos

---

## 🏗️ Arquitectura

### Flujo de Datos
```
Request → Middleware → Controller → Service → Repository → Database
   ↓              ↓           ↓           ↓            ↓
Response    ← Validation ← Business ← Data Access ← SQL
```

### Capas de la Aplicación

#### 1. **Routes** (`/routes/v2/`)
- Definen los endpoints HTTP y middlewares aplicados
- Manejan validación de entrada y autenticación

#### 2. **Controllers** (`/controllers/`)
- Orquestan las operaciones de negocio
- Inyectan dependencias via DependencyContainer
- Manejan respuestas HTTP y códigos de estado

#### 3. **Services** (`/services/`)
- Contienen la lógica de negocio
- Implementan caching para optimización
- Validan reglas de negocio

#### 4. **Repositories** (`/repositories/`)
- Abstraen el acceso a datos
- Ejecutan consultas SQL optimizadas
- Manejan transacciones con la base de datos

#### 5. **DTOs** (`/Dto/`)
- Objetos inmutables para transferencia de datos
- Definen contratos claros entre capas
- Validan estructura de datos

#### 6. **Middleware** (`/middleware/`)
- Validación de entrada de datos
- Manejo centralizado de errores
- Autenticación y autorización

---

## 🚀 Endpoints Disponibles

### Zonas de Trabajo (/api/v2/areas)

| Método | Endpoint | Descripción | Paginación | Caching |
|--------|-----------|-------------|-------------|----------|
| GET | `/areas` | Listar todas las áreas | ✅ | ✅ |
| GET | `/areas/:id` | Obtener área por ID | ❌ | ✅ |
| POST | `/areas` | Crear nueva área | ❌ | ❌* |
| PUT | `/areas/:id` | Actualizar área existente | ❌ | ❌* |
| DELETE | `/areas/:id` | Eliminar área por ID | ❌ | ❌* |

*Invalida caché automáticamente

### Clientes (/api/v2/clients)

| Método | Endpoint | Descripción | Paginación | Caching |
|--------|-----------|-------------|-------------|----------|
| GET | `/clients` | Listar todos los clientes | ✅ | ❌ |
| GET | `/clients/:id` | Obtener cliente por ID | ❌ | ❌ |
| POST | `/clients` | Crear nuevo cliente | ❌ | ❌ |
| PUT | `/clients/:id` | Actualizar cliente existente | ❌ | ❌ |
| DELETE | `/clients/:id` | Eliminar cliente por ID | ❌ | ❌ |

---

## 📦 DTOs y Estructuras de Datos

### DTOs Principales

#### GetArea
```typescript
class GetArea {
    public readonly id_zona_de_trabajo: number;
    constructor(id_zona_de_trabajo: number);
}
```

#### GetClient
```typescript
class GetClient {
    public readonly id_cliente: number;
    constructor(id_cliente: number);
}
```

#### PaginationParams
```typescript
class PaginationParams {
    public readonly limit: number;      // Default: 10
    public readonly offset: number;     // Default: 0
    public readonly page: number;       // Default: 1
    
    static fromQuery(query: any): PaginationParams;
}
```

### DTOs de Creación/Actualización

#### Area
```typescript
class Area {
    public readonly nombre_zona_trabajo: string;
    public readonly descripcion: string;
    constructor(nombre_zona_trabajo: string, descripcion: string);
}
```

#### Client
```typescript
class Client {
    public readonly cedula: string;
    public readonly email: string;
    public readonly nombre_completo_cliente: string;
    public readonly direccion: string;
    public readonly telefono: string;
    public readonly rut_nit: string;
    public readonly razon_social: string;
    public readonly estado: string;
    public readonly id_zona_de_trabajo: string;
    constructor(...);
}
```

---

## 📄 Paginación

### Implementación
La paginación se implementa mediante query parameters opcionales:

#### Método 1: Limit/Offset
```
GET /api/v2/areas?limit=10&offset=20
```

#### Método 2: Page-based
```
GET /api/v2/areas?page=3&limit=10
// Calcula automáticamente: offset = (3-1) * 10 = 20
```

### Respuesta Paginada
```json
{
    "data": [...],
    "pagination": {
        "total": 100,
        "limit": 10,
        "offset": 20,
        "page": 3,
        "totalPages": 10
    }
}
```

---

## ⚠️ Manejo de Errores

### Middleware Centralizado
El sistema implementa un middleware de errores unificado que maneja:

#### Errores de Base de Datos
- **ER_DUP_ENTRY**: Conflictos de duplicidad (409)
- **ER_ROW_IS_REFERENCED**: Intento de eliminar con referencias (409)
- **ER_NO_REFERENCED_ROW_2**: Referencias inexistentes (400)

#### Errores de Validación
- **ValidationError**: Datos inválidos (422)
- **SyntaxError**: JSON malformado (400)

#### Errores del Sistema
- **Internal Server Error**: Errores inesperados (500)

### Formato de Respuesta de Error
```json
{
    "error": "Tipo de error",
    "message": "Descripción amigable",
    "details": "Detalles técnicos (solo en desarrollo)"
}
```

---

## ✅ Validaciones

### Validación de Entrada
Se utiliza `express-validator` para validar datos de entrada:

#### Áreas
- `nombre_zona_trabajo`: Requerido, 1-45 caracteres
- `descripcion`: Requerido, máximo 255 caracteres

#### Clientes
- `cedula`: Requerido, 6-15 caracteres, numérico
- `email`: Requerido, formato email válido, máximo 100 caracteres
- `nombre_completo_cliente`: Requerido, 6-200 caracteres
- `direccion`: Requerido, 5-255 caracteres
- `telefono`: Requerido, 8-15 caracteres, numérico
- `rut_nit`: Opcional, máximo 30 caracteres
- `razon_social`: Opcional, máximo 120 caracteres
- `estado`: Requerido, valores: 'Activo', 'Inactivo'
- `id_zona_de_trabajo`: Opcional, entero positivo

### Códigos de Estado HTTP
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `409`: Conflict
- `422`: Unprocessable Entity
- `500`: Internal Server Error

---

## 💾 Caching

### Estrategia de Caching
Se implementa caching en memoria para optimizar rendimiento:

#### Datos Cacheados
- **Áreas**: Datos de referencia que cambian infrecuentemente
- **TTL**: 5 minutos (300,000 ms)
- **Alcance**: Todas las operaciones GET de áreas

#### Métodos de Cache
```typescript
// Almacenar
CacheService.getInstance().set(key, data, ttl);

// Recuperar
const cached = CacheService.getInstance().get(key);

// Invalidar
CacheService.getInstance().delete(key);

// Limpiar todo
CacheService.getInstance().clear();
```

#### Estrategias de Invalidación
- **Creación**: Invalida caché de todas las áreas
- **Actualización**: Invalida caché del área específica y general
- **Eliminación**: Invalida caché del área específica y general

---

## 🔧 Configuración y Despliegue

### Variables de Entorno
- `PORT`: Puerto del servidor (default: 8080)
- `NODE_ENV`: Ambiente (development/production)
- `DB_*`: Configuración de base de datos

### Dependencias Principales
- **Express**: Framework web
- **TypeScript**: Tipado estático
- **MySQL**: Base de datos relacional
- **express-validator**: Validación de entrada
- **node-fetch**: Cliente HTTP (para desarrollo)

### Scripts Disponibles
```json
{
    "start": "node dist/app.js",
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "test": "jest"
}
```

---

## 📊 Métricas y Optimización

### Optimizaciones Implementadas
1. **Consultas SQL Optimizadas**: Selección específica de campos (~60% menos datos)
2. **Paginación Eficiente**: Soporte para grandes volúmenes
3. **Caching Inteligente**: Respuestas en milisegundos para datos de referencia
4. **Tipado Consistente**: IDs numéricos coincidentes con BD
5. **Inmutabilidad**: DTOs con propiedades readonly

### Mejores Prácticas Aplicadas
- ✅ Patrones SOLID
- ✅ Inyección de dependencias
- ✅ Principio DRY (Don't Repeat Yourself)
- ✅ Separación de responsabilidades
- ✅ Manejo centralizado de errores
- ✅ Documentación completa

---

## 🔄 Flujo de Desarrollo

### Flujo Típico de una Petición
1. **Request**: Cliente envía petición HTTP
2. **Middleware**: Validación y autenticación
3. **Controller**: Orquestación y llamada a service
4. **Service**: Lógica de negocio y posible caché
5. **Repository**: Acceso a datos con consulta optimizada
6. **Database**: Ejecución de SQL y retorno de datos
7. **Response**: Construcción de respuesta HTTP con metadata

### Manejo de Errores en Desarrollo
```typescript
try {
    // Lógica de negocio
} catch (error: any) {
    // Logging estructurado
    console.error('Error:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    
    // Respuesta controlada por middleware
    next(error);
}
```

---

## 📝 Notas de Mantenimiento

### Consideraciones para Desarrolladores
1. **Tipado**: Mantener consistencia entre TypeScript y base de datos
2. **Validaciones**: Agregar nuevas validaciones en middlewares específicos
3. **Caching**: Considerar qué datos benefician de caché
4. **Consultas**: Evitar SELECT * en producción
5. **Errores**: Utilizar middleware centralizado para nuevos endpoints

### Monitoreo Recomendado
- Métricas de rendimiento de endpoints
- Tasa de aciertos de caché
- Tiempos de respuesta de base de datos
- Frecuencia de errores por tipo

---

*Última actualización: Mayo 2026*
*Versión: 2.0 - Arquitectura Refactorizada*
