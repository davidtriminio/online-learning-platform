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
8. **Formularios Signal-first:** **Signal Forms nativos** (`@angular/forms/signals`: `form()`, `FormField`, schema con `required`/`email`/`minLength`). **NO** Reactive Forms, **NO** Zod.
9. **Intercepción HTTP:** Cadena funcional pura de interceptores (Auth, Error, Loading) sobre `provideHttpClient(withInterceptors([...]))` (Fetch por defecto en v22).
10. **Testing Moderno:** **Vitest 4** + jsdom — unit/integración con `HttpTestingController` (repos/interceptores) y `TestBed` (stores/schemas/guards/páginas). Playwright (E2E) **diferido, no instalado**.

---

## 🚀 Roadmap de Implementación y Checkpoints

Secuencia exacta de desarrollo. Utiliza estos checkboxes para trazar el progreso y garantizar que las dependencias entre módulos se respeten.

### Fase 0: Setup Core
- [x] `src/environments/environment.ts` (apiUrl prod). ✅
- [x] `src/environments/environment.development.ts` (apiUrl local).
- [x] `src/app/core/errors/infrastructure/http/api-error-handler.service.ts` (Capa de normalización de errores).
- [x] `src/app/app.routes.ts` (Estructura base de enrutamiento).
- [x] `src/app/app.component.ts` (Root standalone con `<router-outlet />`).
- [x] `src/app/app.config.ts` (`provideRouter`, `provideHttpClient`).
- [x] `src/main.ts` (`bootstrapApplication`).

### Fase 1: Autenticación y Usuarios (Identity) ✅
- [x] `features/users/models/user.model.ts` (Interfaces core).
- [x] `features/auth/interfaces/login-request.ts` & `login-response.ts`.
- [x] `core/auth/token-storage.service.ts` (Persistencia segura).
- [x] `core/auth/auth.service.ts` (HTTP abstraction).
- [x] `core/auth/auth.store.ts` (`signalStore` global de sesión).
- [x] `interceptors/auth.interceptor.ts` (Inyección funcional de JWT).
- [x] Registro de interceptor en `app.config.ts`.
- [x] `guards/auth.guard.ts` (Protección funcional de rutas).
- [x] `features/auth/pages/login/login.component.ts` & `.html`.
- [x] Lazy loading de rutas de Auth y Usuarios.
- [x] Unit tests mockeados (`auth.mock.ts`, `login.component.spec.ts`).

### Fase 2: Catálogo de Cursos (CRUD Base) ✅
- [x] Interfaces y Servicios Core (`course.model.ts`, `course.service.ts`).
- [x] `features/courses/store/courses.store.ts` (Estado global del catálogo).
- [x] `pages/course-list/course-list.component.ts` (`@for` iterando sobre el store).
- [x] `pages/course-detail/course-detail.component.ts` (Router Input `id = input<string>()`).
- [x] `pages/course-form/course-form.component.ts` (Reactive Form tipado).
- [x] `shared/components/card-container/` (Uso de `ng-content` avanzado).
- [x] Rutas protegidas del feature de cursos.

### Fase 3: Motor de Reproducción y Relaciones ✅
- [x] Entidades de Video (`video.model.ts`, `video.service.ts`).
- [x] Entidad Pivot (`course-video.model.ts`, `course-video.service.ts`).
- [x] `features/videos/components/video-player/` (`viewChild`, eventos de `<video>`).
- [x] Extensión del `course-form.component.ts` para soportar `FormArray` dinámico.
- [x] Integración del player y la lista de videos en el detalle del curso.

### Fase 4: Inscripciones (Enrollments) ✅
- [x] `features/enrollments/domain/enrollment.model.ts` (entidad flaca + `EnrollmentInput`).
- [x] DTOs por caso de uso: `enrollment-response.dto.ts` (lectura denormalizada/fat) + `enrollment-request.dto.ts` (escritura thin).
- [x] `enrollment.mapper.ts` (`toEnrollment` descarta denormalización; `toCreateEnrollmentRequestDto` → `enrollmentId:0`, `enrolledDate=now`, `isCompleted:false`).
- [x] `enrollment.repository.ts` (`getByUserId` con `?userid=`, `create`, `delete` con `?enrollmentId=`).
- [x] `enrollments.store.ts` (SignalStore: `loadByUser`/`enroll`/`unenroll`, reload-after-mutate, `myCourses` cruzando con `CoursesStore`).
- [x] Acción inscribir/baja en `course-detail` (doble defensa de unicidad: UI preventiva + surfaceo de `result:false`).
- [x] Dashboard `my-courses.page` + ruta lazy `/my-courses` (protegida por `authGuard`).
- [x] Hidratación vía store (sin resolver: el `enrollmentId` no se necesita antes de montar la vista).

