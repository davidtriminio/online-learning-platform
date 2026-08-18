# Online Learning Platform — Core Architecture (Angular 22+)

Plataforma de e-learning construida bajo los estándares más modernos de Angular. Este repositorio sirve como implementación de referencia para arquitecturas empresariales, eliminando de raíz los patrones legados y estableciendo un stack 100% reactivo, standalone y zoneless.

## 🏗 Arquitectura y Pilares Técnicos

El proyecto está diseñado bajo una arquitectura *Feature-Sliced* y orientada al dominio. Todo desarrollo sobre este repositorio debe adherirse estrictamente a estos 10 pilares:

1. **Standalone API:** 100% libre de `NgModules`. Bootstrapping directo y componentes autónomos.
2. **Reactividad Moderna:** Estado local manejado exclusivamente con **Signals**.
3. **Estado Global:** Manejo de estado compartido mediante **SignalStore** (`@ngrx/signals`) integrando `withState`, `withComputed` y `rxMethod`.
4. **Control Flow Nativo:** Cero directivas estructurales legadas. Uso exclusivo de `@if`, `@for` (siempre con tracking y `@empty`), y `@switch`.
5. **Performance Extrema:** Estrategia `OnPush` global obligatoria en todos los componentes y vistas diferidas agresivas (`@defer`).
6. **Zoneless & SSR:** Aplicación configurada para operar sin `Zone.js`, con Server-Side Rendering y renderizado a nivel de ruta (Server/Client modes).
7. **Routing Funcional:** Uso de `CanActivateFn` para guards, `ResolveFn` para precarga de datos y `lazy loading` a nivel de rutas e hijos.
8. **Formularios Dinámicos:** Reactive Forms fuertemente tipados (`FormGroup<T>`) con gestión avanzada de `FormArray` para colecciones de datos.
9. **Intercepción HTTP:** Cadena funcional pura de interceptores (Auth, Error, Cache, Retry).
10. **Testing Moderno:** Cobertura unitaria con `TestBed` (basado en componentes standalone) e integración E2E con **Playwright**.

---

## 🚀 Roadmap de Implementación y Checkpoints

Secuencia exacta de desarrollo. Utiliza estos checkboxes para trazar el progreso y garantizar que las dependencias entre módulos se respeten.

### Fase 0: Setup Core
- [x] `src/environments/environment.ts` (apiUrl prod).
- [x] `src/environments/environment.development.ts` (apiUrl local).
- [x] `src/app/core/errors/infrastructure/http/api-error-handler.service.ts` (Capa de normalización de errores).
- [x] `src/app/app.routes.ts` (Estructura base de enrutamiento).
- [x] `src/app/app.component.ts` (Root standalone con `<router-outlet />`).
- [x] `src/app/app.config.ts` (`provideRouter`, `provideHttpClient`).
- [x] `src/main.ts` (`bootstrapApplication`).

### Fase 1: Autenticación y Usuarios (Identity)
- [ ] `features/users/models/user.model.ts` (Interfaces core).
- [ ] `features/auth/interfaces/login-request.ts` & `login-response.ts`.
- [ ] `core/auth/token-storage.service.ts` (Persistencia segura).
- [ ] `core/auth/auth.service.ts` (HTTP abstraction).
- [ ] `core/auth/auth.store.ts` (`signalStore` global de sesión).
- [ ] `interceptors/auth.interceptor.ts` (Inyección funcional de JWT).
- [ ] Registro de interceptor en `app.config.ts`.
- [ ] `guards/auth.guard.ts` (Protección funcional de rutas).
- [ ] `features/auth/pages/login/login.component.ts` & `.html`.
- [ ] Lazy loading de rutas de Auth y Usuarios.
- [ ] Unit tests mockeados (`auth.mock.ts`, `login.component.spec.ts`).

### Fase 2: Catálogo de Cursos (CRUD Base)
- [ ] Interfaces y Servicios Core (`course.model.ts`, `course.service.ts`).
- [ ] `features/courses/store/courses.store.ts` (Estado global del catálogo).
- [ ] `pages/course-list/course-list.component.ts` (`@for` iterando sobre el store).
- [ ] `pages/course-detail/course-detail.component.ts` (Router Input `id = input<string>()`).
- [ ] `pages/course-form/course-form.component.ts` (Reactive Form tipado).
- [ ] `shared/components/card-container/` (Uso de `ng-content` avanzado).
- [ ] Rutas protegidas del feature de cursos.

### Fase 3: Motor de Reproducción y Relaciones
- [ ] Entidades de Video (`video.model.ts`, `video.service.ts`).
- [ ] Entidad Pivot (`course-video.model.ts`, `course-video.service.ts`).
- [ ] `features/videos/components/video-player/` (`viewChild`, eventos de `<video>`).
- [ ] Extensión del `course-form.component.ts` para soportar `FormArray` dinámico.
- [ ] Integración del player y la lista de videos en el detalle del curso.

### Fase 4: Telemetría y Progreso (Enrollments)
- [ ] Servicios y modelos de `Enrollment`.
- [ ] `resolvers/enrollment.resolver.ts` (Resolución temprana con el ID del `authStore`).
- [ ] Acción de inscripción directa en `course-detail`.
- [ ] Implementación del dashboard (`my-courses.component.ts`).

### Fase 5: Motor de Progreso Granular
- [ ] Entidad de `Progress` (Tracking por video).
- [ ] `features/progress/store/progress.store.ts` (`computed` combinados para % global).
- [ ] Conexión del `video-player` al store (emisiones debounced de inicio/fin).
- [ ] Renderizado dinámico de la `progress-bar` (con `@switch`).

### Fase 6: Búsqueda y Filtrado Reactivo (Client-side)
- [ ] `course-filter-bar.component.ts` (Control de inputs mediante `Subject` + RxJS).
- [ ] Extensión de `courses.store.ts` para alojar estado temporal (`searchTerm`).

### Fase 7: Favoritos (Efectos de estado local)
- [ ] `favorites.service.ts` (Sincronización con storage vía `effect()`).
- [ ] Integración de UI en tarjetas y detalles.

### Fase 8: UI/UX Core
- [ ] Componentes de feedback: `spinner/`, `empty-state/`.
- [ ] Formateadores (Standalone Pipes): `duration-format`, `truncate`.
- [ ] Comportamientos (Standalone Directives): `highlight`.

### Fase 9: Calidad y Testing
- [ ] Configuración de `HttpTestingController` para servicios core.
- [ ] Configuración de `TestBed` en componentes list/detail.
- [ ] Flujo E2E completo en Playwright (`enroll-course.spec.ts`).

### Fase 10: Hardening Avanzado
- [ ] Refactorización estricta a `ChangeDetectionStrategy.OnPush`.
- [ ] Implementación de `@defer (on viewport)` para media pesada.
- [ ] Habilitación de `provideExperimentalZonelessChangeDetection()`.
- [ ] Configuración e hidratación de SSR (`provideClientHydration(withEventReplay())`).
- [ ] Segmentación en `app.routes.server.ts` (SSR para catálogo, CSR para dashboard).

---

## 💻 Desarrollo Local

```bash
# 1. Instalación de dependencias
pnpm install

# 2. Levantar entorno de desarrollo local (incluye validación zoneless)
pnpm start

# 3. Ejecución de suite de tests unitarios
pnpm run test

# 4. Pruebas E2E (requiere levantar la app primero o configurar baseUrl en playwright.config.ts)
pnpm run e2e
