# Areas & Clients Microservice v2.0

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Railway](https://img.shields.io/badge/Deployed%20on-Railway-1B1B1F?logo=railway&logoColor=white)](https://railway.app/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/JhoamSebastianMunoz/microservice_backend_areas_clients_v2)

> **A RESTful microservice for managing work areas and clients with Clean Architecture, SOLID principles, and comprehensive API documentation.**

---

## 🌐 Repository Versions

| Version | Repository | Status | API Base Path |
|---------|------------|--------|---------------|
| **v1 (Legacy)** | [microservice_backend_areas_clients](https://github.com/JhoamSebastianMunoz/microservice_backend_areas_clients) | Deprecated | `/register-client`, `/get-clients`, `/get_dataArea/:id` |
| **v2 (Current)** | [microservice_backend_areas_clients_v2](https://github.com/JhoamSebastianMunoz/microservice_backend_areas_clients_v2) | **Active** | `/api/v2/areas`, `/api/v2/clients`, `/api/v2/client-requests` |

> **Note:** v2 introduces full RESTful design, versioned endpoints (`/api/v2`), pagination, caching, and Clean Architecture patterns.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLEAN ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│  Controllers  →  Services  →  Repositories  →  Database         │
│       ↓             ↓             ↓                              │
│  Validation   Business Logic   Data Access                       │
│  (Middleware)   (Interfaces)   (Interfaces)                      │
└─────────────────────────────────────────────────────────────────┘
```

### **Key Principles Applied**
- ✅ **SOLID** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- ✅ **Dependency Injection** - `DependencyContainer` singleton managing all dependencies
- ✅ **Repository Pattern** - Abstract data access behind interfaces (`IAreaRepository`, `IClientRepository`)
- ✅ **Service Layer** - Business logic separated from HTTP concerns
- ✅ **DTOs with Immutability** - Readonly properties for type safety
- ✅ **Centralized Error Handling** - Unified middleware for all error types

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Runtime** | Node.js ≥ 20.0.0 |
| **Language** | TypeScript 5.4 (strict mode) |
| **Framework** | Express 4.19 |
| **Database** | MySQL 8.0 (mysql2 driver) |
| **Authentication** | JWT (jsonwebtoken), bcryptjs |
| **Validation** | express-validator 7.2 |
| **Documentation** | Swagger/OpenAPI 3.0 (swagger-ui-express, yamljs) |
| **Caching** | In-memory (custom `CacheService`) |
| **Deployment** | Railway (production), GitHub Actions (CI/CD) |
| **Environment** | dotenv 16.4 |

---

## 📁 Project Structure

```
src/
├── app.ts                          # Application entry point
├── config/
│   └── config-db.ts               # MySQL connection pool
├── container/
│   └── DependencyContainer.ts     # DI container (singleton)
├── controllers/                   # HTTP request handlers
│   ├── areaControllers/
│   ├── clientControllers/
│   ├── clientCreationRequestController/
│   ├── microservicePresaleControllers/
│   ├── microserviceProductControllers/
│   └── microserviceUserController/
├── Dto/                           # Data Transfer Objects (immutable)
│   ├── AreaDto.ts
│   ├── ClientDto.ts
│   ├── RequestCreateClientDto.ts
│   ├── PaginationDto.ts
│   └── ... (Update/Delete/Get variants)
├── Helpers/
│   ├── generateToken.ts           # JWT generation
│   └── generateHash.ts            # Password hashing
├── interfaces/                    # Contracts (Dependency Inversion)
│   ├── IAreaRepository.ts
│   ├── IClientRepository.ts
│   ├── IAreaService.ts
│   └── IClientService.ts
├── middleware/                    # Request processing pipeline
│   ├── verifyToken.ts             # JWT authentication
│   ├── checkRoleAndPermission.ts  # RBAC (ADMINISTRADOR/COLABORADOR)
│   ├── errorHandler.ts            # Centralized error handling
│   ├── areaMiddleware/            # Area-specific validators
│   ├── clientMiddleware/          # Client-specific validators
│   ├── clientCreationRequestMiddleware/
│   ├── microservicePresaleMiddleware/
│   ├── microserviceProductMiddleware/
│   └── assignAreaUserMiddleware/
├── repositories/                  # Data access implementations
│   ├── AreaRepository.ts
│   ├── ClientRepository.ts
│   ├── RequestCreateClientRepository.ts
│   ├── MicroserviceUser.ts
│   └── MicroservicePresaleRepository.ts
├── routes/
│   └── v2/                        # API Version 2 (RESTful)
│       ├── index.ts               # Route aggregator
│       ├── area.routes.ts         # /api/v2/areas
│       ├── client.routes.ts       # /api/v2/clients
│       ├── client-request.routes.ts  # /api/v2/client-requests
│       └── internal.routes.ts     # /api/v2/internal (microservices)
├── services/                      # Business logic layer
│   ├── AreaServices.ts            # + Caching (5min TTL)
│   ├── ClientServices.ts
│   ├── RequestCreateClientService.ts
│   ├── MicroservicePresaleService.ts
│   ├── MicroserviceUserService.ts
│   └── CacheService.ts            # In-memory cache singleton
└── swagger.yaml                   # OpenAPI 3.0 specification
```

---

## 🚀 API v2 Endpoints

All endpoints are versioned under **`/api/v2`** and documented in **Swagger UI at `/api-docs`**.

| Resource | Base Path | Description |
|----------|-----------|-------------|
| **Areas** | `/api/v2/areas` | Full CRUD + pagination + caching |
| **Clients** | `/api/v2/clients` | Full CRUD + pagination |
| **Client Requests** | `/api/v2/client-requests` | Approval workflow (create → list → approve) |
| **Internal (Microservices)** | `/api/v2/internal` | Cross-service queries (areas, clients) |

### **Quick Reference**

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| `GET` | `/areas` | ✅ | ADMIN, COLAB | List areas (paginated) |
| `POST` | `/areas` | ✅ | ADMIN | Create area |
| `GET` | `/areas/:id` | ✅ | ADMIN, COLAB | Get area by ID (cached) |
| `PUT` | `/areas/:id` | ✅ | ADMIN | Update area |
| `DELETE` | `/areas/:id` | ✅ | ADMIN | Delete area |
| `GET` | `/clients` | ✅ | ADMIN, COLAB | List clients (paginated) |
| `POST` | `/clients` | ✅ | ADMIN | Create client |
| `GET` | `/clients/:id` | ✅ | ADMIN, COLAB | Get client by ID |
| `PUT` | `/clients/:id` | ✅ | ADMIN | Update client |
| `DELETE` | `/clients/:id` | ✅ | ADMIN | Delete client |
| `POST` | `/client-requests` | ✅ | COLAB | Create client request |
| `GET` | `/client-requests` | ✅ | ADMIN, COLAB | List requests |
| `PATCH` | `/client-requests/:id/approve` | ✅ | ADMIN | Approve request |
| `GET` | `/internal/areas/:id` | ❌ | Internal | Get area for microservices |
| `GET` | `/internal/areas/:id/clients` | ❌ | Internal | Get clients by area |
| `GET` | `/internal/clients/:id` | ❌ | Internal | Get client for microservices |

> **📖 Full interactive documentation:** [`/api-docs`](https://microservicebackendareasclientsv2-production.up.railway.app/api-docs) (Swagger UI)

---

## 🔐 Authentication & Authorization

### **Current Status**
> ⚠️ **Authentication is temporarily disabled** for development (see `middleware/verifyToken.ts:51` and `middleware/checkRoleAndPermission.ts:24`). The middleware structure is fully implemented and ready to enable.

### **When Enabled**
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Token Payload:** `{ cedula, role, id_usuario, iat, exp }`
- **Roles:** `ADMINISTRADOR` (full access) | `COLABORADOR` (limited access)

### **Role-Based Access Control (RBAC)**

| Endpoint | ADMINISTRADOR | COLABORADOR |
|----------|---------------|-------------|
| `GET /areas` | ✅ | ✅ |
| `POST /areas` | ✅ | ❌ |
| `PUT /areas` | ✅ | ❌ |
| `DELETE /areas` | ✅ | ❌ |
| `GET /clients` | ✅ | ✅ |
| `POST /clients` | ✅ | ❌ |
| `POST /client-requests` | ❌ | ✅ |
| `PATCH /client-requests/:id/approve` | ✅ | ❌ |

---

## 📦 Data Models & DTOs

All DTOs use **readonly properties** for immutability and type safety.

### **Area**
```typescript
class Area {
  readonly nombre_zona_trabajo: string;  // Required, 1-45 chars
  readonly descripcion?: string;         // Optional, max 255 chars
}
```

### **Client**
```typescript
class Client {
  readonly cedula: string;                    // Required, 6-15 digits
  readonly email: string;                     // Required, valid email, max 100
  readonly nombre_completo_cliente: string;   // Required, 6-200 chars
  readonly direccion: string;                 // Required, 5-255 chars
  readonly telefono: string;                  // Required, 8-15 digits
  readonly rut_nit?: string;                  // Optional, max 30
  readonly razon_social?: string;             // Optional, max 100
  readonly estado: 'Activo' | 'Inactivo';     // Required
  readonly id_zona_de_trabajo?: string;       // Optional
}
```

### **Client Request (Approval Workflow)**
```typescript
class RequestCreateClient {
  readonly cedula: string;
  readonly nombre_completo_cliente: string;
  readonly direccion: string;
  readonly telefono: string;
  readonly rut_nit?: string;
  readonly razon_social?: string;
  readonly id_zona_de_trabajo?: string;
  // email & estado NOT required (estado defaults to 'Pendiente')
}
```

### **Pagination**
```typescript
class PaginationParams {
  readonly limit: number;   // Default: 10, Max: 100
  readonly offset: number;  // Default: 0
  readonly page: number;    // Default: 1 (calculates offset automatically)
}
```

---

## 📄 Pagination

Supports two formats:

```bash
# Limit/Offset
GET /api/v2/areas?limit=10&offset=20

# Page-based (auto-calculates offset)
GET /api/v2/areas?page=3&limit=10
```

### **Paginated Response**
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

## 💾 Caching Strategy

**In-memory caching** implemented in `AreaService` for reference data that changes infrequently.

| Aspect | Details |
|--------|---------|
| **Cached Data** | Areas (all + individual by ID) |
| **TTL** | 5 minutes (300,000 ms) |
| **Keys** | `areas:all`, `area:{id}` |
| **Invalidation** | Auto on CREATE/UPDATE/DELETE |
| **Scope** | GET operations only (not paginated) |

```typescript
// Usage
CacheService.getInstance().set(key, data, ttl);
CacheService.getInstance().get(key);
CacheService.getInstance().delete(key);
```

---

## ⚠️ Error Handling

Centralized in `middleware/errorHandler.ts` with structured responses.

### **Handled Error Types**
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `ER_DUP_ENTRY` | 409 | Duplicate unique constraint |
| `ER_ROW_IS_REFERENCED` | 409 | Delete blocked by foreign key |
| `ER_NO_REFERENCED_ROW_2` | 400 | Invalid foreign key reference |
| `ValidationError` | 422 | express-validator failures |
| `SyntaxError` | 400 | Malformed JSON |
| Custom `statusCode` | Variable | Business logic errors |
| Default | 500 | Unexpected errors |

### **Error Response Format**
```json
{
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": "Additional technical details (dev only)",
  "errors": [
    { "type": "field", "msg": "The cedula must be numeric", "path": "cedula", "location": "body" }
  ]
}
```

---

## 🗄️ Database Schema

### **Tables**
```sql
-- Work Areas
CREATE TABLE zonas_de_trabajo(
    id_zona_de_trabajo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_zona_trabajo VARCHAR(45),
    descripcion VARCHAR(255)
);

-- Clients
CREATE TABLE clientes(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NULL,
    nombre_completo_cliente VARCHAR(200) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    rut_nit VARCHAR(30) NULL,
    razon_social VARCHAR(120) NULL,
    fecha_registro DATE NOT NULL DEFAULT (CURRENT_DATE),
    estado ENUM('Activo', 'Inactivo', 'Pendiente') NOT NULL DEFAULT 'Activo',
    id_zona_de_trabajo INT,
    FOREIGN KEY (id_zona_de_trabajo) REFERENCES zonas_de_trabajo(id_zona_de_trabajo)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- User-Area Assignments
CREATE TABLE usuario_zona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_zona_de_trabajo INT NOT NULL,
    FOREIGN KEY (id_zona_de_trabajo) REFERENCES zonas_de_trabajo(id_zona_de_trabajo) ON DELETE CASCADE,
    UNIQUE (id_usuario, id_zona_de_trabajo)
);
```

Full schema: [`microservice_area_client.sql`](microservice_area_client.sql)

---

## 🏃 Local Development

### **Prerequisites**
- Node.js ≥ 20.0.0
- MySQL 8.0+
- Git

### **Setup**
```bash
# Clone v2 repository
git clone https://github.com/JhoamSebastianMunoz/microservice_backend_areas_clients_v2.git
cd microservice_backend_areas_clients_v2

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Database setup
mysql -u root -p < microservice_area_client.sql

# Development (watch mode)
npm run dev

# Production build + start
npm run build && npm start
```

### **Environment Variables** (`.env.example`)
```env
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_user
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_key
PORT=8080
NODE_ENV=development
```

### **Access Points**
| Service | URL |
|---------|-----|
| API Base | `http://localhost:8080/api/v2` |
| Swagger UI | `http://localhost:8080/api-docs` |
| Health Check | `http://localhost:8080/` |

---

## 🚀 Deployment

### **Production (Railway)**
- **URL:** `https://microservicebackendareasclientsv2-production.up.railway.app`
- **Auto-deploy:** On push to `main` branch
- **Build:** `npm run build && npm start`
- **Healthcheck:** `GET /`
- **Config:** [`railway.json`](railway.json)

### **CI/CD (GitHub Actions → Azure)**
- **Workflow:** [`.github/workflows/master_backendareasandclients.yml`](.github/workflows/master_backendareasandclients.yml)
- **Triggers:** Push to `master`
- **Steps:** Checkout → Node.js 18 → Install → Build → Test → Zip → Deploy to Azure Web App

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **Swagger UI** | Interactive API docs at `/api-docs` |
| **OpenAPI Spec** | [`swagger.yaml`](swagger.yaml) |
| **API Documentation** | [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md) |

---

## 🧪 Testing the API

```bash
# List areas with pagination
curl -X GET "http://localhost:8080/api/v2/areas?page=1&limit=5" \
  -H "Content-Type: application/json"

# Create area (requires ADMIN token when auth enabled)
curl -X POST "http://localhost:8080/api/v2/areas" \
  -H "Content-Type: application/json" \
  -d '{"nombre_zona_trabajo": "Zona Test", "descripcion": "Test area"}'

# Create client request (COLABORADOR)
curl -X POST "http://localhost:8080/api/v2/client-requests" \
  -H "Content-Type: application/json" \
  -d '{"cedula": "987654321", "nombre_completo_cliente": "Test Client", "direccion": "Test St", "telefono": "3219876543"}'
```

---

## 🔄 Development Guidelines

### **Request Flow**
```
Request → Middleware → Controller → Service → Repository → Database
   ↓           ↓            ↓           ↓            ↓
Response ← Validation ← Business ← Data Access ← SQL
```

### **Best Practices**
- ✅ SOLID Principles
- ✅ Dependency Injection
- ✅ DRY (Don't Repeat Yourself)
- ✅ Separation of Concerns
- ✅ Centralized Error Handling
- ✅ Complete Documentation

### **Performance Optimizations**
1. **Optimized SQL** - Specific field selection (~60% less data)
2. **Efficient Pagination** - Large volume support
3. **Intelligent Caching** - Millisecond responses for reference data
4. **Consistent Typing** - Numeric IDs matching database
5. **Immutability** - DTOs with readonly properties

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

**Jhoam Sebastian Muñoz**
- GitHub: [@JhoamSebastianMunoz](https://github.com/JhoamSebastianMunoz)

---

## 🇪🇸 Versión en Español

<details>
<summary><strong>Haz clic para ver la versión en español</strong></summary>

# Microservicio de Áreas y Clientes v2.0

> **Un microservicio RESTful para la gestión de zonas de trabajo y clientes con Arquitectura Limpia, principios SOLID y documentación completa de API.**

### **Versiones del Repositorio**

| Versión | Repositorio | Estado | Base de API |
|---------|-------------|--------|-------------|
| **v1 (Legado)** | [microservice_backend_areas_clients](https://github.com/JhoamSebastianMunoz/microservice_backend_areas_clients) | Obsoleto | `/register-client`, `/get-clients`, `/get_dataArea/:id` |
| **v2 (Actual)** | [microservice_backend_areas_clients_v2](https://github.com/JhoamSebastianMunoz/microservice_backend_areas_clients_v2) | **Activo** | `/api/v2/areas`, `/api/v2/clients`, `/api/v2/client-requests` |

### **Arquitectura**
- **Clean Architecture** + **SOLID** + **Inyección de Dependencias**
- Patrones: Repository, Service Layer, DTOs inmutables
- Manejo centralizado de errores

### **Stack Tecnológico**
Node.js 20+, TypeScript 5.4, Express 4.19, MySQL 8, JWT, Swagger/OpenAPI 3.0, Railway

### **Endpoints API v2**
Todos bajo `/api/v2` - Documentación interactiva en `/api-docs`
- **Áreas:** CRUD completo + paginación + caché (5 min)
- **Clientes:** CRUD completo + paginación
- **Solicitudes:** Flujo de aprobación (crear → listar → aprobar)
- **Internos:** Consultas para otros microservicios

### **Autenticación**
⚠️ **Temporalmente deshabilitada** para desarrollo. Estructura JWT + RBAC (ADMINISTRADOR/COLABORADOR) lista para activar.

### **Desarrollo Local**
```bash
git clone https://github.com/JhoamSebastianMunoz/microservice_backend_areas_clients_v2.git
cd microservice_backend_areas_clients_v2
npm install
cp .env.example .env  # Configurar credenciales BD
mysql -u root -p < microservice_area_client.sql
npm run dev  # Modo desarrollo con watch
```

### **Despliegue**
- **Producción:** Railway (auto-deploy en push a `main`)
- **CI/CD:** GitHub Actions → Azure Web App

### **Documentación**
- Swagger UI: `/api-docs`
- OpenAPI Spec: `swagger.yaml`
- Docs completas: `docs/API_DOCUMENTATION.md`

</details>

---

**Last Updated:** July 2026  
**Version:** 2.0.0 - Architecture Refactored  
**Status:** Production Ready ✅