### Fase 5: Motor de Progreso Granular ✅
- [x] `features/progress/domain/video-progress.model.ts` (tracking por video + `ProgressInput`).
- [x] DTOs `progress-{response,request}.dto.ts` + `progress.mapper.ts` (`toStartRequestDto` / `toCompleteRequestDto`, reusa `progressId` en complete).
- [x] `progress.repository.ts` (`getByEnrollmentId`, `start`=addStartProgress, `complete`=addCompleteProgress).
- [x] `progress.store.ts` (`withEntities`; `loadByEnrollment`, `start` con guarda anti-doble-inicio, `complete` encadena start→complete; upsert con `setEntity`; `completedVideoIds` computed).
- [x] Conexión al `video-player`: `start` al reproducir, `complete` por botón explícito (universal) + `ended` nativo.
- [x] `%` de curso **derivado** (cruce `completedVideoIds` ↔ `courseVideos`); "Completed" es solo vista (no persiste en `enrollment.isCompleted` — `UpdateEnrollment` inservible).

### Fase 6: Búsqueda y Filtrado Reactivo (Client-side) ✅
- [x] Extensión de `courses.store.ts`: slice `searchTerm` en `withState` + `setSearchTerm` + `computed` `filteredCourses` (case/acento-insensitive vía `normalize` NFD) y `hasSearch`. El resultado se **deriva**, no se duplica.
- [x] `ui/components/course-filter-bar` (input controlado `[value]`/`(input)` que inyecta el store y escribe `setSearchTerm`; filtrado instantáneo, sin `Subject`).
- [x] Deep-linking `?q=` vía Router Input (`withComponentInputBinding`): `effect` URL→store + `rxMethod`/`toObservable` con `debounceTime(300)`+`replaceUrl` store→URL (debounce solo donde gana: no ensuciar el history).
- [x] Empty-state contextual bifurcado por `hasSearch()` (sin coincidencias ≠ catálogo vacío), reutilizando `shared/ui/empty-state`.
- [x] Blindaje del Router Input: `input('', { transform: v => v ?? '' })` — param ausente entrega `undefined`, no el default; se coalesce en la frontera.

### Fase 7: Favoritos (Efectos de estado local) ✅
- [x] `favorites/infrastructure/favorites-storage.service.ts` (adaptador `localStorage`; key **namespaced por usuario** `ol.favorites.${userId}`; `Set<number>` en memoria ↔ `number[]` serializado; degrada a vacío en `try/catch`).
- [x] `favorites/application/favorites.store.ts` (servicio `providedIn:'root'` con `signal` — **no** SignalStore: estado cliente sin async; `isFavorite`/`toggle`, `count`, `favoriteCourses` **derivado** cruzando `CoursesStore.entityMap()`).
- [x] Sincronización bidireccional: `effect` hidrata storage→state reaccionando a `AuthStore.user()` (rehidrata al cambiar de sesión); `toggle` persiste state→storage **explícito** (evita machaque de key en el cambio de usuario y el loop del effect-persist).
- [x] `favorites/ui/components/favorite-button` (widget corazón: `input courseId`, `lucideHeart` con `fill` conmutado, `aria-pressed`; `stopPropagation`/`preventDefault` para no navegar dentro del `<a>` de la tarjeta).
- [x] Integración de UI: corazón en `course-card` (sobre el thumbnail) y en `course-detail` (reemplaza el botón "Save" placeholder muerto).
- [x] `courses/ui/components/course-grid` (presentacional puro `input courses: Course[]` → `@for` de `course-card`); refactor de `course-list` para consumirlo (loading/error/empty se quedan en la página, que sí conoce el contexto).
- [x] `favorites/ui/pages/favorites` + ruta lazy `/favorites` (protegida por `authGuard`); guardia `isLoading` del catálogo evita falso-vacío mientras `entityMap()` carga.

### Fase 8: UI/UX Core ✅
- [x] Pipes standalone puros: `shared/pipes/duration-format.pipe.ts` (segundos/horas → `"1h 5m"`; passthrough tolerante si el string ya viene formateado) y `shared/pipes/truncate.pipe.ts` (corte por palabra + ellipsis). Con specs Vitest.
- [x] Directiva standalone `shared/directives/highlight.directive.ts` (resalta el término del buscador con `<mark>`; **escapa el HTML a mano** porque escribe `innerHTML` y bypasea el sanitizer; genérica: recibe `text`+`term`, no inyecta el store). Con spec.
- [x] Threading del término sin acoplar presentacionales: `course-list → course-grid → course-card` pasan `highlight` como `input` (en `/favorites` va vacío → sin marcas). El highlight es case-insensitive (acento-sensible, para no romper índices con NFD).
- [x] Consolidación de feedback: fix de `shared/ui/empty-state` (se coló `import { describe } from 'vitest'` en producción) + `shared/ui/skeleton-grid` (encapsula el `@for` de skeletons triplicado en `course-list`/`favorites`/`my-courses`). `spinner` no se creó: `loading-overlay` + `card-skeleton` ya cubrían el caso.
- [x] Theming: fix de `infrastructure/theme/theme.service.ts` (media query inválida `matchMedia('prefers-color-scheme')` → `'(prefers-color-scheme: dark)'` con `?.` para degradar en jsdom/SSR; import muerto `Service` eliminado) + modo `system` (computed `isDark` sobre `theme`+`systemDark`, listener de `change`). `shared/ui/theme-toggle` (cicla light→dark→system). Toggle montado **temporal** en `app.html` (su hogar definitivo será el nav, en otra rama).

### Fase 9: Calidad y Testing ✅
- [x] `testing/mocks/*.mock.ts` + helper `apiOk<T>` (fixtures con los shapes reales del backend, un solo lugar).
- [x] Repositorios con `HttpTestingController` (course/enrollment/progress/video/course-video/auth): URL/param/método/body exactos, base derivada de `environment.apiUrl`, `httpMock.verify()`.
- [x] Interceptores (error/auth/loading) montados con `provideHttpClient(withInterceptors([...]))`.
- [x] `TestBed` en stores/schemas/guard/servicios/página de integración; stub de la frontera (`AuthStore`/`SessionStorage`) con `useValue`; `TestBed.tick()` para vaciar effects.
- [x] Playwright (E2E) **documentado como scaffold diferido, NO instalado**.

### Fase 10: SSR + `@defer` (Vercel) ✅
- [x] `@angular/ssr`: `provideServerRendering(withRoutes(serverRoutes))` + `provideClientHydration(withEventReplay(), withHttpTransferCacheOptions({...}))` (incremental hydration y Fetch ya son default en v22).
- [x] `app.routes.server.ts` con `RenderMode` por ruta: catálogo/detalle `Server` (SSR+SEO), privadas `Client`, `login`/`register` `Prerender`.
- [x] `authGuard` bajado del padre a las rutas privadas → catálogo público SSR-eable (patrón Udemy).
- [x] Blindaje de APIs de navegador para SSR: `theme.service`/`session-storage`/`favorites-storage`/`back.directive` con `isPlatformBrowser`; sesión y tema hidratados en `afterNextRender` (mata el crash de `localStorage` en server y el `NG0500`).
- [x] `TransferState` filtrado (excluye `?userid=`/`?enrollmentId=`); `@defer (on viewport)` en el reproductor (code-split) y `@defer (hydrate on viewport)` en el grid.

### Fase 11: Registro de usuarios ✅
- [x] `register-request.dto.ts` (write-thin) + `register.mapper.ts` (`userId:0` IDENTITY, `role`/`refreshToken` vacíos, `projectName:'LMS'`) + `AddNewUser` en endpoints.
- [x] `register.schema.ts` (`required`/`email`/`minLength`), `auth.repository.register`, `auth.store.register` que **encadena** registro→login (la response no trae token usable).
- [x] `register.page` + ruta pública `Prerender`. Límite del backend: email duplicado devuelve siempre 200 `result:true` (no detectable en front).

### Fase 12: Modo Demo (fricción cero) ✅
- [x] Credenciales demo en `environment` (visibles en el bundle; cuenta desechable, rol irrelevante porque el backend ignora permisos).
- [x] Ruta `/demo` con auto-login en `afterNextRender` (SSR-safe) → `AuthStore.login(environment.demo)` → `/courses`; `RenderMode.Client`.
- [x] Enlace del portafolio a `/demo` (login real, no token quemado; sin credenciales en la URL).

### Deploy: Vercel (SSR Node) ✅
- [x] El build SSR **no cabe** en el builder de 2 cores de Vercel (OOM/deadlock de esbuild) → **build en GitHub Actions** (`.github/workflows/deploy.yml`, `ubuntu-latest`) + `vercel deploy --prebuilt`.
- [x] `NG_ALLOWED_HOSTS=*.vercel.app` (protección SSRF de v22), Ignored Build Step `exit 1` (corta el build nativo), `engines.node` pinneado.

---

## 💻 Desarrollo Local

```bash
# 1. Instalación de dependencias
pnpm install

# 2. Levantar entorno de desarrollo local (incluye validación zoneless)
pnpm start

# 3. Ejecución de suite de tests unitarios
pnpm run test

# 4. SSR: build + servir el output de servidor en local
#    (requiere NG_ALLOWED_HOSTS=localhost por la protección SSRF de v22)
pnpm run build
pnpm run serve:ssr:online-learning-platform
```

> **Deploy (Vercel SSR):** el build SSR no cabe en el builder de 2 cores de Vercel → se compila en **GitHub Actions** y se sube con `vercel deploy --prebuilt`. Ver `.github/workflows/deploy.yml` y el runbook en `guides/implementacion.html`.
>
> **E2E:** Playwright quedó **diferido, no instalado** — aún no hay `pnpm run e2e`.
